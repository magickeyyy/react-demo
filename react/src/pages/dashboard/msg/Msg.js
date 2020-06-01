import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChatItem from '../../../components/ChatItem'

@connect(
    store => ({...store.chatMsg,...store.auth})
)
class Msg extends Component {
    render() {
        let msgGroup = {};
        this.props.chatmsg.map(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid]||[];
            msgGroup[v.chatid].push(v);
            return v;
        })
        const chatList = Object.values(msgGroup)
        return (
            <div>
                {chatList.map((v, i) => {
                    const last = v[v.length-1]
                    const opposite = this.props.userid===last.from?last.to:last.from
                    return <ChatItem key={i} lastMsg={last&&last.content} userid={opposite}></ChatItem>
                })}
            </div>
        )
    }
}

export default Msg