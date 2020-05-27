import React, { Component } from 'react'
import { connect } from 'react-redux';
import { WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import { List, InputItem, Button, Radio } from 'antd-mobile';
import Img from '../../components/Img'
import { ROLE } from '../../assets/dictionary'
import axios from '../../request'
import { api_user } from '../../api'
import { register } from '../../redux/auth'
import ImoocForm from '../../components/ImoocForm'
import REG from '../../assets/reg'

@connect(
    state => ({ role: state.auth.role }),
    { register }
)
@ImoocForm
class Register extends Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.queryUsername = this.queryUsername.bind(this);
        this.login = this.login.bind(this);
    }
    login() {
        this.props.history.push('/login')
    }
    register() {
        for(let key in this.props.state.error) {
            if(this.props.state.error[key]) {
                Toast.fail(REG[key].msg[0]);
                return;
            }
        }
        for(let key in this.props.state.form) {
            if(!this.props.state.form[key]) return
        }
        if((!this.props.state.error.pwd && !this.props.state.error.repeatpwd) && (this.props.state.form.pwd !== this.props.state.form.repeatpwd)) {
            Toast.fail('输入的确认密码和密码不一致');
            return;
        }
        const { username, pwd, role } = this.props.state.form;
        this.props.register({ username, pwd, role })
            .then(res => {
                if(res) {
                    this.props.history.push('/' + this.props.role.toLowerCase() + 'info')
                }
            })
    }
    queryUsername() {
        axios
            .get(api_user.username, { username: this.props.state.form.username })
            .then(res => {
                if(res.success && res.data) {
                    Toast.fail('用户名已存在')
                }
            })
    }
    componentDidMount() {
        this.props.onChange(ROLE[0], 'role')
    }
    render() {
        return (
            <WingBlank>
                <WhiteSpace size="lg"></WhiteSpace>
                <Img src="logo"></Img>
                <WhiteSpace size="lg"></WhiteSpace>
                <List>
                    <InputItem type="text" 
                        placeholder="请输入用户名"
                        clear
                        onChange={value=>this.props.onChange(value,'username')}
                        onErrorClick={()=>this.props.onErrorClick('username')}
                        onBlur={this.queryUsername}
                        error={this.props.state.error.username}>用户名：</InputItem>
                </List>
                <List>
                    <InputItem type="password" 
                        placeholder="请输入密码"
                        clear 
                        onChange={value=>this.props.onChange(value,'pwd')}
                        onErrorClick={()=>this.props.onErrorClick('pwd')}
                        error={this.props.state.error.pwd}>密&emsp;码：</InputItem>
                </List>
                <List>
                    <InputItem type="password" 
                        placeholder="请确认密码"
                        clear
                        onChange={value=>this.props.onChange(value,'repeatpwd')}
                        onErrorClick={()=>this.props.onErrorClick('repeatpwd')}
                        error={this.props.state.error.repeatpwd}>确认密码：</InputItem>
                </List>
                <WhiteSpace size="lg"></WhiteSpace>
                <List>
                    <Radio.RadioItem value={ROLE[0]} 
                        onChange={()=>this.props.onChange(ROLE[0], 'role')}
                        checked={this.props.state.form.role===ROLE[0]}>牛人</Radio.RadioItem>
                </List>
                <List>
                    <Radio.RadioItem value={ROLE[1]}
                        onChange={()=>this.props.onChange(ROLE[1], 'role')} 
                        checked={this.props.state.form.role===ROLE[1]}>BOSS</Radio.RadioItem>
                </List>
                <WhiteSpace size="lg"></WhiteSpace>
                <Button type="primary" onClick={this.register}>注册</Button>
                <WhiteSpace></WhiteSpace>
                <Button type="primary" onClick={this.login}>登录</Button>
            </WingBlank>
        )
    }
}

export default Register