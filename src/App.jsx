import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';

import { userLogout } from './actions/auth';
import ProtectedRoute from './components/ProtectedRoute';
import SnackbarComponent from './components/SnackbarComponent';

import Home from './pages/Home';
import Contact from './pages/Contact';
import Layout from './components/Layout';
import LegalDocs from './pages/LegalDocs';
import PostArticle from './pages/novosti/PostArticle';
import PostsList from './pages/novosti/PostsList';
import Login from './pages/Login';
import Products from './pages/Products';
import Registration from './pages/Registration';
import Terms from './pages/Terms';
import UserAccount from './pages/UserAccount';

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
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/kontakt" exact component={Contact} />
          <Route path="/maticni-podaci" exact component={LegalDocs} />
          <Route path="/novosti/:novostId" exact component={PostArticle} />
          <Route path="/novosti" exact component={PostsList} />
          <Route path="/prijava" exact component={Login} />
          <Route path="/proizvodi" exact component={Products} />
          <Route path="/registracija" exact component={Registration} />
          <Route path="/uvjeti-prodaje" exact component={Terms} />
          <ProtectedRoute
            path="/korisnicki-racun"
            exact
            component={UserAccount}
          />
          <Route path="*" render={() => <div>404</div>} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
