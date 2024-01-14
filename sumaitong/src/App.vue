<template>
  <div>
    <Header></Header>
    <!-- 首页、搜索、登录、注册4个路由组件展示的地方 -->
    <router-view></router-view>
    <!-- Footer组件在首页、搜索路由时显示，在登录、注册路由时隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "",
  components: {
    Header,
    Footer,
  },
  //根组件执行执行一次，因此mounted执行一次
  mounted(){
    this.$store.dispatch('getCategory');//在根组件渲染出来的时候，向服务器派发action，通过Vuex向服务器发请求，获取商品列表数据，在TypeNav组件中使用数据
  }
};
</script>

<style scoped>
</style>
