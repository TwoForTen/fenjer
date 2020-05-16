import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import sanitiseName from '../helpers/sanitiseName';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: `${theme.spacing(4)}px 0`,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageContainer: {
    height: '140px',
    width: '200px',
    objectFit: 'contain',
    overflow: 'hidden',
  },
  smallText: {
    fontSize: '10px',
  },
  categoryImage: {
    height: 'auto',
    width: '100%',
  },
}));

const ProductCard = ({ type, productName }) => {
  const location = useLocation();
  const classes = useStyles();

  const { name, img, code, price, in_stock } = type;

  return (
    <Link to={`${location.pathname}/${sanitiseName(productName)}`}>
      <Card className={classes.card}>
        <div className={classes.imageContainer}>
          <img
            className={classes.categoryImage}
            src="http://localhost:8000/images/product_flower.png"
            alt="product_image"
          />
        </div>
        <div>
          <Typography
            className={classes.smallText}
            color="textSecondary"
            variant="caption"
            component="small"
          >
            NAZIV PROIZVODA
          </Typography>
          <Typography variant="subtitle1">{name}</Typography>
        </div>
        <div>
          <Typography
            className={classes.smallText}
            color="textSecondary"
            variant="caption"
            component="small"
          >
            ŠIFRA
          </Typography>
          <Typography variant="subtitle1">{code}</Typography>
        </div>
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
        {Boolean(in_stock) ? (
          <CheckCircle style={{ color: '#3CBC51' }} />
        ) : (
          <Cancel style={{ color: '#C62E3D' }} />
        )}
      </Card>
    </Link>
  );
};

export default ProductCard;
