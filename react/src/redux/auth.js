import axios from '../request'

const STATE = {
    isAuth: false,
    username: '',
    role: '',
    avatar: '',
    userid: ''
}
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

export function auth(state = STATE, { type, payload }) {
    switch(type) {
        case LOGIN:
            return { ...state, ...payload, isAuth: true };
        case LOGOUT:
            return STATE;
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
        axios.get('user/logout', data)
            .then(res => {
                dispatch({ type: LOGOUT })
            })
    }
}
export function register(data) {
    return dispatch => {
        return axios.post('user/register', data)
            .then(res => {
                if(res.success) dispatch({ type: LOGIN, payload: res.data })
                return res.success;
            })
    }
}