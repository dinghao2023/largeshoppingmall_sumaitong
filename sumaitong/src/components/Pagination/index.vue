<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('currentPage',pageNo-1)">上一页</button>
    <button v-if="startAndEndNum.start>=2" @click="$emit('currentPage',1)">1</button>
    <button v-if="startAndEndNum.start>=3">···</button>
    <button v-for="page in  startAndEndNum.end" :key="page" v-if="page>=startAndEndNum.start" :class="{ active:page == pageNo }" @click="$emit('currentPage',page)">{{page}}</button>
    <button v-if="startAndEndNum.end <= totalPage - 2">···</button>
    <button v-if="startAndEndNum.end <= totalPage - 1" @click="$emit('currentPage',totalPage)">{{ totalPage }}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('currentPage',pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total", "pageSize", "pageNo", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);//计算出总页数
    },
    startAndEndNum() {//计算出连续页码的起始和结束页
      const { pageNo, continues, totalPage } = this;
      let start = pageNo - parseInt(continues / 2);
      let end = pageNo + parseInt(continues / 2);
      if (start < 1) {
        start = 1;
        end = continues;
      }
      if (end > totalPage) {
        end = totalPage;
        start = totalPage - continues + 1;
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>