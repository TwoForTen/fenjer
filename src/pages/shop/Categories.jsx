import React, { useEffect, useState } from 'react';
import axios from '../../axiosInstance';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
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
}));

const Proizvodi = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filter.queries);
  const { name, code, barcode } = filter;

  const [loading, setLoading] = useState(false);

  const categories =
    useDataFetch({
      url: `/categories?${parseQueryParams(filter)}`,
      method: 'GET',
    }) || {};

  useEffect(() => {
    const request = axios.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        setLoading(false);
        throw new Error(error);
      }
    );

    const response = axios.interceptors.response.use(
      (res) => {
        setLoading(false);
        return res;
      },
      (error) => {
        setLoading(false);
        throw new Error(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(request);
      axios.interceptors.response.eject(response);
    };
  }, []);

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>Proizvodi</title>
      </Helmet>

      <PageBreadcrumbs titles={['Proizvodi']} />
      <div style={{ textAlign: (!categories?.data || loading) && 'center' }}>
        <Filters showView={false} />
        {categories?.data && !name && !code && !barcode
          ? categories?.data.map((category) => {
              return <CategoryCard category={category} key={category.id} />;
            })
          : (!categories?.data || loading) && (
              <CircularProgress className="mt-4 mb-4" />
            )}
      </div>
      <Grid container spacing={2} className="mt-3 mb-4">
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
                      <Grid item md={12} sm={4} xs={6} key={type.id}>
                        <ProductCard
                          type={type}
                          productName={sanitiseName(product.name)}
                          categoryName={category.name}
                          onClick={() => dispatch(setProduct(type))}
                        />
                      </Grid>
                    );
                  })
              )
          )}
      </Grid>
        {!loading && !categories?.results_found && (
            <Typography
                style={{ textAlign: 'center' }}
                variant="body1"
                color="textPrimary"
                className="mt-4 mb-4"
            >
                Nije pronađen niti jedan proizvod
            </Typography>
        )}
    </>
  );
};

export default Proizvodi;
