import { SET_PRODUCT } from './actionTypes';

export const setProduct = (payload) => {
  return {
    type: SET_PRODUCT,
    payload,
  };
};
