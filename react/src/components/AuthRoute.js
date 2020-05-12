import React, { Component } from 'react'
import axios from '../request/index'
import { withRouter} from 'react-router-dom'

@withRouter
class AuthRoute extends Component {
    componentDidMount() {
        const publicList = [ '/login', '/register' ]
        if(publicList.indexOf(this.props.location.pathname) > -1) return;
        axios.get('/user/info')
            .then(res => {
                // if(res.code === 0) {
                //     this.props.history.push('/')
                // } else {
                //     this.props.history.push('/404')
                // }
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        return (
            <div>AuthRoute</div>
        )
    }
}
export default AuthRoute