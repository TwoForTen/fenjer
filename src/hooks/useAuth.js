import axios from '../axiosInstance';
import { useDispatch } from 'react-redux';

import { userLogout, storeUser } from '../actions/auth';

export const useCheckAuth = () => {
  const dispatch = useDispatch();
  return () =>
    axios
      .get('/auth/user')
      .then((res) => {
        console.log(res.data);
        dispatch(storeUser(res.data));
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          dispatch(userLogout());
        }
      });
};
