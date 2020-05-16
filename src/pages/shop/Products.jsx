import React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

import Filters from '../../components/Filters';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import ProductCard from '../../components/ProductCard';

import useDataFetch from '../../hooks/useDataFetch';

const Products = () => {
  const params = useParams();

  const categoryData =
    useDataFetch({
      url: `/categories/${params.categorySlug}`,
      method: 'GET',
    }) || {};

  const { products } = categoryData;

  if (products?.length < 1) {
    return <Redirect to="/404" />;
  }

  return (
    <>
      <PageBreadcrumbs titles={['proizvodi', categoryData.name]} />
      <Container style={{ textAlign: !products && 'center' }}>
        <Filters />
        {products ? (
          products.map((product) =>
            product.types.map((type) => {
              return (
                <ProductCard
                  type={type}
                  key={type.id}
                  productName={product.name}
                />
              );
            })
          )
        ) : (
          <CircularProgress className="mt-4" />
        )}
      </Container>
    </>
  );
};

export default Products;
