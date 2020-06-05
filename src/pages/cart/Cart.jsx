import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import LocalShipping from '@material-ui/icons/LocalShipping';

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
          className="mt-4"
          align="center"
        >
          Trenutno nemate proizvoda u košarici.
        </Typography>
      </>
    );
  }

  return (
    <>
      <PageBreadcrumbs titles={['Košarica']} />
      {cart.map((product, index) => {
        return (
          <CartProductCard
            key={product.id}
            onClick={() => dispatch(setProduct(product))}
            product={product}
            index={index}
          />
        );
      })}
      {/* ADD SKELETON LOADING */}
      <div className={classes.detailsRoot}>
        {!_.isEmpty(deliveryFee) && (
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
                <LocalShipping
                  fontSize="large"
                  color="action"
                  className="mr-2"
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
        )}
        <Link to="/zavrsetak-kupnje">
          <Button variant="contained" className="mb-4" color="primary">
            Potvrdi narudžbu
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Cart;
