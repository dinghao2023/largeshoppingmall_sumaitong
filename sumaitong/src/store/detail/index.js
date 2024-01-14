import { reqDetailList,reqAddOrUpdateShopCart } from '@/api';
const state = {
    detailList:{},
};
const mutations = {
    GETDETAILLIST: (state, detailList) => {
        state.detailList = detailList;
    }
}
const actions = {
    async getDetailList({ commit }, skuId) {
        let result = await reqDetailList(skuId);
        if (result.code == 200) {
            commit("GETDETAILLIST", result.data);
        }
    },
    async addShopCart({commit},{skuId,skuNum}){
        let result  = await reqAddOrUpdateShopCart(skuId,skuNum);//该请求不返回数据data，所以不需要commit
        if(result.code==200){
            return 'ok';//那么整个async函数返回promise对象成功，promise的值是ok，即this.$store.dispatch("addShopCart",...)返回的promise成功
        }else{
            return Promise.reject(new Error('fail'));
        }
    }
};
const getters = {
    //面包屑的数据
    //state:计算属性getters里面的state，是当前仓库中state，并非大仓库中数据【home、search】
    categoryView(state){
        return state.detailList.categoryView || {}; //detailList初始状态下是一个空对象，所以.categoryView为undefined，避免此情况可加上||{}
    },
    //产品的属性的数据简化
    spuSaleAttrList(state){
       return state.detailList.spuSaleAttrList; 
    },
    skuInfo(state){
      return state.detailList.skuInfo||{};
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}