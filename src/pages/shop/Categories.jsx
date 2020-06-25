import React from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import CategoryCard from '../../components/CategoryCard';
import ProductCard from '../../components/ProductCard';
import Filters from '../../components/Filters';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';

import useDataFetch from '../../hooks/useDataFetch';

import parseQueryParams from '../../helpers/parseQueryParams';
import sanitiseName from '../../helpers/sanitiseName';

import { setProduct } from '../../actions/products';

const useStyles = makeStyles((theme) => ({
  centeredContainer: {
    textAlign: 'center',
    margin: theme.spacing(6),
  },
  productContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
}));

const Proizvodi = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.queries);

  const { name, code, barcode } = filter;

  const categories =
    useDataFetch({
      url: `/categories?${parseQueryParams(filter)}`,
      method: 'GET',
    }) || {};

  if (categories?.data?.length < 1) {
    return (
      <div className={classes.centeredContainer}>
        <Typography variant="body1" color="textPrimary">
          Nije pronađen ni jedan proizvod
        </Typography>
      </div>
    );
  }

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>Proizvodi</title>
      </Helmet>

      <PageBreadcrumbs titles={['Proizvodi']} />
      <div style={{ textAlign: !categories?.data && 'center' }}>
        <Filters showView={false} />
        {categories?.data && !name && !code && !barcode
          ? categories?.data.map((category) => {
              return <CategoryCard category={category} key={category.id} />;
            })
          : !categories?.data && <CircularProgress className="mt-4" />}
      </div>
      <div className={classes.productContainer}>
        {(name || code || barcode) &&
          categories?.data &&
          categories?.data.map(
            (category) =>
              category.products &&
              category.products.map(
                (product) =>
                  product.types &&
                  product.types.map((type) => {
                    return (
                      <ProductCard
                        key={type.id}
                        type={type}
                        productName={sanitiseName(product.name)}
                        categoryName={category.name}
                        onClick={() => dispatch(setProduct(type))}
                      />
                    );
                  })
              )
          )}
      </div>
    </>
  );
};

export default Proizvodi;
