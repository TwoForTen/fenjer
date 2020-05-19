import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import LocalShipping from '@material-ui/icons/LocalShipping';

import CartProductCard from '../components/CartProductCard';
import PageBreadcrumbs from '../components/PageBreadcrumbs';

import { setProduct } from '../actions/products';

const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    display: 'inline-flex',
    textAlign: 'right',
    paddingRight: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRight: `1px solid ${theme.palette.primary.main}`,
  },
  deliveryContainer: { display: 'inline-flex', flexDirection: 'column' },
}));

const calculateSum = (product) => {
  const productPrices = product.map((prod) => {
    return prod.selectedProduct.price * prod.quantity;
  });

  const gross = productPrices.reduce((sum, num) => sum + num);
  const net = gross / 1.25;
  const vat = gross - net;

  return {
    gross,
    net,
    vat,
  };
};

const Cart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const productsInCart = useSelector((state) => state.cart);

  const priceBreakdown = useCallback(() => {
    return calculateSum(productsInCart);
  }, [productsInCart]);

  if (!productsInCart || productsInCart?.length < 1) {
    return (
      <>
        <PageBreadcrumbs titles={['Košarica']} />
        <Typography
          color="textPrimary"
          variant="h6"
          className="mt-4"
          align="center"
        >
          Trenutno nemate proizvoda u košarici.
        </Typography>
      </>
    );
  }

  return (
    <>
      <PageBreadcrumbs titles={['Košarica']} />
      <Container className="mb-4">
        {productsInCart.map((product, index) => {
          return (
            <CartProductCard
              key={product.selectedProduct.id}
              onClick={() => dispatch(setProduct(product.selectedProduct))}
              product={product}
              index={index}
            />
          );
        })}
        <Button
          variant="contained"
          style={{ float: 'right' }}
          className="mb-4"
          color="primary"
        >
          Potvrdi narudžbu
        </Button>
        <div className={classes.detailsContainer}>
          <div className="mr-4">
            <ul>
              <li>
                <Typography color="textSecondary">
                  Ukupna cijena bez PDV-a
                </Typography>
              </li>
              <li>
                <Typography color="textSecondary">PDV</Typography>
              </li>
              <li>
                <Typography color="textSecondary">
                  Ukupna cijena sa PDV-om
                </Typography>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li>
                <Typography color="textPrimary">
                  {new Intl.NumberFormat('hr-HR', {
                    style: 'currency',
                    currency: 'HRK',
                  }).format(priceBreakdown().net)}
                </Typography>
              </li>
              <li>
                <Typography color="textPrimary">
                  {new Intl.NumberFormat('hr-HR', {
                    style: 'currency',
                    currency: 'HRK',
                  }).format(priceBreakdown().vat)}
                </Typography>
              </li>
              <li>
                <Typography color="textPrimary">
                  {new Intl.NumberFormat('hr-HR', {
                    style: 'currency',
                    currency: 'HRK',
                  }).format(priceBreakdown().gross)}
                </Typography>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.deliveryContainer}>
          <Typography color="textPrimary">Način preuzimanja robe</Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LocalShipping fontSize="large" color="action" className="mr-2" />
            <Typography color="textPrimary">
              <strong>Dostava</strong>
            </Typography>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
