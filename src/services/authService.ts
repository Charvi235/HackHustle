// // // // import { apiClient } from '@/config/api';
// // // // import { API_CONFIG } from '@/config/api';

// // // // // Match Spring Boot response structure
// // // // export interface AuthResponse {
// // // //   student_id?: string;
// // // //   faculty_id?: string;
// // // //   first_name: string;
// // // //   last_name: string;
// // // //   email: string;
// // // //   points?: number;
// // // //   role: string;
// // // //   subject?: string;
// // // //   rating?: number;
// // // // }

// // // // export interface LoginRequest {
// // // //   email: string;
// // // //   password: string;
// // // //   role: string;
// // // // }

// // // // export interface SignupRequest {
// // // //   first_name: string;
// // // //   last_name: string;
// // // //   email: string;
// // // //   password: string;
// // // //   role?: string;
// // // //   subject_associated?: string;
// // // //   institute?: string;
// // // // }

// // // // export const authService = {
// // // //   login: async (credentials: LoginRequest): Promise<AuthResponse> => {
// // // //     // Match backend endpoint structure
// // // //     const payload = { 
// // // //       emailId: credentials.email, 
// // // //       password: credentials.password 
// // // //     };
    
// // // //     // Determine endpoint based on role
// // // //     const endpoint = credentials.role === 'FACULTY' 
// // // //       ? '/api/faculty/login' 
// // // //       : API_CONFIG.ENDPOINTS.AUTH.LOGIN;
    
// // // //     const response = await apiClient.post(endpoint, payload);
    
// // // //     // Store token if returned
// // // //     if (response.token) {
// // // //       localStorage.setItem('authToken', response.token);
// // // //     }
    
// // // //     return response;
// // // //   },

// // // //   signup: async (userData: SignupRequest): Promise<AuthResponse> => {
// // // //     const isFaculty = userData.role === 'FACULTY';
    
// // // //     const payload: any = { 
// // // //       firstName: userData.first_name, 
// // // //       lastName: userData.last_name, 
// // // //       emailId: userData.email, 
// // // //       password: userData.password 
// // // //     };
    
// // // //     // Add faculty-specific fields
// // // //     if (isFaculty) {
// // // //       payload.subjectAssociated = userData.subject_associated;
// // // //       payload.institute = userData.institute;
// // // //     }
    
// // // //     // Use different endpoints for student vs faculty signup
// // // //     const endpoint = isFaculty 
// // // //       ? '/api/faculty' 
// // // //       : API_CONFIG.ENDPOINTS.AUTH.SIGNUP;
    
// // // //     const response = await apiClient.post(endpoint, payload);
    
// // // //     // Store token if returned
// // // //     if (response.token) {
// // // //       localStorage.setItem('authToken', response.token);
// // // //     }
    
// // // //     return response;
// // // //   },

// // // //   logout: async (): Promise<void> => {
// // // //     localStorage.removeItem('authToken');
// // // //     localStorage.removeItem('user');
// // // //   },
// // // // };
// // // import { apiClient, API_CONFIG } from '@/config/api';

// // // // Match Spring Boot response structure
// // // export interface AuthResponse {
// // //   student_id?: string;
// // //   faculty_id?: string;
// // //   first_name: string;
// // //   last_name: string;
// // //   emailId: string;
// // //   points?: number;
// // //   role: string;
// // //   subject?: string;
// // //   rating?: number;
// // //   token?: string;
// // // }

// // // export interface LoginRequest {
// // //   emailId: string;
// // //   password: string;
// // //   role: 'STUDENT' | 'FACULTY';
// // // }

// // // export interface SignupRequest {
// // //   first_name: string;
// // //   last_name: string;
// // //   emailId: string;
// // //   password: string;
// // //   role?: 'STUDENT' | 'FACULTY';
// // //   subject_associated?: string;
// // //   institute?: string;
// // // }

// // // export const authService = {
// // //   login: async (credentials: LoginRequest): Promise<AuthResponse> => {
// // //     // Payload for backend
// // //     const payload = { 
// // //       emailId: credentials.emailId, 
// // //       password: credentials.password 
// // //     };
    
// // //     // Determine endpoint based on role
// // //     const endpoint = credentials.role === 'FACULTY'
// // //       ? API_CONFIG.ENDPOINTS.AUTH.FACULTY_LOGIN
// // //       : API_CONFIG.ENDPOINTS.AUTH.LOGIN;
    
// // //     const response = await apiClient.post(endpoint, payload);

// // //     // Store token if returned
// // //     if (response.token) {
// // //       localStorage.setItem('authToken', response.token);
// // //     }
    
// // //     return response;
// // //   },

// // //   signup: async (userData: SignupRequest): Promise<AuthResponse> => {
// // //     const isFaculty = userData.role === 'FACULTY';
    
// // //     const payload: any = { 
// // //       first_name: userData.first_name, 
// // //       last_name: userData.last_name, 
// // //       emailId: userData.emailId, 
// // //       password: userData.password 
// // //     };
    
// // //     // Add faculty-specific fields
// // //     if (isFaculty) {
// // //       payload.subject_associated = userData.subject_associated;
// // //       payload.institute = userData.institute;
// // //     }
    
// // //     // Determine endpoint dynamically
// // //     const endpoint = isFaculty
// // //       ? API_CONFIG.ENDPOINTS.AUTH.FACULTY_SIGNUP
// // //       : API_CONFIG.ENDPOINTS.AUTH.SIGNUP;
    
// // //     const response = await apiClient.post(endpoint, payload);

// // //     // Store token if returned
// // //     if (response.token) {
// // //       localStorage.setItem('authToken', response.token);
// // //     }

// // //     return response;
// // //   },

// // //   logout: async (): Promise<void> => {
// // //     localStorage.removeItem('authToken');
// // //     localStorage.removeItem('user');
// // //   },
// // // };


// // import { apiClient, API_CONFIG } from '@/config/api';

// // /**
// //  * Match Spring Boot response structure
// //  * Note: Added camelCase versions to match typical Java DTOs
// //  */
// // export interface AuthResponse {
// //   student_id?: string;
// //   faculty_id?: string;
// //   firstName: string;
// //   lastName: string;
// //   emailId: string;
// //   points?: number;
// //   role: 'STUDENT' | 'FACULTY';
// //   subject?: string;
// //   rating?: number;
// //   token?: string;
// // }

// // export interface LoginRequest {
// //   emailId: string;
// //   password: string;
// //   role: 'STUDENT' | 'FACULTY';
// // }

// // export interface SignupRequest {
// //   first_name: string;
// //   last_name: string;
// //   emailId: string;
// //   password: string;
// //   role: 'STUDENT' | 'FACULTY'; // Explicitly typed
// //   subject_associated?: string;
// //   institute?: string;
// // }

// // export const authService = {
// //   /**
// //    * Handles Login for both Students and Faculty
// //    */
// //   login: async (credentials: LoginRequest): Promise<AuthResponse> => {
// //     const payload = { 
// //       emailId: credentials.emailId, 
// //       password: credentials.password 
// //     };
    
// //     // Dynamically choose endpoint based on role
// //     const endpoint = credentials.role === 'FACULTY'
// //       ? API_CONFIG.ENDPOINTS.AUTH.FACULTY_LOGIN // /api/teachers/login
// //       : API_CONFIG.ENDPOINTS.AUTH.LOGIN;         // /api/students/login
    
// //     const response = await apiClient.post(endpoint, payload);

// //     if (response.token) {
// //       localStorage.setItem('authToken', response.token);
// //     }
    
// //     return response;
// //   },

// //   /**
// //    * Handles Signup for both Students and Faculty
// //    * Maps UI snake_case fields to Backend camelCase fields
// //    */
// //   signup: async (userData: SignupRequest): Promise<AuthResponse> => {
// //     const isFaculty = userData.role === 'FACULTY';
    
// //     // 1. Map basic fields to match Spring Boot @RequestBody expectations
// //     const payload: any = { 
// //       firstName: userData.first_name, 
// //       lastName: userData.last_name, 
// //       emailId: userData.emailId, 
// //       password: userData.password 
// //     };
    
// //     // 2. Add faculty-specific fields with proper naming
// //     if (isFaculty) {
// //       payload.subjectAssociated = userData.subject_associated;
// //       payload.institute = userData.institute;
// //     }
    
// //     // 3. Select the correct endpoint (Fixes the 404 error)
// //     const endpoint = isFaculty
// //       ? API_CONFIG.ENDPOINTS.AUTH.FACULTY_SIGNUP // Hits /api/teachers
// //       : API_CONFIG.ENDPOINTS.AUTH.SIGNUP;        // Hits /api/students
    
// //     const response = await apiClient.post(endpoint, payload);

// //     if (response.token) {
// //       localStorage.setItem('authToken', response.token);
// //     }

// //     return response;
// //   },

// //   logout: async (): Promise<void> => {
// //     localStorage.removeItem('authToken');
// //     localStorage.removeItem('user');
// //   },
// // };






// import { apiClient, API_CONFIG } from '@/config/api';

// /**
//  * Match Spring Boot response structure
//  * Note: Added camelCase versions to match typical Java DTOs
//  */
// export interface AuthResponse {
//   student_id?: string;
//   teacher_id?: string;
//   firstName: string;
//   lastName: string;
//   emailId: string;
//   points?: number;
//   role: 'STUDENT' | 'TEACHER';
//   subject?: string;
//   rating?: number;
//   token?: string;
// }

// export interface LoginRequest {
//   emailId: string;
//   password: string;
//   role: 'STUDENT' | 'TEACHER';
// }

// export interface SignupRequest {
//   first_name: string;
//   last_name: string;
//   emailId: string;
//   password: string;
//   role: 'STUDENT' | 'TEACHER'; // Explicitly typed
//   subject_associated?: string;
//   institute?: string;
// }

// export const authService = {
//   /**
//    * Handles Login for both Students and Teachers
//    */
//   login: async (credentials: LoginRequest): Promise<AuthResponse> => {
//     const payload = { 
//       emailId: credentials.emailId, 
//       password: credentials.password 
//     };
    
//     // Dynamically choose endpoint based on role
//     const endpoint = credentials.role === 'TEACHER'
//       ? API_CONFIG.ENDPOINTS.AUTH.TEACHER_LOGIN // /api/teachers/login
//       : API_CONFIG.ENDPOINTS.AUTH.LOGIN;        // /api/students/login
    
//     const response = await apiClient.post(endpoint, payload);

//     if (response.token) {
//       localStorage.setItem('authToken', response.token);
//     }
    
//     return response;
//   },

//   /**
//    * Handles Signup for both Students and Teachers
//    * Maps UI snake_case fields to Backend camelCase fields
//    */
//   signup: async (userData: SignupRequest): Promise<AuthResponse> => {
//     const isTeacher = userData.role === 'TEACHER';
    
//     // Map basic fields
//     const payload: any = { 
//       firstName: userData.first_name, 
//       lastName: userData.last_name, 
//       emailId: userData.emailId, 
//       password: userData.password 
//     };
    
//     // Add teacher-specific fields
//     if (isTeacher) {
//       payload.subjectAssociated = userData.subject_associated;
//       payload.institute = userData.institute;
//     }
    
//     // Select the correct endpoint
//     const endpoint = isTeacher
//       ? API_CONFIG.ENDPOINTS.AUTH.TEACHER_SIGNUP // Hits /api/teachers
//       : API_CONFIG.ENDPOINTS.AUTH.SIGNUP;        // Hits /api/students
    
//     const response = await apiClient.post(endpoint, payload);

//     if (response.token) {
//       localStorage.setItem('authToken', response.token);
//     }

//     return response;
//   },

//   logout: async (): Promise<void> => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('user');
//   },
// };
import { apiClient, API_CONFIG } from '@/config/api';

/* ===================== TYPES ===================== */

export interface LoginRequest {
  emailId: string;
  password: string;
  role: 'STUDENT' | 'TEACHER';
}

export interface SignupRequest {
  first_name: string;
  last_name: string;
  emailId: string;
  password: string;
  role: 'STUDENT' | 'TEACHER';
  subject_associated?: string;
  institute?: string;
}

/* ===================== SERVICE ===================== */

export const authService = {
  /**
   * LOGIN
   * Backend returns ResponseEntity<Void>
   * So DO NOT expect any response body
   */
  login: async ({ emailId, password, role }: LoginRequest): Promise<boolean> => {
    const payload = { emailId, password };

    const endpoint =
      role === 'TEACHER'
        ? API_CONFIG.ENDPOINTS.AUTH.TEACHER_LOGIN // /api/teachers/login
        : API_CONFIG.ENDPOINTS.AUTH.STUDENT_LOGIN;        // /api/students/login

    await apiClient.post(endpoint, payload); // ✅ no response parsing
    return true;
  },

  /**
   * SIGNUP
   * Backend returns created user (optional body)
   */
  signup: async (userData: SignupRequest): Promise<boolean> => {
    const isTeacher = userData.role === 'TEACHER';

    const payload: any = {
      firstName: userData.first_name,
      lastName: userData.last_name,
      emailId: userData.emailId,
      password: userData.password,
    };

    if (isTeacher) {
      payload.subjectAssociated = userData.subject_associated;
      payload.institute = userData.institute;
    }

    const endpoint =
      isTeacher
        ? API_CONFIG.ENDPOINTS.AUTH.TEACHER_SIGNUP
        : API_CONFIG.ENDPOINTS.AUTH.STUDENT_SIGNUP;

    await apiClient.post(endpoint, payload);
    return true;
  },

  logout: (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};
