import React, { Component } from 'react';
import { connect } from 'react-redux'
import { formatTimestamp } from '../../utils/Utils'
import { Link } from 'react-router-dom'
import * as actions from '../../actions/commentActions'
import ThumbsUp from '../../images/thumbs-up.png'
import ThumbsDown from '../../images/thumbs-down.png'

class SinglePost extends Component {
  componentDidMount() {
    this.props.fetchCommentForPost(this.props.post.id)
  }

  render() {
    const { post, comments, votePost, fetchAllPosts } = this.props

    return (
      <div>
        {post && (
          <div className="post">
            <div className="post-description">
              <Link to={`/${post.category}/${post.id}`}>
                <div className="post-title"><h3>{post.title}</h3></div>
              </Link>
              <div className="post-body"><p>{post.body}</p></div>

              <div className="post-likes">
                <img src={ThumbsUp} width="28" height="28" onClick={() => {
                  votePost(post.id, "upVote")
                  fetchAllPosts()
                }} />
                <img src={ThumbsDown} width="28" height="28" onClick={() => {
                  votePost(post.id, "downVote")
                  fetchAllPosts()
                }} />
              </div>
              <div className="post-likes-comments">
                {post.voteScore} votes {comments && comments ? comments.length : 0} comments
              </div>
            </div>
            <div>
              <div className="post-author"><p><b>Category: </b> {post.category}</p></div>
              <div className="post-author"><p><b>Author: </b> {post.author}</p></div>
              <div className="post-author"><p><b>Time: </b> {formatTimestamp(post.timestamp)}</p></div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ comments }, { post }) {
  return {
    comments: comments[post.id]
  }
}

export default connect(mapStateToProps, actions)(SinglePost)
