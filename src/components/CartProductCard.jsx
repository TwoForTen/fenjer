import React from 'react';
import axios from '../axiosInstance';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ProductQuantitySelector from './ProductQuantitySelector';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Close from '@material-ui/icons/Close';

import { removeFromCart } from '../actions/cart';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    minHeight: '140px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '250px',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  gridLink: {
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
  closeButton: {
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      right: '0',
      top: '0',
    },
  },
}));

const CartProductCard = ({ product, onClick, index }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const breakpoint = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const {
    name,
    img,
    code,
    price,
    ordered_quantity,
    slug,
    product_id,
  } = product;

  return (
    <Card className={classes.card}>
      <IconButton
        onClick={() => dispatch(removeFromCart(index))}
        className={`ml-2 ${classes.closeButton}`}
      >
        <Close fontSize="small" color="disabled" />
      </IconButton>
      <Grid
        container
        className={classes.gridLink}
        spacing={2}
        onClick={() => {
          onClick();
          axios.get(`/products/${product_id || slug}`).then((res) => {
            history.push(
              `/proizvodi/${res.data.category.slug}/${res.data.slug}`
            );
          });
        }}
      >
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
          <Typography variant="subtitle1">{name}</Typography>
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
              {new Intl.NumberFormat('hr-HR', {
                style: 'currency',
                currency: 'HRK',
              }).format(price)}
            </Typography>
          </div>
        </Grid>
        <Grid item md={2} xs={12} className={classes.gridItem}>
          <ProductQuantitySelector cartItem={index} />
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
            {new Intl.NumberFormat('hr-HR', {
              style: 'currency',
              currency: 'HRK',
            }).format(price * ordered_quantity)}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartProductCard;
