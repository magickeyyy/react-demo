import React, { Component } from 'react'
import { WingBlank, WhiteSpace } from 'antd-mobile';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import Img from '../../components/Img'

const REG = {
    username: /^[a-zA-Z0-9_-]{4,16}$/,
    pwd: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
}
const ERROR_MSG = {
    username: '用户名必须是4到16位字符，包括字母、数字、下划线、减号',
    pwd: '密码必须是最少6位字符，包括至少1个大写字母、1个小写字母、1个数字、1个特殊字符'
}

class Register extends Component {
    state = {
        error: {
            username: false,
            pwd: false,
            confirm: false,
        },
        form: {
            username: '',
            pwd: ''
        }
    }
    onChange = (value, key) => {
        if(REG[key].test(value)) {
            this.setState({
                form: {
                    ...this.state.form,
                    [key]: value
                },
                error: {
                    ...this.state.error,
                    [key]: false
                }
            })
        } else {
            this.setState({
                form: {
                    ...this.state.form,
                    [key]: value
                },
                error: {
                    ...this.state.error,
                    [key]: true
                }
            })
        }
    }
    onErrorClick(key) {
        if(this.state.error[key]) {
            Toast.fail(ERROR_MSG[key])
        }
    }
    render() {
        return (
            <WingBlank>
                <WhiteSpace size="lg"></WhiteSpace>
                <Img></Img>
                <WhiteSpace size="lg"></WhiteSpace>
                <List>
                    <InputItem type="text" placeholder="请输入用户名"
                        clear={true} onChange={value=>this.onChange(value,'username')}
                        onErrorClick={this.onErrorClick.bind(this,'username')}
                        error={this.state.error.username}>用户名：</InputItem>
                </List>
                <List>
                    <InputItem type="password" placeholder="请输入密码"
                        clear={true} onChange={value=>this.onChange(value,'pwd')}
                        onErrorClick={this.onErrorClick.bind(this,'pwd')}
                        error={this.state.error.pwd}>密&emsp;码：</InputItem>
                </List>
                <WhiteSpace size="lg"></WhiteSpace>
                <Button type="primary" onClick={this.login}>登录</Button>
                <WhiteSpace size="lg"></WhiteSpace>
                <Button type="primary" onClick={this.logout}>注册</Button>
            </WingBlank>
        )
    }
}

export default Register