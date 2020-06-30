import React from 'react';
import { Helmet } from 'react-helmet-async';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import useDataFetch from '../hooks/useDataFetch';

import PageBreadcrumbs from '../components/PageBreadcrumbs';

const useStyles = makeStyles((theme) => ({
  paragraphContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4) + theme.spacing(1.5),
    },
  },
}));

const Terms = () => {
  const classes = useStyles();

  const data = useDataFetch({
    url: '/sales-conditions',
    method: 'GET',
  });

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>Uvjeti Prodaje</title>
      </Helmet>
      <PageBreadcrumbs titles={['Uvjeti prodaje']} />
      {data ? (
        <div className={classes.paragraphContainer}>
          <Typography color="textPrimary" variant="body1">
            {data.sales_conditions}
          </Typography>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }} className="mt-4 mb-4">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default Terms;
