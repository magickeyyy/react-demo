import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import store from './redux'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import NotFound from './pages/error/NotFound'
import AuthRoute from './components/AuthRoute'

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<Router>	
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path="/login" component={Login}></Route>
					<Route path="/register" component={Register}></Route>
					<Route path="*" component={NotFound}></Route>
				</Switch>
			</Router>
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);