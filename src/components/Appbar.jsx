import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rightToolbar: {
    marginLeft: 'auto',
  },
  navItem: {
    margin: `0 ${theme.spacing(2)}px`,
  },
}));

const Appbar = () => {
  const classes = useStyles();
  return (
    <AppBar color="default">
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6">Dekoracije Mavrin</Typography>
          <Toolbar disableGutters className={classes.rightToolbar}>
            <Link to="/novosti" className={classes.navItem}>
              <Typography>Novosti</Typography>
            </Link>
            •
            <Link to="/proizvodi" className={classes.navItem}>
              <Typography>Proizvodi</Typography>
            </Link>
            •
            <Link to="/kontakt" className={classes.navItem}>
              <Typography>Kontakt</Typography>
            </Link>
            <IconButton className="ml-3">
              <ShoppingCart />
            </IconButton>
            <Link to="/prijava">
              <Button variant="contained" color="primary">
                Prijavi se
              </Button>
            </Link>
          </Toolbar>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Appbar;
