import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import 'moment/locale/hr';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ArrowBack from '@material-ui/icons/ArrowBack';

import OverviewProductCard from '../../components/OverviewProductCard';

import { clearOrder } from '../../actions/order';
import { setProduct } from '../../actions/products';

const useStyles = makeStyles((theme) => ({
  overviewView: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
  },
}));

const OrderOverview = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);

  const { cart } = order;

  return (
    <div className="mt-4">
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}
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
      <div className={classes.overviewView}>
        {cart.map((product) => {
          return (
            <OverviewProductCard
              onClick={() => dispatch(setProduct(product))}
              key={product.id}
              product={product}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OrderOverview;
