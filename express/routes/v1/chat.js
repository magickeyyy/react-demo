const express = require('express')
const Router = express.Router()
const Chat = require('../../db').Chat
const { oneToOneRoom } = require('../../utils/socket')

Router.get('/clearall', (req, res) => {
    // 删除全部用户全部消息记录
    // Chat.deleteMany({},error => {
    //     if(error) {
    //         console.error(error)
    //         res.json({
    //             success: false,
    //             msg: '服务出错'
    //         })
    //         return;
    //     }
    //     res.json({ success: true, msg: 'user清理成功' })
    // })
    // 查询全部消息记录
    Chat.find({}, (error, doc) => {
        res.json(doc)
    })
})
Router.post('/list', (req, res) => {
    const { from, to } = req.body;
    Chat.find({ chatid: [from, to].sort().join('_')}, (error, doc) => {
        if(error) {
            res.json({
                success: false,
                msg: '后台出错了'
            })
            return;
        }
        if(doc) {
            // const {from, to, read, content}
            res.json({
                success: true,
                msg: '查询成功',
                data: doc
            })
        }
    })
})
// 查某个用户的全部消息记录
Router.post('/allMsgList', (req, res) => {
    const { userid } = req.body;
    // $wher(`this.form===${userid}||this.to===${userid}`)
    Chat.find({ $or: [ { from: userid }, { to: userid } ] }, (error, doc) => {
        if(error) {
            res.json({
                success: false,
                msg: '后台出错了'
            })
            return;
        }
        if(doc) {
            // const {from, to, read, content}
            res.json({
                success: true,
                msg: '查询成功',
                data: doc
            })
        }
    })
})
Router.post('/send', (req, res) => {
    const { userid: from } = req.cookies;
    const { to, msg } = req.body;
    new Chat({
        chatid: [from, to].sort().join('_'),
        from,
        to,
        create_time: Date.now().valueOf(),
        content: msg
    })
    .save((error, doc) => {
        if(error) {
            res.json({
                success: false,
                msg: '后台出错了'
            })
            return;
        }
        if(doc) {
            res.json({
                success: true,
                msg: '存储成功',
            })
        }
    })
})
Router.post('/receivedMsg', (req, res) => {
    const { _idList } = req.body;
    Chat.updateMany({_id: { $in: _idList }}, { read: true }, (error, doc) => {
        if(error) {
            res.json({
                success: false,
                msg: '后台错误'
            })
            return;
        }
        if(doc && doc.n > 0) {
            res.json({
                success: true,
                msg: '修改成功',
                data: doc.n
            })
        } else {
            res.json({
                success: false,
                msg: '所传id对应的msg已读'
            })
        }
    })
})
Router.get('/ureadNum', (req, res) => {
    const { userid } = req.cookies;
    const reg = new RegExp(`(${userid})`, 'gi')
    Chat.count({ chatid: { $regex: reg } }, (error, count) => {
        
    })
})
// 进入一对一房间聊天，先上报双方userid
Router.post('/oneToOneRoom', (req, res) => {
    const { from, to } = req.body;
    if(from, to) {
        res.json({
            success: true,
            msg: '成功'
        })
    } else {
        res.json({
            success: false,
            msg: '失败'
        })
    }
})

module.exports = Router