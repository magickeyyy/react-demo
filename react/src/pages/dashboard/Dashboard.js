import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavBar, TabBar } from 'antd-mobile'
import Boss from './boss/Boss'
import Staff from './staff/Staff'
import Me from './me/Me'
import Msg from './msg/Msg'
import style from  './dashboard.module.less'
import NotFound from '../../pages/error/NotFound'

@connect(
    store => store.auth
)
class Dashboard extends Component {
	state = {
		dashboard: false
	}
    render() {
        const navList = [
			{
				path:'/staff',
				text:'牛人',
				icon:'job',
				title:'牛人列表',
				component: Staff,
				hide: this.props.role === 'STAFF'
			},
			{
				path:'/boss',
				text:'老板',
				icon:'boss',
				title:'BOSS列表',
				component: Boss,
				hide: this.props.role === 'BOSS'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component: Me
			}
		]
		const pathname = this.props.location.pathname;
		const cur = navList.find(v=>v.path===pathname)
        return (
            <div className={style.dashboard}>
                <NavBar>{cur&&cur.title}</NavBar>
				<div className={style.container}>
					<Switch>
						{navList.map(v => (
							<Route path={v.path} exact component={v.component} key={v.path}></Route>
						))}
						<Route path="*" component={NotFound}></Route>
					</Switch>
				</div>                   
                <TabBar className={style.footer}>
                    {navList.filter(v=>!v.hide).map(v => (
						<TabBar.Item key={v.path}
							title={v.text}
							hide={v.hide}
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