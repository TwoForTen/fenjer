import React, { useEffect } from 'react';
import _ from 'lodash';
import axios from '../../axiosInstance';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
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

import LatestPostCard from '../../components/LatestPostCard';

import useDataFetch from '../../hooks/useDataFetch';

import { setLoading } from '../../actions/loading';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3),
  },
  imageContainer: {
    maxWidth: '100%',
    height: 'auto',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    borderRadius: theme.shape.borderRadius,
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
  const dispatch = useDispatch();

  const skeleton_mock = [0, 1, 2];

  const post =
    useDataFetch({
      url: `/posts/${params.novostId}`,
      method: 'GET',
    }) || {};

  const latestPosts =
    useDataFetch({
      url: `/posts`,
      method: 'GET',
    }) || [];

  useEffect(() => {
    const request = axios.interceptors.request.use(
      (config) => {
        dispatch(setLoading());
        return config;
      },
      (error) => {
        dispatch(setLoading());
        throw new Error(error);
      }
    );

    const response = axios.interceptors.response.use(
      (res) => {
        dispatch(setLoading());
        return res;
      },
      (error) => {
        dispatch(setLoading());
        throw new Error(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(request);
      axios.interceptors.response.eject(response);
    };
  }, []);

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
      <Grid container spacing={3} className="mt-4 mb-4">
        <Grid item xs={12} md={8}>
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
                <Typography
                  color="textSecondary"
                  component="p"
                  className="mb-4"
                >
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
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" className="mb-3" color="textPrimary">
            Posljednje novosti
          </Typography>
          <Grid item container spacing={2}>
            {!_.isEmpty(post)
              ? latestPosts?.data
                  ?.filter((latestPost) => latestPost.id !== post.id)
                  .slice(0, 3)
                  .map((post) => {
                    return (
                      <Grid item xs={12} sm={4} md={12} key={post.id}>
                        <LatestPostCard post={post} />{' '}
                      </Grid>
                    );
                  })
              : skeleton_mock.map((mock) => {
                  return (
                    <Grid item xs={12} sm={4} md={12} key={mock}>
                      <LatestPostCard />
                    </Grid>
                  );
                })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PostArticle;
