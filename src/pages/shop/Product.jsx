import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import OtherProductTypes from '../../components/OtherProductTypes';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import ProductView from '../../components/ProductView';

import useDataFetch from '../../hooks/useDataFetch';

import { setProduct } from '../../actions/products';

const useStyles = makeStyles((theme) => ({
  otherProductTypesContainer: {
    display: 'flex',
    marginBottom: theme.spacing(3),
  },
}));

const Product = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const clickedProduct = useSelector((state) => state.product);

  const categoryData =
    useDataFetch({
      url: `/categories/${params.categorySlug}`,
      method: 'GET',
    }) || {};

  //   console.log(categoryData);

  const products = categoryData?.products?.find(
    (product) => product.name.toLowerCase() === params.productSlug
  );

  // console.log(products);

  useEffect(() => {
    products &&
      dispatch(
        setProduct(
          Object.entries(clickedProduct)?.length > 1
            ? clickedProduct
            : products?.types[0]
        )
      );
  }, [products]);

  return (
    <>
      <PageBreadcrumbs
        titles={['proizvodi', categoryData?.name, products?.name]}
      />
      <Container>
        <ProductView product={clickedProduct} />
        <div className={classes.otherProductTypesContainer}>
          {products?.types.map((type, index) => {
            return (
              <OtherProductTypes
                type={type}
                selectedProduct={clickedProduct?.id || products?.types[0]?.id}
                onClick={() => {
                  dispatch(setProduct(products?.types[index]));
                }}
                key={type.id}
              />
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default Product;
