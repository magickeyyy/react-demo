import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem, Icon, Grid  } from 'antd-mobile'
// import { createForm } from 'rc-form';
import style from './Chat.module.less'
import { sendMsg, receiveMsg, getMsgList } from '../../redux/chatMsg'
import axios from '../../request'
import { api_user } from '../../api'

@connect(
    store => ({ ...store.auth, ...store.chatMsg }),
    { sendMsg, receiveMsg, getMsgList }
)
class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            toName: '',
            toAvatar: '',
            msg: [],
            showEmoji: false
        }
        this.submit = this.submit.bind(this);
    }
    submit() {
        this.setState({
            text: ''
        });
        this.props.sendMsg(this.props.userid, this.props.match.params.userid, this.state.text);
    }
    handleChange(value) {
        this.setState({
            text: value
        })
    }
    fixCarouel = () => {
        setTimeout(function() {
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    addEmoji= (el, index) => {
        this.setState({
            text: this.state.text + el.text
        })
    }
    componentDidMount() {
        this.autoFocusInst.focus();
        axios
            .post(api_user.getUserInfoById, { userid: this.props.match.params.userid })
            .then(res => {
                if(res.success) {
                    this.setState({
                        toName: res.data.username,
                        toAvatar: res.data.avatar
                    })
                }
            })
    }
    render() {
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
                                        .map(v=>({text:v}))
        const chatid = [this.props.userid, this.props.match.params.userid].sort().join('_')
        const curMsgList = this.props.chatmsg.filter(v => v&&v.chatid===chatid);
        return (
            <div className={style.container}>
                <NavBar className="header" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()}>{this.state.toName}</NavBar>
                <div className={style.list}>
                    {curMsgList.map(v => (<div key={v._id} className={[style.chatBox,v.from===this.props.userid?style.from:style.to].join(' ')}>
                        <div className={style.avatar}>
                            <img src={v.from===this.props.userid?this.props.avatar:this.state.toAvatar} alt="avatar"/>
                        </div>
                        <div className={style.text}>
                            <p>{v.content}</p>
                        </div>
                    </div>))}
                </div>
                <List>
                    <List.Item>
                        <InputItem
                            clear
                            value={this.state.text}
                            placeholder="请输入"
                            ref={el => this.autoFocusInst = el}
                            onChange={(value)=>this.handleChange(value)}
                            extra={(
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <span style={{fontSize:18}} 
                                        onClick={()=>{
                                            this.setState({showEmoji:!this.state.showEmoji})
                                            this.fixCarouel()
                                        }}
                                        role="img" 
                                        aria-label="emoji">😀</span>&emsp;
                                    <svg className="icon" aria-hidden="true" onClick={this.submit}>
                                        <use xlinkHref="#icon-fasong"></use>
                                    </svg>
                                </div>
                            )}></InputItem>
                    </List.Item>
                    {this.state.showEmoji&&(
                        <div className="chat_grid">
                            {<Grid data={emoji} columnNum={9} isCarousel carouselMaxRow={5} onClick={(el, index)=>this.addEmoji(el, index)}></Grid>}
                        </div>
                    )}
                </List>
            </div>
        )
    }
}

export default Chat;