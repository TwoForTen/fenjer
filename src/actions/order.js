import { CLEAR_ORDER, SHOW_ORDER } from './actionTypes';

export const clearOrder = () => {
  return {
    type: CLEAR_ORDER,
  };
};

export const showOrder = (payload) => {
  return {
    type: SHOW_ORDER,
    payload,
  };
};
