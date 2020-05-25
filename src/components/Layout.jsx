import React from 'react';

import Container from '@material-ui/core/Container';

import Appbar from './Appbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Appbar />
      <main>
        <Container className="content-container">{children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
