import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createComment } from '../../actions/commentActions'
import { guid } from '../../utils/Utils'

class NewComment extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const postId = this.props.match.params.postId
    const commendBody = e.target.body.value
    const author = e.target.author.value

    console.log(commendBody)
    if (commendBody === "" || author === "") {
      alert("Both fields are mandatory");
    } else {
      const submitComment = {
        id: guid(),
        parentId: postId,
        timestamp: Date.now(),
        body: commendBody,
        author: author
      }
      this.props.createComment(submitComment, postId,
        () => this.props.history.push(`/post/${postId}`))
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul className="form-style-1">
          <li>
            <label>Name <span className="required">*</span></label>
            <input type="text" name="author" className="field-long" />
          </li>
          <li>
            <label>Comment <span className="required">*</span></label>
            <textarea name="body" id="field5" className="field-long field-textarea"></textarea>
          </li>
          <button>Submit</button>
        </ul>
      </form>
    )
  }
}

function mapStateToProps({ posts, categories }) {
  console.log("state", this.state)
  return {
    posts: posts,
  }
}

// https://stackoverflow.com/questions/42123261/programmatically-navigate-using-react-router-v4
export default connect(mapStateToProps, { createComment })(NewComment)
