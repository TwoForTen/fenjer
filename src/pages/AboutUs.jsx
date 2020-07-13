import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PageBreadcrumbs from '../components/PageBreadcrumbs';

import useDataFetch from '../hooks/useDataFetch';

const useStyles = makeStyles((theme) => ({
  paragraphContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5),
    },
  },
}));

const AboutUs = () => {
  const classes = useStyles();

  const data = useDataFetch({
    url: '/about-us',
    method: 'GET',
  });

  return (
    <>
      <PageBreadcrumbs titles={['O nama']} />
      {data ? (
        <div className={classes.paragraphContainer}>
          <Typography variant="body1" color="textPrimary">
            {data.about_us}
          </Typography>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress className="mt-4 mb-4" />
        </div>
      )}
    </>
  );
};

export default AboutUs;
