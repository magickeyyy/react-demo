import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import store, { add, decrease, addAsync } from './redux'

function render() {
	ReactDOM.render(
		<React.StrictMode>
			<App store={ store } add={add} decrease={decrease} addAsync={addAsync} />
		</React.StrictMode>,
		document.getElementById('root')
	);
}
render()
store.subscribe(render)
