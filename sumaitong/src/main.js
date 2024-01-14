import Vue from 'vue'
import App from './App.vue'

import router from '@/router';
import store from '@/store';

//这里是入口文件，也是程序最先执行的地方，在TypeNav组件使用之前，向服务器发起一次请求，获取三级联动的数据
//存储于vuex，当然当TypeNav在使用仓库中的数据的时候（数据早已经有了），TypeNav可以获取数据【展示数据】
//当然书写这里请求只会发一次，当然可以进行性能优化
import Pagination from '@/components/Pagination';
import TypeNav from "@/components/TypeNav";//引入并注册为全局组件
import Carousel from '@/components/Carousel';//引入并注册为全局的轮播图组件
//elementUI注册组件其中有一种写法，就是这种写法
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name,Pagination);
Vue.component(Carousel.name, Carousel);

import "@/mock/serve";
import "swiper/css/swiper.css"//引入swiper样式

import * as API from '@/api';

//elementUI的全部引入
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);


//按需引入相应使用的组件
import {Button,Notification,MessageBox} from 'element-ui';
//注册为全局组件
Vue.component(Button.name,Button);
Vue.prototype.$notify = Notification;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


import VueLazyload from 'vue-lazyload'
import erha from '@/assets/images/1.gif';//引入图片懒加载时的默认图片
//Vue.use的时候，这个插件提供了一个全局指令v-lazy
Vue.use(VueLazyload, {
  loading: erha,//设置图片懒加载的默认图片
});


import '@/plugins/valadiate';//引入表单验证规则

//创建Vue类的实例
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;//配置全局事件总线
    Vue.prototype.$API = API;//把全部的请求函数：作为Vue.prototype的属性，组件实例可以获取。
  },
  router,//注册路由,之后每个组件身上都有了$router与$route两个属性
  store//注册仓库，之后每个组件的身上都有了$store属性
}).$mount('#app');
