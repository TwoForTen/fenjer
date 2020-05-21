import {
  DECREMENT_PRODUCT,
  INCREMENT_PRODUCT,
  SET_PRODUCT,
  SET_PRODUCT_QUANTITY,
} from '../actions/actionTypes';

const initialState = {
  selectedProduct: {},
  quantity: 1,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload,
        quantity: 1,
      };
    case SET_PRODUCT_QUANTITY:
      return {
        ...state,
        quantity: action.payload,
      };
    case INCREMENT_PRODUCT:
      return {
        ...state,
        quantity: state.quantity + 1,
      };
    case DECREMENT_PRODUCT:
      return {
        ...state,
        quantity: state.quantity - 1,
      };
    default:
      return state;
  }
};
