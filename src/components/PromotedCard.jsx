import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    // margin: `${theme.spacing(4)}px 0`,
    padding: theme.spacing(4),
    // maxWidth: '250px',
  },
  cardContent: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'scale-down',
  },
  cardImage: {
    height: 'auto',
    width: '100%',
  },
}));

const PromotedCard = ({ promotedProduct }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <img
          className={classes.cardImage}
          src="http://localhost:8000/images/flower.png"
        />
      </CardContent>
    </Card>
  );
};

export default PromotedCard;
