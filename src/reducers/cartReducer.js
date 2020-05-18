import { ADD_TO_CART, ADD_QUANTITY } from '../actions/actionTypes';

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    case ADD_QUANTITY:
      let modifiedState = [...state];
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
    default:
      return state;
  }
};
