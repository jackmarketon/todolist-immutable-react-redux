
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware,
} from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import reducers from 'reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RESET_DATA } from 'config/types';
import defaultState from 'config/defaultState';
import App from 'components/app';
import {
  browserSupportsAllFeatures,
  // loadScript,
} from './loadPolyfills';

if (browserSupportsAllFeatures()) {
  main();
} else {
  // loadScript('//.herokuapp.com/static/polyfills.bundle.js', main);
}

function main() {
  // Create a history (using browser history)
  const history = createHistory();

  const initialState = {
    ...defaultState,
  };

  // See https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992
  const rootReducer = (state, action) => {
    if (RESET_DATA === action.type) {
      state = { ...initialState }; // eslint-disable-line no-param-reassign
    }
    return reducers(state, action);
  };

  const middleware = [
    routerMiddleware(history),
  ];

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeWithDevTools(
      applyMiddleware(...middleware)
    )
  );

  const styles = {
    margin: '0 auto',
    maxWidth: '600px',
    border: '1px solid rgb(232, 232, 232)',
  };

  const render = (Component) => {
    ReactDOM.render((
      <MuiThemeProvider>
        <div style={styles}>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <AppContainer>
                <Component />
              </AppContainer>
            </ConnectedRouter>
          </Provider>
        </div>
      </MuiThemeProvider>
    ), document.querySelector('[todolist]'));
  };

  if (module.hot) {
    // Make reducers hot reloadable, see http://stackoverflow.com/questions/34243684/make-redux-reducers-and-other-non-components-hot-loadable
    module.hot.accept('./reducers/', () => {
      store.replaceReducer(require('./reducers/').default); // eslint-disable-line global-require
    });

    module.hot.accept('./components/app', () => {
      const nextApp = require('./components/app').default; // eslint-disable-line global-require
      render(nextApp);
    });
  }

  render(App);
}
