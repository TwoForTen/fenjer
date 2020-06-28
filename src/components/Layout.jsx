import React from 'react';
import { useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import Appbar from './Appbar';
import Footer from './Footer';

const LOADER_STYLE = {
  position: 'fixed',
  top: '0',
  width: '100%',
  zIndex: '1202',
};

const Layout = ({ children }) => {
  const loading = useSelector((state) => state.loading);

  return (
    <>
      {loading && <LinearProgress color="secondary" style={LOADER_STYLE} />}
      <Appbar />
      <main>
        <Container className="content-container">{children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
