import React from 'react';
import { Helmet } from 'react-helmet-async';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PostCard from '../../components/PostCard';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';

import useDataFetch from '../../hooks/useDataFetch';

const useStyles = makeStyles((theme) => ({
  centeredContainer: {
    textAlign: 'center',
    margin: theme.spacing(3),
  },
}));

const PostsList = () => {
  const classes = useStyles();

  const posts = useDataFetch({
    url: '/posts',
    method: 'get',
  });

  if (posts?.data?.length < 1) {
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
      <div style={{ textAlign: !posts && 'center' }}>
        {posts ? (
          posts?.data.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })
        ) : (
          <CircularProgress className="mt-4" />
        )}
      </div>
    </>
  );
};

export default PostsList;
