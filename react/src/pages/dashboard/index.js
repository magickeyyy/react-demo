import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavBar, TabBar } from 'antd-mobile'
import Boss from './boss/Boss'
import Staff from './staff/Staff'
import Me from './me/Me'
import Msg from './msg/Msg'
import style from  './dashboard.module.less'
import { receiveMsg, getAllMsgList } from '../../redux/chatMsg'

@connect(
	store => ({...store.auth, ...store.chatMsg}),
	{ receiveMsg, getAllMsgList }
)
class Dashboard extends Component {
	componentDidMount() {
		this.props.getAllMsgList(this.props.userid)
		this.props.receiveMsg();
		console.log(111)
	}
	componentDidUpdate() {
		console.log(2222)
	}
    render() {
        const navList = [
			{
				path:'/dashboard/staff',
				text:'牛人',
				icon:'job',
				title:'牛人列表',
				component: Staff,
				hide: this.props.role === 'STAFF'
			},
			{
				path:'/dashboard/boss',
				text:'老板',
				icon:'boss',
				title:'BOSS列表',
				component: Boss,
				hide: this.props.role === 'BOSS'
			},
			{
				path:'/dashboard/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg
			},
			{
				path:'/dashboard/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component: Me
			}
		]
		const pathname = this.props.match.path;
		const cur = navList.find(v=>v.path===pathname)
		const redirectTo = this.props.role === 'BOSS'? '/dashboard/staff': '/dashboard/boss'
		const unread = this.props.unread;
		console.log(redirectTo, pathname)
        return (
            <div className={style.dashboard}>
				{pathname === '/dashboard'&&<Redirect to={redirectTo}></Redirect>}
                <NavBar>{cur&&cur.title}</NavBar>
				<div className={style.container}>
					<Switch>
						{navList.map(v => (
							<Route path={v.path} exact component={v.component} key={v.path}></Route>
						))}
					</Switch>
				</div>                   
                <TabBar className={style.footer}>
                    {navList.filter(v=>!v.hide).map(v => (
						<TabBar.Item key={v.path}
							badge={v.icon==='msg'?unread:0}
							title={v.text}
							onPress={() => {
								this.props.history.push(v.path)
							}}
							selected={pathname===v.path}
							selectedIcon={{uri: require(`../../assets/img/${v.icon}-active.png`)}}
						icon={{uri: require(`../../assets/img/${v.icon}.png`)}}></TabBar.Item>
                    ))}
                </TabBar>
            </div>
        )
    }
}

export default Dashboard