import {
  DECREMENT_PRODUCT,
  INCREMENT_PRODUCT,
  SET_PRODUCT,
} from './actionTypes';

export const setProduct = (payload) => {
  console.log(payload);
  return {
    type: SET_PRODUCT,
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
