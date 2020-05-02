import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/_main.scss';

import reducers from './reducers/index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
