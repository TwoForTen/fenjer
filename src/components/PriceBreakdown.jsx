import React, { useCallback } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
    return prod.price * prod.ordered_quantity;
  });

  const productGross = productPrices.reduce((sum, num) => sum + num);
  if (productGross > 500) {
    delivery = 0;
  }

  const net = productGross / 1.25;
  const vat = productGross - net;
  const gross = productGross + +delivery;

  return {
    productGross,
    gross,
    net,
    vat,
  };
};

const PriceBreakdown = ({ cart, delivery }) => {
  const classes = useStyles();

  const priceBreakdown = useCallback(() => {
    return calculateSum(cart, delivery);
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
              {new Intl.NumberFormat('hr-HR', {
                style: 'currency',
                currency: 'HRK',
              }).format(priceBreakdown().net)}
            </Typography>
          </li>
          <li className="mb-3">
            <Typography color="textPrimary">
              {new Intl.NumberFormat('hr-HR', {
                style: 'currency',
                currency: 'HRK',
              }).format(priceBreakdown().vat)}
            </Typography>
          </li>
          <li className="mb-3">
            <Typography color="textPrimary">
              {priceBreakdown().productGross < 501
                ? new Intl.NumberFormat('hr-HR', {
                    style: 'currency',
                    currency: 'HRK',
                  }).format(delivery)
                : new Intl.NumberFormat('hr-HR', {
                    style: 'currency',
                    currency: 'HRK',
                  }).format(0)}
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
  );
};

export default PriceBreakdown;
