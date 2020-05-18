import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';

import { addToCart, addQuantity } from '../actions/cart';
import { decrementProduct, incrementProduct } from '../actions/products';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(3)}px 0`,
    padding: theme.spacing(6),
  },
  image: {
    height: '100%',
    maxHeight: '600px',
    width: 'auto',
  },
  statusContainer: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    borderTop: `1px solid ${theme.palette.primary.main}`,
    padding: `${theme.spacing(4)}px 0`,
    margin: `${theme.spacing(4)}px 0`,
  },
  buttonGroup: {
    backgroundColor: theme.palette.background.default + '!important',
    borderColor: '#000 !important',
    color: theme.palette.text.primary + '!important',
  },
}));

const isInStock = (in_stock) => {
  switch (Boolean(in_stock)) {
    case true:
      return 'Proizvod raspoloživ';
    case false:
      return 'Proizvod nije raspoloživ';
    default:
      break;
  }
};

const Product = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);

  const {
    selectedProduct: { name, color, quantity, code, description, in_stock, id },
  } = product;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <Paper className={classes.root}>
      <Grid container spacing={6}>
        <Grid item md={6} xs={12}>
          <Typography variant="h2" color="textPrimary" className="mb-3">
            <strong>{name}</strong>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <strong>Šifra:</strong> {code}
          </Typography>

          <div className={classes.statusContainer}>
            <Typography variant="caption">Stanje</Typography>
            <div style={{ display: 'flex', marginTop: '5px' }}>
              {Boolean(in_stock) ? (
                <CheckCircle style={{ color: '#3CBC51' }} className="mr-1" />
              ) : (
                <Cancel style={{ color: 'red' }} className="mr-1" />
              )}
              <Typography variant="body1">{isInStock(in_stock)}</Typography>
            </div>
          </div>

          <Typography>Pakiranje: {quantity} KOM</Typography>
          <div
            style={{
              display: 'flex',
              margin: '32px 0',
            }}
          >
            <ButtonGroup
              style={{ border: '1px solid #000', marginRight: '32px' }}
              disableElevation
              variant="contained"
            >
              <Button
                disabled={product.quantity <= 1}
                onClick={() => dispatch(decrementProduct())}
                className={classes.buttonGroup}
              >
                -
              </Button>
              <Button disabled className={classes.buttonGroup}>
                {product.quantity}
              </Button>
              <Button
                onClick={() => dispatch(incrementProduct())}
                className={classes.buttonGroup}
              >
                +
              </Button>
            </ButtonGroup>
            <Button
              style={{ minWidth: '100px' }}
              color="primary"
              disabled={!in_stock}
              onClick={() => {
                const duplicateProduct = cart.find(
                  (prod) => prod.selectedProduct.id === id
                );
                if (!duplicateProduct) {
                  dispatch(addToCart(product));
                } else {
                  dispatch(addQuantity(product));
                }
              }}
              variant="contained"
            >
              Kupi
            </Button>
          </div>
          <Typography variant="h5">Opis</Typography>
          <Typography className="mt-3 mb-3">{description}</Typography>
          <Typography>
            <strong>Boja:</strong> {color}
          </Typography>
        </Grid>

        <Grid item xs={6} align="center">
          <img
            className={classes.image}
            src="http://localhost:8000/images/flower.png"
            alt="product_image"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Product;
