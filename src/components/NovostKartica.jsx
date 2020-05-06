import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: `${theme.spacing(4)}px 0`,
    padding: theme.spacing(2),
    background: '#45484C',
  },
  date: {
    marginLeft: 'auto',
  },
}));

const NovostKartica = ({ novost }) => {
  const location = useLocation();
  const classes = useStyles();

  const { content, title } = novost;

  useEffect(() => {
    window.scrollTo({ top: '0' });
  }, []);
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className="mb-3" variant="h5" component="h2">
          {title}
        </Typography>
        <Typography
          className={classes.text}
          color="textSecondary"
          component="p"
          variant="body2"
        >
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`${location.pathname}/1`}>
          <Button
            className={classes.margin}
            color="primary"
            variant="contained"
          >
            Pročitajte više
          </Button>
        </Link>
        <Button color="primary" className={classes.date} size="small">
          24. travnja 2020.
        </Button>
      </CardActions>
    </Card>
  );
};

export default NovostKartica;
