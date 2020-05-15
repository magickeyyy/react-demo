import axios from '../request'
const STATE = {
    isAuth: false,
    username: '',
    role: ''
}

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

export function auth(state = STATE, { type, payload }) {
    switch(type) {
        case LOGIN:
            return { ...state, isAuth: true,  ...payload };
        case LOGOUT:
            return state;
        default:
            return state;
    }
}

export function login(data) {
    return dispatch => {
        axios.post('user/login', data)
            .then(res => {
                dispatch({ type: LOGIN, payload: res.data })
            })
    }
}
export function logout(data) {
    return dispatch => {
        axios.post('user/logout', data)
            .then(res => {
                dispatch({ type: LOGOUT })
            })
    }
}
export function register(data) {
    return dispatch => {
        axios.post('user/register', data)
            .then(res => {
                dispatch({ type: LOGIN, payload: res.data })
            })
    }
}