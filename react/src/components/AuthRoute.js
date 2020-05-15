import React, { Component } from 'react'
import axios from '../request/index'
import { withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

@withRouter
@connect(
    state => ({ auth: state.auth})
)
class AuthRoute extends Component {
    componentDidMount() {
        const publicList = [ '/login', '/register' ]
        if(publicList.indexOf(this.props.location.pathname) > -1) return;
    }
    render() {
        return (
            <div>AuthRoute</div>
        )
    }
}
export default AuthRoute