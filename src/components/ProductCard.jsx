import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import sanitiseName from '../helpers/sanitiseName';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';

import plant from '../assets/plant.jpg';

const useStyles = makeStyles((theme) => ({
  link: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '250px',
    },
  },
  card: {
    position: 'relative',
    margin: `${theme.spacing(4)}px 0`,
    minHeight: '140px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '250px',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(2),
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
  categoryImage: {
    height: '100%',
    width: 'auto',
    borderRadius: theme.shape.borderRadius,
  },
  gridItem: {
    margin: 'auto 0',
    overflow: 'hidden',
  },
}));

const ProductCard = ({ type, productName, onClick }) => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const breakpoint = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const { name, img, code, price, in_stock } = type;

  return (
    <Card
      className={classes.card}
      onClick={() => {
        onClick();
        history.push(`${location.pathname}/${sanitiseName(productName)}`);
      }}
    >
      <Grid container align={breakpoint ? 'center' : ''} spacing={4}>
        <Grid item xs={12} md={3} className={classes.gridItem}>
          <div className={classes.imageContainer}>
            <img
              className={classes.categoryImage}
              src={plant}
              alt="product_image"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={3} className={classes.gridItem}>
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
        <Grid item xs={12} md={3} className={classes.gridItem}>
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
        <Grid item xs={12} md={2} className={classes.gridItem}>
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
        <Grid
          style={
            breakpoint ? { position: 'absolute', right: '0', top: '0' } : {}
          }
          item
          xs={12}
          md={1}
          className={classes.gridItem}
        >
          {Boolean(in_stock) ? (
            <CheckCircle style={{ color: '#3CBC51' }} />
          ) : (
            <Cancel style={{ color: '#C62E3D' }} />
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProductCard;
