import { combineReducers } from 'redux'

import posts from './post'
import categories from './categories'
import comments from './comments'

export default combineReducers({
  posts,
  categories,
  comments
})