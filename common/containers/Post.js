import React from 'react'
import { connect } from "react-redux";
import { fetchPosts } from "../actions";

class Post extends React.Component {
  static loadAsyncData(dispatch) {
    return dispatch(fetchPosts())
  }

  componentDidMount() {
    this.constructor.loadAsyncData(this.props.dispatch)
  }

  render() {
    const { title, content } = this.props.post;

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
