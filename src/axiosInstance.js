import axios from 'axios';

const token = JSON.parse(localStorage.getItem('_jwt'));

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

export default axiosInstance;
