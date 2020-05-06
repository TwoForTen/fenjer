import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Kontakt from './pages/Kontakt';
import MaticniPodaci from './pages/MaticniPodaci';
import Prijava from './pages/Prijava';
import Registracija from './pages/Registracija';
import UvjetiProdaje from './pages/UvjetiProdaje';
import Proizvodi from './pages/Proizvodi';
import Novosti from './pages/Novosti';

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/uvjeti-prodaje" exact component={UvjetiProdaje} />
          <Route path="/novosti" exact component={Novosti} />
          <Route path="/proizvodi" exact component={Proizvodi} />
          <Route path="/prijava" exact component={Prijava} />
          <Route path="/registracija" exact component={Registracija} />
          <Route path="/maticni-podaci" exact component={MaticniPodaci} />
          <Route path="/kontakt" exact component={Kontakt} />
          <Route path="*" render={() => <div>404</div>} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
