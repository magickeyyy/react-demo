export function createStore(reducer, enhancer) {
    if (enhancer) {
		return enhancer(createStore)(reducer)
	}
    let curState = {};
    let curListeners = [];
    function getState() {
        return curState;
    }
    function subscribe(listener) {
        curListeners.push(listener)
    }
    function dispatch(action) {
        curState = reducer(curState, action);
        curListeners.forEach(v=>v())
        return action;
    }
    dispatch({type: '@sdfks!skljfs'})
    return { getState, subscribe, dispatch }
}

export function bindActionCreators(creators,dispatch){
    return Object.keys(creators).reduce((pre, cur)=>{
        pre[cur] = (...args) => dispatch(creators[cur](...args))
        return pre
    },{})
}
// applyMiddleware(middleware)(reducer)
export function applyMiddleware(middleware) {
    return createStore => (...args) => {
        const store = createStore(...args);
        let dispatch = store.dispatch;
        const midApi = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }
        dispatch = middleware(midApi)(store.dispatch)
        return { ...store, dispatch }
    }
}