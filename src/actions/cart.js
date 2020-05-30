import {
  ADD_TO_CART,
  ADD_QUANTITY,
  CLEAR_CART,
  REMOVE_FROM_CART,
  SET_CART_QUANTITY,
  INCREMENT_CART_QUANTITY,
  DECREMENT_CART_QUANTITY,
} from './actionTypes';

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

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const removeFromCart = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};

export const setCartQuantity = (payload) => {
  return {
    type: SET_CART_QUANTITY,
    payload,
  };
};
export const incrementCartQuantity = (payload) => {
  return {
    type: INCREMENT_CART_QUANTITY,
    payload,
  };
};
export const decrementCartQuantity = (payload) => {
  return {
    type: DECREMENT_CART_QUANTITY,
    payload,
  };
};
