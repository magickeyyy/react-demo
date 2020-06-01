import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WingBlank, WhiteSpace, List, InputItem, Button } from 'antd-mobile';
import Img from '../../components/Img'
import { login } from '../../redux/auth'
import ImoocForm from '../../components/ImoocForm'

@connect(
    state => state.auth,
    { login }
)
@ImoocForm
class Login extends Component {
    login = () => {
        this.props.login(this.props.state.form)
            .then(res => {
                if(res) {
                    let url = this.props.role === 'BOSS'? '/staff': '/boss';
                    if(!this.props.avatar) {
                        url = this.props.role.toLowerCase() + 'info'
                    } else {
                        url = '/dashboard' + url
                    }
                    this.props.history.push(url)
                }
            })
    }
    register = () => {
        this.props.history.push('/register')
    }
    render() {
        return (
            <div>
                <WingBlank>
                    <WhiteSpace size="lg"></WhiteSpace>
                    <Img src="logo"></Img>
                    <WhiteSpace size="lg"></WhiteSpace>
                    <List>
                        <InputItem type="text" 
                            placeholder="请输入用户名"
                            clear={true} 
                            onChange={value=>this.props.onChange(value,'username')}
                            onErrorClick={()=>this.props.onErrorClick('username')}
                            error={this.props.state.error.username}>用户名：</InputItem>
                    </List>
                    <List>
                        <InputItem type="password" 
                            placeholder="请输入密码"
                            clear={true} 
                            onChange={value=>this.props.onChange(value,'pwd')}
                            onErrorClick={()=>this.props.onErrorClick('pwd')}
                            error={this.props.state.error.pwd}>密&emsp;码：</InputItem>
                    </List>
                    <WhiteSpace size="lg"></WhiteSpace>
                    <Button type="primary" onClick={this.login}>登录</Button>
                    <WhiteSpace size="lg"></WhiteSpace>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login