import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import store from './redux'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import NotFound from './pages/error/NotFound'

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<Router>
				<Switch>
					<Route path="/login" component={Login}></Route>
					<Route path="/register" component={Register}></Route>
					<Route path="/404" component={NotFound}></Route>
					<Redirect to="/404"></Redirect>
				</Switch>
			</Router>
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);