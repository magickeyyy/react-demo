import axios from 'axios'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	// 在发送请求之前做些什么
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	console.log(111,response)
	// 正常响应
	if(response.status === 200) {
		return response.data;
	}
	return response;
}, function (error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

export default axios