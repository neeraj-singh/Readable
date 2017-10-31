import * as API from '../utils/NetworkAPI'
import * as Types from './actionTypes.js';

export const fetchCategories = () => {
  return (dispatch) => {
    API.fetchCategories().then(res => {
      dispatch({ type: Types.FETCH_CATEGORY, res })
    })
  }
}
