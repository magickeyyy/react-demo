import React, { Component } from 'react'
import { Toast } from 'antd-mobile';
import REG from '../../assets/reg'

export default function ImoocForm(Comp) {
    return class Wrapper extends Component {
        constructor(props) {
            super(props)
            this.state = {
                form: {},
                error: {},
            }
            this.onChange = this.onChange.bind(this);
            this.onErrorClick = this.onErrorClick.bind(this)
        }
        onChange(value, key) {
            this.setState({
                form: {
                    ...this.state.form,
                    [key]: value
                },
                error: {
                    ...this.state.error,
                    [key]: !REG[key].reg.test(value)
                }
            })
        }
        onErrorClick(key) {
            if(this.state.error[key]) {
                Toast.fail(REG[key].msg[0])
            }
        }
        render() {
            return <Comp state={this.state} onErrorClick={this.onErrorClick} onChange={this.onChange} {...this.props}></Comp>
        }
    }
}