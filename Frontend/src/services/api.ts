import type { User, Note, SignupFormData, AuthResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('token');

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  // Auth endpoints
  async sendOTP(email: string): Promise<{ message: string }> {
    return this.request('/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyOTP(data: { email: string; otp: string }): Promise<AuthResponse> {
  return this.request('/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}


  async signup(data: SignupFormData): Promise<AuthResponse> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Inside your ApiService class
async googleAuth(credential: string): Promise<AuthResponse> {
  return this.request('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ token: credential }),
    headers: { 'Content-Type': 'application/json' }
  });
}

  // Notes endpoints

  async getNotes(): Promise<Note[]> {
  const response = await this.request<{ notes: Note[] }>('/notes');
  return response.notes;
}

async createNote(title: string, content: string): Promise<Note> {
  const response = await this.request<{ note: Note }>('/notes', {
    method: 'POST',
    body: JSON.stringify({ title, content }),
  });
  return response.note; // 👈 Extract the `note` object
}


  async updateNote(id: string, title: string, content: string): Promise<Note> {
    return this.request(`/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
    });
  }

  async deleteNote(id: string): Promise<{ message: string }> {
    return this.request(`/notes/${id}`, {
      method: 'DELETE',
    });
  }

  // User endpoints
  async getProfile(): Promise<User> {
    return this.request('/users/profile');
  }
}

export const apiService = new ApiService();