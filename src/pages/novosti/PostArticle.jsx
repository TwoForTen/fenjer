import React, { useEffect, useState } from 'react';
import axios from '../../axiosInstance';
import { useParams } from 'react-router-dom';

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
    background: '#45484C',
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
  },
}));

const PostArticle = () => {
  const classes = useStyles();
  const params = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    window.scrollTo({ top: '0' });

    axios.get(`/posts/${params.novostId}`).then((res) => setPost(res.data));
  }, []);

  return (
    <>
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
                24. travnja 2020.
              </Typography>
            </CardActions>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default PostArticle;
