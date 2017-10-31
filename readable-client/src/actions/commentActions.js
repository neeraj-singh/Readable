import * as API from '../utils/NetworkAPI'
import * as Types from './actionTypes.js';

export const fetchCommentForPost = (parentId) => {
  return (dispatch) => {
    API.fetchComment(parentId).then(comments => {
      dispatch({ type: Types.FETCH_COMMENTS, parentId, comments })
    })
  }
}

export const createComment = (comment, parentId, callback) => {
  return (dispatch) => {
    API.addComment(comment).then(comment => {
      dispatch({ type: Types.ADD_COMMENT, parentId, comment })
    }).then(() => callback())
  }
}

export const deleteComment = (commentId, callback) => {
  return (dispatch) => {
    API.deleteComment(commentId).then(() => callback())
    dispatch({ type: Types.DELETE_COMMENT, commentId })
  }
}

export const voteComment = (commentId, parentId, option) => {
  return (dispatch) => {
    API.voteComment(commentId, option).then(updatedComment => {
      dispatch({ type: Types.VOTE_COMMENT, updatedComment, commentId, parentId })
    })
  }
}

export const updateComment = (commentId, parentId, timestamp, body, callback) => {
  return (dispatch) => {
    API.updateComment(commentId, timestamp, body)
      .then(updatedComment => {
        dispatch({ type: Types.UPDATE_COMMENT, updatedComment, commentId, parentId })
      }).then(() => callback())
  }
}
