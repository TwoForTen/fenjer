import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Redirect } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/hr';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import useDataFetch from '../../hooks/useDataFetch';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '15px',
  },
  paragraphContainer: {
    padding: `${theme.spacing(4)}px 0`,
  },
  imageContainer: {
    maxWidth: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  date: {
    marginLeft: 'auto',
    textTransform: 'capitalize',
  },
  skeleton: {
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
  },
}));

const PostArticle = () => {
  const classes = useStyles();
  const params = useParams();

  const post =
    useDataFetch({
      url: `/posts/${params.novostId}`,
      method: 'get',
    }) || {};

  const postedAt = moment(post.created_at, 'DD.MM.YYYY')
    .locale('hr')
    .format('DD. MMMM YYYY.');

  if (!post) {
    return <Redirect to="/404" />;
  }

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>{post.title}</title>
      </Helmet>

      <PageBreadcrumbs titles={['Novosti', post.title]} />
      <div className={classes.paragraphContainer}>
        <Card className={classes.card}>
          <CardContent>
            {post.title ? (
              <Typography variant="h5" component="h2" className="mb-4">
                {post.title}
              </Typography>
            ) : (
              <Skeleton
                animation="wave"
                variant="rect"
                height={16}
                width={100}
                className={`mb-4 ${classes.skeleton}`}
              />
            )}
            {post.content ? (
              <Typography color="textSecondary" component="p" className="mb-4">
                {post.content}
              </Typography>
            ) : (
              <>
                <Skeleton
                  animation="wave"
                  variant="rect"
                  height={13}
                  className={classes.skeleton}
                />
                <Skeleton
                  animation="wave"
                  variant="rect"
                  height={13}
                  className={classes.skeleton}
                />
                <Skeleton
                  animation="wave"
                  variant="rect"
                  height={13}
                  className={classes.skeleton}
                />
                <Skeleton
                  animation="wave"
                  variant="rect"
                  height={13}
                  className={classes.skeleton}
                />
                <Skeleton
                  animation="wave"
                  variant="rect"
                  height={13}
                  className={classes.skeleton}
                />
                <Skeleton
                  animation="wave"
                  variant="rect"
                  height={13}
                  className={classes.skeleton}
                />
                <Skeleton
                  animation="wave"
                  variant="rect"
                  height={13}
                  className={classes.skeleton}
                  style={{ width: '40%' }}
                />
              </>
            )}
            <div className={classes.imageContainer}>
              {post.img ? (
                <img
                  className={classes.image}
                  src={process.env.REACT_APP_PROD_URL + post.img}
                  alt="article_img"
                />
              ) : (
                <Skeleton
                  className={classes.skeleton}
                  animation="wave"
                  variant="rect"
                  height={300}
                />
              )}
            </div>
          </CardContent>
          <CardActions disableSpacing>
            <Typography
              color="primary"
              className={classes.date}
              variant="subtitle2"
            >
              {post.created_at && postedAt}
            </Typography>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default PostArticle;
