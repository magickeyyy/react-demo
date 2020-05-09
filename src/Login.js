import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from './auth'
import { Redirect } from 'react-router-dom'

@connect(
    state => state.auth,
    { login }
)
class Login extends Component {
    render() {
        return (
            <div>
                {this.props.isAuth?<Redirect to='/dashboard'></Redirect>:<p>无权限</p>}
                <button onClick={this.props.login}>登录</button>
            </div>
        )
    }
}

export default Login