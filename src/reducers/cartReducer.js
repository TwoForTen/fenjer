import { ADD_TO_CART } from '../actions/actionTypes';

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};
