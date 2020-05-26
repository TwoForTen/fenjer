import {
  USER_LOGIN,
  USER_LOGOUT,
  STORE_USER,
  STORE_PURCHASE,
  CLEAR_PURCHASE,
} from './actionTypes';

export const storeUser = (payload) => {
  return {
    type: STORE_USER,
    payload,
  };
};
export const storePurchase = (payload) => {
  return {
    type: STORE_PURCHASE,
    payload,
  };
};
export const clearPurchase = () => {
  return {
    type: CLEAR_PURCHASE,
  };
};

export const userLogin = (payload) => {
  return {
    type: USER_LOGIN,
    payload,
  };
};
export const userLogout = (history) => {
  history && history.replace('/');
  localStorage.removeItem('_jwt');
  localStorage.removeItem('expiration_date');
  return {
    type: USER_LOGOUT,
  };
};
