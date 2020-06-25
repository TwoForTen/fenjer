import { PRODUCTS_VIEW, SET_QUERY } from './actionTypes';

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
