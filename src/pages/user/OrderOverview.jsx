import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import OverviewProductCard from '../../components/OverviewProductCard';

const OrderOverview = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  return (
    <div>
      {order.map((product) => {
        return <OverviewProductCard product={product} />;
      })}
    </div>
  );
};

export default OrderOverview;
