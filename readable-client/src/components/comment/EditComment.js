import _ from 'lodash'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as commentActions from '../../actions/commentActions'

class EditComment extends Component {
  
  componentDidMount() {
    this.props.fetchCommentForPost(this.props.match.params.postId)
  }

  updateComment = (e) => {
    e.preventDefault()
    const commentId = this.props.comment.id
    const postId = this.props.comment.parentId
    const timestamp = Date.now()
    const body = e.target.body.value

    if (body === "") {
      alert('Comment cannot be empty')
    } else {
      this.props.updateComment(commentId, postId, timestamp, body,
        () => this.props.history.push(`/post/${postId}`))
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.updateComment}>
          <h2>Edit Comment</h2>
          <ul className="form-style-1">
            <li>
              <label>Comment <span className="required">*</span></label>
              <textarea defaultValue={this.props.comment.body} name="body" id="field5" className="field-long field-textarea"></textarea>
            </li>
            <button>Update</button>
            <Link to={`/post/${this.props.comment.parentId}`}>
              <button>Cancel</button>
            </Link>
          </ul>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  return {
    comment: _.find(comments[match.params.postId], { id: match.params.commentId })
  }
}

export default connect(mapStateToProps, commentActions)(EditComment)
