const app = require('express')()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Chat = require('../db').Chat

function websocket() {
    io.on('connection', socket => {
        socket.on('sendmsg', (from, to, data) => {
            new Chat({
                chatid: [from, to].sort().join('_'),
                from,
                to,
                create_time: Date.now().valueOf(),
                content: data
            })
            .save((error, doc) => {
                if(error) {
                    socket.emit('servererror', {success: false, msg: '服务端出错'})
                    return;
                }
                if(doc) {
                    io.emit('receivemsg', doc)
                }
            })
        })
     });
}
function oneToOneRoom() {
    io
        .of('/9e2d4e1c-bf30-47d6-be65-faeaf38c781c_c28cb099-a0d7-41dc-b782-ea908bfe8fde')
        .on('connection', socket => {
            socket.on('sendsg', (from, to, data) => {
                new Chat({
                    chatid: '9e2d4e1c-bf30-47d6-be65-faeaf38c781c_c28cb099-a0d7-41dc-b782-ea908bfe8fde',
                    from,
                    to,
                    create_time: Date.now().valueOf(),
                    content: data
                })
                .save((error, doc) => {
                    if(error) {
                        socket.emit('servererror', {success: false, msg: '服务端出错'})
                        return;
                    }
                    if(doc) {
                        console.log(doc)
                        io.emit('receiveMsg', doc)
                    }
                })
            })
        });
}
function unread() {
    io
        .of('/unreadMsgNum')
        .on('connection', socket => {
            socket.on('getnum',(from, data) => {
                 
            })
        })
}
function listen() {
    server.listen(3001, () => {
        console.log('app is started at http://localhost:3001'.green)
    })
}
module.exports = {
    websocket,
    app,
    listen,
}