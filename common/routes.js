import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import PostList from './containers/PostList';
import Post from './containers/Post';
import Draft from './containers/Draft';

export default (
  <Route component={App}>
    <Route path="/" component={PostList} />
    <Route path="/posts/:id" component={Post} />
    <Route path="/draft" component={Draft} />
  </Route>
)
