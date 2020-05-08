import React, { useEffect, useState } from 'react';
import axios from '../../axiosInstance';

import Container from '@material-ui/core/Container';
import NewsCard from '../../components/NewsCard';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';

const NewsList = () => {
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
        {posts.map((post) => {
          return <NewsCard novost={post} key={post.id} />;
        })}
      </Container>
    </>
  );
};

export default NewsList;
