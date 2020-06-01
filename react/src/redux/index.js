import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { auth } from './auth'
import { chat } from './chat'
import { chatMsg } from './chatMsg'

export default createStore(
    combineReducers({ auth, chat, chatMsg }),
    compose(
        applyMiddleware(thunk),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // 没装redux devtools的浏览器中会造成redux报错
        window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
)