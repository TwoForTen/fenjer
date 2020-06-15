import { PRODUCTS_VIEW } from './actionTypes';

export const productsView = (payload) => {
  return {
    type: PRODUCTS_VIEW,
    payload,
  };
};
