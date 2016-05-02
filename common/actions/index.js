import axios from 'axios';

let nextPostId = 0;
const baseUrl = 'http://localhost:3000';

function fetchPostsFromDb(post) {
  return axios.get(`${baseUrl}/posts`)
}

export function fetchPosts(post) {
  return (dispatch) => {
    return fetchPostsFromDb().then(
      (response) => {
        dispatch({
          type: "FETCH_POST_SUCCESS",
          posts: response.data
        });
      }
    )
  }
}

export function publishPost(post) {
  return (dispatch) => {
    axios.post(`${baseUrl}/posts`, {
      id: nextPostId++,
      title: post.title,
      content: post.content
    })
      .then((response) => {
        dispatch({
          type: "SAVE_POST_SUCCESS",
          post: response.data
        });
      })
      .catch((response) => {
        dispatch({
          type: "SAVE_POST_FAILURE",
          error: response
        });
      });
  }
}
