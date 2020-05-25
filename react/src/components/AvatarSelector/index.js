import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, List } from 'antd-mobile';

class AvatarSelector extends Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired,
        avatar: PropTypes.string.isRequired
    }
    render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                                .split(',')
                                .map(v=>({
                                    icon: `/img/${v}.png`,
                                    text: v
                                }));
        const gridHeader = this.props.avatar?(
            <div>
                <span>已选择头像</span>
                <img src={this.props.avatar} alt="avatar"/>
            </div>
        ): <div>请选择头像</div>
        return (
            <List renderHeader={() => gridHeader}>
                <Grid data={avatarList} columnNum={5} onClick={(el,index)=>{this.props.selectAvatar(el.icon)}}></Grid>
            </List>
        )
    }
}

export default AvatarSelector