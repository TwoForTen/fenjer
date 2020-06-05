import { CLEAR_ORDER, SHOW_ORDER } from '../actions/actionTypes';

export const orderReducer = (state = [], action) => {
  switch (action.type) {
    case CLEAR_ORDER:
      return [];
    case SHOW_ORDER:
      return action.payload;
    default:
      return state;
  }
};
