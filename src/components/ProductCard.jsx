import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';

import sanitiseName from '../helpers/sanitiseName';

import plant from '../assets/plant.jpg';

const gridView = (theme) => {
  return {
    maxWidth: '250px',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  };
};

const useStyles = makeStyles((theme) => ({
  link: {
    [theme.breakpoints.down('md')]: {
      maxWidth: '250px',
    },
  },
  card: ({ view }) => {
    return {
      position: 'relative',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      minHeight: '140px',
      height: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      ...(view === 'grid' && gridView(theme)),
      [theme.breakpoints.down('sm')]: gridView(theme),
      '&:hover': {
        cursor: 'pointer',
      },
    };
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

const useGridViewContent = (view) => {
  switch (view) {
    case 'grid':
      return 12;
    default:
      return 3;
  }
};

const constrictName = (name) => {
  const MAX_LENGTH = 7;

  if (name.split(' ').length > MAX_LENGTH) {
    return name.split(' ').slice(0, MAX_LENGTH).join(' ') + '...';
  }

  return name;
};

const ProductCard = ({ type, productName, onClick, categoryName }) => {
  const view = useSelector((state) => state.filter.product_view);

  const history = useHistory();
  const classes = useStyles({ view });
  const gridViewContent = useGridViewContent(view);

  const breakpoint = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const { name, img, code, price, in_stock, category_name } = type;

  return (
    <Card
      className={classes.card}
      onClick={() => {
        onClick();
        history.push(
          `/proizvodi/${sanitiseName(
            category_name ? category_name : categoryName
          )}/${productName}`
        );
      }}
    >
      <Grid
        container
        align="left"
        spacing={breakpoint || view === 'grid' ? 2 : 4}
      >
        <Grid item xs={12} md={gridViewContent} className={classes.gridItem}>
          <div className={classes.imageContainer}>
            <img
              className={classes.categoryImage}
              // src={process.env.REACT_APP_PROD_URL + img}
              src={plant}
              alt="product_image"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={gridViewContent} className={classes.gridItem}>
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
        <Grid item xs={12} md={gridViewContent} className={classes.gridItem}>
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
        <Grid
          item
          xs={12}
          md={view === 'grid' ? 12 : 2}
          className={classes.gridItem}
        >
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
            breakpoint || view === 'grid'
              ? { position: 'absolute', right: '0', top: '0' }
              : {}
          }
          item
          xs={12}
          md={view === 'grid' ? 12 : 1}
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
