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
function logined(payload) {
    return { type: LOGIN, payload }
}
function logouted(payload) {
    return { type: LOGOUT, payload }
}
export function login(data) {
    return dispatch => {
        axios.post('user/login', data)
            .then(res => {
                
            })
    }
}
export function logout(payload = {}) {
    return { type: LOGOUT, payload };
}
export function register(data) {
    return dispatch => {
        axios.post('user/register', data)
            .then(res => {
                
            })
    }
}