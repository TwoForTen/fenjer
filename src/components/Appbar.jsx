import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import { useCheckAuth } from '../hooks/useAuth';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Menu from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
  appBarRoot: {
    zIndex: theme.zIndex.drawer + 1,
    minHeight: '64px',
  },
  rightToolbar: {
    marginLeft: 'auto',
  },
  navItem: {
    margin: `0 ${theme.spacing(2)}px`,
  },
  mobileDrawer: {
    paddingTop: theme.spacing(6),
  },
}));

const Appbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const { token, name } = user;
  const checkAuth = useCheckAuth();
  const desktopAppbar = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const [showDrawer, setShowDrawer] = useState(false);

  const handleCloseDrawer = () => {
    setShowDrawer((prevState) => !prevState);
  };

  const activeStyle = {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  };

  useEffect(() => {
    const isLoggedIn = Boolean(JSON.parse(localStorage.getItem('_jwt')));

    if (isLoggedIn) {
      checkAuth();
    }
  }, []);

  const MOBILE_DRAWER = (
    <>
      <Drawer
        anchor="top"
        className={classes.mobileDrawer}
        open={showDrawer}
        onClose={handleCloseDrawer}
      >
        <List onClick={handleCloseDrawer}>
          <ListItem>
            <NavLink
              activeStyle={activeStyle}
              isActive={() => {
                if (location.pathname === '/') return true;
                else return false;
              }}
              to="/"
              className={classes.navItem}
            >
              <Typography>Početna</Typography>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              activeStyle={activeStyle}
              to="/novosti"
              className={classes.navItem}
            >
              <Typography>Novosti</Typography>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              activeStyle={activeStyle}
              to="/proizvodi"
              className={classes.navItem}
            >
              <Typography>Proizvodi</Typography>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              activeStyle={activeStyle}
              to="/showroom"
              className={classes.navItem}
            >
              <Typography>Showroom</Typography>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              activeStyle={activeStyle}
              to="/kontakt"
              className={classes.navItem}
            >
              <Typography>Kontakt</Typography>
            </NavLink>
          </ListItem>
        </List>
      </Drawer>
    </>
  );

  return (
    <>
      <AppBar className={classes.appBarRoot} color="default">
        <Container>
          <Toolbar disableGutters>
            <Typography variant="h6">Dekoracije Mavrin</Typography>
            <Toolbar disableGutters className={classes.rightToolbar}>
              {desktopAppbar && (
                <>
                  <NavLink
                    activeStyle={activeStyle}
                    isActive={() => {
                      if (location.pathname === '/') return true;
                      else return false;
                    }}
                    to="/"
                    className={classes.navItem}
                  >
                    <Typography>Početna</Typography>
                  </NavLink>
                  <NavLink
                    activeStyle={activeStyle}
                    to="/novosti"
                    className={classes.navItem}
                  >
                    <Typography>Novosti</Typography>
                  </NavLink>
                  <NavLink
                    activeStyle={activeStyle}
                    to="/proizvodi"
                    className={classes.navItem}
                  >
                    <Typography>Proizvodi</Typography>
                  </NavLink>
                  <NavLink
                    activeStyle={activeStyle}
                    to="/showroom"
                    className={classes.navItem}
                  >
                    <Typography>Showroom</Typography>
                  </NavLink>
                  <NavLink
                    activeStyle={activeStyle}
                    to="/kontakt"
                    className={classes.navItem}
                  >
                    <Typography>Kontakt</Typography>
                  </NavLink>
                </>
              )}
              <IconButton className="ml-3 mr-3">
                <Badge
                  className={classes.badge}
                  // TODO When implementing global state set badgeContent to integer
                  // Sad je string jer ako je int 0 badge se nece pojavit
                  badgeContent={'0'}
                  color="primary"
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
              {!desktopAppbar ? (
                <IconButton
                  onClick={() => setShowDrawer((prevState) => !prevState)}
                  size="medium"
                >
                  <Menu style={{ fontSize: '28px' }} />
                </IconButton>
              ) : token ? (
                <NavLink to="/korisnicki-racun">
                  <Button color="primary" variant="contained">
                    {name ? (
                      name
                    ) : (
                      <CircularProgress color="inherit" size={20} />
                    )}
                  </Button>
                </NavLink>
              ) : (
                <NavLink to="/prijava">
                  <Button variant="contained" color="primary">
                    Prijavi se
                  </Button>
                </NavLink>
              )}
            </Toolbar>
          </Toolbar>
        </Container>
      </AppBar>
      {!desktopAppbar && MOBILE_DRAWER}
    </>
  );
};

export default Appbar;
