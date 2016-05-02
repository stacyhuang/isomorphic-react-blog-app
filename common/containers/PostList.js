import React, { PropTypes } from 'react';
import { connect } from "react-redux";
import { fetchPost } from "../actions";
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class PostList extends React.Component {
  render () {
    const postNodes = [];

    this.props.posts.map((post) => {
      postNodes.push(
        <ListGroupItem
          key={post.id}
          href={`/posts/${post.id}`}>
          { post.title }
        </ListGroupItem>
      )
    });

    return (
      <ListGroup className="wrapper">
        {postNodes}
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
