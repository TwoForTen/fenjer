import React, { useEffect, useState } from 'react';
import axios from '../../axiosInstance';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import PostCard from '../../components/PostCard';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';

const useStyles = makeStyles((theme) => ({
  canteredContainer: {
    textAlign: 'center',
    margin: theme.spacing(6),
  },
}));

const PostsList = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios.get('/posts').then((res) => setPosts(res.data));
  }, []);

  if (posts?.length < 1) {
    return (
      <div className={classes.canteredContainer}>
        <p>Nema nedavnih vijesti.</p>
      </div>
    );
  }
  return (
    <>
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
