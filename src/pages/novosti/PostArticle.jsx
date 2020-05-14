import React, { useEffect, useState } from 'react';
import axios from '../../axiosInstance';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/hr';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import devImageSource from '../../helpers/devImageSource';

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
}));

const PostArticle = () => {
  const classes = useStyles();
  const params = useParams();

  const [post, setPost] = useState({});

  const postedAt = moment(post.created_at, 'DD.MM.YYYY')
    .locale('hr')
    .format('DD. MMMM YYYY.');

  useEffect(() => {
    window.scrollTo({ top: '0' });

    axios.get(`/posts/${params.novostId}`).then((res) => setPost(res.data));
  }, [params.novostId]);

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>{post.title}</title>
      </Helmet>

      <PageBreadcrumbs titles={['Novosti', post.title]} />
      <Container>
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
                  className="mb-4"
                />
              )}
              <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                  <div className={classes.imageContainer}>
                    {post.img ? (
                      <img
                        className={classes.image}
                        src={devImageSource(post.img)}
                        alt="Article img"
                      />
                    ) : (
                      <Skeleton animation="wave" variant="rect" height={300} />
                    )}
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  {post.content ? (
                    <Typography color="textSecondary" component="p">
                      {post.content}
                    </Typography>
                  ) : (
                    <>
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        height={13}
                        className="mb-2"
                      />
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        height={13}
                        className="mb-2"
                      />
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        height={13}
                        className="mb-2"
                      />
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        height={13}
                        className="mb-2"
                      />
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        height={13}
                        className="mb-2"
                      />
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        height={13}
                        className="mb-2"
                      />
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        height={13}
                        className="mb-2"
                        style={{ width: '40%' }}
                      />
                    </>
                  )}
                </Grid>
              </Grid>
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
      </Container>
    </>
  );
};

export default PostArticle;
