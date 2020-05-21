import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import {
  decrementProduct,
  incrementProduct,
  setProductQuantity,
} from '../actions/products';

import {
  decrementCartQuantity,
  incrementCartQuantity,
  setCartQuantity,
} from '../actions/cart';

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    backgroundColor: theme.palette.background.default + '!important',
    borderColor: '#000 !important',
    color: theme.palette.text.primary + '!important',
  },
  buttonLeft: {
    border: `1px solid`,
    borderRadius: `${theme.shape.borderRadius} 0 0 ${theme.shape.borderRadius}`,
    minWidth: '40px',
    minHeight: '36px',
    maxHeight: '36px',
  },
  buttonRight: {
    border: `1px solid`,
    borderRadius: `0 ${theme.shape.borderRadius} ${theme.shape.borderRadius} 0`,
    minWidth: '40px',
    minHeight: '36px',
    maxHeight: '36px',
  },
  inputRoot: {
    borderTop: `1px solid`,
    borderBottom: `1px solid`,
    maxWidth: '40px',
    minHeight: '36px',
    maxHeight: '36px',
    '& > div > input': {
      textAlign: 'center',
      padding: '8px 0',
    },
  },
}));

const ProductQuantitySelector = ({ cartItem }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const product = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const cartQuantity = (
    <>
      <Button
        className={`${classes.buttonGroup} ${classes.buttonLeft}`}
        onClick={() => dispatch(decrementCartQuantity({ index: cartItem }))}
        disabled={cart[cartItem]?.quantity <= 1}
      >
        -
      </Button>
      <TextField
        className={`${classes.buttonGroup} ${classes.inputRoot}`}
        value={cart[cartItem]?.quantity}
        onChange={(e) =>
          dispatch(
            setCartQuantity({ index: cartItem, quantity: +e.target.value })
          )
        }
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
      />
      <Button
        className={`${classes.buttonGroup} ${classes.buttonRight}`}
        onClick={() => dispatch(incrementCartQuantity({ index: cartItem }))}
      >
        +
      </Button>
    </>
  );

  const productQuantity = (
    <>
      <Button
        className={`${classes.buttonGroup} ${classes.buttonLeft}`}
        onClick={() => dispatch(decrementProduct())}
        disabled={product.quantity <= 1}
      >
        -
      </Button>
      <TextField
        className={`${classes.buttonGroup} ${classes.inputRoot}`}
        value={product.quantity}
        onChange={(e) => dispatch(setProductQuantity(+e.target.value))}
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
      />
      <Button
        className={`${classes.buttonGroup} ${classes.buttonRight}`}
        onClick={() => dispatch(incrementProduct())}
      >
        +
      </Button>
    </>
  );

  return (
    <>{location.pathname === '/kosarica' ? cartQuantity : productQuantity}</>
  );
};

export default ProductQuantitySelector;
