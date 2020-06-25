import {
  PRODUCTS_VIEW,
  SET_QUERY,
  CLEAR_QUERY,
  SORT,
} from '../actions/actionTypes';

const initialState = {
  queries: {
    name: '',
    code: '',
    barcode: '',
  },
  product_view: 'list',
  sort_by: 'Nazivu (A-Z)',
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_VIEW:
      return {
        ...state,
        product_view: action.payload === 'list' ? 'list' : 'grid',
      };
    case SET_QUERY:
      return {
        ...state,
        queries: {
          ...state.queries,
          [action.payload.filterType]: action.payload.filterValue,
        },
      };
    case CLEAR_QUERY:
      return {
        ...state,
        sort_by: initialState.sort_by,
        queries: {},
      };
    case SORT:
      return {
        ...state,
        sort_by: action.payload,
      };
    default:
      return state;
  }
};
