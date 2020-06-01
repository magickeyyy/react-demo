import axios from '../request'
import { api_user } from '../api'

const STATE = {
    username: '',
    role: 'STAFF',
    userid: '',
    avatar: ''
}
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const UPDATE = 'UPDATE'
const REPAIR = 'REPAIR'

export function auth(state = STATE, { type, payload }) {
    switch(type) {
        case LOGIN:
            return { ...state, ...payload };
        case LOGOUT:
            return STATE;
        case UPDATE:
            return { ...state, ...payload };
        case REPAIR:
            return { ...payload }
        default:
            return state;
    }
}

export function login(data) {
    return dispatch => axios.post(api_user.login, data)
                            .then(res => {
                                if(res.success) {
                                    dispatch({ type: LOGIN, payload: res.data })
                                    return true;
                                } else {
                                    return false;
                                }
                            })
        
}
export function logout() {
    return dispatch => {
        return axios
                    .get(api_user.logout)
                    .then(res => {
                        dispatch({ type: LOGOUT })
                    })
    }
}
export function register(data) {
    return dispatch => {
        return axios.post(api_user.register, data)
                    .then(res => {
                        if(res.success) dispatch({ type: LOGIN, payload: res.data })
                        return res.success;
                    })
    }
}
export function update(data) {
    return dispatch => {
        return axios.post(api_user.update, data)
                    .then(res => {
                        if(res.success) {
                            dispatch({ type: UPDATE, payload: res.data })
                        }
                    })
    }
}
// 根据cookie查询userinfo，刷新页面重置redux
export function repairAuthByCookie(data) {
    return dispatch => {
        return axios.post(api_user.info, data)
                    .then(res => {
                        if(res.success) {
                            dispatch({ type: REPAIR, payload: res.data })
                        }
                        return res.success;
                    })
    }
}