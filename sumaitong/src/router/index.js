import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store'

Vue.use(VueRouter);

//备份VueRouter.prototype原有的push|replace方法，之后重写push与replace方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
     //若外部在使用push的时候传递成功与失败的回调
     if (resolve && reject) {
          originPush.call(this, location, resolve, reject);//原始的push方法可以进行路由跳转，但是需要保证上下文this是VueRouter实例
     } else {
     //若外部在使用push方法的时候没有传递成功与失败的回调函数
          originPush.call(this, location, () => { }, () => { });
     }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
     (resolve && reject) ? originReplace.call(this, location, resolve, reject) : originReplace.call(this, location, () => { }, () => { });
}

import routes from './routes'
//向外暴露VueRouter实例
const router = new VueRouter({
     routes,
     //滚动行为的设置
     scrollBehavior(to, from, savedPosition) {
          return { y: 0 }// 始终滚动到顶部
     }

});
//全局前置路由守卫
router.beforeEach(async (to, from, next) => {
     let token = store.state.user.token;
     let name = store.state.user.userInfo.name;//如果是空对象，if判断也为真，所以加上`.name`，确定里面有内容
     if (token) {//如果用户登录了，仓库中一定是有token
          if (to.path == "/login") {
               next("/home");
          } else {//登录了，去login之外其他地方
               if (name) {//有用户信息
                    next();
               } else {//没有用户信息
                    try {
                         await store.dispatch('getUserInfo');
                         next();
                    } catch (error) {
                         //获取用户信息失败，即可能token过期失效，则触发退出登录请求，在退出登录业务中清除token，并自动跳转到登录页面
                         await store.dispatch('userLogout');
                         next('/login')
                    }
               }
          }
     }else {
          let toPath = to.path;
          //判断未登录：去trade、去支付、去支付成功、去个人中心【我的订单、团购订单】
          if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1 || toPath.indexOf('shopcart') != -1) {
               next('/login?redirect=' + toPath);//跳转到登录页，并且把想要去的页面设置为query参数保留在路径中，并在login组件中进行设置，一点击登录，自动跳转到想要去的页面
          } else {
               next();
          }
     }
});

export default router;