import React from 'react';

import Appbar from './Appbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Appbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
