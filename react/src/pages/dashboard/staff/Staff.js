import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRoleList } from '../../../redux/chat'
import RoleList from '../../../components/RoleList'

@connect(
    undefined,
    { getRoleList }
)
class Staff extends Component {
    componentDidMount() {
        this.props.getRoleList('staff')
    }
    render() {
        return <RoleList></RoleList>
    }
}

export default Staff