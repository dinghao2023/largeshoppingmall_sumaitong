<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in imageList" :key="index">
        <img :src="item.imgUrl" @click="handler(index)" :class="{active:currentIndex==index}" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["imageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  watch: {
    imageList() {
      //组件实例的方法$nextTick，可在v-for遍历完成之后再执行
      this.$nextTick(() => {
        new Swiper(this.$refs.cur, {//初始化swiper实例
          slidesPerView: 3,
          slidesPerGroup: 1,//设置每一次切换，切换几张图
          mousewheel: true,//滚动滚轮切换
          navigation: {// 如果需要前进后退按钮
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
    },
  },
  methods: {
    handler(index) {
      this.currentIndex = index;
      this.$bus.$emit('send',index);//通过全局事件总线：通知兄弟当前显示第几张图
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>