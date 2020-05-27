import axios from '../request'
import { api_user } from '../api'

const STATE = {
    roleList: []
}
const ROLELIST = 'ROLELIST'

export function chat(state = STATE, { type, payload }) {
    switch(type) {
        case ROLELIST:
            return { ...state, ...payload };
        default:
            return STATE;
    }
}

export function getRoleList(data) {
    return dispatch => axios
                        .get(api_user.roleList + '/' + data)
                        .then(res => {
                            if(res.success) {
                                dispatch({ type: ROLELIST, payload: { roleList: res.data } })
                            }
                            return res.success
                        })
}