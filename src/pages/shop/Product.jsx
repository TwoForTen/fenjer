import React, { useEffect } from 'react';
import _ from 'lodash';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import OtherProductTypes from '../../components/OtherProductTypes';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import ProductView from '../../components/ProductView';

import useDataFetch from '../../hooks/useDataFetch';

import { setProduct } from '../../actions/products';

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.product);

  const products =
    useDataFetch({
      url: `/products/${params.productSlug}`,
      method: 'GET',
    }) || [];

  console.log(products);

  useEffect(() => {
    !_.isEmpty(products) &&
      dispatch(
        setProduct(
          !_.isEmpty(selectedProduct) ? selectedProduct : products?.types[0]
        )
      );
  }, [products]);

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>{products?.name}</title>
      </Helmet>
      <PageBreadcrumbs
        titles={['proizvodi', products?.category?.name, products?.name]}
      />
      <ProductView />
      <Grid container spacing={4} className="mb-4">
        {products?.types?.map((type) => {
          return (
            <Grid item xs={6} sm={3} md={2} key={type.id}>
              <OtherProductTypes
                type={type}
                selectedProduct={selectedProduct?.id || products?.types[0]?.id}
                onClick={() => {
                  dispatch(setProduct(type));
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Product;
