import React, { Component } from 'react'
import { NavBar, List, InputItem, TextareaItem, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import Cookies from 'js-cookie'
import loadable from '@loadable/component'
import style from './info.module.less'
import { connect } from 'react-redux';
import { update } from '../../redux/auth'

const AvatarSelector = loadable(() => import('../../components/AvatarSelector'))

@connect(
    store => store.auth,
    { update }
)
class StaffInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            money: '',
            desc: '',
            avatar: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.selectAvatar = this.selectAvatar.bind(this);
    }
    handleChange(value, key) {
        this.setState({
            [key] : value
        })
    }
    submit() {
        const userid = Cookies.get('userid');
        const role = Cookies.get('role');
        const username = Cookies.get('username');
        this.props.update({ ...this.state, userid, username, role })
            .then(res => {
                this.props.history.push('/dashboard/boss')
            })
    }
    selectAvatar(value) {
        this.setState({
            avatar: value
        })
    }
    render() {
        return (
            <div className={style.info}>
                <NavBar mode="dark" >STAFF</NavBar>
                {this.props.avatar? null: <AvatarSelector selectAvatar={this.selectAvatar} avatar={this.state.avatar}/>}
                <List>
                    <InputItem onChange={v=>this.handleChange(v,'title')} placeholder="必填">职位名称</InputItem>
                </List>
                <List>
                    <InputItem onChange={v=>this.handleChange(v,'money')} placeholder="必填">工资待遇</InputItem>
                </List>
                <List>
                    <TextareaItem onChange={v=>this.handleChange(v,'desc')} placeholder="必填" title="个人简介" rows={6} count={100}></TextareaItem>
                </List>
                <WingBlank>
                    <WhiteSpace size="xl" />
                     <Button type="primary" onClick={this.submit}>保存</Button>
                 </WingBlank>
            </div>
        )
    }
}

export default StaffInfo;