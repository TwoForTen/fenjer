import { cartReducer } from './cartReducer';
import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { snackbarReducer } from './snackbarReducer';
import { productReducer } from './productReducer';

const reducers = combineReducers({
  cart: cartReducer,
  user: userReducer,
  snackbar: snackbarReducer,
  product: productReducer,
});

export default reducers;
