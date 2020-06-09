import React, { useEffect } from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import OtherProductTypes from '../../components/OtherProductTypes';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import ProductView from '../../components/ProductView';

import useDataFetch from '../../hooks/useDataFetch';

import { setProduct } from '../../actions/products';

const useStyles = makeStyles((theme) => ({
  otherProductTypesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));

const Product = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.product);

  const products =
    useDataFetch({
      url: `/products/${params.productSlug}`,
      method: 'GET',
    }) || [];

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
      <PageBreadcrumbs
        titles={['proizvodi', products?.category?.name, products?.name]}
      />
      <ProductView />
      <div className={classes.otherProductTypesContainer}>
        {products?.types?.map((type) => {
          return (
            <OtherProductTypes
              type={type}
              selectedProduct={selectedProduct?.id || products?.types[0]?.id}
              onClick={() => {
                dispatch(setProduct(type));
              }}
              key={type.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default Product;
