
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

// Mock student credentials
const MOCK_STUDENT_EMAIL = 'student@gmail.com';
const MOCK_STUDENT_PASSWORD = 'Student@123';

export const authService = {
  /**
   * LOGIN
   * Backend returns ResponseEntity<Void>
   * Includes mock student login bypass
   */
  login: async ({ emailId, password, role }: LoginRequest): Promise<{ success: boolean; user?: any }> => {
    // Mock Student Login bypass
    if (role === 'STUDENT' && emailId === MOCK_STUDENT_EMAIL && password === MOCK_STUDENT_PASSWORD) {
      const mockUser = {
        student_id: 'mock-student-001',
        first_name: 'Charvi',
        last_name: 'Singh',
        emailId: MOCK_STUDENT_EMAIL,
        role: 'STUDENT' as const,
        points: 1250,
        stats: {
          battleWins: 12,
          questionsSolved: 150,
        },
      };
      return { success: true, user: mockUser };
    }

    const payload = { emailId, password };

    const endpoint =
      role === 'TEACHER'
        ? API_CONFIG.ENDPOINTS.AUTH.TEACHER_LOGIN
        : API_CONFIG.ENDPOINTS.AUTH.STUDENT_LOGIN;

    await apiClient.post(endpoint, payload);
    return { success: true };
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










