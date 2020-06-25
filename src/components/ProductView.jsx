import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';

import { addToCart, addQuantity } from '../actions/cart';
import { showSnackbar } from '../actions/snackbar';

import ProductQuantitySelector from './ProductQuantitySelector';

import plant from '../assets/plant.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(3)}px 0`,
    padding: theme.spacing(6),
    wordWrap: 'break-word',
    textOverflow: 'ellipsis',
    // hyphens: 'auto',
  },
  image: {
    height: 'auto',
    maxHeight: '600px',
    maxWidth: '100%',
    borderRadius: theme.shape.borderRadius,
  },
  statusContainer: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    borderTop: `1px solid ${theme.palette.primary.main}`,
    padding: `${theme.spacing(4)}px 0`,
    margin: `${theme.spacing(4)}px 0`,
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
    name,
    color,
    quantity,
    code,
    description,
    in_stock,
    id,
    img,
    price,
  } = product;

  return (
    <Paper className={classes.root}>
      <Grid container spacing={10}>
        <Grid item md={6} xs={12}>
          <Typography variant="h4" color="textPrimary" className="mb-3">
            <strong>{name}</strong>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <strong>Šifra:</strong> {code}
          </Typography>

          <div className={classes.statusContainer}>
            <Grid item container spacing={2}>
              <Grid item md={6} xs={12}>
                <Typography variant="caption">Stanje</Typography>
                <div style={{ display: 'flex', marginTop: '5px' }}>
                  {Boolean(in_stock) ? (
                    <CheckCircle
                      style={{ color: '#3CBC51' }}
                      className="mr-1"
                    />
                  ) : (
                    <Cancel style={{ color: 'red' }} className="mr-1" />
                  )}
                  <Typography variant="body1">{isInStock(in_stock)}</Typography>
                </div>
              </Grid>

              <Grid item md={6} xs={12}>
                <Typography variant="caption">Cijena</Typography>
                <Typography style={{ lineHeight: '2' }} variant="body1">
                  {new Intl.NumberFormat('hr-HR', {
                    style: 'currency',
                    currency: 'HRK',
                  }).format(price)}
                </Typography>
              </Grid>
            </Grid>
          </div>

          <Typography>Pakiranje: {quantity} KOM</Typography>
          <div
            style={{
              display: 'flex',
              margin: '32px 0',
            }}
          >
            <ProductQuantitySelector />
            <Button
              style={{ minWidth: '100px', marginLeft: '16px' }}
              color="primary"
              disabled={!in_stock}
              onClick={() => {
                if (product.ordered_quantity > 0) {
                  const duplicateProduct = cart.find((prod) => prod.id === id);
                  if (!duplicateProduct) {
                    dispatch(addToCart([product]));
                    dispatch(
                      showSnackbar({
                        message: 'Proizvod dodan u košaricu.',
                        severity: 'success',
                      })
                    );
                  } else {
                    dispatch(addQuantity(product));
                    dispatch(
                      showSnackbar({
                        message: 'Količina ažurirana.',
                        severity: 'success',
                      })
                    );
                  }
                } else {
                  dispatch(
                    showSnackbar({
                      message: 'Morate dodati barem 1 proizvod.',
                      severity: 'error',
                    })
                  );
                }
              }}
              variant="contained"
            >
              Dodaj u košaricu
            </Button>
          </div>
          <Typography variant="h5">Opis</Typography>
          <Typography className="mt-3 mb-3">{description}</Typography>
          <Typography>
            <strong>Boja:</strong> {color}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} align="center">
          <img
            className={classes.image}
            src={process.env.REACT_APP_PROD_URL + img || plant}
            alt="product_image"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Product;
