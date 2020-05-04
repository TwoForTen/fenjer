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
    <AppBar color="default" position="fixed">
      <Container>
        <Toolbar>
          <Typography variant="h6">Dekoracije Mavrin</Typography>
          <Toolbar className={classes.rightToolbar}>
            <Link className={classes.navItem}>
              <Typography>Novosti</Typography>
            </Link>
            •
            <Link className={classes.navItem}>
              <Typography>Proizvodi</Typography>
            </Link>
            •
            <Link className={classes.navItem}>
              <Typography>Kontakt</Typography>
            </Link>
            <IconButton className="ml-3">
              <ShoppingCart />
            </IconButton>
            <Button variant="contained" color="primary">
              Prijavi se
            </Button>
          </Toolbar>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Appbar;
