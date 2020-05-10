import axios from '../axiosInstance';
import { useDispatch } from 'react-redux';

import { userLogin, userLogout, storeUser } from '../actions/auth';

export const useCheckAuth = () => {
  const dispatch = useDispatch();
  return () =>
    axios
      .get('/auth/me')
      .then((res) => dispatch(storeUser(res.data)))
      .catch((err) => {
        if (err.response?.status === 401) {
          dispatch(userLogout());
        }
      });
};

export const useLogin = () => {
  const dispatch = useDispatch();
  return (email, password) => {
    const body = {
      email,
      password,
    };
    axios.post('http://localhost:8000/api/auth/login', body).then((res) => {
      localStorage.setItem('_jwt', JSON.stringify(res.data.access_token));
      const expiration = new Date(
        new Date().getTime() + res.data.expires_in * 1000
      );
      localStorage.setItem('expiration_date', expiration);
      dispatch(userLogin(res.data));
    });
  };
};
