import React, { useEffect } from 'react';
import axios from '../axiosInstance';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { userLogout } from '../actions/auth';

const withAuthErrorHandler = (BaseComponent) => (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const resInterceptor = axios.interceptors.response.use(
    (response) => {
      console.log('response');
      return response;
    },
    (error) => {
      console.log(error);
      if (error?.response?.status === 401) {
        dispatch(userLogout(history));
      }
      throw error;
    }
  );

  useEffect(() => {
    return () => {
      axios.interceptors.response.eject(resInterceptor);
    };
  }, []);
  return <BaseComponent {...props} />;
};

export default withAuthErrorHandler;
