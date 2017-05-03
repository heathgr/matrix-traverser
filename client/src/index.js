/* eslint global-require: 0 */
/* eslint no-underscore-dangle: 0 */
/**
 * index.js is the entry point for the app.  It performs the following actions:
 * - It sets up hot reloading. // TODO make sure this only happens on dev builds.
 * - It creates the redux store and applies the saga middleware
 * - It makes sure that the store gets passed to react.
 * - It executes the start saga.
 * - It renders the root react element.
 * @module _index
 * */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import Main from './containers/Main';
import root from './reducers/root';
import start from './sagas/start';

const sagaMiddleWare = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  root,
  composeEnhancers(
    applyMiddleware(sagaMiddleWare),
  )
);

delete AppContainer.prototype.unstable_handleError;

function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
}

window.onload = () => {
  sagaMiddleWare.run(start);
  render(Main);
};

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/Main', () => {
    const NewMain = require('./containers/Main').default;

    render(NewMain);
  });
}
