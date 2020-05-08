import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';

import { userLogout } from './actions/auth';

import Kontakt from './pages/Contact';
import Layout from './components/Layout';
import LegalDocs from './pages/LegalDocs';
import NewsArticle from './pages/novosti/NewsArticle';
import NewsList from './pages/novosti/NewsList';
import Login from './pages/Login';
import Products from './pages/Products';
import Registration from './pages/Registration';
import Terms from './pages/Terms';

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
          <Route path="/novosti/:novostId" exact component={NewsArticle} />
          <Route path="/novosti" exact component={NewsList} />
          <Route path="/prijava" exact component={Login} />
          <Route path="/proizvodi" exact component={Products} />
          <Route path="/registracija" exact component={Registration} />
          <Route path="/uvjeti-prodaje" exact component={Terms} />
          <Route path="*" render={() => <div>404</div>} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
