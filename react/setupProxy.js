const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    // 可以继续使用app.use增加proxy
    app.use(proxy(process.env.REACT_APP_API_V1, {
        target: process.env.REACT_APP_BASE_URL + ':' + REACT_APP_ROOT,
        changeOrigin: true,
        pathRewrite: { // 把特殊标志改写
            [`^${process.env.REACT_APP_API_V1}`]: process.env.REACT_APP_API_V1
        }
    }));
};