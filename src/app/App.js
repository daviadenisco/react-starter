import React from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { Link, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import TDMView from './pages/TDMView';
import EngagementsView from './pages/Engagements/EngagementsView';
import Profiles from './pages/Profiles/ProfilesView';
import Main from './pages/Main';
import configureStore, { history } from '../redux/configureStore';
import theme from '../theme';

import {
  ENGAGEMENTS_PAGE,
  PROFILES_PAGE,
  TDMVIEW_PAGE,
  MAIN_PAGE,
} from '../config';

const store = configureStore();

// const Unauth = () => <div>NOT AUTHORIZED</div>;
// const Auth = () => <div>AUTHORIZED</div>;

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="App">
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route exact path={TDMVIEW_PAGE} component={TDMView} />
            <Route exact path={ENGAGEMENTS_PAGE} component={EngagementsView} />
            <Route exact path={PROFILES_PAGE} component={Profiles} />
            <Route exact path={MAIN_PAGE} component={Main} />
          </Switch>
        </MuiThemeProvider>
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
