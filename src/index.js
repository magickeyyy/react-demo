import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import todoApp from './reducers'
import App from './components/App'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(todoApp, /* preloadedState, */ composeEnhancers())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)