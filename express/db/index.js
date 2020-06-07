const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017'
const CONNECT_OPTION = {
    keepAlive: true,
    user: 'root',
    pass: 'magickeyyy',
    dbName : 'imooc',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // 使用modle或者query的findOneAndUpdate时单独架子啊option里或者在这里加，避免升级后方法报错
}
mongoose
    .connect(DB_URL, CONNECT_OPTION)
    // .connect('mongodb://root:magickeyyy@127.0.0.1:27017/imooc',{
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useFindAndModify: false,
    // })
const db = mongoose.connection
db.on('connecting', () => {
    console.log('正在连接'.red)
})
db.on('connected', () => {
    console.log('imooc已连接'.green)
})
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
    money: { type: String }, // boss给的薪资
    userid: String
}));

const Chat = mongoose.model('chat', new mongoose.Schema({
    chatid:{'type':String, require:true},
    from: {'type':String,'require':true},
    to:{'type':String,'require':true},
    read:{'type':Boolean,default:false},
    content:{'type':String,'require':true,'default':''},
    create_time:{'type':Number,'default':Date.now}
}))
module.exports = {
    Users,
    Chat
}