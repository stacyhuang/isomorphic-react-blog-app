require('../common/styles');

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from '../common/store/configureStore';
import routes from '../common/routes';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  rootElement
);
