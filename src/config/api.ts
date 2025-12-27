// // //// API Configuration for Spring Boot Backend
// // // export const API_CONFIG = {
// // //   BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
// // //   ENDPOINTS: {
// // //     AUTH: {
// // //       LOGIN: '/students/login',
// // //       SIGNUP: '/auth/signup',
// // //       LOGOUT: '/auth/logout',
// // //       VERIFY: '/auth/verify',
// // //     },
// // //     STUDENTS: {
// // //       PROFILE: '/students/profile',
// // //       UPDATE_PROFILE: '/students/profile/update',
// // //       POINTS: '/students/points',
// // //     },
// // //     FACULTY: {
// // //       PROFILE: '/faculty/profile',
// // //       UPDATE_PROFILE: '/faculty/profile/update',
// // //       DOUBTS: '/faculty/doubts',
// // //       ANSWER_DOUBT: '/faculty/doubts/answer',
// // //     },
// // //     DOUBTS: {
// // //       CREATE: '/doubts/create',
// // //       LIST: '/doubts/list',
// // //       MARK_READ: '/doubts/mark-read',
// // //       RATE: '/doubts/rate',
// // //     },
// // //     QUESTIONS: {
// // //       LIST: '/questions/list',
// // //       BY_SUBJECT: '/questions/subject',
// // //       DETAIL: '/questions/detail',
// // //     },
// // //   },
// // // };

// // // // Create Axios-like fetch wrapper with common configuration
// // // export const apiClient = {
// // //   get: async (endpoint: string, options = {}) => {
// // //     const token = localStorage.getItem('authToken');
// // //     const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
// // //       method: 'GET',
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //         ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
// // //       },
// // //       ...options,
// // //     });
    
// // //     if (!response.ok) {
// // //       const error = await response.json().catch(() => ({ message: 'Request failed' }));
// // //       throw new Error(error.message || `HTTP ${response.status}`);
// // //     }
    
// // //     return response.json();
// // //   },

// // //   post: async (endpoint: string, data: any, options = {}) => {
// // //     const token = localStorage.getItem('authToken');
// // //     const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
// // //       method: 'POST',
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //         ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
// // //       },
// // //       body: JSON.stringify(data),
// // //       ...options,
// // //     });
    
// // //     if (!response.ok) {
// // //       const error = await response.json().catch(() => ({ message: 'Request failed' }));
// // //       throw new Error(error.message || `HTTP ${response.status}`);
// // //     }
    
// // //     return response.json();
// // //   },

// // //   put: async (endpoint: string, data: any, options = {}) => {
// // //     const token = localStorage.getItem('authToken');
// // //     const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
// // //       method: 'PUT',
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //         ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
// // //       },
// // //       body: JSON.stringify(data),
// // //       ...options,
// // //     });
    
// // //     if (!response.ok) {
// // //       const error = await response.json().catch(() => ({ message: 'Request failed' }));
// // //       throw new Error(error.message || `HTTP ${response.status}`);
// // //     }
    
// // //     return response.json();
// // //   },

// // //   delete: async (endpoint: string, options = {}) => {
// // //     const token = localStorage.getItem('authToken');
// // //     const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
// // //       method: 'DELETE',
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //         ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
// // //       },
// // //       ...options,
// // //     });
    
// // //     if (!response.ok) {
// // //       const error = await response.json().catch(() => ({ message: 'Request failed' }));
// // //       throw new Error(error.message || `HTTP ${response.status}`);
// // //     }
    
// // //     return response.json();
// // //   },
// // // };















// // // // api.ts
// // // export const API_CONFIG = {
// // //   BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080', // no /api here
// // //   ENDPOINTS: {
// // //     AUTH: {
// // //   LOGIN: '/api/students/login',
// // //   SIGNUP: '/api/students',
// // //   FACULTY_LOGIN: '/api/teachers/login',
// // //   FACULTY_SIGNUP:'/api/teachers'

// // // },
// // //     STUDENTS: {
// // //       PROFILE: '/api/students/profile',
// // //       UPDATE_PROFILE: '/api/students/profile/update',
// // //       POINTS: '/api/students/points',
// // //     },
// // //     FACULTY: {
// // //       PROFILE: '/api/teachers/profile',
// // //       UPDATE_PROFILE: '/api/faculty/profile/update',
// // //     },
// // //   },
// // // };

// // // export const apiClient = {
// // //   post: async (endpoint: string, data: any) => {
// // //     const token = localStorage.getItem('authToken');
// // //     const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
// // //       method: 'POST',
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //         ...(token ? { Authorization: `Bearer ${token}` } : {}),
// // //       },
// // //       body: JSON.stringify(data),
// // //     });

// // //     // if (!response.ok) {
// // //     //   const error = await response.json().catch(() => ({ message: 'Request failed' }));
// // //     //   throw new Error(error.message || `HTTP ${response.status}`);
// // //     // }

// // //     // return response.json();

// // //     if (!response.ok) {
// // //   const error = await response.text().catch(() => 'Request failed');
// // //   let errorMessage = 'Request failed';
// // //   try { errorMessage = JSON.parse(error).message; } catch {}
// // //   throw new Error(errorMessage || `HTTP ${response.status}`);
// // // }

// // // // For empty body, avoid calling response.json()
// // // const text = await response.text();
// // // return text ? JSON.parse(text) : {};
// // //   },

// // //   get: async (endpoint: string) => {
// // //     const token = localStorage.getItem('authToken');
// // //     const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
// // //       method: 'GET',
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //         ...(token ? { Authorization: `Bearer ${token}` } : {}),
// // //       },
// // //     });

// // //     if (!response.ok) {
// // //       const error = await response.json().catch(() => ({ message: 'Request failed' }));
// // //       throw new Error(error.message || `HTTP ${response.status}`);
// // //     }

// // //     return response.json();
// // //   },
// // // };
// //   // api.ts
// //   export const API_CONFIG = {
// //     BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080', // no /api here
// //     ENDPOINTS: {
// //       AUTH: {
// //         LOGIN: '/api/students/login',          // student login
// //         SIGNUP: '/api/students',               // student signup
// //         FACULTY_LOGIN: '/api/teachers/login',  // teacher login
// //         FACULTY_SIGNUP: '/api/teachers',       // teacher signup
// //       },
// //       STUDENTS: {
// //         PROFILE: '/api/students/profile',
// //         UPDATE_PROFILE: '/api/students/profile/update',
// //         POINTS: '/api/students/points',
// //       },
// //       FACULTY: {
// //         PROFILE: '/api/teachers/profile',
// //         UPDATE_PROFILE: '/api/teachers/profile/update', // fixed typo
// //       },
// //     },
// //   };

// //   export const apiClient = {
// //     post: async (endpoint: string, data: any) => {
// //       const token = localStorage.getItem('authToken');
// //       const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
// //         },
// //         body: JSON.stringify(data),
// //       });

// //       if (!response.ok) {
// //         const error = await response.text().catch(() => 'Request failed');
// //         let errorMessage = 'Request failed';
// //         try { errorMessage = JSON.parse(error).message; } catch {}
// //         throw new Error(errorMessage || `HTTP ${response.status}`);
// //       }

// //       // For empty body, return null
// //       const text = await response.text();
// //       return text ? JSON.parse(text) : null;
// //     },

// //     get: async (endpoint: string) => {
// //       const token = localStorage.getItem('authToken');
// //       const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
// //         },
// //       });

// //       if (!response.ok) {
// //         const error = await response.json().catch(() => ({ message: 'Request failed' }));
// //         throw new Error(error.message || `HTTP ${response.status}`);
// //       }

// //       return response.json();
// //     },

// //     put: async (endpoint: string, data: any) => {
// //       const token = localStorage.getItem('authToken');
// //       const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
// //         },
// //         body: JSON.stringify(data),
// //       });

// //       if (!response.ok) {
// //         const error = await response.text().catch(() => 'Request failed');
// //         let errorMessage = 'Request failed';
// //         try { errorMessage = JSON.parse(error).message; } catch {}
// //         throw new Error(errorMessage || `HTTP ${response.status}`);
// //       }

// //       const text = await response.text();
// //       return text ? JSON.parse(text) : null;
// //     },

// //     delete: async (endpoint: string) => {
// //       const token = localStorage.getItem('authToken');
// //       const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
// //         method: 'DELETE',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
// //         },
// //       });

// //       if (!response.ok) {
// //         const error = await response.text().catch(() => 'Request failed');
// //         let errorMessage = 'Request failed';
// //         try { errorMessage = JSON.parse(error).message; } catch {}
// //         throw new Error(errorMessage || `HTTP ${response.status}`);
// //       }

// //       const text = await response.text();
// //       return text ? JSON.parse(text) : null;
// //     },
// //   };

// // api.ts
// export const API_CONFIG = {
//   BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
//   ENDPOINTS: {
//     AUTH: {
//       LOGIN: '/api/students/login',           // student login
//       SIGNUP: '/api/students',                // student signup
//       TEACHER_LOGIN: '/api/teachers/login',  // teacher login
//       TEACHER_SIGNUP: '/api/teachers',       // teacher signup
//     },
//     STUDENTS: {
//       PROFILE: '/api/students/profile',
//       UPDATE_PROFILE: '/api/students/profile/update',
//       POINTS: '/api/students/points',
//     },
//     TEACHERS: {  // changed from FACULTY
//       PROFILE: '/api/teachers/profile',
//       UPDATE_PROFILE: '/api/teachers/profile/update',
//     },
//   },
// };

// export const apiClient = {
//   post: async (endpoint: string, data: any) => {
//     const token = localStorage.getItem('authToken');
//     const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       const error = await response.text().catch(() => 'Request failed');
//       let errorMessage = 'Request failed';
//       try { errorMessage = JSON.parse(error).message; } catch {}
//       throw new Error(errorMessage || `HTTP ${response.status}`);
//     }

//     const text = await response.text();
//     return text ? JSON.parse(text) : null;
//   },

//   get: async (endpoint: string) => {
//     const token = localStorage.getItem('authToken');
//     const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//     });

//     if (!response.ok) {
//       const error = await response.json().catch(() => ({ message: 'Request failed' }));
//       throw new Error(error.message || `HTTP ${response.status}`);
//     }

//     return response.json();
//   },

//   put: async (endpoint: string, data: any) => {
//     const token = localStorage.getItem('authToken');
//     const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       const error = await response.text().catch(() => 'Request failed');
//       let errorMessage = 'Request failed';
//       try { errorMessage = JSON.parse(error).message; } catch {}
//       throw new Error(errorMessage || `HTTP ${response.status}`);
//     }

//     const text = await response.text();
//     return text ? JSON.parse(text) : null;
//   },

//   delete: async (endpoint: string) => {
//     const token = localStorage.getItem('authToken');
//     const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//     });

//     if (!response.ok) {
//       const error = await response.text().catch(() => 'Request failed');
//       let errorMessage = 'Request failed';
//       try { errorMessage = JSON.parse(error).message; } catch {}
//       throw new Error(errorMessage || `HTTP ${response.status}`);
//     }

//     const text = await response.text();
//     return text ? JSON.parse(text) : null;
//   },
// };



// api.ts

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
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
  // 🔐 LOGIN (VOID RESPONSE HANDLER)
  login: async (endpoint: string, data: any): Promise<boolean> => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid password');
      }
      if (response.status === 404) {
        throw new Error('User not found');
      }
      throw new Error(`HTTP ${response.status}`);
    }

    // backend returns ResponseEntity<Void>
    return true;
  },

  // 📥 GET
  get: async (endpoint: string) => {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  },

  // 📤 POST (NON-LOGIN)
  post: async (endpoint: string, data: any) => {
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
      const error = await response.text().catch(() => 'Request failed');
      throw new Error(error || `HTTP ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  },

  // ✏️ PUT
  put: async (endpoint: string, data: any) => {
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
      const error = await response.text().catch(() => 'Request failed');
      throw new Error(error || `HTTP ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  },

  // ❌ DELETE
  delete: async (endpoint: string) => {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      const error = await response.text().catch(() => 'Request failed');
      throw new Error(error || `HTTP ${response.status}`);
    }

    return true;
  },
};
