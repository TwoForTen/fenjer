import {
  DECREMENT_PRODUCT,
  INCREMENT_PRODUCT,
  SET_PRODUCT,
  SET_PRODUCT_QUANTITY,
} from './actionTypes';

export const setProduct = (payload) => {
  return {
    type: SET_PRODUCT,
    payload,
  };
};

export const setProductQuantity = (payload) => {
  return {
    type: SET_PRODUCT_QUANTITY,
    payload,
  };
};

export const incrementProduct = () => {
  return {
    type: INCREMENT_PRODUCT,
  };
};
export const decrementProduct = () => {
  return {
    type: DECREMENT_PRODUCT,
  };
};
