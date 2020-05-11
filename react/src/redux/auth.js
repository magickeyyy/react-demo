const STATE = {
    login: false,
    username: '',
}

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

export function auth(state = STATE, { type, payload }) {
    switch(type) {
        case LOGIN:
            return { ...state, login: true,  username: payload };
        case LOGOUT:
            return { ...state, login: false, username: '' };
        default:
            return state;
    }
}
export function login(payload = {}) {
    return { type: LOGIN, payload };
}
export function logout(payload = {}) {
    return { type: LOGOUT, payload };
}