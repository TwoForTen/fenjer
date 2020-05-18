import React from 'react';
import { useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';

import CartProductCard from '../components/CartProductCard';
import PageBreadcrumbs from '../components/PageBreadcrumbs';

const Cart = () => {
  const productsInCart = useSelector((state) => state.cart);

  return (
    <>
      <PageBreadcrumbs titles={['Košarica']} />
      <Container>
        {productsInCart.map((product, index) => {
          return (
            <CartProductCard
              key={product.selectedProduct.id}
              product={product}
            />
          );
        })}
      </Container>
    </>
  );
};

export default Cart;
