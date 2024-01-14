<template>
  <div class="swiper-container" ref="floor1Swiper">
    <div class="swiper-wrapper">
      <!-- 全局轮播图的结构，需要一个数组，数组里面有多少个元素，就有多少张图片 -->
      <div class="swiper-slide" v-for="(item, index) in bannerList" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script>
  import Swiper from "swiper";
  export default {
    name: "Carousel",
    props: ["bannerList"],
    watch: {
      bannerList: {
        immediate: true,
        handler() {
          this.$nextTick(() => {
            //回调里面写代码的时候:1:服务器数据回来了 2:v-for执行完毕，结构已经有了
            new Swiper(this.$refs.floor1Swiper, {
              loop: false,
              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                //分页器小球点击的时候切换图片
                clickable: true,
              },
              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            });
          });
        },
      },
    },
  };
</script>

<style scoped>
</style>
