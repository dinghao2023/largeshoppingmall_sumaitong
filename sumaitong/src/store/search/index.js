import { reqSearchList } from '@/api';

const state = {
    searchList: {}//存储Search模块的数据
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
const actions = {
    //获取搜索页面的数据
    async getSearchList({ commit }, data) {
        let result = await reqSearchList(data);//发送请求获取搜索页面的数据，至少携带一个空对象
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data);
        }
    }
};
const getters = {
     goodsList(state){
        return state.searchList.goodsList || [];
     },
     tradeMarkList(state){
       return state.searchList.trademarkList;
     },
     attrsList(state){
         return state.searchList.attrsList;
     }
};

export default {
    state,
    mutations,
    actions,
    getters
}