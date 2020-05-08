import React, { useEffect, useState } from 'react';
import axios from '../../axiosInstance';

import Container from '@material-ui/core/Container';
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
      <Container>
        {posts.reverse().map((post) => {
          return <PostCard novost={post} key={post.id} />;
        })}
      </Container>
    </>
  );
};

export default PostsList;
