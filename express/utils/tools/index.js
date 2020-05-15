const md5 = require('crypto-js/md5')

function md5Pwd(pwd) {
    const solt = 'magickeyyy';
    return md5(md5(pwd + solt) + solt)
}

module.exports = {
    md5Pwd
}