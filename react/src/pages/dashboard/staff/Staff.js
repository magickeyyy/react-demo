import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import axios from '../../../request'
import { api_user } from '../../../api'

class Staff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        axios
            .get(api_user.roleList+'/staff')
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
                                extra={<span>{v.title}</span>}
                            />
                            <Card.Body>
                                <pre>{v.desc}</pre>
                            </Card.Body>
                        </Card>
                    </WingBlank>
                ))}
            </div>
        )
    }
}

export default Staff