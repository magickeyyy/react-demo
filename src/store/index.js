/*
 * @Author: magckeyyy
 * @Date: 2019-12-19 16:38:51
 * @Description: 
 * @Attention: 
 */
import { createStore, combineReducers, compose } from 'redux'
import reducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        reducer,
    }),
    composeEnhancers()
);

export default store;