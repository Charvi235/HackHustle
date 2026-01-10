
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










