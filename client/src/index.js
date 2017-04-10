/* eslint global-require: 0 */
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
import Main from './components/Main';
import root from './reducers/root';
import start from './sagas/start';

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
  root,
  compose(
    applyMiddleware(sagaMiddleWare),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

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
  module.hot.accept('./components/Main', () => {
    const NewMain = require('./components/Main').default;

    render(NewMain);
  });
}
