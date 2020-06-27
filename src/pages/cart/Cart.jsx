import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

import delivery_icon from '../../assets/delivery_icon.svg';

import CartProductCard from '../../components/CartProductCard';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import PriceBreakdown from '../../components/PriceBreakdown';

import { setProduct } from '../../actions/products';

import useDataFetch from '../../hooks/useDataFetch';

const useStyles = makeStyles((theme) => ({
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
      url: '/owner',
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
      <PageBreadcrumbs titles={['Košarica']} />
      <Grid container spacing={3} className="mt-4 mb-4">
        {cart.map((product, index) => {
          return (
            <Grid item md={12} sm={4} xs={6} key={product.id}>
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
        {!_.isEmpty(deliveryFee) ? (
          <div>
            <PriceBreakdown cart={cart} delivery={delivery} />
            <div className={classes.deliveryContainer}>
              <Typography color="textPrimary">
                Način preuzimanja robe:
              </Typography>
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
                Dostava besplatna iznad{' '}
                <strong>
                  {new Intl.NumberFormat('hr-HR', {
                    style: 'currency',
                    currency: 'HRK',
                  }).format(delivery_free_above)}
                </strong>
              </Typography>
            </div>
          </div>
        ) : (
          <CircularProgress />
        )}
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
