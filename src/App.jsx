import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';

import { userLogout } from './actions/auth';
import ProtectedRoute from './components/ProtectedRoute';

import Kontakt from './pages/Contact';
import Layout from './components/Layout';
import LegalDocs from './pages/LegalDocs';
import PostArticle from './pages/novosti/PostArticle';
import PostsList from './pages/novosti/PostsList';
import Login from './pages/Login';
import Products from './pages/Products';
import Registration from './pages/Registration';
import Showroom from './pages/Showroom';
import Terms from './pages/Terms';
import UserAccount from './pages/UserAccount';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const expirationDate = localStorage.getItem('expiration_date');

    if (new Date(expirationDate).getTime() < new Date().getTime()) {
      localStorage.clear();
      dispatch(userLogout());
    }
  }, [location.pathname]);

  return (
    <>
      <Layout>
        <Switch>
          <Route path="/kontakt" exact component={Kontakt} />
          <Route path="/maticni-podaci" exact component={LegalDocs} />
          <Route path="/novosti/:novostId" exact component={PostArticle} />
          <Route path="/novosti" exact component={PostsList} />
          <Route path="/prijava" exact component={Login} />
          <Route path="/proizvodi" exact component={Products} />
          <Route path="/registracija" exact component={Registration} />
          <Route path="/showroom" exact component={Showroom} />
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
