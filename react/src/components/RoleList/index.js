import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

@connect(
    store => ({ role: store.auth.role, list: store.chat.roleList })
)
@withRouter
class RoleList extends Component {
    static propTypes ={
        role: PropTypes.oneOf(['BOSS', 'STAFF']),
        list: PropTypes.arrayOf(PropTypes.object)
    }
    constructor(props) {
        super(props)
        this.toChat = this.toChat.bind(this);
    }
    toChat(userid) {
        this.props.history.push(`/chat/${userid}`)
    }
    render() {
        return (
            <div>
                {this.props.list.map(v=> (
                    <WingBlank key={v.username}>
                        <WhiteSpace />
                        <Card onClick={(e)=>this.toChat(v.userid)}>
                            <Card.Header
                                title={v.username}
                                thumb={v.avatar}
                                extra={<span>{v.title}</span>}
                            />
                            <Card.Body>
                                {this.props.role === 'BOSS'&&(
                                    <React.Fragment>
                                        <div>{v.company}</div>
                                        <div>{v.money}</div>
                                    </React.Fragment>
                                )}
                                <pre>{v.desc}</pre>
                            </Card.Body>
                        </Card>
                    </WingBlank>
                ))}
            </div>
        )
    }
}

export default RoleList;