import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './Dashboard';
import Login from './Login';
import NotFound from './NotFound';

import store from './redux'

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<React.StrictMode>
				<Switch>
					<Route path="/dashboard" component={Dashboard}></Route>
					<Route path="/login" component={Login}></Route>
					<Route path="/404" component={NotFound}></Route>
					<Redirect to="/404" component={NotFound}></Redirect>
				</Switch>
			</React.StrictMode>
		</Router>
	</Provider>,
	document.getElementById('root')
);
