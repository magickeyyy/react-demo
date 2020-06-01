import axios from 'axios'
import { Toast } from 'antd-mobile'

axios.defaults.timeout = 20000;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	Toast.loading()
	// 在发送请求之前做些什么
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	Toast.hide()
	// 正常响应
	if(response.status === 200) {
		return response.data;
	}
	return response;
}, function (error) {
	Toast.hide()
	// 对响应错误做点什么
	return Promise.reject(error);
});

export default {
	get(url, data = {}, config = {}) {
		return axios.get(url, { params: data, ...config })
	},
	post(url, data = {}, config = {}) {
		return axios.post(url, data, config)
	},
	delete(url, data = {}, config = {}) {
		// 后台可以从body中获取参数，如果要从URL中获取return axios.delete(url, { ...config, params: data })，或者return axios.delete(url, { ...config, params: data, data })
		return axios.delete(url, { data, ...config })
	},
	put(url, data = {}, config = {}) {
		return axios.put(url, data, config)
	},
	patch(url, data = {}, config = {}) {
		return axios.patch(url, data, config)
	},
	request(config) {
		return axios(config)
	},
}