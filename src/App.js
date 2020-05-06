import React from 'react';

function App(props) {
	const store = props.store;
	const add = props.add;
	const decrease = props.decrease;
	const addAsync = props.addAsync;
	return (
		<div>
			<h1>现在有机枪{store.getState()}</h1>
			<button onClick={() => store.dispatch(add())}>add</button>
			<button onClick={() => store.dispatch(decrease())}>decrease</button>
			<button onClick={() => store.dispatch(addAsync())}>addAsync</button>
		</div>
	);
}

export default App;
