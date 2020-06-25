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
  componentRoot: {
    maxWidth: '150px',
    width: '100%',
  },
  buttonGroup: {
    backgroundColor: theme.palette.background.default + '!important',
    borderColor: '#000 !important',
    color: theme.palette.text.primary + '!important',
  },
  buttonLeft: {
    border: `1px solid`,
    borderRadius: `${theme.shape.borderRadius} 0 0 ${theme.shape.borderRadius}`,
    maxWidth: '40px',
    minWidth: 'inherit',
    maxHeight: '36px',
    width: '33.33%',
  },
  buttonRight: {
    border: `1px solid`,
    borderRadius: `0 ${theme.shape.borderRadius} ${theme.shape.borderRadius} 0`,
    maxWidth: '40px',
    minWidth: 'inherit',
    maxHeight: '36px',
    width: '33.33%',
  },
  inputRoot: {
    borderTop: `1px solid`,
    borderBottom: `1px solid`,
    maxWidth: '40px',
    maxHeight: '36px',
    width: '33.33%',
    minWidth: 'inherit',
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
    <div className={classes.componentRoot} onClick={(e) => e.stopPropagation()}>
      <Button
        className={`${classes.buttonGroup} ${classes.buttonLeft}`}
        onClick={() => dispatch(decrementCartQuantity({ index: cartItem }))}
        disabled={cart[cartItem]?.ordered_quantity <= 1}
      >
        -
      </Button>
      <TextField
        className={`${classes.buttonGroup} ${classes.inputRoot}`}
        value={cart[cartItem]?.ordered_quantity}
        onBlur={(e) => {
          if (cart[cartItem]?.ordered_quantity < 1) {
            dispatch(
              setCartQuantity({
                index: cartItem,
                ordered_quantity: 1,
              })
            );
          }
        }}
        onChange={(e) =>
          dispatch(
            setCartQuantity({
              index: cartItem,
              ordered_quantity: e.target.value,
            })
          )
        }
        type="number"
        // pattern="[0-9]*"
        inputMode="numeric"
      />
      <Button
        className={`${classes.buttonGroup} ${classes.buttonRight}`}
        onClick={() => dispatch(incrementCartQuantity({ index: cartItem }))}
      >
        +
      </Button>
    </div>
  );

  const productQuantity = (
    <>
      <Button
        className={`${classes.buttonGroup} ${classes.buttonLeft}`}
        onClick={() => dispatch(decrementProduct())}
        disabled={product.ordered_quantity <= 1}
      >
        -
      </Button>
      <TextField
        className={`${classes.buttonGroup} ${classes.inputRoot}`}
        value={product.ordered_quantity || 1}
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
