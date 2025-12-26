// import { API_CONFIG, apiClient } from '@/config/api';

// // Match exact Spring Boot DTO structure
// export interface LoginRequest {
//   email: string;
//   password: string;
//   role: string; // 'STUDENT' or 'FACULTY' in backend
// }

// export interface SignupRequest {
//   first_name: string;
//   last_name: string;
//   email: string;
//   password: string;
// }

// export interface AuthResponse {
//   token: string;
//   student_id?: string;
//   faculty_id?: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   points?: number;
//   role: string;
//   subject?: string;
//   rating?: number;
// }

// export const authService = {
//   login: async (credentials: LoginRequest): Promise<AuthResponse> => {
//     try {
//       const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
      
//       // Store token in localStorage
//       if (response.token) {
//         localStorage.setItem('authToken', response.token);
//       }
      
//       return response;
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   },

//   signup: async (userData: SignupRequest): Promise<AuthResponse> => {
//     try {
//       const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.SIGNUP, userData);
      
//       // Store token in localStorage
//       if (response.token) {
//         localStorage.setItem('authToken', response.token);
//       }
      
//       return response;
//     } catch (error) {
//       console.error('Signup error:', error);
//       throw error;
//     }
//   },

//   logout: async (): Promise<void> => {
//     try {
//       await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, {});
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       // Always remove token on logout
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('user');
//     }
//   },

//   verifyToken: async (): Promise<AuthResponse> => {
//     try {
//       const response = await apiClient.get(API_CONFIG.ENDPOINTS.AUTH.VERIFY);
//       return response;
//     } catch (error) {
//       console.error('Token verification error:', error);
//       throw error;
//     }
//   },
// };























// authService.ts
import { apiClient } from '@/config/api';
import { API_CONFIG } from '@/config/api';

export const authService = {
  login: async (email: string, password: string) => {
    try {
      // payload keys MUST match backend DTO
      const payload = { emailId: email, password };
      await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, payload);
      return true;
    } catch (err: any) {
      console.error('Login error:', err);
      return false;
    }
  },

  signup: async (firstName: string, lastName: string, emailId: string, password: string) => {
    try {
      const payload = { firstName, lastName, emailId, password };
      await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.SIGNUP, payload);
      return true;
    } catch (err: any) {
      console.error('Signup error:', err);
      return false;
    }
  },
};

