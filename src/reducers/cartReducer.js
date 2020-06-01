import {
  ADD_TO_CART,
  ADD_QUANTITY,
  CLEAR_CART,
  REMOVE_FROM_CART,
  SET_CART_QUANTITY,
  INCREMENT_CART_QUANTITY,
  DECREMENT_CART_QUANTITY,
} from '../actions/actionTypes';

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

export const cartReducer = (state = initialState, action) => {
  let modifiedState = [...state];
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    case ADD_QUANTITY:
      const duplicateProduct = state.findIndex(
        (product) =>
          product.selectedProduct.id === action.payload.selectedProduct.id
      );
      modifiedState[duplicateProduct] = {
        selectedProduct: modifiedState[duplicateProduct].selectedProduct,
        quantity:
          modifiedState[duplicateProduct].quantity + action.payload.quantity,
      };
      return modifiedState;
    case REMOVE_FROM_CART:
      modifiedState.splice(action.payload, 1);
      localStorage.setItem('cart', JSON.stringify(modifiedState));
      return modifiedState;
    case SET_CART_QUANTITY:
      modifiedState[action.payload.index] = {
        selectedProduct: modifiedState[action.payload.index].selectedProduct,
        quantity: action.payload.quantity,
      };
      return modifiedState;
    case INCREMENT_CART_QUANTITY:
      modifiedState[action.payload.index] = {
        selectedProduct: modifiedState[action.payload.index].selectedProduct,
        quantity: modifiedState[action.payload.index].quantity + 1,
      };
      return modifiedState;
    case DECREMENT_CART_QUANTITY:
      modifiedState[action.payload.index] = {
        selectedProduct: modifiedState[action.payload.index].selectedProduct,
        quantity: modifiedState[action.payload.index].quantity - 1,
      };
      return modifiedState;
    case CLEAR_CART:
      modifiedState = [];
      localStorage.setItem('cart', JSON.stringify(modifiedState));
      return modifiedState;
    default:
      return state;
  }
};
