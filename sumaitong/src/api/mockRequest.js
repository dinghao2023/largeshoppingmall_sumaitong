import axios from 'axios';
import nprogress from 'nprogress';
import "nprogress/nprogress.css"

let instance = axios.create({
    baseURL: "/mock",
    timeout: 5000
});

//请求拦截器
instance.interceptors.request.use((config) => {
    //config配置对象，这里面有请求头
    //config，请求拦截器的一个配置对象
    nprogress.start();
    return config;
});
//响应拦截器
instance.interceptors.response.use((res) => {
    //简化服务器返回的数据格式
    nprogress.done();
    return res.data;
}, (error) => {
    //终止promise链
    return Promise.reject(error);
});

export default instance;