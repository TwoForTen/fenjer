import { ADD_TO_CART, ADD_QUANTITY, REMOVE_FROM_CART } from './actionTypes';

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

export const removeFromCart = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};
