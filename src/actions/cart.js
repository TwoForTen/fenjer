import { ADD_TO_CART, ADD_QUANTITY } from './actionTypes';

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

export const addQuantity = (payload) => {
  return {
    type: ADD_QUANTITY,
    payload,
  };
};
