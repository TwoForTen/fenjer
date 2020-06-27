import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Skeleton from '@material-ui/lab/Skeleton';

import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import ProductCard from '../../components/ProductCard';

import useDataFetch from '../../hooks/useDataFetch';

import { setProduct } from '../../actions/products';
import { addToCart } from '../../actions/cart';

import showroom_img from '../../assets/showroom.jpg';

const useStyles = makeStyles((theme) => ({
  coverImgContainer: {
    height: '500px',
    borderRadius: theme.shape.borderRadius,
  },
  coverImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 'inherit',
  },
}));

const Arrangement = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();

  const selectedArrangement = useDataFetch({
    url: `/arrangements/${params.arrangementId}`,
    method: 'GET',
  });

  return (
    <>
      <PageBreadcrumbs titles={['Showroom', selectedArrangement?.name]} />
      <div
        className="mt-4 mb-4"
        style={{ textAlign: !selectedArrangement && 'center' }}
      >
        <div className={classes.coverImgContainer}>
          {selectedArrangement ? (
            <img
              className={classes.coverImg}
              src={showroom_img}
              alt="showroom_img"
            />
          ) : (
            <Skeleton
              style={{ transform: 'scale(1)' }}
              animation="wave"
              height={500}
            />
          )}
        </div>

        {selectedArrangement ? (
          <>
            <Grid container spacing={3} className="mt-4 mb-4">
              {selectedArrangement?.product_types.map((product) => {
                return (
                  <Grid item md={12} sm={4} xs={6} key={product.id}>
                    <ProductCard
                      type={product}
                      productName={product.slug}
                      onClick={() => dispatch(setProduct(product))}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(addToCart(selectedArrangement?.product_types));
              }}
              disabled
            >
              Dodaj sve proizvode u košaricu
            </Button>
            {selectedArrangement?.description && (
              <>
                <Typography className="mt-4" variant="h6" color="textPrimary">
                  Opis
                </Typography>
                <Typography color="textSecondary" variant="body2" paragraph>
                  {selectedArrangement?.description}
                </Typography>
              </>
            )}
          </>
        ) : (
          <CircularProgress className="mt-4" />
        )}
      </div>
    </>
  );
};

export default Arrangement;
