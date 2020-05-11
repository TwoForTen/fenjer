import {
  SHOW_SNACKBAR,
  CLOSE_SNACKBAR,
  EXIT_SNACKBAR,
} from '../actions/actionTypes';

const initialState = {
  open: false,
  message: '',
  severity: '',
};

export const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        ...state,
        open: true,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        open: false,
      };
    case EXIT_SNACKBAR:
      return {
        open: false,
        message: '',
        severity: '',
      };
    default:
      return state;
  }
};
