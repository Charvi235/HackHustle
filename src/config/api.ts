// API Configuration for Spring Boot Backend
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      SIGNUP: '/auth/signup',
      LOGOUT: '/auth/logout',
      VERIFY: '/auth/verify',
    },
    STUDENTS: {
      PROFILE: '/students/profile',
      UPDATE_PROFILE: '/students/profile/update',
      POINTS: '/students/points',
    },
    FACULTY: {
      PROFILE: '/faculty/profile',
      UPDATE_PROFILE: '/faculty/profile/update',
      DOUBTS: '/faculty/doubts',
      ANSWER_DOUBT: '/faculty/doubts/answer',
    },
    DOUBTS: {
      CREATE: '/doubts/create',
      LIST: '/doubts/list',
      MARK_READ: '/doubts/mark-read',
      RATE: '/doubts/rate',
    },
    QUESTIONS: {
      LIST: '/questions/list',
      BY_SUBJECT: '/questions/subject',
      DETAIL: '/questions/detail',
    },
  },
};

// Create Axios-like fetch wrapper with common configuration
export const apiClient = {
  get: async (endpoint: string, options = {}) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      ...options,
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    
    return response.json();
  },

  post: async (endpoint: string, data: any, options = {}) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
      ...options,
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    
    return response.json();
  },

  put: async (endpoint: string, data: any, options = {}) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
      ...options,
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    
    return response.json();
  },

  delete: async (endpoint: string, options = {}) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      ...options,
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    
    return response.json();
  },
};
