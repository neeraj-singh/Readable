import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Index from './components/index';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../src/reducers/index'
import thunk from 'redux-thunk'

// console.log(reducer)

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger, thunk)
    )
  )

// console.log(store.getState())

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Index />
    </Provider>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();

