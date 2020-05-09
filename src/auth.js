const LOGIN = 'LOGIN'
const LOGUOT = 'LOGUOT'
const STATE = { isAuth: false, user: 'magickeyyy'}

export function auth(state = STATE, { type }) {
    switch(type) {
        case LOGIN:
            return { ...state, isAuth: true }
        case LOGUOT:
            return { ...state, isAuth: false }
        default:
            return state;
    }
}
export function login() {
    return { type: LOGIN }
}
export function logout() {
    return { type: LOGUOT }
}