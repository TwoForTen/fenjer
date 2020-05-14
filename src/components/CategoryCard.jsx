import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import devImageSource from '../helpers/devImageSource';

import sanitiseName from '../helpers/sanitiseName';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: `${theme.spacing(4)}px 0`,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    textAlign: 'right',
  },
  imageContainer: {
    height: '120px',
    width: '200px',
    objectFit: 'contain',
    overflow: 'hidden',
  },
  categoryImage: {
    height: 'auto',
    width: '100%',
  },
}));

const CategoryCard = ({ category }) => {
  const location = useLocation();
  const classes = useStyles();

  const { name, img } = category;

  return (
    <Link to={`${location.pathname}/${sanitiseName(name)}`}>
      <Card className={classes.card}>
        <div className={classes.imageContainer}>
          <img
            className={classes.categoryImage}
            src="http://localhost:8000/images/flower.png"
            alt="category_image"
          />
        </div>
        <Typography className={classes.name} variant="h4" component="h2">
          {name}
        </Typography>
      </Card>
    </Link>
  );
};

export default CategoryCard;
