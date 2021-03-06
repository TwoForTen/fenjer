import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

import delivery_icon from '../../assets/delivery_icon.svg';

import CartProductCard from '../../components/CartProductCard';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import PriceBreakdown from '../../components/PriceBreakdown';

import { setProduct } from '../../actions/products';

import useDataFetch from '../../hooks/useDataFetch';

import { format as formatCurrency } from '../../helpers/formatCurrency';

const useStyles = makeStyles(() => ({
  detailsRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  deliveryContainer: { display: 'inline-flex', flexDirection: 'column' },
}));

const Cart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const breakpoint = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const deliveryFee =
    useDataFetch({
      method: 'GET',
      url: '/contact',
    }) || {};

  const { delivery, delivery_free_above } = deliveryFee;

  if (!cart || cart?.length < 1) {
    return (
      <>
        <PageBreadcrumbs titles={['Košarica']} />
        <Typography
          color="textPrimary"
          variant="h6"
          className="mt-4 mb-4"
          align="center"
        >
          Trenutno nemate proizvoda u košarici.
        </Typography>
        <Link to="/proizvodi">
          <Button
            variant="contained"
            color="primary"
            className="mb-4"
            style={{ margin: '0 auto', display: 'block' }}
          >
            Proizvodi
          </Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>Košarica</title>
      </Helmet>
      <PageBreadcrumbs titles={['Košarica']} />
      <Grid container spacing={2} className="mt-4 mb-4">
        {cart.map((product, index) => {
          return (
            <Grid item md={12} sm={4} xs={12} key={product.id}>
              <CartProductCard
                onClick={() => dispatch(setProduct(product))}
                product={product}
                index={index}
              />
            </Grid>
          );
        })}
      </Grid>
      <div className={classes.detailsRoot}>
        <div>
          <PriceBreakdown cart={cart} delivery={delivery} />
          <div className={classes.deliveryContainer}>
            <Typography color="textPrimary">Način preuzimanja robe:</Typography>
            <div
              style={{ display: 'flex', alignItems: 'center' }}
              className="mt-2"
            >
              <img
                src={delivery_icon}
                alt="delivery_icon"
                style={{ width: '60px' }}
                className="mr-2 mb-2"
              />
              <Typography color="textPrimary">
                <strong>Dostava</strong>
              </Typography>
            </div>
            <Typography variant="caption" color="textSecondary">
              {delivery_free_above ? (
                <>
                  Dostava besplatna iznad{' '}
                  <strong>{formatCurrency(delivery_free_above)}</strong>
                </>
              ) : (
                <Skeleton animation="wave" />
              )}
            </Typography>
          </div>
        </div>
        <Link to="/zavrsetak-kupnje">
          <Button
            variant="contained"
            className={`mb-4 ${breakpoint ? 'mt-4' : ''}`}
            color="primary"
          >
            Potvrdi narudžbu
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Cart;
