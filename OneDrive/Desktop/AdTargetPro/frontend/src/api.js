import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8081/api',
});

// Add request interceptor for JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login if implemented
    }
    return Promise.reject(error);
  }
);

// Auth functions
export const register = async (userData) => {
  return api.post('/auth/register', userData);
};

export const login = async (credentials) => {
  return api.post('/auth/authenticate', credentials);
};

export default api;