import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, WhiteSpace, List, Modal } from 'antd-mobile';
import axios from '../../../request'
import { api_user } from '../../../api'
import { logout } from '../../../redux/auth'

@connect(
    undefined,
    { logout }
)
class Me extends Component {
    state = {
        userinfo: {}
    }
    componentDidMount() {
        axios
            .post(api_user.allinfo)
            .then(res => {
                if(res.success) {
                    this.setState({
                        userinfo: res.data
                    })
                }
            })
    }
    logout = () => {
        Modal.alert('注销', <div>确认注销登录吗？</div>, [
            { text: '取消', onPress: () => undefined },
            { text: '确认', onPress: () => this.props.logout()
                                                .then(() => {
                                                    this.props.history.push('/login')
                                                }) },
          ])
    }
    render() {
        const { username, avatar, title, money, company, desc } = this.state.userinfo
        return (
            <div>
                <Result
                    imgUrl={avatar}
                    title={username}
                    message={title}
                />
                <WhiteSpace />
                <List renderHeader={() => '简介'}>
                    <List.Item multipleLine>{title}</List.Item>
                    <List.Item>薪资：{money}</List.Item>
                    {company&&<List.Item>{company}</List.Item>}
                    <List.Item multipleLine>
                        <pre style={{margin:0}}>{desc}</pre>
                    </List.Item>
                </List>
                <WhiteSpace size="lg" />
                <List>
                    <List.Item onClick={this.logout} arrow="horizontal">退出</List.Item>
                </List>
            </div>
        )
    }
}

export default Me