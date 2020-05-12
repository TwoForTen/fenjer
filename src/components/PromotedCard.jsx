import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(4),
    position: 'relative',
    '&:hover > $cardMask': {
      opacity: '1',
      cursor: 'pointer',
    },
  },
  cardContent: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'scale-down',
  },
  imageContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const { name } = promotedProduct;

  return (
    <>
      <Card className={classes.card}>
        <div className={classes.cardMask}>
          <Typography>{name}</Typography>
        </div>
        <CardContent className={classes.cardContent}>
          <div className={classes.imageContainer}>
            <img
              style={{ display: imageLoaded ? 'block' : 'none' }}
              onLoad={() => setImageLoaded(true)}
              className={classes.cardImage}
              src="http://localhost:8000/images/flower.png"
            />
            {!imageLoaded && <CircularProgress />}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PromotedCard;
