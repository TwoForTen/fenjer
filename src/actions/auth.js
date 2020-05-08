import { USER_LOGIN, USER_LOGOUT, STORE_USER } from './actionTypes';

export const storeUser = (payload) => {
  return {
    type: STORE_USER,
    payload,
  };
};
export const userLogin = (payload) => {
  return {
    type: USER_LOGIN,
    payload,
  };
};
export const userLogout = () => {
  localStorage.removeItem('_jwt');
  return {
    type: USER_LOGOUT,
  };
};
