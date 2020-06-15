import axios from 'axios'

const baseApi = {}

axios.defaults.baseURL = '/spider';

// 全局设置
axios.defaults.timeout = 10000;

// 请求路由拦截
axios.interceptors.request.use(function (config) {
    return config;
}, function(error) {
    return Promise.reject(error);
})

// 响应拦截
axios.interceptors.response.use(function (response) {
    if(response.status === 200) {
        return Promise.resolve(response);
    }else{
        return Promise.reject(response);
    }
}, function (error) {
    return Promise.reject(error);
})

// get 请求
baseApi.get = function(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: params})
        .then(response => resolve(response.data))
        .catch(error => reject(error.data));
    });
}

// post 请求
baseApi.post = function(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
        .then(response => resolve(response.data))
        .catch(error => reject(error.data));
    });
}

export default baseApi;
