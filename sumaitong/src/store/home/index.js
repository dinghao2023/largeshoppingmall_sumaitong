import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api';

const state = {
    categoryList: [],//商品分类的数据
    //bannerList：存储首页的轮播图的数据
    bannerList: [],
    //floor：存储Floor（楼层组件的）数据
    floorList:[]
};
const mutations = {
    GETCATEGORY(state, category) {
        state.categoryList = category;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST: (state, floorList) => {
        state.floorList = floorList;
    }
};
const actions = {
    async getCategory({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("GETCATEGORY", result.data);
        }
    },
    //获取首页banner的数据【轮播图】
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data);
        }
    },
    //获取Floor的数据
    async getFloorList({ commit }) {
        let result = await reqGetFloorList();
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data);
        }
    }

};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}