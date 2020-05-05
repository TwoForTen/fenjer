import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/_main.scss';
import { BrowserRouter as Router } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/index';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      contrastText: '#ECEFF6',
      dark: '#835038',
      light: '#e9ac90',
      main: '#B57D62',
    },
    background: {
      paper: '#313437',
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
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
