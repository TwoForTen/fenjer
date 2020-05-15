import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';

import { userLogout } from './actions/auth';
import ProtectedRoute from './components/ProtectedRoute';
import SnackbarComponent from './components/SnackbarComponent';

import Contact from './pages/Contact';
import Home from './pages/Home';
import Layout from './components/Layout';
import Login from './pages/Login';
import LegalDocs from './pages/LegalDocs';
import NotFound from './pages/NotFound';
import PostArticle from './pages/posts/PostArticle';
import PostsList from './pages/posts/PostsList';
import Categories from './pages/shop/Categories';
import Products from './pages/shop/Products';
import Registration from './pages/Registration';
import Terms from './pages/Terms';
import UserAccount from './pages/UserAccount';

import ScrollToTop from './hoc/ScrollToTop';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const expirationDate = localStorage.getItem('expiration_date');
    if (expirationDate) {
      if (new Date(expirationDate).getTime() < new Date().getTime()) {
        dispatch(userLogout());
      }
    }
  }, [location.pathname]);

  return (
    <>
      <SnackbarComponent />
      <Layout>
        <ScrollToTop>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/kontakt" exact component={Contact} />
            <Route path="/maticni-podaci" exact component={LegalDocs} />
            <Route path="/novosti/:novostId" exact component={PostArticle} />
            <Route path="/novosti" exact component={PostsList} />
            <Route path="/prijava" exact component={Login} />
            <Route path="/proizvodi" exact component={Categories} />
            <Route path="/proizvodi/:categorySlug" exact component={Products} />
            <Route path="/registracija" exact component={Registration} />
            <Route path="/uvjeti-prodaje" exact component={Terms} />
            <ProtectedRoute
              path="/korisnicki-racun"
              exact
              component={UserAccount}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </ScrollToTop>
      </Layout>
    </>
  );
}

export default App;
