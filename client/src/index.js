/* eslint global-require: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import MainContainer from './containers/MainContainer';
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
  render(MainContainer);
};

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/MainContainer', () => {
    const NewMainContainer = require('./containers/MainContainer').default;

    render(NewMainContainer);
  });
}
