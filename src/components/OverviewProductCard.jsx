import React from 'react';
import axios from '../axiosInstance';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import constrictName from '../helpers/constrictName';
import { format as formatCurrency } from '../helpers/formatCurrency';

import { setLoading } from '../actions/loading';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    alignItems: 'center',
    minHeight: '140px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'max-content',
      height: '100%',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  imageContainer: {
    height: '140px',
    width: 'auto',
    alignSelf: 'center',
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  smallText: {
    fontSize: '10px',
  },
  cartProductImage: {
    height: '100%',
    width: 'auto',
    borderRadius: theme.shape.borderRadius,
  },
  gridItem: {
    margin: 'auto 0',
    overflow: 'hidden',
  },
}));

const CartProductCard = ({ product, onClick }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    name,
    img,
    code,
    price,
    ordered_quantity,
    product_id,
    slug,
    deal_price,
  } = product;

  return (
    <Card
      className={classes.card}
      onClick={() => {
        onClick();
        dispatch(setLoading());
        axios.get(`/products/${product_id || slug}`).then((res) => {
          dispatch(setLoading());
          history.push(`/proizvodi/${res.data.category.slug}/${res.data.slug}`);
        });
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={2} xs={12} className={classes.gridItem}>
          <div className={classes.imageContainer}>
            <img
              className={classes.cartProductImage}
              src={process.env.REACT_APP_PROD_URL + img}
              alt="product_image"
            />
          </div>
        </Grid>
        <Grid item md={2} xs={12} className={classes.gridItem}>
          <Typography
            className={classes.smallText}
            color="textSecondary"
            variant="caption"
            component="small"
          >
            NAZIV PROIZVODA
          </Typography>
          <Typography variant="subtitle1">{constrictName(name)}</Typography>
        </Grid>
        <Grid item md={2} xs={12} className={classes.gridItem}>
          <Typography
            className={classes.smallText}
            color="textSecondary"
            variant="caption"
            component="small"
          >
            ŠIFRA
          </Typography>
          <Typography variant="subtitle1">{code}</Typography>
        </Grid>
        <Grid item md={2} xs={12} className={classes.gridItem}>
          <div>
            <Typography
              className={classes.smallText}
              color="textSecondary"
              variant="caption"
              component="small"
            >
              CIJENA
            </Typography>
            <Typography variant="subtitle1">
              {formatCurrency(!!deal_price ? deal_price : price)}
            </Typography>
          </div>
        </Grid>
        <Grid item md={2} xs={12} className={classes.gridItem}>
          <Typography
            className={classes.smallText}
            color="textSecondary"
            variant="caption"
            component="small"
          >
            KOLIČINA
          </Typography>
          <Typography variant="subtitle1">{ordered_quantity} kom</Typography>
        </Grid>
        <Grid item md={2} xs={12} className={classes.gridItem}>
          <Typography
            className={classes.smallText}
            color="textSecondary"
            variant="caption"
            component="small"
          >
            UKUPNA CIJENA
          </Typography>
          <Typography variant="subtitle1">
            {formatCurrency(
              !!deal_price
                ? deal_price * ordered_quantity
                : price * ordered_quantity
            )}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartProductCard;
