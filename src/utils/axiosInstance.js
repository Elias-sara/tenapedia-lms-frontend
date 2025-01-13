import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Check if we're running on the client-side
const isClient = typeof window !== 'undefined';

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
    (config) => {
        console.log('Axios Request Config:', {
            url: config.url,
            method: config.method,
            baseURL: config.baseURL
        });

        // Only attempt to get token on client-side
        if (isClient) {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        // Ensure student routes are prefixed correctly
        if (!config.url.startsWith('/')) {
            config.url = `/api/students/${config.url}`;
        }

        console.log('Final Axios Request Config:', {
            url: config.url,
            headers: config.headers
        });

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Axios Response:', {
            status: response.status,
            data: response.data
        });
        return response;
    },
    (error) => {
        console.error('Axios Interceptor Error:', {
            status: error.response?.status,
            message: error.response?.data?.message || error.message,
            url: error.config?.url,
            method: error.config?.method,
            fullError: error
        });

        if (error.response) {
            // Handle specific error cases
            switch (error.response.status) {
                case 401:
                    // Handle unauthorized access
                    if (isClient) {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }
                    break;
                case 403:
                    // Handle forbidden access
                    console.error('Forbidden access:', error.response.data);
                    break;
                case 404:
                    // Handle not found
                    console.error('Resource not found:', error.response.data);
                    break;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
