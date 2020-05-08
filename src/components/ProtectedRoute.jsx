import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = JSON.parse(localStorage.getItem('_jwt'));

  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          <Component {...props} />;
        } else {
          <Redirect to="/" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
