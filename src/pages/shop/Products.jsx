import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

import Filters from '../../components/Filters';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import ProductCard from '../../components/ProductCard';

import useDataFetch from '../../hooks/useDataFetch';

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

  const params = useParams();
  const dispatch = useDispatch();
  const classes = useStyles({ view });

  const [page, setPage] = useState(1);

  const categoryData =
    useDataFetch(
      {
        url: `/categories/${params.categorySlug}`,
        method: 'GET',
      },
      page
    ) || {};

  const { products } = categoryData;

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  if (products?.length < 1) {
    return <Redirect to="/404" />;
  }

  return (
    <>
      <PageBreadcrumbs titles={['proizvodi', categoryData.name]} />
      <div style={{ textAlign: !products && 'center' }}>
        <Filters products={products} />
        {products ? (
          <>
            <div className={classes.productsView}>
              {products.map((product) =>
                product.types.map((type) => {
                  return (
                    <ProductCard
                      type={type}
                      key={type.id}
                      productName={product.name}
                      onClick={() => dispatch(setProduct(type))}
                    />
                  );
                })
              )}
            </div>
            <Pagination count={10} variant="outlined" shape="rounded" />
          </>
        ) : (
          <CircularProgress className="mt-4" />
        )}
      </div>
    </>
  );
};

export default Products;
