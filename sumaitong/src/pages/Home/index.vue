<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :floorInfo="floor"></Floor>
    <Brand></Brand>
  </div>
</template>
<script>
  //发现三级联动在search模块中也使用，将三级联动的组件注册为全局组件
  //下面引入的是局部组件：定义、引入、注册、使用
  import ListContainer from "@/pages/Home/ListContainer";
  import Recommend from "@/pages/Home/Recommend";
  import Rank from "@/pages/Home/Rank";
  import Like from "@/pages/Home/Like";
  import Floor from "@/pages/Home/Floor";
  import Brand from "@/pages/Home/Brand";

  import {mapState} from 'vuex';
  export default {
    name: "Home",
    components: {
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand,
    },
    mounted(){
      this.$store.dispatch('getFloorList');
    },
    computed:{
      ...mapState({
        floorList:state=>state.home.floorList
      })
    }
  };
</script>

<style scoped>
</style>
