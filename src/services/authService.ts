import { apiClient } from '@/config/api';
import { API_CONFIG } from '@/config/api';

// Match Spring Boot response structure
export interface AuthResponse {
  student_id?: string;
  faculty_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  points?: number;
  role: string;
  subject?: string;
  rating?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  role: string;
}

export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    // Match backend endpoint structure
    const payload = { 
      emailId: credentials.email, 
      password: credentials.password 
    };
    
    // Determine endpoint based on role
    const endpoint = credentials.role === 'FACULTY' 
      ? '/api/faculty/login' 
      : API_CONFIG.ENDPOINTS.AUTH.LOGIN;
    
    const response = await apiClient.post(endpoint, payload);
    
    // Store token if returned
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    
    return response;
  },

  signup: async (userData: SignupRequest): Promise<AuthResponse> => {
    const payload = { 
      firstName: userData.first_name, 
      lastName: userData.last_name, 
      emailId: userData.email, 
      password: userData.password 
    };
    
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.SIGNUP, payload);
    
    // Store token if returned
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    
    return response;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};
