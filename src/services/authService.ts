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
  role?: string;
  subject_associated?: string;
  institute?: string;
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
    const isFaculty = userData.role === 'FACULTY';
    
    const payload: any = { 
      firstName: userData.first_name, 
      lastName: userData.last_name, 
      emailId: userData.email, 
      password: userData.password 
    };
    
    // Add faculty-specific fields
    if (isFaculty) {
      payload.subjectAssociated = userData.subject_associated;
      payload.institute = userData.institute;
    }
    
    // Use different endpoints for student vs faculty signup
    const endpoint = isFaculty 
      ? '/api/faculty' 
      : API_CONFIG.ENDPOINTS.AUTH.SIGNUP;
    
    const response = await apiClient.post(endpoint, payload);
    
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
