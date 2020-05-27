const express = require('express')
const Router = express.Router()
const Modle = require('../../db')
const reg = require('../../utils/reg')
const { md5Pwd } = require('../../utils/tools')
const { v4: uuidv4 } = require('uuid')

Router.get('/list', (req, res) => {
    // 删除全部user.remove是永久删除不可逆，所以要先find再remove确保万一。delete相对来说效率高
    // Modle.Users.deleteMany({},error => {
    //     if(error) {
    //         console.error(error)
    //     }
    //     res.json({ success: true, msg: 'user清理成功' })
    //     res.end()
    // })

    // 查找全部user
    Modle.Users.find({}, (error, doc) => {
        res.json(doc)
    })
    
    // 删除指定username的文档。
    // Modle.Users.findOneAndRemove({ username: req.query.username }, (error, doc) => {
    //     if(error) {
    //         console,log(error)
    //     }
    //     if(doc) {
    //         res.json({
    //             msg: req.query.username + '删除成功'
    //         })
    //     }
    // })
})
Router.post('/info', (req, res) => {
    if(!req.cookies.userid) {
        res
            .status(404)
            .json({
                success: false,
                msg: '请求未授权'
            })
        return;
    }
    const { username, userid } = req.cookies;
    Modle.Users
        .findOne()
        .and({ username, userid })
        .exec((error, doc) => {
            if(error) {
                res.json({
                    success: false,
                    msg: '后台出错了',
                })
            }
            if(doc) {
                const { username, userid, role, avatar } = doc;
                res.json({
                    success: true,
                    msg: ' 查询成功',
                    data: { username, userid, role, avatar }
                })
            } else {
                res.json({
                    success: false,
                    msg: '用户信息错误',
                })
            }
        })
})
Router.post('/allinfo', (req, res) => {
    if(!req.cookies.userid) {
        res
            .status(404)
            .json({
                success: false,
                msg: '请求未授权'
            })
        return;
    }
    const { username, userid } = req.cookies;
    Modle.Users
        .findOne()
        .and({ username, userid })
        .exec((error, doc) => {
            if(error) {
                res.json({
                    success: false,
                    msg: '后台出错了',
                })
            }
            if(doc) {
                const { username, userid, title, money, company, role, desc, avatar } = doc;
                res.json({
                    success: true,
                    msg: ' 查询成功',
                    data: { username, userid, title, money, company, role, desc, avatar }
                })
            } else {
                res.json({
                    success: false,
                    msg: '用户信息错误',
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
                        .cookie('username', username)
                        .cookie('userid', userid)
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
// 登陆接口：注册时用户名唯一，查到用户名和密码同时匹配时才算登录成功。
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
                res
                    .cookie('userid', userid, { httpOnly: true, maxAge: 1000*60*60*24, sameSite: 'lax' })
                    .cookie('username', username, { httpOnly: true, maxAge: 1000*60*60*24, sameSite: 'lax' })
                    .json({
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
    if(req.cookies.userid && req.cookies.username) {
        res
        .clearCookie('userid')
        .clearCookie('username')
        .json({
            success: true,
            msg: '退出成功',
        })
        .end()
    } else {
        res
            .status(404)
            .json({
                success: false,
                msg: 'cookie不合法'
            })
    }
})
// 修改个人信息接口：根据role上传不同字段
Router.post('/update', (req, res) => {
    if(!req.cookies.userid) {
        res
            .status(404)
            .json({
                success: false,
                msg: '请求未授权'
            })
        return;
    }
    const { username, userid, role, avatar='', title='', company='', desc='', money='' } = req.body;
    let update = { avatar, title, company, desc, money };
    if(role === 'STAFF') {
        update = { avatar, title, desc, money };
    }
    // findeOneAndUpdate{query, update, option, callback}默认不返回更新后的文档，可以配置得到更新的后的文档
    // updateOne callback(error, writeOpResult)
    Modle.Users.findOneAndUpdate({ $and:[{ userid, username }] }, update, (error, doc) => {
        if(error) {
            res.json({
                success: false,
                msg: '后台出错'
            })
        }
        if(doc) {
            const { username, userid, role, avatar } = doc;
            res.json({
                success: true,
                msg: '提交成功',
                data: { username, userid, role, avatar }
            })
        } else {
            res.json({
                success: false,
                msg: '用户信息错误'
            })
        }
    })
})
// 用户查询boss或staff列表
Router.get('/roleList/:role', (req, res) => {
    Modle.Users.find({ role: req.params.role.toUpperCase() }, (error, doc) => {
        if(error) {
            res.json({
                success: false,
                msg: '后台出错'
            })
        }
        if(doc) {
            res.json({
                success: true,
                msg: '查询成功',
                data: doc.filter(v => v&&v.avatar)
            })
        } else {
            res.json({
                success: false,
                msg: '查询失败'
            })
        }
    })
})


module.exports = Router