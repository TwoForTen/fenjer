import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/hr';

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
  },
  date: {
    marginLeft: 'auto',
    textTransform: 'capitalize',
  },
}));

const PostCard = ({ post }) => {
  const location = useLocation();
  const classes = useStyles();

  const { title, excerpt, id, created_at: createdAt } = post;

  const postedAt = moment(createdAt).locale('hr').format('DD. MMMM YYYY.');

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
          {excerpt}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`${location.pathname}/${id}`}>
          <Button
            className={classes.margin}
            color="primary"
            variant="contained"
          >
            Pročitajte više
          </Button>
        </Link>
        <Typography
          color="primary"
          className={classes.date}
          variant="subtitle2"
        >
          {postedAt}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default PostCard;
