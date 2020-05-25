import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

@connect(
    store => store.auth
)
class Home extends Component {
    render() {
        let url = '/login';
        if(this.props.role) {
            url = '/dashboard/' + this.props.role.toLowerCase()
        }
        return <Redirect to={url}></Redirect>
    }
}

export default Home;