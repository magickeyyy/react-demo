const app = require('express')()
const colors = require('colors')
const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017'
const CONNECT_OPTION = {
    keepAlive: true,
    user: 'admin',
    pass: 'magickeyyy',
    dbName : 'imooc',
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose
    .connect(DB_URL, CONNECT_OPTION)
    .then(() => {
        console.log('数据库连接成功'.green)
        console.log(mongoose.connection.name)
    }, error => {
        console.log('数据库连接失败'.red)
        console.log(error)
    })
const db = mongoose.connection
db.on('error', error => {
    console.log('mongo错误'.red, error)
})
db.on('disconnected', function () {
    console.log('数据库断开连接'.red);
});

// const Users = mongoose.model('users', new mongoose.Schema({
//     name: { type: String, required: true },
//     username: { type: String, required: true },
//     phone: { type: String, required: true }
// }));
// let user = new Users({
//     name: '朱庆文',
//     username: 'magickeyyy',
//     phone: '19983504502'
// })
// user.save(function (error, doc) {
//     if (error) return console.error('user.save-error',error);
// });

app.get('/', (req, res) => {
    res.send('<h1>Hellow world</h1>')
})

app.get('/data', (req, res) => {
    res.json({
        name: '朱庆文'
    })
})

app.listen(3001, () => {
    console.log('app is started at http://localhost:3001'.green)
})