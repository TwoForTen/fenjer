import React, { useState } from 'react';
import axios from '../axiosInstance';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { setProduct } from '../actions/products';

import plant from '../assets/plant.jpg';

const useStyles = makeStyles((theme) => ({
  card: {
    // padding: theme.spacing(4),
    objectFit: 'contain',
    position: 'relative',
    '&:hover > $cardMask': {
      opacity: '1',
      cursor: 'pointer',
    },
  },
  cardContent: {
    width: '100%',
    maxHeight: '100%',
    objectFit: 'scale-down',
  },
  cardImage: {
    height: 'auto',
    width: '100%',
  },
  cardMask: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    top: '0',
    left: '0',
    opacity: '0',
    transition: '300ms',
  },
}));

const PromotedCard = ({ promotedProduct }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [imageLoaded, setImageLoaded] = useState(false);
  const { name, img } = promotedProduct;

  return (
    <>
      <Card
        className={classes.card}
        onClick={() => {
          dispatch(setProduct(promotedProduct));
          axios
            .get(`/products/${promotedProduct.product_id}`)
            .then((res) =>
              history.push(
                `/proizvodi/${res.data.category.slug}/${res.data.slug}`
              )
            );
        }}
      >
        <div className={classes.cardMask}>
          <Typography>{name}</Typography>
        </div>
        <CardContent
          style={{ textAlign: 'center' }}
          className={classes.cardContent}
        >
          <img
            style={{ display: imageLoaded ? 'block' : 'none' }}
            onLoad={() => setImageLoaded(true)}
            className={classes.cardImage}
            alt="Promoted Product"
            src={img || plant}
          />
          {!imageLoaded && <CircularProgress className="mt-4 mr-4 mb-4 ml-4" />}
        </CardContent>
      </Card>
    </>
  );
};

export default PromotedCard;
