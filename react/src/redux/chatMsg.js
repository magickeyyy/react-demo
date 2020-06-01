import axios from 'axios'
import io from 'socket.io-client'
import Cookies from 'js-cookie'
import { api_chat } from '../api'

const websocket = io('ws://localhost:3001')
// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
	chatmsg:[],
	unread:0
}

export function chatMsg(state = initState, { type, payload }) {
    switch(type) {
        case MSG_LIST:
            return { ...state, chatmsg: payload.chatmsg, unread: payload.unread }
        case MSG_RECV:
            return { ...state, chatmsg: [ ...state.chatmsg, payload.chatmsg ] };
        case MSG_READ:
            return state;
        default:
            return state;
    }   
}

export function getMsgList(to) {
    return dispatch => {
        const from = Cookies.get('userid')
        return axios
                    .post(api_chat.list, {from, to})
                    .then(res => {
                        if(res.success) {
                            dispatch({ type: MSG_LIST, payload: res.data })
                        }
                        return res.success
                    })
    }
}

export function getAllMsgList() {
    return dispatch => {
        const userid = Cookies.get('userid')
        return axios
                    .post(api_chat.allMsgList, {userid})
                    .then(res => {
                        if(res.success) {
                            const unread = res.data.filter(v => v&&v.to===userid&&!v.read).length;
                            dispatch({ type: MSG_LIST, payload: { chatmsg: res.data, unread }})
                        }
                        return res.success
                    })
    }
}

export function sendMsg(from, to, msg) {
    console.log(from, to, msg)
    return dispatch => {
        websocket.emit('sendmsg', from, to, msg)
    }
}
export function receiveMsg() {
    return dispatch => {
        websocket.on('receivemsg', data => {
            console.log(data)
            dispatch({ type: MSG_RECV, payload: {chatmsg:data} })
        })
    }
}