//本文件主要进行axios的二次封装
import axios from 'axios';
import nprogress from 'nprogress';//引入进度条
import "nprogress/nprogress.css";//引入进度条样式
//引入Vuex仓库模块
import store from '@/store';

//创建axios实例
let instance = axios.create({
    baseURL: "/api",
    timeout: 5000
});
//请求拦截器
instance.interceptors.request.use((config) => {
    //config配置对象，这里面有请求头
    if(store.state.shopcart.userTempId){
        config.headers.userTempId = store.state.shopcart.userTempId;//其中请求头上的userTempId是已经和后台确定好的字段，不能随意。
    }
    //用户身份token
    if(store.state.user.token){
      //请求头的这个属性token，和后台老师商量好的了，不能叫做别的名字
      config.headers.token = store.state.user.token;
    }
    nprogress.start();//进度条启动
    return config;
});

//响应拦截器，可配置成功和失败的回调
instance.interceptors.response.use((res) => {
    //简化服务器返回的数据格式
    nprogress.done();//进度条结束
    return res.data;
}, (error) => {
    return Promise.reject(error);
});

export default instance;