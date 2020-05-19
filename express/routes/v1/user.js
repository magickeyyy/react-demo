const express = require('express')
const Router = express.Router()
const Modle = require('../../db')
const reg = require('../../utils/reg')
const { md5Pwd } = require('../../utils/tools')
const { v4: uuidv4 } = require('uuid')

Router.get('/list', (req, res) => {
    // Modle.Users.deleteMany({},error => {
    //     if(error) {
    //         console.error(error)
    //     }
    //     res.json({ success: true, msg: 'user清理成功' })
    //     res.end()
    // })
    Modle.Users.find({}, (error, doc) => {
        res.json(doc)
    })
})
Router.post('/info', (req, res) => {
    const { username } = req.query;
    Modle.Users.findOne({ username }, (error, doc) => {
        if(error) {
            console.log(error)
            res.json({
                success: false,
                msg: '后台出错了',
            })
        }
        if(doc) {
            res.json({
                success: true,
                msg: ' 查询成功',
                data: doc
            })
        }
    })
})
Router.post('/register', async (req, res) => {
    Modle.Users.findOne({ username: req.body.username }, (error, doc) => {
        if(error) {
            res.json({
                success: false,
                msg: '后台出错了'
            })
            .end();
        }
        if(doc) {
            res
                .json({
                    success: false,
                    msg: '用户名已存在',
                    data: false
                })
                .end();
        } else {
            const { username, pwd, role } = req.body;
            const user = new Modle.Users({ username, pwd: md5Pwd(pwd), role, userid: uuidv4() });
            user.save((error, doc) => {
                if(error) {
                    res.json({
                        success: false,
                        msg: '后台出错',
                        data: false
                    })
                    .end()
                }
                if(doc) {
                    const { username, role, userid, avatar } = doc
                    res
                        .cookie('authed', true)
                        .json({
                            success: true,
                            msg: '注册成功',
                            data: { username, role, userid, avatar }
                        })
                        .end()
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
Router.post('/login', async (req, res) => {
    let { username, pwd } = req.body;
    Modle.Users
        .findOne()
        .and({ username, pwd: md5Pwd(pwd) })
        .exec((error, doc) => {
            if(error) {
                res.json({
                    success: false,
                    msg: '后台出错'
                })
            }
            if(doc) {
                const { username, userid, role, avatar } = doc
                res.json({
                    success: true,
                    msg: '登录成功',
                    data: { username, userid, role, avatar }
                })
            } else {
                res.json({
                    success: false,
                    msg: '用户名或者密码错误'
                })
            }
        })
    })
Router.get('/logout', (req, res) => {
    res.json({
        success: true,
        msg: '退出成功',
    })
})

module.exports = Router