import { SHOW_SNACKBAR, CLOSE_SNACKBAR, EXIT_SNACKBAR } from './actionTypes';

export const showSnackbar = (payload) => {
  return {
    type: SHOW_SNACKBAR,
    payload,
  };
};

export const closeSnackbar = () => {
  return {
    type: CLOSE_SNACKBAR,
  };
};

export const exitSnackbar = () => {
  return {
    type: EXIT_SNACKBAR,
  };
};
