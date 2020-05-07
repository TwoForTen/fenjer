import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';

import Container from '@material-ui/core/Container';

import CategoryKartica from '../components/CategoryKartica';
import PageBreadcrumbs from '../components/PageBreadcrumbs';

const Proizvodi = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('/categories')
      .then((res) => setCategories((prevState) => [...prevState, ...res.data]));

    window.scrollTo({ top: '0' });
  }, []);

  return (
    <>
      <PageBreadcrumbs titles={['Proizvodi']} />
      <Container>
        {categories.map((category) => {
          return <CategoryKartica category={category} key={category.id} />;
        })}
      </Container>
    </>
  );
};

export default Proizvodi;
