export default function posts(state = [], action) {
  switch(action.type) {
    case "FETCH_POST_SUCCESS":
      return action.posts;

    case "SAVE_POST_SUCCESS":
      return state.concat([action.post]);

    default:
      return state
  }
}
