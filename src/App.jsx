import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout';
import MaticniPodaci from './pages/MaticniPodaci';
import Prijava from './pages/Prijava';
import UvjetiProdaje from './pages/UvjetiProdaje';

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/uvjeti-prodaje" exact component={UvjetiProdaje} />
          <Route path="/prijava" exact component={Prijava} />
          <Route path="/maticni-podaci" exact component={MaticniPodaci} />
          <Route path="*" render={() => <div>404</div>} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
