import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { useHistory } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { useDispatch } from 'react-redux';

import { userLogout } from '../actions/auth';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

import PageBreadcrumbs from '../components/PageBreadcrumbs';

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

  // useEffect(() => {
  //   axios
  //     .post('/auth/orders', {
  //       user_id: 2,
  //       cart: ['cart bokte'],
  //       price: 102,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios.get('/auth/orders').then((res) => {
  //     console.log(res);
  //   });
  // }, []);

  return (
    <>
      <PageBreadcrumbs titles={['Korisnički račun']} showBorder={false} />
      <div className={classes.fullWidthBorder}>
        <Container className={classes.tabs} maxWidth="sm">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Moji podaci" />
            <Tab label="Moje narudžbe" />
          </Tabs>
          <SwipeableViews
            axis="x"
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <div>
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
            </div>
            <h1>Second</h1>
          </SwipeableViews>
        </Container>
      </div>
    </>
  );
};

export default UserAccount;
