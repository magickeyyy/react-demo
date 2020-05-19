import React, { Component } from 'react'
import { WingBlank, WhiteSpace } from 'antd-mobile';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import Img from '../../components/Img'
import REG from '../../assets/reg'
import axios from '../../request'

class Login extends Component {
    state = {
        error: {
            username: false,
            pwd: false
        },
        form: {
            username: '',
            pwd: ''
        }
    }
    onChange = (value, key) => {
        if(REG[key].reg.test(value)) {
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
            Toast.fail(REG[key].msg[0])
        }
    }
    login = () => {
        axios
            .post('/user/login', this.state.form)
            .then(res => {
                console.log(res)
            })
    }
    register = () => {
        this.props.history.push('/register')
    }
    render() {
        return (
            <WingBlank>
                <WhiteSpace size="lg"></WhiteSpace>
                <Img></Img>
                <WhiteSpace size="lg"></WhiteSpace>
                <List>
                    <InputItem type="text" 
                        placeholder="请输入用户名"
                        clear={true} 
                        onChange={value=>this.onChange(value,'username')}
                        onErrorClick={this.onErrorClick.bind(this,'username')}
                        error={this.state.error.username}>用户名：</InputItem>
                </List>
                <List>
                    <InputItem type="password" 
                        placeholder="请输入密码"
                        clear={true} 
                        onChange={value=>this.onChange(value,'pwd')}
                        onErrorClick={this.onErrorClick.bind(this,'pwd')}
                        error={this.state.error.pwd}>密&emsp;码：</InputItem>
                </List>
                <WhiteSpace size="lg"></WhiteSpace>
                <Button type="primary" onClick={this.login}>登录</Button>
                <WhiteSpace size="lg"></WhiteSpace>
                <Button type="primary" onClick={this.register}>注册</Button>
            </WingBlank>
        )
    }
}

export default Login