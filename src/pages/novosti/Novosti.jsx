import React, { useEffect, useState } from 'react';
import axios from '../../axiosInstance';

import Container from '@material-ui/core/Container';
import NovostKartica from '../../components/NovostKartica';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';

const Novosti = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('/posts')
      .then((res) => setPosts((prevState) => [...prevState, ...res.data]));
  }, []);

  return (
    <>
      <PageBreadcrumbs title="Novosti" />
      <Container>
        {posts.map((post) => {
          return <NovostKartica novost={post} key={post.id} />;
        })}
      </Container>
    </>
  );
};

export default Novosti;
