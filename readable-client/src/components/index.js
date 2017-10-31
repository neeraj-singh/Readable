import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route, withRouter, Switch } from 'react-router-dom'
import '../App.css';
import { connect } from 'react-redux'
import { sortPost } from '../actions/postActions'
import { fetchCategories } from '../actions/categoryActions'
import NewPost from './post/NewPost'
import NewComment from './comment/NewComment'
import EditComment from './comment/EditComment'
import EditPost from './post/EditPost'
import HomePage from './home/HomePage'
import PostDetail from './post/PostDetail'
import LogoImage from '../images/readable-logo.png'
import NewPostImage from '../images/newpost.png'

class Index extends Component {
  static propTypes = {
    posts: PropTypes.array,
    categories: PropTypes.array
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const { categories, sortPost } = this.props

    return (
      <div className="App">
        <div className="nav-header">
          <Link className="home" to="/">
            <img src={LogoImage} width="200" height="48" />
          </Link>
          <Link className="new-post" to="/new">
            <img src={NewPostImage} width="40" height="40" />
          </Link>
        </div>

        <div className="filters">
          <div className="category-changer">
            <p>Choose Category</p>
            {categories && categories.map(category => (
              <Link key={category.name} to={`/${category.path}`}>
                <button>{category.name}</button>
              </Link>
            ))}
          </div>

          <div className="sort-changer">
            <p>Sort By</p>
            <button onClick={() => sortPost("timestamp")}>Time</button>
            <button onClick={() => sortPost("voteScore")}>Vote Score</button>
          </div>
        </div>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/new" component={NewPost} />
          <Route exact path="/:category" component={HomePage} />
          <Route exact path="/:category/:postId" component={PostDetail} />
          <Route path="/:category/:postId/edit" component={EditPost} />
          <Route path="/:category/:postId/comment" component={NewComment} />
          <Route path="/:category/:postId/:commentId/edit" component={EditComment} />
        </Switch>

      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories
  }
}

export default withRouter(connect(mapStateToProps, {
  sortPost,
  fetchCategories
})(Index))
