import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTimestamp } from '../../utils/Utils'
import { Link } from 'react-router-dom'
import * as commentActions from '../../actions/commentActions'
import ThumbsUp from '../../images/thumbs-up.png'
import ThumbsDown from '../../images/thumbs-down.png'

class PostComment extends Component {

  onCommentDelete = (comment) => {
    let parentId = comment.parentId
    this.props.deleteComment(comment.id, () => {
      this.props.history.push(`/post/${parentId}`)
      this.props.fetchCommentForPost(comment.parentId)      
    })
  }

  render() {
    return (
      <div>
        {this.props.comments.map(comment => (
          <div className="comment" key={comment.id}>
            <div>
              <p>{comment.body}</p>
              <div className="comment-author"><p> by <b>{comment.author}</b> at {formatTimestamp(comment.timestamp)}</p></div>
              <div className="post-likes">
                <img src={ThumbsUp} width="28" height="28" onClick={() => {
                  this.props.voteComment(comment.id, comment.parentId, "upVote")
                }} />
                <img src={ThumbsDown} width="28" height="28" onClick={() => {
                  this.props.voteComment(comment.id, comment.parentId, "downVote")
                }} />
                {comment.voteScore} votes
                </div>
            </div>
            <div className="button-action">
              <Link to={`/${this.props.category}/${comment.parentId}/${comment.id}/edit`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => this.onCommentDelete(comment)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return { posts }
}

export default connect(mapStateToProps, commentActions)(PostComment)
