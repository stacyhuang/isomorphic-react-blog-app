import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import PostList from './components/PostList';
import PostItem from './components/PostItem';

export default (
  <Route path="/" component={App}>
    <Route path="/posts" component={PostList} />
  </Route>
)
