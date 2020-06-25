import {
  DECREMENT_PRODUCT,
  INCREMENT_PRODUCT,
  SET_PRODUCT,
  SET_PRODUCT_QUANTITY,
} from '../actions/actionTypes';

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...action.payload,
        ordered_quantity: 1,
      };

    case SET_PRODUCT_QUANTITY:
      return {
        ...state,
        ordered_quantity: action.payload,
      };
    case INCREMENT_PRODUCT:
      return {
        ...state,
        ordered_quantity: state.ordered_quantity + 1,
      };
    case DECREMENT_PRODUCT:
      return {
        ...state,
        ordered_quantity: state.ordered_quantity - 1,
      };
    default:
      return state;
  }
};
