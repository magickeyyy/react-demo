const express = require('express')
const Router = express.Router()
const Modle = require('../../db')
const reg = require('../../utils/reg')
const { md5Pwd } = require('../../utils/tools')

Router.get('/info', (req, res) => {
    Modle.Users.find({}, (error, doc) => {
        res.json(doc)
    })
    // Modle.Users.remove({},error => {
    //     if(error) {
    //         console.error(error)
    //     }
    // })
})
Router.post('/register', (req, res) => {
    Modle.Users.findOne({ username: req.body.username }, (error, doc) => {
        if(error) {
            res.json({
                success: false,
                msg: '后台出错了'
            })
        }
        if(doc) {
            res.json({
                success: true,
                msg: '用户名已存在',
                data: false
            })
        } else {
            const { username, pwd, role } = req.body;
            Modle.Users.create({
                username, pwd: md5Pwd(pwd), role
            }, (error, doc) => {
                if(error) {
                    console.log(error)
                    res.json({
                        success: false,
                        msg: '后台出错',
                        data: false
                    })
                }
                if(doc) {
                    res.json({
                        success: true,
                        msg: '注册成功',
                        data: true
                    })
                }
            })
        }
    })
})
// 查询用户名是否已存在
Router.get('/username', (req, res) => {
    if(reg.username.reg.test(req.query.username)) { // 先校验参数
        // 是否重名
        Modle.Users.findOne({ username: req.query.username }, (error, doc) => {
            if(error) {
                res.json({
                    success: false,
                    msg: '后台出错了'
                })
            }
            if(doc) {
                res.json({
                    success: true,
                    msg: '用户名已存在',
                    data: true
                })
            } else {
                res.json({
                    success: true,
                    msg: '用户名不存在',
                    data: false
                })
            }
        })
    } else {
        res.json({
            success: false,
            msg: reg.username.msg[0],
        })
    }
})

module.exports = Router