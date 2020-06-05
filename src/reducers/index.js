import { cartReducer } from './cartReducer';
import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { snackbarReducer } from './snackbarReducer';
import { orderReducer } from './orderReducer';
import { productReducer } from './productReducer';

const reducers = combineReducers({
  cart: cartReducer,
  user: userReducer,
  snackbar: snackbarReducer,
  order: orderReducer,
  product: productReducer,
});

export default reducers;
