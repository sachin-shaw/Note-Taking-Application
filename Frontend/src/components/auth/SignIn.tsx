import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupImage from '../../assets/container.png';
import { GoogleLogin } from '@react-oauth/google';
import HDIcon from '../../assets/icon.png'; 
import Spinner from '../common/Spinner';
import { apiService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
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
      const response = await apiService.login(formData.email, formData.password);
      login(response.user, response.token);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ password: error instanceof Error ? error.message : 'Sign in failed' });
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
          <h1 className="auth-title">Sign in</h1>
          <p className="auth-subtitle">Welcome back to HD</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="your@email.com"
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
              placeholder="Enter your password"
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? <Spinner size="sm" color="white" /> : 'Sign in'}
          </button>
        </form>
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
  <GoogleLogin
    onSuccess={async (credentialResponse) => {
      try {
        const credential = credentialResponse.credential;
        if (!credential) return;

        const response = await apiService.googleAuth(credential); // sends to /auth/google
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
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="auth-link"
            >
              Sign up
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

export default SignIn;