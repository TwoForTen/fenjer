import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

import PageBreadcrumbs from '../components/PageBreadcrumbs';

const useStyles = makeStyles((theme) => ({
  tabsBorder: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(2),
  },
  tabs: {
    marginTop: `-${theme.spacing(6)}px`,
  },
}));

const Registracija = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <>
      <PageBreadcrumbs titles={['Registracija']} showBorder={false} />
      <div className={classes.tabsBorder}>
        <Container maxWidth="sm">
          <Tabs
            className={classes.tabs}
            indicatorColor="primary"
            onChange={handleChange}
            textColor="primary"
            value={value}
            variant="fullWidth"
          >
            <Tab label="Postojeći korisnici" />
            <Tab label="Novi korisnici" />
          </Tabs>
          <SwipeableViews
            axis={'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <h1>1</h1>
            <h2>2</h2>
          </SwipeableViews>
        </Container>
      </div>
    </>
  );
};

export default Registracija;
