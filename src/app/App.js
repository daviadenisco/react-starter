import React from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import HelloWorld from './pages/HelloWorld';
import configureStore, { history } from '../redux/configureStore';
import theme from '../theme';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="App">
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/" component={HelloWorld} />
          </Switch>
        </MuiThemeProvider>
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
