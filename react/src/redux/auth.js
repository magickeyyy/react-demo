const STATE = {
    login: false,
    username: '',
}

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

function login(state = STATE, { type, payload }) {
    switch(type) {
        case LOGIN:
            return { ...state, login: true,  username: payload }
        case LOGOUT:
            return { ...state, login: false, username: '' }
    }
}