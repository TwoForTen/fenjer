import React, { useCallback } from 'react';

import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

import { format as formatCurrency } from '../helpers/formatCurrency';

const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    display: 'inline-flex',
    textAlign: 'right',
    paddingRight: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRight: `1px solid ${theme.palette.primary.main}`,
  },
}));

const calculateSum = (product, delivery) => {
  const productPrices = product.map((prod) => {
    return prod.deal_price
      ? prod.deal_price * prod.ordered_quantity
      : prod.price * prod.ordered_quantity;
  });

  const productGross = productPrices.reduce((sum, num) => sum + num);
  if (productGross > 50000) {
    delivery = 0;
  }

  const net = productGross / 1.25;
  const vat = productGross - net;
  const gross = productGross + +delivery;

  return {
    delivery,
    gross,
    net,
    vat,
  };
};

const PriceBreakdown = ({ cart, delivery }) => {
  const classes = useStyles();

  const priceBreakdown = useCallback(() => {
    if (cart && delivery) {
      return calculateSum(cart, delivery);
    }
  }, [cart, delivery]);

  return (
    <div className={classes.detailsContainer}>
      <div className="mr-4">
        <ul>
          <li className="mb-3">
            <Typography color="textSecondary">
              Ukupna cijena bez PDV-a
            </Typography>
          </li>
          <li className="mb-3">
            <Typography color="textSecondary">PDV</Typography>
          </li>
          <li className="mb-3">
            <Typography color="textSecondary">Dostava</Typography>
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
          <li className="mb-3">
            <Typography color="textPrimary">
              {delivery ? (
                formatCurrency(priceBreakdown().net)
              ) : (
                <Skeleton width={80} animation="wave" />
              )}
            </Typography>
          </li>
          <li className="mb-3">
            <Typography color="textPrimary">
              {delivery ? (
                formatCurrency(priceBreakdown().vat)
              ) : (
                <Skeleton width={80} animation="wave" />
              )}
            </Typography>
          </li>
          <li className="mb-3">
            <Typography color="textPrimary">
              {delivery ? (
                formatCurrency(priceBreakdown().delivery)
              ) : (
                <Skeleton width={80} animation="wave" />
              )}
            </Typography>
          </li>
          <li>
            <Typography color="textPrimary">
              {delivery ? (
                formatCurrency(priceBreakdown().gross)
              ) : (
                <Skeleton width={80} animation="wave" />
              )}
            </Typography>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PriceBreakdown;
