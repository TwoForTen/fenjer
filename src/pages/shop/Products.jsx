import React, { useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Filters from '../../components/Filters';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import ProductCard from '../../components/ProductCard';

import useDataFetch from '../../hooks/useDataFetch';

import parseQueryParams from '../../helpers/parseQueryParams';

import { setProduct } from '../../actions/products';

const GRID_VIEW = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
};

const useStyles = makeStyles((theme) => ({
  productsView: ({ view }) => {
    return {
      ...(view === 'grid' && GRID_VIEW),
      [theme.breakpoints.down('sm')]: GRID_VIEW,
    };
  },
}));

const Products = () => {
  const view = useSelector((state) => state.filter.product_view);
  const filter = useSelector((state) => state.filter);

  const params = useParams();
  const dispatch = useDispatch();
  const classes = useStyles({ view });

  const [page, setPage] = useState(1);

  const categoryData = useDataFetch(
    {
      url: `/categories/${params.categorySlug}?page=${page}&${parseQueryParams(
        filter.queries
      )}`,
      method: 'GET',
    },
    filter.queries
  );

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
      <PageBreadcrumbs titles={['proizvodi', categoryTitle]} />
      <div style={{ textAlign: !categoryData?.data && 'center' }}>
        <Filters categorySlug={params.categorySlug} />
        {categoryData?.data ? (
          <>
            <div className={classes.productsView}>
              {sortedProducts(categoryData?.data).map((product) => {
                return (
                  <ProductCard
                    type={product}
                    key={product.id}
                    productName={product.slug}
                    onClick={() => dispatch(setProduct(product))}
                  />
                );
              })}
            </div>
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
        ) : (
          <CircularProgress className="mt-4 mb-4" />
        )}
        {categoryData?.data?.length < 1 && (
          <Typography
            style={{ textAlign: 'center' }}
            variant="body1"
            color="textPrimary"
            className="mt-4"
          >
            Nije pronađen niti jedan proizvod
          </Typography>
        )}
      </div>
    </>
  );
};

export default Products;
