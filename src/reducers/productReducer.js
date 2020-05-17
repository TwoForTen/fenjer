import { SET_PRODUCT } from '../actions/actionTypes';

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return action.payload;
    default:
      return state;
  }
};
