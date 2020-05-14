import React from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PostCard from '../../components/PostCard';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';

import useDataFetch from '../../hooks/useDataFetch';

const useStyles = makeStyles((theme) => ({
  centeredContainer: {
    textAlign: 'center',
    margin: theme.spacing(6),
  },
}));

const PostsList = () => {
  const classes = useStyles();

  const posts = useDataFetch({
    url: '/posts',
    method: 'get',
  });

  if (posts?.length < 1) {
    return (
      <div className={classes.centeredContainer}>
        <Typography variant="body1" color="textPrimary">
          Nema nedavnih vijesti.
        </Typography>
      </div>
    );
  }
  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>Novosti</title>
      </Helmet>

      <PageBreadcrumbs titles={['Novosti']} />
      <Container style={{ textAlign: !posts && 'center' }}>
        {posts ? (
          posts.map((post) => {
            return <PostCard novost={post} key={post.id} />;
          })
        ) : (
          <CircularProgress className="mt-4" />
        )}
      </Container>
    </>
  );
};

export default PostsList;
