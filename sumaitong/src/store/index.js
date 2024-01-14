import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//引入相关模块的小仓库
import home from './home';
import search from './search';
import detail from './detail'
import shopcart from './shopcart'
import user from './user';

//向外暴露Store的实例
export default new Vuex.Store({
   modules:{
       home,
       search,
       detail,
       shopcart,
       user,
   }
});
