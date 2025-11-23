import { API_CONFIG, apiClient } from '@/config/api';

export interface LoginRequest {
  email: string;
  password: string;
  role: 'student' | 'faculty';
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    studentId?: string;
    facultyId?: string;
    firstName: string;
    lastName: string;
    email: string;
    points?: number;
    role: 'student' | 'faculty';
    subject?: string;
    rating?: number;
  };
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
      
      // Store token in localStorage
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  signup: async (userData: SignupRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.SIGNUP, userData);
      
      // Store token in localStorage
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, {});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always remove token on logout
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },

  verifyToken: async (): Promise<AuthResponse> => {
    try {
      const response = await apiClient.get(API_CONFIG.ENDPOINTS.AUTH.VERIFY);
      return response;
    } catch (error) {
      console.error('Token verification error:', error);
      throw error;
    }
  },
};
