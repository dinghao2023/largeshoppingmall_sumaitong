<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="searchParams.categoryName">{{searchParams.categoryName}}<i @click="clearName">×</i></li>
            <li class="with-x" v-show="searchParams.keyword">{{searchParams.keyword}}<i @click="clearKeyword">×</i></li>
            <li class="with-x" v-show="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="clearTradeMark">×</i></li>
            <!-- 展示平台属性的属性值的面包屑：平台属性存储于数组里面，可能有多个平台属性，一次需要遍历 -->
            <li class="with-x" v-for="(prop,index) in searchParams.props" :key="index">{{prop.split(":")[1]}}<i @click="clearProp(index)">×</i></li>
          </ul>
        </div>
        <SearchSelector @getTradeMarkInfo="getTradeMarkInfo" @getAttrInfo="getAttrInfo"/>
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 拥有类名active，会将背景颜色变为红色 -->
                <li :class="{active:isComprehensive}" @click="changeOrder('1')">
                  <!-- 若有类名，则显示箭头 -->
                  <a>综合<span v-show="isComprehensive" class="iconfont" :class="{'icon-long-arrow-down':isDesc,'icon-long-arrow-up':isAsc}"></span></a>
                </li>
                <li :class="{active:isPrice}" @click="changeOrder('2')">
                  <a>价格<span v-show="isPrice" class="iconfont" :class="{'icon-long-arrow-down':isDesc,'icon-long-arrow-up':isAsc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good, index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a :title="good.title">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器
            total:一共多少条数据  
            pageSize:每一页展示几条数据
            pageNo:当前第几页
            continues:连续页码数5 7 9
          -->
          <Pagination :total="total" :pageSize="searchParams.pageSize" :pageNo="searchParams.pageNo" :continues="5" @currentPage="currentPage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      //携带给服务器的参数
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        props: [],
        trademark: "",
        order: "1:desc",//排序，初始为:"1:desc"，即综合的降序，数字2表示价格
        pageNo:1,
        // pageNo:parseInt(localStorage.getItem('pageNo'))||1,
        pageSize:3, //每一页需要展示多少条数据
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount(){
    //当路由跳转的时候，且mounted之前，把路由跳转时home传递过来的query参数与params参数赋值给searchParams对象，以便于后续发请求
    Object.assign(this.searchParams,this.$route.query,this.$route.params);
  },
  mounted() {
    this.getSearchList();
  },
  methods: {
    getSearchList() {
      this.$store.dispatch("getSearchList", this.searchParams);//获取搜索产品的数据
    },
    clearName(){
      //数据清空，重新进行路由跳转
      this.searchParams.categoryName = '';
      if(this.$route.params){
        this.$router.push({name:'search',params:this.$route.params});//路由跳转之后，watch监听到路由的变化，会再次发送请求
      }
    },
    clearKeyword(){
      //数据清空，重新进行路由跳转
      this.searchParams.keyword = '';
      if(this.$route.query){
        this.$router.push({name:'search',query:this.$route.query});
      }
      this.$bus.$emit("changeKeyword");//触发全局事件总线$bus身上的自定义事件changeKeyword，让Header组件中搜索框的值清空
    },
    //给子组件绑定自定义事件的回调，trademark为子组件传递过来的数据
    getTradeMarkInfo(trademark){
       //整理参数，参数的格式参考API文档
       this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
       this.getSearchList();//发送请求
    },
    clearTradeMark(){
      this.searchParams.trademark = '';
      this.getSearchList();
    },
    getAttrInfo(attr,attrValue){
        //根据API文档，携带给服务器的参数格式为：['属性ID:属性值:属性名']
        let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;
        //添加到searchParams.props数组里面携带给服务器
       this.searchParams.props.indexOf(prop)==-1 && this.searchParams.props.push(prop) && this.getSearchList()
    },
    changeOrder(flag){
      let orginFlag = this.searchParams.order.split(':')[0];//获取当前排序是0还是1
      let originSort = this.searchParams.order.split(":")[1];//获取当前排序是desc还是asc
      let newOrder = '';
      if(flag==orginFlag){//如果点击的和当前的一致
         newOrder = `${orginFlag}:${originSort=='desc'?'asc':'desc'}`
      }else{
        newOrder = `${flag}:desc`;
      }
      this.searchParams.order = newOrder;//携带给服务器参数
      this.getSearchList();
    },
    clearProp(index){
      this.searchParams.props.splice(index,1);//删除数组中索引为index的元素
      this.getSearchList();
    },
    //分页器的自定义事件，将用户点击的第几页数据由Pagination组件传递给父组件Search
    currentPage(pageNo){
      //修改给服务器携带的参数
      this.searchParams.pageNo = pageNo;
      //  localStorage.setItem('pageNo',pageNo);//本次存储持久化
      this.getSearchList();
    }
  },
  computed: {
    ...mapGetters(["goodsList"]),
    //综合的排序
    isComprehensive(){
        return this.searchParams.order.indexOf('1')!=-1;
    },
    //价格的排序
    isPrice(){
      return this.searchParams.order.indexOf('2')!=-1;
    },
    //降序
    isDesc(){
      return this.searchParams.order.indexOf('desc')!=-1;
    },
    //升序
    isAsc(){
       return this.searchParams.order.indexOf('asc')!=-1;
    },
    ...mapState({
      total:state=>state.search.searchList.total
    })
  },
  //监听路由的变化，点击搜索按钮时路由发生变化，此时应再次发送请求
  watch: {
      $route(){
        //每次路由发生变化，$route都是一个新对象，一级属性fullPath一直在变化，所以不用开启深度监视
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id =undefined;
        this.searchParams.category3Id = undefined;
        Object.assign(this.searchParams,this.$route.query,this.$route.params);//再次整理参数
        this.getSearchList();//发送请求
      }
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>