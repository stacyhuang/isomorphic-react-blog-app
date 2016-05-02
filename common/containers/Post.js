import React, { PropTypes } from 'react'
import { connect } from "react-redux";
import * as actions from "../actions";

class Post extends React.Component {
  render () {
    const { post } = this.props;
    const { title, content } = post;

    return (
      <div className="wrapper">
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    )
  }
}

function getPost(posts, params) {
  return posts.find((post) => {
    return post.id === parseInt(params.id);
  })
}

function mapStateToProps(state, ownProps) {
  return {
    post: getPost(state.posts, ownProps.params)
  };
};

export default connect(mapStateToProps, null)(Post);
