import React, { useState, useMemo, useEffect } from 'react';
import axios from '../../axiosInstance';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Filters from '../../components/Filters';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import ProductCard from '../../components/ProductCard';

import useDataFetch from '../../hooks/useDataFetch';

import parseQueryParams from '../../helpers/parseQueryParams';

import { setProduct } from '../../actions/products';

const Products = () => {
  const view = useSelector((state) => state.filter.product_view);
  const filter = useSelector((state) => state.filter);

  const params = useParams();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const breakpoint = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const categoryData = useDataFetch(
    {
      url: `/categories/${params.categorySlug}?page=${page}&${parseQueryParams(
        filter.queries
      )}`,
      method: 'GET',
    },
    filter.queries
  );

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

  const handleChangePage = (_, newPage) => {
    window.scrollTo({ top: 0 });
    setPage(newPage);
  };

  //FIX TITLE BUG HERE
  const categoryTitle = useMemo(() => {
    return categoryData?.data[0]?.category_name;
  }, [categoryData]);

  const sortedProducts = (data) => {
    switch (filter.sort_by) {
      case 'Nazivu (A-Z)':
        data.sort((a, b) => {
          return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
        });
        return data;
      case 'Nazivu (Z-A)':
        data.sort((a, b) => {
          return a.name < b.name ? 1 : b.name < a.name ? -1 : 0;
        });
        return data;
      case 'Cijeni (manja - veća)':
        data.sort((a, b) => a.price - b.price);
        return data;
      case 'Cijeni (veća - manja)':
        data.sort((a, b) => b.price - a.price);
        return data;
      case 'Dostupnost':
        data.sort((a, b) => b.in_stock - a.in_stock);
        return data;
      default:
        return data;
    }
  };

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>{categoryTitle}</title>
      </Helmet>
      <PageBreadcrumbs titles={['proizvodi', categoryTitle]} />
      <div style={{ textAlign: (!categoryData?.data || loading) && 'center' }}>
        <Filters categorySlug={params.categorySlug} />
        {loading && <CircularProgress className="mt-4 mb-4" />}
        {categoryData?.data && (
          <>
            <Grid align="center" container spacing={breakpoint ? 1 : 3}>
              {sortedProducts(categoryData?.data).map((product) => {
                return (
                  <Grid
                    item
                    key={product.id}
                    xs={12}
                    sm={4}
                    md={view === 'list' ? 12 : 3}
                  >
                    <ProductCard
                      type={product}
                      productName={product.slug}
                      onClick={() => dispatch(setProduct(product))}
                    />
                  </Grid>
                );
              })}
            </Grid>
            {categoryData?.data?.length > 1 && (
              <Pagination
                className="mb-4 mt-4"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
                onChange={handleChangePage}
                count={categoryData?.meta?.last_page}
                variant="outlined"
                shape="rounded"
              />
            )}
          </>
        )}
        {categoryData?.data?.length < 1 && (
          <Typography
            style={{ textAlign: 'center' }}
            variant="body1"
            color="textPrimary"
            className="mt-4 mb-4"
          >
            Nije pronađen niti jedan proizvod
          </Typography>
        )}
      </div>
    </>
  );
};

export default Products;
