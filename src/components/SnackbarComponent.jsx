import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { closeSnackbar, exitSnackbar } from '../actions/snackbar';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarComponent = () => {
  const dispatch = useDispatch();
  const snackbarState = useSelector((state) => state.snackbar);
  const { open, message, severity } = snackbarState;

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeSnackbar());
  };

  const handleExit = () => {
    dispatch(exitSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      onExited={handleExit}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
