import React from 'react'
import logo from '../assets/img/icon.jpg'
import style from './Img.module.less'

export default function Img(props) {
    return (
        <div className={style.imgContainer}>
            <img src={props.img?props.img:logo} alt=""/>
        </div>
    )
}