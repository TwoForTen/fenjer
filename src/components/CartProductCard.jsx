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

import Close from '@material-ui/icons/Close';

import { removeFromCart } from '../actions/cart';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: `${theme.spacing(4)}px 0`,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  gridLink: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  imageContainer: {
    height: '140px',
    width: '200px',
    objectFit: 'contain',
    overflow: 'hidden',
    margin: 'auto',
  },
  smallText: {
    fontSize: '10px',
  },
  cartProductImage: {
    height: 'auto',
    width: '100%',
  },
  gridItem: {
    margin: 'auto 0',
    overflow: 'hidden',
  },
}));

const CartProductCard = ({ product, onClick, index }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    selectedProduct: { name, img, code, price, product_id },
    quantity,
  } = product;

  return (
    <Card className={classes.card}>
      <IconButton
        onClick={() => dispatch(removeFromCart(index))}
        className="ml-2"
      >
        <Close fontSize="small" color="disabled" />
      </IconButton>
      <Grid
        container
        className={classes.gridLink}
        spacing={2}
        onClick={() => {
          onClick();
          axios
            .get(`/products/${product_id}`)
            .then((res) =>
              history.push(
                `/proizvodi/${res.data.category.slug}/${res.data.slug}`
              )
            );
        }}
      >
        <Grid item xs={2} className={classes.gridItem}>
          <div className={classes.imageContainer}>
            <img
              className={classes.cartProductImage}
              src="http://localhost:8000/images/product_flower.png"
              alt="product_image"
            />
          </div>
        </Grid>
        <Grid item xs={2} className={classes.gridItem}>
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
        <Grid item xs={2} className={classes.gridItem}>
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
        <Grid item xs={2} className={classes.gridItem}>
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
        <Grid item xs={2} className={classes.gridItem}>
          <ProductQuantitySelector cartItem={index} />
        </Grid>
        <Grid item xs={2} className={classes.gridItem}>
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
            }).format(price * quantity)}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartProductCard;
