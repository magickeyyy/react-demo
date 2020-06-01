const path = require('path')
const express = require('express')
const { websocket, app, listen } = require('./utils/socket')
const colors = require('colors')
const bodyParser =  require('body-parser')
const cookieParse = require('cookie-parser')

listen();
websocket();

app.all('*', function (req, res, next) {
    res.set({
        "Access-Control-Allow-Origin": "http://localhost:3000", // 允许跨域请求的origin
        "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS", // 允许跨域请求使用的方法
        "Access-Control-Allow-Headers": "Content-Type,Content-Length,Authorization,Accept,X-Requested-With", // 允许跨域请求的headers的字段。https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
        "Content-Type": "application/json;charset=utf-8"
    })
    next();
});

app.use('/img',express.static('./assets/img'))
app.use(cookieParse())
app.use(bodyParser.json())
app.use(bodyParser.raw())
const userRouter = require('./routes/v1/user')
const chatRouter = require('./routes/v1/chat')
app.use('/v1/user',userRouter)
app.use('/v1/chat',chatRouter)