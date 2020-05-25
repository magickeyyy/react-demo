import React from 'react'
import style from './Img.module.less'

export default function Img(props) {
    const img = require(`../assets/img/${props.src}.png`)
    return (
        <div className={style.imgContainer}>
            <img src={img} width={props.width} height={props.height} alt="img"/>
        </div>
    )
}