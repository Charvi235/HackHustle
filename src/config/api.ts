

export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080',
  ENDPOINTS: {
    AUTH: {
      STUDENT_LOGIN: '/api/students/login',
      STUDENT_SIGNUP: '/api/students',
      TEACHER_LOGIN: '/api/teachers/login',
      TEACHER_SIGNUP: '/api/teachers',
    },
    STUDENTS: {
      PROFILE: '/api/students/profile',
      UPDATE_PROFILE: '/api/students/profile/update',
      POINTS: '/api/students/points',
    },
    TEACHERS: {
      PROFILE: '/api/teachers/profile',
      UPDATE_PROFILE: '/api/teachers/profile/update',
    },
  },
};

export const apiClient = {
  login: async (endpoint: string, data: any): Promise<boolean> => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) throw new Error('Invalid password');
      if (response.status === 404) throw new Error('User not found');
      throw new Error(`HTTP ${response.status}`);
    }

    return true;
  },

  get: async <T>(endpoint: string): Promise<T> => {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(errorText || `HTTP ${response.status}`);
    }

    const text = await response.text();

    if (!text) {
      return [] as T; 
    }

    return JSON.parse(text);
  },


  post: async <T>(endpoint: string, data: any): Promise<T | null> => {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(errorText || `HTTP ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  },

  /* ======================
     PUT
     ====================== */
  put: async <T>(endpoint: string, data: any): Promise<T | null> => {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(errorText || `HTTP ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  },

  delete: async (endpoint: string): Promise<boolean> => {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(errorText || `HTTP ${response.status}`);
    }

    return true;
  },
};
