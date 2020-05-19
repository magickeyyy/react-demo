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

const Users = mongoose.model('users', new mongoose.Schema({
    name: { type: String }, // 用户真名
    username: { type: String, required: true }, // 用户名
    pwd: { type: String, required: true }, // 密码
    phone: { type: String }, // 手机号
    role: { type: String, required: true, default: 'STAFF' }, // 角色：老板、求职者
    avatar: { type: String, default: '' }, // 头像
    desc: { type: String }, // 个人简介
    title: { type: String }, // 招聘或求职岗位名称
    company: { type: String }, // boss所在公司名
    money: { type: Number }, // boss给的薪资
    userid: String
}));
// let user = new Users({
//     name: '朱庆文',
//     username: 'magickeyyy',
//     phone: '19983504502'
// })
// user.save(function (error, doc) {
//     if (error) return console.error('user.save-error',error);
// });
module.exports = {
    Users
}