import path from 'path';
import fs from 'fs';
import express from 'express';
import _ from 'lodash';

import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';

import { fetchPosts } from "../common/actions";
import configureStore from '../common/store/configureStore';
import routes from '../common/routes';

const app = express();
const port = process.env.PORT || 8000;
const isDev = process.env.NODE_ENV !== 'production';

const templatePath = path.join(__dirname, 'template.html');
const templateSource = fs.readFileSync(templatePath);
const template = _.template(templateSource);

if (isDev) {
  // use the middleware to set up hot module reloading via webpack
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static('dist'));

// fired every time the server side receives a request
app.use(handleRender);

function handleRender(req, res) {
  // Todo: query mock API for initial state asynchronously
  const initialState = {};

  // create a new Redux store instance
  const store = configureStore(initialState);

  // match the routes to the url
  match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      return res.status(500).send(error.message);
    } else if (redirectLocation) {
      return res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      store.dispatch(fetchPosts())
        .then(() => {
          // render the component to a string
          const html = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );
          // grab the initial state from our Redux store
          const finalState = JSON.stringify(store.getState());

          // send the rendered page back to the client
          res.status(200).send(template({ html, finalState, isDev }))
        })
    } else {
      return res.status(404).send('Not found');
    }

  })
}

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}.`);
  }
});
