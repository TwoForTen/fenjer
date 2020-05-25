import React, { useState } from 'react';
import _ from 'lodash';
import axios from '../axiosInstance';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import SwipeableViews from 'react-swipeable-views';

import CircularProgress from '@material-ui/core/CircularProgress';
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
  divider: {
    margin: `${theme.spacing(4)}px ${theme.spacing(10)}px`,
  },
}));

const UserAccount = () => {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [userOrders, setUserOrders] = useState();

  const user = useSelector((state) => state.user.userDetails);

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>Korisnički Račun</title>
      </Helmet>

      <PageBreadcrumbs titles={['Korisnički račun']} showBorder={false} />
      <div className={classes.fullWidthBorder}>
        <Container className={classes.tabs} maxWidth="xs">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Moji podaci" />
            <Tab
              label="Moje narudžbe"
              onClick={() => {
                if (!userOrders) {
                  axios
                    .get('/auth/orders')
                    .then((res) => setUserOrders(res.data))
                    .catch((err) => {
                      throw err;
                    });
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
            <Container maxWidth="md" style={{ textAlign: !user && 'center' }}>
              {!_.isEmpty(user) ? (
                <UserDetails user={user} />
              ) : (
                <CircularProgress className="mt-4" />
              )}
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
