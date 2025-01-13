import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const user = localStorage.getItem('user');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Skip role-based URL modification for auth endpoints
    if (config.url.startsWith('/api/auth/')) {
      return config;
    }

    // For profile endpoint, use the appropriate role-based route
    if (config.url === 'profile' || config.url === '/profile') {
      const userRole = role || (user ? JSON.parse(user).role : null);
      if (userRole === 'admin') {
        config.url = '/api/admin/profile';
      } else if (userRole === 'student') {
        config.url = '/api/students/profile';
      } else if (userRole === 'instructor') {
        config.url = '/api/instructors/profile';
      } else {
        // If no role is found, redirect to login
        window.location.href = '/auth/login';
        throw new Error('No role found');
      }
      return config;
    }

    // For other endpoints, prefix with role-based path
    if (!config.url.startsWith('/api/')) {
      const userRole = role || (user ? JSON.parse(user).role : null);
      if (userRole === 'admin') {
        config.url = `/api/admin/${config.url}`;
      } else if (userRole === 'student') {
        config.url = `/api/students/${config.url}`;
      } else if (userRole === 'instructor') {
        config.url = `/api/instructors/${config.url}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios Interceptor Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      method: error.config?.method
    });

    // Handle specific error scenarios
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      
      // Redirect to login
      if (!window.location.pathname.startsWith('/auth/')) {
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
