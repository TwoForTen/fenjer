import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { snackbarReducer } from './snackbarReducer';

const reducers = combineReducers({
  user: userReducer,
  snackbar: snackbarReducer,
});

export default reducers;
