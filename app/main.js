
import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppContainer } from 'react-hot-loader';
import reducers from 'reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import defaultState from 'config/defaultState';
import App from 'components/app';
import Todo from 'models/todo';
import TodoList from 'models/todoList';
import {
  browserSupportsAllFeatures,
  // loadScript,
} from './loadPolyfills';

if (browserSupportsAllFeatures()) {
  main();
} else {
  // loadScript('//.herokuapp.com/static/polyfills.bundle.js', main);
}

function reviver(key, value) {
  if ('todos' === key) {
    return new TodoList(value).map((item) => new Todo(item));
  }
  return Immutable.Iterable.isIndexed(value) ?
    value.toList() :
    value.toMap();
}

function main() {
  // Create a history (using browser history)
  let initialState = false;
  if (localStorage) {
    const stateInStorage = localStorage.getItem('todos');
    if (stateInStorage) {
      initialState = Immutable.fromJS(stateInStorage, reviver);
    }
  }
  if (!initialState) {
    initialState = Immutable.fromJS(defaultState, reviver);
  }

  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools({
      serialize: { immutable: Immutable },
    })()
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
            <AppContainer>
              <Component />
            </AppContainer>
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
