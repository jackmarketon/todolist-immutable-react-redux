
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware,
} from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import reducers from 'reducers';
import { RESET_DATA } from 'config/types';
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

  const initialState = {};

  // See https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992
  const rootReducer = (state, action) => {
    if (RESET_DATA === action.type) {
      state = { ...initialState }; // eslint-disable-line no-param-reassign
    }
    return reducers(state, action);
  };

  const middleware = [
    thunk,
    routerMiddleware(history),
  ];

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeWithDevTools(
      applyMiddleware(...middleware)
    )
  );

  const render = (Component) => {
    ReactDOM.render(
      <Provider store={store}>
        {/* ConnectedRouter will use the store from provider automagically */}
        <ConnectedRouter history={history}>
          <AppContainer>
            <Component />
          </AppContainer>
        </ConnectedRouter>
      </Provider>,
      document.querySelector('[todolist]')
    );
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
