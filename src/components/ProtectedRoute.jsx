import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import withAuthErrorHandler from '../hoc/withAuthErrorHandler';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = useSelector((state) => state.user.token);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default withAuthErrorHandler(ProtectedRoute);
