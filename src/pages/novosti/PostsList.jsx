import React, { useEffect, useState } from 'react';
import axios from '../../axiosInstance';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import PostCard from '../../components/PostCard';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('/posts')
      .then((res) => setPosts((prevState) => [...prevState, ...res.data]));
  }, []);

  return (
    <>
      <PageBreadcrumbs titles={['Novosti']} />
      <Container style={{ textAlign: posts?.length <= 0 && 'center' }}>
        {posts?.length > 0 ? (
          posts.reverse().map((post) => {
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
