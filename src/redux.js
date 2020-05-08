import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const STATE = 10;
// 管理action.type
const ADD = '+';
const DECREASE = '-';

// reducer:根据action.type操作state&&return新state
function counter(state = STATE, action) {
    switch(action.type) {
        case ADD:
            return ++state;
        case DECREASE:
            return --state;
        default:
            return state;
    }
}

const store = createStore(
    counter, 
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

// action creator
export function add() {
    return { type: ADD }
}
export function decrease() {
    return { type: DECREASE }
}
// 异步dispatch redux必须使用thunk中间件，否则报错Error: Actions must be plain objects. Use custom middleware for async actions.
export function addAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(add())
        }, 2000)
    }
}

export default store;