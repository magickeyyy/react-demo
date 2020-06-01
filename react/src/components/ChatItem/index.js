import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { List } from 'antd-mobile'
import axios from '../../request'
import { api_user } from '../../api'

@withRouter
class ChatItem extends Component {
    state ={
        avatar: '',
        username: ''
    }
    componentDidMount() {
        axios
            .post(api_user.querydUserInfoById, {userid: this.props.userid})
            .then(res => {
                if(res.success) {
                    const { username, avatar } = res.data;
                    this.setState({
                        username,
                        avatar
                    })
                }
            })
    }
    render() {
        const Item = List.Item;
        const Brief = Item.Brief;
        return (
            <List onClick={()=>this.props.history.push('/chat/'+this.props.userid)}>
                <Item thumb={this.state.avatar}>{this.props.lastMsg}<Brief>{this.state.username}</Brief></Item> 
            </List>
        )
    }
}

export default ChatItem;