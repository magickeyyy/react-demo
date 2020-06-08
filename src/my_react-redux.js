import React, { Component } from 'react';
import context from './reac-redux-context'
import {bindActionCreators} from './my_redux'

class Provider extends Component {
    render() {
        return (
            <context.Provider value={{store:this.props.store}}>
                {this.props.children}
            </context.Provider>
        )
    }
}

const connect = (mapStateToProps=state=>state, mapDispatchToProps={}) => (WrapComponent) => {
    class ConnectComponent extends Component {
        constructor(props, context){
			super(props, context)
			this.state = {
				props:{}
			}
        }
        componentDidMount() {
            const {store} = this.context
			store.subscribe(()=>this.update())
			this.update()
        }
        update(){
			const {store} = this.context
			const stateProps = mapStateToProps(store.getState())
			const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
			this.setState({
				props:{
					...this.state.props,
					...stateProps,
					...dispatchProps	
				}
			})
		}
        render() {
            return (
                <context.Consumer>
                    {value=><WrapComponent {...this.state.props}></WrapComponent>}
                </context.Consumer>
            )
        }
    }
    ConnectComponent.contextType = context;
    return ConnectComponent;
}

export { Provider, connect }