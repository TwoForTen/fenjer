import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PromotedCard from './PromotedCard';

import useDataFetch from '../hooks/useDataFetch';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(6),
  },
}));

const Showroom = () => {
  const classes = useStyles();

  const promotedProducts =
    useDataFetch({
      url: '/product-types',
      method: 'GET',
    })?.filter((promotedProduct) => promotedProduct.promoted) || [];

  if (promotedProducts.length > 0) {
    return (
      <>
        <Typography
          className={classes.title}
          color="textPrimary"
          variant="h4"
          component="h3"
        >
          Izdvojeni Artikli
        </Typography>
        <Grid container spacing={4} className="mt-3 mb-3">
          {promotedProducts.map((product) => {
            return (
              <Grid item xs={6} sm={4} md={3} key={product.id}>
                <PromotedCard promotedProduct={product} />
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }

  return null;
};

export default Showroom;