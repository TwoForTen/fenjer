import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttonsContainer: {
    display: 'flex',
    margin: `${theme.spacing(6)}px 0`,
  },
  buttonLink: {
    margin: `0 ${theme.spacing(2)}px`,
    minWidth: '160px',
  },
}));

const NavButtons = () => {
  const classes = useStyles();
  return (
    <div className={classes.buttonsContainer}>
      <Link to="/" className={classes.buttonLink}>
        <Button fullWidth variant="contained" color="primary">
          Početna
        </Button>
      </Link>
      <Link to="/kontakt" className={classes.buttonLink}>
        <Button fullWidth variant="contained" color="secondary">
          Kontakt
        </Button>
      </Link>
    </div>
  );
};

export default NavButtons;
