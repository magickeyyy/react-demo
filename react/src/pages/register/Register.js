import React, { Component } from 'react'
import { WingBlank, WhiteSpace } from 'antd-mobile';
import { List, InputItem, Button, Toast, Radio } from 'antd-mobile';
import Img from '../../components/Img'
import REG from '../../assets/reg'
import { ROLE } from '../../assets/dictionary'
import axios from '../../request'
import { connect } from 'react-redux';
import { register } from '../../redux/auth'

@connect(
    state => ({ role: state.auth.role }),
    { register }
)
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                username: false,
                pwd: false,
                repeatpwd: false,
            },
            form: {
                username: '',
                pwd: '',
                repeatpwd: '',
                role: ROLE[1]
            }
        }
        this.register = this.register.bind(this);
        this.queryUsername = this.queryUsername.bind(this);
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
    changeRole(value) {
        this.setState({
            form: {
                ...this.state.form,
                role: value
            }
        })
    }
    register() {
        for(let key in this.state.error) {
            if(this.state.error[key]) {
                Toast.fail(REG[key].msg[0]);
                return;
            }
        }
        for(let key in this.state.form) {
            if(!this.state.form[key]) return
        }
        if((!this.state.error.pwd && !this.state.error.repeatpwd) && (this.state.form.pwd !== this.state.form.repeatpwd)) {
            Toast.fail('输入的确认密码和密码不一致');
            return;
        }
        const { username, pwd, role } = this.state.form;
        this.props.register({ username, pwd, role })
            .then(res => {
                if(res) {
                    this.props.history.push(this.props.role.toLowerCase())
                }
            })
    }
    queryUsername() {
        axios
            .get('/user/username', { username: this.state.form.username })
            .then(res => {
                if(res.success && res.data) {
                    Toast.fail('用户名已存在')
                }
            })
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
                        clear
                        onChange={value=>this.onChange(value,'username')}
                        onErrorClick={this.onErrorClick.bind(this,'username')}
                        onBlur={this.queryUsername}
                        error={this.state.error.username}>用户名：</InputItem>
                </List>
                <List>
                    <InputItem type="password" 
                        placeholder="请输入密码"
                        clear 
                        onChange={value=>this.onChange(value,'pwd')}
                        onErrorClick={this.onErrorClick.bind(this,'pwd')}
                        error={this.state.error.pwd}>密&emsp;码：</InputItem>
                </List>
                <List>
                    <InputItem type="password" 
                        placeholder="请确认密码"
                        clear
                        onChange={value=>this.onChange(value,'repeatpwd')}
                        onErrorClick={this.onErrorClick.bind(this,'repeatpwd')}
                        error={this.state.error.repeatpwd}>确认密码：</InputItem>
                </List>
                <WhiteSpace size="lg"></WhiteSpace>
                <List>
                    <Radio.RadioItem value={ROLE[0]} 
                        onChange={this.changeRole.bind(this, ROLE[0])}
                        checked={this.state.form.role===ROLE[0]}>牛人</Radio.RadioItem>
                </List>
                <List>
                    <Radio.RadioItem value={ROLE[1]}
                        onChange={this.changeRole.bind(this, ROLE[1])} 
                        checked={this.state.form.role===ROLE[1]}>BOSS</Radio.RadioItem>
                </List>
                <WhiteSpace size="lg"></WhiteSpace>
                <Button type="primary" onClick={this.register}>注册</Button>
            </WingBlank>
        )
    }
}

export default Register