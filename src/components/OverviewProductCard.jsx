import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
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

const CartProductCard = ({ product }) => {
  const classes = useStyles();

  const {
    selectedProduct: { name, img, code, price },
    quantity,
  } = product;

  return (
    <Card className={classes.card}>
      <Grid container spacing={2}>
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
          <Typography
            className={classes.smallText}
            color="textSecondary"
            variant="caption"
            component="small"
          >
            KOLIČINA
          </Typography>
          <Typography variant="subtitle1">{quantity} kom</Typography>
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
