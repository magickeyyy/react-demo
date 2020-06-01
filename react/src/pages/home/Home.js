import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

@connect(
    store => store.auth
)
class Home extends Component {
    render() {
        let url = '/login';
        const role = this.props.role
        if(role) {
            url = role === 'BOSS'? '/dashboard/staff': '/dashboard/boss'
        }
        return <Redirect to={url}></Redirect>
    }
}

export default Home;