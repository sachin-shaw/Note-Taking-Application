export interface User {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  avatar?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  otp: string;
}


export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  field?: string;
}