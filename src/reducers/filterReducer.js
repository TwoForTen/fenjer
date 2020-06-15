import { PRODUCTS_VIEW } from '../actions/actionTypes';

const initialState = {
  product_view: 'list',
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_VIEW:
      return {
        ...state,
        product_view: action.payload === 'list' ? 'list' : 'grid',
      };
    default:
      return state;
  }
};
