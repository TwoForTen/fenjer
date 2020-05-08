import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    // margin: `${theme.spacing(4)}px 0`,
    padding: theme.spacing(4),
  },
}));

const ShowroomCard = ({ promotedProduct }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>{promotedProduct.name}</CardContent>
    </Card>
  );
};

export default ShowroomCard;
