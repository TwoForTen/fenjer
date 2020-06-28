import { cartReducer } from './cartReducer';
import { combineReducers } from 'redux';
import { filterReducer } from './filterReducer';
import { userReducer } from './userReducer';
import { snackbarReducer } from './snackbarReducer';
import { orderReducer } from './orderReducer';
import { productReducer } from './productReducer';
import { loadingReducer } from './loadingReducer';

const reducers = combineReducers({
  cart: cartReducer,
  filter: filterReducer,
  user: userReducer,
  snackbar: snackbarReducer,
  order: orderReducer,
  product: productReducer,
  loading: loadingReducer,
});

export default reducers;
