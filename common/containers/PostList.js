import React from 'react';
import { connect } from "react-redux";
import moment from "moment";
import _ from 'lodash';
import { fetchPosts } from "../actions";
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class PostList extends React.Component {
  static loadAsyncData(dispatch) {
    return dispatch(fetchPosts())
  }

  componentDidMount() {
    this.constructor.loadAsyncData(this.props.dispatch)
  }

  renderPost(post) {
    const { title, timestamp } = post;
    const time = moment(timestamp).fromNow();

    return (
      <LinkContainer to={`/posts/${post.id}`} key={post.id}>
        <ListGroupItem header={title}>Published {time}</ListGroupItem>
      </LinkContainer>
    )
  }

  render() {
    return (
      <ListGroup className="wrapper">
        {this.props.posts.map(this.renderPost)}
      </ListGroup>
    );
  }
}

function getSortedPosts(posts) {
  return _.orderBy(posts, ['timestamp'], ['desc']);
}

function mapStateToProps(state) {
  return {
    posts: getSortedPosts(state.posts)
  };
};

export default connect(mapStateToProps, null)(PostList);
