/*
 * @Author: magckeyyy
 * @Date: 2019-12-19 16:39:23
 * @Description: 
 * @Attention: 
 */
import {CHANGE_INPUT_VALUE,ADD_TODO_ITEM,DELETE_TODO_ITEM} from  './actionTypes'

const defaultState = {
    value: 'aa',
    list: ['1', '2']
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_INPUT_VALUE:
        case ADD_TODO_ITEM:
        case DELETE_TODO_ITEM:
        default:
            return state;
    }
}