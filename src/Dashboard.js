import React, { Component } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from './auth'

import App from './App';

function Er() {
	return <h2>二营</h2>
}
function San(props) {
    console.log(props)
	return <h2>三营</h2>
}

@connect(
    state => state.auth,
    { logout }
)
class Dashboard extends Component {
    render() {
        const redirect = <Redirect to="/login"></Redirect>
        const app = (
            <div>
                {this.props.isAuth&&<button onClick={this.props.logout}>注销</button>}
                <ul>
					<li>
						<Link to={this.props.match.path}>一营</Link>
					</li>
					<li>
						<Link to={this.props.match.path+'/er'}>二营</Link>
					</li>
					<li>
						<Link to={this.props.match.path+'/san'}>三营</Link>
					</li>
				</ul>
				<Route path={this.props.match.path} exact component={App}></Route>
                <Route path={this.props.match.path+'/er'} component={Er}></Route>
                <Route path={this.props.match.path+'/san'} component={San}></Route>
            </div>
        )
        return this.props.isAuth? app: redirect
    }
}

export default Dashboard