import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRoleList } from '../../../redux/chat'
import RoleList from '../../../components/RoleList'

@connect(
    undefined,
    { getRoleList }
)
class Boss extends Component {
    componentDidMount() {
        this.props.getRoleList('boss')
    }
    render() {
        return <RoleList></RoleList>
    }
}

export default Boss