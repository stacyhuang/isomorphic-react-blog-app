require('../common/styles');

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, match } from 'react-router';
import configureStore from '../common/store/configureStore';
import routes from '../common/routes';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;
// Create Redux store with initial state
const store = configureStore(initialState);
const rootElement = document.getElementById('root');

// Webpack will compile our bundle file into dist/bundle.js.
// When the page loads, the bundle file will be started up and
// ReactDOM.render() will hook into the data-react-id attributes
// from the server-rendered HTML. This will connect our newly-started React
// instance to the virtual DOM used on the server. Since we have the same
// initial state for our Redux store and used the same code for all our view
// components, the result will be the same real DOM.
match({ history: browserHistory, routes: routes }, (error, redirectLocation, renderProps) => {
  render(
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>,
    rootElement
  )
})
