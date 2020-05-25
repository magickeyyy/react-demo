import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import store from './redux'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import BossInfo from './pages/personal/BossInfo'
import StaffInfo from './pages/personal/StaffInfo'
import AuthRoute from './components/AuthRoute'
import Dashboard from './pages/dashboard/Dashboard'

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<Router>	
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path="/login" component={Login}></Route>
					<Route path="/register" component={Register}></Route>
					<Route path='/bossinfo' component={BossInfo}></Route>
					<Route path='/staffinfo' component={StaffInfo}></Route>
					<Route component={Dashboard}></Route>
				</Switch>
			</Router>
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);