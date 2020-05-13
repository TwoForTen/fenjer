import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import SwipeableViews from 'react-swipeable-views';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { userLogout } from '../actions/auth';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

import Orders from '../components/Orders';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import UserDetails from '../components/UserDetails';

const useStyles = makeStyles((theme) => ({
  fullWidthBorder: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  tabs: {
    marginTop: `-${theme.spacing(6)}px`,
  },
  root: {
    padding: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
  divider: {
    margin: `${theme.spacing(4)}px ${theme.spacing(10)}px`,
  },
}));

const UserAccount = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [value, setValue] = useState(0);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [user, setUser] = useState();
  const [userOrders, setUserOrders] = useState();

  useEffect(() => {
    axios.get('/auth/user').then((res) => setUser(res.data));
  }, []);

  return (
    <>
      <PageBreadcrumbs titles={['Korisnički račun']} showBorder={false} />
      <div className={classes.fullWidthBorder}>
        <Container className={classes.tabs} maxWidth="xs">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Moji podaci" />
            <Tab
              label="Moje narudžbe"
              onClick={() => {
                if (!userOrders) {
                  axios
                    .get('/auth/orders')
                    .then((res) => setUserOrders(res.data));
                }
              }}
            />
          </Tabs>
        </Container>
        <Container>
          <SwipeableViews
            axis="x"
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <Container maxWidth="md">
              {user && <UserDetails user={user} />}
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  axios.post('/auth/logout').then(() => {
                    dispatch(userLogout());
                    history.replace('/');
                  });
                }}
              >
                Odjava
              </Button>
            </Container>
            <Container>
              <Orders userOrders={userOrders} />
            </Container>
          </SwipeableViews>
        </Container>
      </div>
    </>
  );
};

export default UserAccount;
