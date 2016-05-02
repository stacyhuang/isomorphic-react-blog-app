require('../common/styles');

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, match } from 'react-router';
import configureStore from '../common/store/configureStore';
import routes from '../common/routes';
import { fetchPosts } from "../common/actions";

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('root');

match({ history: browserHistory, routes: routes }, (error, redirectLocation, renderProps) => {
  render(
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>,
    rootElement
  )
})
