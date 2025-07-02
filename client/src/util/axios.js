import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://real-estate-backend-q59x.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // if using cookies for auth
});

// Automatically attach JWT token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token'); // or sessionStorage
    if (token) {
      config.headers.token = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Handle token expiry or auth errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optionally logout or redirect to login
      console.warn('Unauthorized - redirecting to login');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
