<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId">
                                <h3 :class="{ cur: currentIndex === index }" @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                                </h3>
                                <div class="item-list clearfix" :style="{ display: currentIndex === index ? 'block' : 'none' }">
                                    <div class="subitem">
                                        <dl class="fore" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import throttle from "lodash/throttle";//按需引入
export default {
    name: "TypeNav",
    data() {
        return {
            currentIndex: -1,//商品分类的索引
            show: true,//商品分类具体列表是否显示
        }
    },
    methods: {
        changeIndex: throttle(function (index) {
            this.currentIndex = index;
        }, 20),
        leaveShow() {
            this.currentIndex = -1;
            if(this.$route.path !== "/home") {
                this.show = false;
            }
        },
        goSearch(event) {
            let element = event.target;
            let {categoryname, category1id, category2id, category3id} = element.dataset;
            if(categoryname) {//有categoryname属性说明点击的是a标签
                let location = {name:"search"};
                let query = {categoryName:categoryname}
                if(category1id) {
                    query.category1Id = category1id;
                }else if(category2id) {
                    query.category2Id = category2id;
                }else {
                    query.category3Id = category3id;
                }
                if (this.$route.params) {//路由跳转之前，如果有params参数（先点击搜索框搜索产生params参数）同样需要携带给search
                    location.query = query;
                    location.params = this.$route.params;
                    //home->search确实需要记录历史
                    //search->search不需要存储历史记录
                    if (this.$route.path != "/home") {
                        this.$router.replace(location);
                    } else {
                        this.$router.push(location);
                    }
                }
                location.query = query;
                this.$router.push(location);
            }
        },
        enterShow() {
            if(this.$router.path !== "/home") {
                this.show = true;
            }
        }
    },
    computed: {
        ...mapState({
            categoryList: (state) => state.home.categoryList.slice(0,16),//在App.vue挂载时已经发送请求将数据存入vuex，这儿直接从vuex中获取即可
        }),
    },
    mounted() {
        if(this.$route.path !== "/home") {
            this.show = false;
        }
    }
}
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }
                    h3.cur {
                        background: skyblue;
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }
        //过渡动画的样式
        .sort-enter {
            height: 0px;
        }
        .sort-enter-to {
            height: 461px;
        }
        .sort-enter-active {
            transition: all 0.2s linear;
        }
    }
}
</style>