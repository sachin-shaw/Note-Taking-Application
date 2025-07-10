import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Spinner from '../common/Spinner';
import { apiService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import type { SignupFormData } from '../../types';
import SignupImage from '../../assets/container.png';

import HDIcon from '../../assets/icon.png'; // adjust path as needed

import './Auth.css';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    otp: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (otpSent && !formData.otp.trim()) newErrors.otp = 'OTP is required';

    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    try {
      if (!otpSent) {
        // Step 1: Sign up and send OTP
        await apiService.signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          dateOfBirth: formData.dateOfBirth,
          otp: ''
        });
        setOtpSent(true);
      } else {
        // Step 2: Verify OTP
        const response = await apiService.verifyOTP({
          email: formData.email,
          otp: formData.otp
        });
        login(response.user, response.token);
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors({ otp: error instanceof Error ? error.message : 'Signup failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo">
            <img src={HDIcon} alt="HD Icon" className="logo-image" />
              <span className="logo-text">HD</span>
            </div>

          <h1 className="auth-title">Sign up</h1>
          <p className="auth-subtitle">Sign up to enjoy the feature of HD</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!otpSent && (
            <>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                />
                {errors.password && <div className="error-message">{errors.password}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
                />
                {errors.dateOfBirth && <div className="error-message">{errors.dateOfBirth}</div>}
              </div>
            </>
          )}

          {otpSent && (
            <div className="form-group">
              <label htmlFor="otp" className="form-label">Enter OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                className={`form-input ${errors.otp ? 'error' : ''}`}
                maxLength={6}
              />
              {errors.otp && <div className="error-message">{errors.otp}</div>}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? <Spinner size="sm" color="white" /> : otpSent ? 'Verify OTP' : 'Sign up'}
          </button>
        </form>
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
  <GoogleLogin
    onSuccess={async (credentialResponse) => {
      try {
        const { credential } = credentialResponse;
        if (!credential) return;

        const response = await apiService.googleAuth(credential);
        login(response.user, response.token);
        navigate('/dashboard');
      } catch (err) {
        console.error('Google Sign-In error:', err);
      }
    }}
    onError={() => {
      console.log('Google Login Failed');
    }}
  />
</div>


        <div className="auth-footer">
          <p>Already have an account?{' '}
            <button type="button" onClick={() => navigate('/signin')} className="auth-link">
              Sign in
            </button>
          </p>
        </div>
      </div>
      <div className="auth-image-section">
  <img src={SignupImage} alt="Signup Illustration" />
</div>
    </div>
  );
};

export default SignUp;
