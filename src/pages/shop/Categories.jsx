import React from 'react';
import { Helmet } from 'react-helmet-async';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import CategoryCard from '../../components/CategoryCard';
import Filters from '../../components/Filters';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';

import useDataFetch from '../../hooks/useDataFetch';

const useStyles = makeStyles((theme) => ({
  centeredContainer: {
    textAlign: 'center',
    margin: theme.spacing(6),
  },
}));

const Proizvodi = () => {
  const classes = useStyles();

  const categories = useDataFetch({
    url: '/categories',
    method: 'GET',
  });

  if (categories?.data?.length < 1) {
    return (
      <div className={classes.centeredContainer}>
        <Typography variant="body1" color="textPrimary">
          Nije pronađen ni jedan proizvod
        </Typography>
      </div>
    );
  }

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>Proizvodi</title>
      </Helmet>

      <PageBreadcrumbs titles={['Proizvodi']} />
      <div style={{ textAlign: !categories && 'center' }}>
        <Filters showView={false} />
        {categories?.data ? (
          categories?.data.map((category) => {
            return <CategoryCard category={category} key={category.id} />;
          })
        ) : (
          <CircularProgress className="mt-4" />
        )}
      </div>
    </>
  );
};

export default Proizvodi;
