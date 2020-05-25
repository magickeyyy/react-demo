import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import axios from '../../../request'
import { api_user } from '../../../api'

class Boss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        axios
            .get(api_user.roleList+'/boss')
            .then(res => {
                if(res.success && res.data.length>0) {
                    this.setState({
                        list: res.data
                    })
                }
            })
    }
    render() {
        return (
            <div>
                {this.state.list.map(v=> (
                    <WingBlank key={v.username}>
                        <WhiteSpace />
                        <Card>
                            <Card.Header
                                title={v.username}
                                thumb={v.avatar}
                                extra={<span>{v.company}</span>}
                            />
                            <Card.Body>
                                <div>{v.title}</div>
                                <div>{v.money}</div>
                                <div>{v.desc}</div>
                            </Card.Body>
                        </Card>
                    </WingBlank>
                ))}
            </div>
        )
    }
}

export default Boss