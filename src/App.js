import React from 'react'
import { connect } from 'react-redux'
import { add, decrease, addAsync } from './counter'

@connect(
	state => ({ num: state.counter }),
	{ add, decrease, addAsync }
)
class App extends React.Component {
	render() {
		return (
			<div>
				<h1>现在有机枪{this.props.num}</h1>
				<button onClick={this.props.add}>add</button>
				<button onClick={this.props.decrease}>decrease</button>
				<button onClick={this.props.addAsync}>addAsync</button>
			</div>
		);
	}
}

export default App;
