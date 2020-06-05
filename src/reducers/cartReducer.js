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
        (product) => product.id === action.payload.id
      );
      modifiedState[duplicateProduct] = {
        ...modifiedState[duplicateProduct],
        ordered_quantity:
          modifiedState[duplicateProduct].ordered_quantity +
          action.payload.ordered_quantity,
      };
      return modifiedState;
    case REMOVE_FROM_CART:
      modifiedState.splice(action.payload, 1);
      localStorage.setItem('cart', JSON.stringify(modifiedState));
      return modifiedState;
    case SET_CART_QUANTITY:
      modifiedState[action.payload.index] = {
        ...modifiedState[action.payload.index],
        ordered_quantity: action.payload.ordered_quantity,
      };
      return modifiedState;
    case INCREMENT_CART_QUANTITY:
      modifiedState[action.payload.index] = {
        ...modifiedState[action.payload.index],
        ordered_quantity:
          modifiedState[action.payload.index].ordered_quantity + 1,
      };
      return modifiedState;
    case DECREMENT_CART_QUANTITY:
      modifiedState[action.payload.index] = {
        ...modifiedState[action.payload.index],
        ordered_quantity:
          modifiedState[action.payload.index].ordered_quantity - 1,
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
