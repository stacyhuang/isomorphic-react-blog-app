import React, { PropTypes } from 'react';
import { connect } from "react-redux";
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
    return (
      <LinkContainer to={`/posts/${post.id}`} key={post.id}>
        <ListGroupItem>{ post.title }</ListGroupItem>
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

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
};

export default connect(mapStateToProps, null)(PostList);
