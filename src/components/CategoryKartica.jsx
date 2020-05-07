import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: `${theme.spacing(4)}px 0`,
    padding: theme.spacing(4),
  },
  name: {
    textAlign: 'right',
  },
}));

const NovostKartica = ({ category }) => {
  const location = useLocation();
  const classes = useStyles();

  const { name, img } = category;
  console.log(img);

  return (
    <Link to="/">
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={10}>
            <Grid item xs={6}>
              <img src={img} alt="category_image" />
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.name} variant="h4" component="h2">
                {name}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NovostKartica;
