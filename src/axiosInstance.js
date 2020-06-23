import axios from 'axios';

const defaultOptions = {
  baseURL: process.env.REACT_APP_PROD_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'api-key': process.env.REACT_APP_API_KEY,
  },
};

const axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('_jwt'));
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default axiosInstance;
