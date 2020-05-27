const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const colors = require('colors')
const bodyParser =  require('body-parser')
const cookieParse = require('cookie-parser')


app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.use('/img',express.static('./assets/img'))
app.use(cookieParse())
app.use(bodyParser.json())
app.use(bodyParser.raw())
const userRouter = require('./routes/v1/user')
app.use('/v1/user',userRouter)
io.on('connection', socket => { 
    socket.on('sendmsg', data => {
        console.log(data)
        io.emit('recvmsg', data)
    })
 });

server.listen(3001, () => {
    console.log('app is started at http://localhost:3001'.green)
})