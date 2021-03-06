import React, { useEffect, useMemo, useState } from 'react';
import axios from '../../axiosInstance';
import { Helmet } from 'react-helmet-async';
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

import Payment from '@material-ui/icons/Payment';
import Update from '@material-ui/icons/Update';

import posta from '../../assets/posta.png';

import useDataFetch from '../../hooks/useDataFetch';

import OrderFinished from './OrderFinished';
import OverviewProductCard from '../../components/OverviewProductCard';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import PriceBreakdown from '../../components/PriceBreakdown';

import { clearCart } from '../../actions/cart';
import { setProduct } from '../../actions/products';

const useStyles = makeStyles((theme) => ({
  containerRoot: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  paperRoot: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(3),
  },
  paperContent: {
    paddingLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

const Overview = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const breakpoint = useMediaQuery((theme) => theme.breakpoints.down('xs'));

  const { state: locationState } = location;

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const [orderFinished, setOrderFinished] = useState(false);
  const [orderError, setOrderError] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const delivery = useDataFetch({
    method: 'GET',
    url: '/contact',
  })?.delivery;

  useEffect(() => {
    if (locationState && locationState.fromCheckout) {
      let state = { ...locationState };
      delete state.fromCheckout;
      history.replace({ ...location, state });
    }
  }, []);

  const memoizedLocationState = useMemo(() => {
    return locationState?.fromCheckout;
  }, []);

  if (!memoizedLocationState) {
    return <Redirect to="/zavrsetak-kupnje" />;
  }

  if (orderFinished) {
    return <OrderFinished orderError={orderError} paymentInfo={paymentInfo} />;
  }

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>Pregled Narudžbe</title>
      </Helmet>
      <PageBreadcrumbs titles={['Završetak kupnje', 'Pregled narudžbe']} />
      <div className={classes.containerRoot}>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <Typography className="mr-2" color="textPrimary" variant="h5">
              1
            </Typography>
            <Typography color="textPrimary" variant="body1">
              Podaci
            </Typography>
          </div>
          <Grid container direction="column" spacing={3}>
            <Grid item xs={12} container spacing={breakpoint ? 0 : 3}>
              <Grid item sm={6} xs={12}>
                <Grid item xs={12}>
                  <Paper className={classes.paperRoot}>
                    <Typography variant="button">
                      <strong>Račun</strong>
                    </Typography>
                    <Typography
                      className={classes.paperContent}
                      color="textSecondary"
                    >
                      {`${user.details.name} ${user.details.surname}`}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paperRoot}>
                    <Typography variant="button">
                      <strong>Adresa dostave</strong>
                    </Typography>
                    <ul className={classes.paperContent}>
                      <li>
                        <Typography color="textSecondary">
                          {user.purchase?.delivery_info?.company}
                        </Typography>
                      </li>
                      <li>
                        <Typography color="textSecondary">
                          {`${user.purchase?.delivery_info?.name} ${user.purchase?.delivery_info?.surname}`}
                        </Typography>
                      </li>
                      <li>
                        <Typography color="textSecondary">
                          {`${user.purchase?.delivery_info?.email}`}
                        </Typography>
                      </li>
                      <li>
                        <Typography color="textSecondary">
                          {user.purchase?.delivery_info?.address}
                        </Typography>
                      </li>
                      <li>
                        <Typography color="textSecondary">
                          {`${user.purchase?.delivery_info?.postal_code} ${user.purchase?.delivery_info?.city}`}
                        </Typography>
                      </li>
                      <li>
                        <Typography color="textSecondary">
                          {user.purchase?.delivery_info?.phone}
                        </Typography>
                      </li>
                    </ul>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paperRoot}>
                    <Typography variant="button">
                      <strong>Adresa računa</strong>
                    </Typography>
                    <ul className={classes.paperContent}>
                      <li>
                        <Typography color="textSecondary">
                          {user.purchase?.bill_info?.company}
                        </Typography>
                      </li>
                      <li>
                        <Typography color="textSecondary">
                          {`${user.purchase?.bill_info?.name} ${user.purchase?.bill_info?.surname}`}
                        </Typography>
                      </li>
                      <li>
                        <Typography color="textSecondary">
                          {`${user.purchase?.delivery_info?.email}`}
                        </Typography>
                      </li>
                      <li>
                        <Typography color="textSecondary">
                          {user.purchase?.bill_info?.address}
                        </Typography>
                      </li>
                      <li>
                        <Typography color="textSecondary">
                          {`${user.purchase?.bill_info?.postal_code} ${user.purchase?.bill_info?.city}`}
                        </Typography>
                      </li>
                      <li>
                        <Typography color="textSecondary">
                          {user.purchase?.bill_info?.phone}
                        </Typography>
                      </li>
                    </ul>
                  </Paper>
                </Grid>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Grid item xs={12}>
                  <Paper className={classes.paperRoot}>
                    <Typography variant="button">
                      <strong>Način plaćanja</strong>
                    </Typography>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      className={classes.paperContent}
                    >
                      <Payment className="mr-2" fontSize="large" />
                      <Typography color="textSecondary">
                        Plaćanje transakcijskim računom
                      </Typography>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paperRoot}>
                    <Typography variant="button">
                      <strong>Odgoda plaćanja</strong>
                    </Typography>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      className={classes.paperContent}
                    >
                      <Update className="mr-2" fontSize="large" />
                      <Typography color="textSecondary">
                        {`Odgoda plaćanja na ${user.details.payment_deadline} dana`}
                      </Typography>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paperRoot}>
                    <Typography variant="button">
                      <strong>Način isporuke</strong>
                    </Typography>
                    <div className="mt-3">
                      <img src={posta} alt="" />
                    </div>
                  </Paper>
                </Grid>
                {user.purchase?.note && (
                  <Grid item xs={12}>
                    <Paper className={classes.paperRoot}>
                      <Typography variant="button">
                        <strong>Komentar</strong>
                      </Typography>
                      <Typography
                        className={classes.paperContent}
                        color="textSecondary"
                      >
                        {user.purchase?.note}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <Typography className="mr-2" color="textPrimary" variant="h5">
              2
            </Typography>
            <Typography color="textPrimary" variant="body1">
              Narudžba
            </Typography>
          </div>
          <Grid container spacing={2} className="mb-4">
            {cart.map((product) => {
              return (
                <Grid item md={12} sm={4} xs={12} key={product.id}>
                  <OverviewProductCard
                    onClick={() => dispatch(setProduct(product))}
                    product={product}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <PriceBreakdown cart={cart} delivery={delivery} />
          <Button
            //Maybe Refactor To useReducer (?)
            onClick={() => {
              setLoading(true);
              const cartProducts = cart.map((product) => {
                return {
                  ...product,
                  price: +product.price,
                  deal_price: +product.deal_price,
                };
              });
              axios
                .post('/auth/orders', {
                  cart: cartProducts,
                  delivery_info: user.purchase.delivery_info,
                  bill_info: user.purchase.bill_info,
                  note: user.purchase?.note || '',
                })
                .then(() =>
                  axios.get('/contact').then((res) => {
                    setOrderFinished(true);
                    setPaymentInfo(res.data);
                    dispatch(clearCart());
                    setLoading(false);
                  })
                )
                .catch(() => {
                  setOrderError(true);
                  setOrderFinished(true);
                  setLoading(false);
                });
            }}
            color="primary"
            variant="contained"
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            Potvrdi
          </Button>
        </div>
      </div>
    </>
  );
};

export default Overview;
