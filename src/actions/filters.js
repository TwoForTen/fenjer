import { PRODUCTS_VIEW, SET_QUERY, CLEAR_QUERY } from './actionTypes';

export const productsView = (payload) => {
  return {
    type: PRODUCTS_VIEW,
    payload,
  };
};
export const setQuery = (payload) => {
  return {
    type: SET_QUERY,
    payload,
  };
};

export const clearQuery = () => {
  return {
    type: CLEAR_QUERY,
  };
};
