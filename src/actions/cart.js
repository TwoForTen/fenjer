import { ADD_TO_CART } from './actionTypes';

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};
