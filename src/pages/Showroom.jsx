import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';

import PageBreadcrumbs from '../components/PageBreadcrumbs';
import ShowroomCard from '../components/ShowroomCard';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const Showroom = () => {
  const [promotedProducts, setPromotedProducts] = useState([]);
  useEffect(() => {
    axios.get('/product-types').then((res) => {
      setPromotedProducts(
        res.data.filter((promotedProduct) => promotedProduct.promoted)
      );
    });
  }, []);
  return (
    <>
      <PageBreadcrumbs titles={['Showroom']} />
      <Container>
        <Grid container spacing={4} className="mt-3 mb-3">
          {promotedProducts.map((product) => {
            return (
              <Grid item xs={12} sm={4} key={product.id}>
                <ShowroomCard promotedProduct={product} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Showroom;
