import * as API from '../utils/NetworkAPI'
import * as Types from './actionTypes.js';

export const fetchAllPosts = () => {
  return (dispatch) => {
    API.fetchPosts().then(posts => {
      dispatch({ type: Types.FETCH_POSTS, posts })
    })
  }
}

export const fetchPostsByCategory = (category) => {
  return (dispatch) => {
    API.fetchPostsByCategory(category).then(posts => {
      dispatch({ type: Types.GET_CATEGORY_POSTS, posts })
    })
  }
}

export const createPost = (post, callback) => {
  return (dispatch) => {
    API.addPost(post).then(() => callback())
    dispatch({ type: Types.ADD_POST, post })
  }
}

export const updatePost = (postId, title, body, callback) => {
  return (dispatch) => {
    API.updatePost(postId, title, body).then(updatedPost => {
      dispatch({ type: Types.UPDATE_POST, updatedPost, postId })
    }).then(() => callback())
  }
}

export const deletePost = (postId, callback) => {
  return dispatch => {
    API.deletePost(postId).then(() => callback())
    dispatch({ type: Types.DELETE_POST, postId })
  }
}

export const votePost = (postId, option) => {
  return (dispatch) => {
    API.votePost(postId, option).then(post => {
      dispatch({ type: Types.VOTE_POST, postId, option })
    })
  }
}

export const sortPost = (sortKey) => {
  return dispatch => {
    dispatch({ type: Types.SORT_POST, sortKey })
  }
}
