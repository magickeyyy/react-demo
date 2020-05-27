import React, { Component } from 'react'
import io from 'socket.io-client'
const socket = io('ws://localhost:3001')
socket.on('recvmsg', data => {
    console.log(data)
})

class Msg extends Component {
    componentDidMount() {
        socket.emit('sendmsg', {code:12})
    }
    render() {
        return (
            <div>
                Msg
            </div>
        )
    }
}

export default Msg