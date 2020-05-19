import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/_main.scss';
import { BrowserRouter as Router } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { createStore } from 'redux';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      contrastText: '#ECEFF6',
      dark: '#B86D79',
      light: '#e9ac90',
      main: '#B57D62',
    },
    secondary: {
      main: '#B86D79',
      contrastText: '#ECEFF6',
    },
    background: {
      paper: '#45484C',
      default: '#313437',
    },
    text: {
      primary: '#ECEFF6',
    },
  },
  shape: {
    borderRadius: '5px',
  },
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
