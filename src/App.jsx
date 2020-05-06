import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Kontakt from './pages/Kontakt';
import Layout from './components/Layout';
import MaticniPodaci from './pages/MaticniPodaci';
import Novost from './pages/novosti/Novost';
import Novosti from './pages/novosti/Novosti';
import Prijava from './pages/Prijava';
import Proizvodi from './pages/Proizvodi';
import Registracija from './pages/Registracija';
import UvjetiProdaje from './pages/UvjetiProdaje';

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/kontakt" exact component={Kontakt} />
          <Route path="/maticni-podaci" exact component={MaticniPodaci} />
          <Route path="/novosti/:novostId" exact component={Novost} />
          <Route path="/novosti" exact component={Novosti} />
          <Route path="/prijava" exact component={Prijava} />
          <Route path="/proizvodi" exact component={Proizvodi} />
          <Route path="/registracija" exact component={Registracija} />
          <Route path="/uvjeti-prodaje" exact component={UvjetiProdaje} />
          <Route path="*" render={() => <div>404</div>} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
