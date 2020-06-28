import React from 'react';
import _ from 'lodash';
import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import 'moment/locale/hr';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import ArrowBack from '@material-ui/icons/ArrowBack';

import OverviewProductCard from '../../components/OverviewProductCard';

import { clearOrder } from '../../actions/order';
import { setProduct } from '../../actions/products';

const OrderOverview = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);

  const { cart } = order;

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>Korisnički Račun</title>
      </Helmet>
      <div className="mt-4">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <IconButton
            onClick={() => dispatch(clearOrder())}
            className="mr-2"
            size="medium"
          >
            <ArrowBack />
          </IconButton>
          <div>
            <Typography variant="h6" color="textPrimary">
              Broj narudžbe: {_.padStart(order.id, '6', '000000')}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              style={{ textTransform: 'capitalize' }}
            >
              {moment(order.created_at).locale('hr').format('DD. MMMM YYYY.')}
            </Typography>
          </div>
        </div>
        <Grid container spacing={3}>
          {cart.map((product) => {
            return (
              <Grid item md={12} sm={4} xs={6} key={product.id}>
                <OverviewProductCard
                  onClick={() => dispatch(setProduct(product))}
                  product={product}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

export default OrderOverview;
