import React from 'react'
import { withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { repairAuthByCookie } from '../redux/auth'

function auth(props) {
    const userid = Cookies.get('userid');
    // 第一次进来无cookie无redux，刷新后有cookie无redux
    if(userid && !props.userid) {
        props.repairAuthByCookie({})
        .then(res => {
            if(!res) {
                props.history.push('/login')
            }
        })
    }
    // const reg = /$(\/boss|staff[(info)])|(\/me)|(\msg)$/g;
}
@withRouter
@connect(
    state => state.auth,
    { repairAuthByCookie }
)
class AuthRoute extends React.Component {
    componentDidMount() {
        auth(this.props)
    }
    componentDidUpdate() {
        auth(this.props)
    }
    render() {
        return null
    }
}
export default AuthRoute