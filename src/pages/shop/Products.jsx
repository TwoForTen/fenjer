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

  const categoryData = useDataFetch(
    {
      url: `/categories/${params.categorySlug}?page=${page}`,
      method: 'GET',
    },
    page
  );

  console.log(categoryData);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  if (categoryData?.data?.length < 1) {
    return <Redirect to="/404" />;
  }

  return (
    <>
      <PageBreadcrumbs
        titles={['proizvodi', categoryData?.data[0]?.category_name]}
      />
      <div style={{ textAlign: !categoryData?.data && 'center' }}>
        <Filters products={categoryData?.data} />
        {categoryData?.data ? (
          <>
            <div className={classes.productsView}>
              {categoryData?.data.map((product) => {
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
            <Pagination
              className="mb-4"
              onChange={handleChangePage}
              count={categoryData?.meta?.last_page}
              variant="outlined"
              shape="rounded"
            />
          </>
        ) : (
          <CircularProgress className="mt-4" />
        )}
      </div>
    </>
  );
};

export default Products;
