import { reqShopCartList, reqDeleteCartById, reqUpdateCartChecked } from '@/api';
//引入创建临时身份的模块
import { userTemp } from '@/utils/temp_token'
//购物车的仓库
const state = {
    //程序运行起来的时候，仓库已经有了，用户临时身份存储到vuex
    userTempId: userTemp(),
    shopList: []//获取的购物车数据
};
const mutations = {
    GETSHOPCART(state, shopList) {
        state.shopList = shopList;
    }
};
const actions = {
    async getShopCart({ commit }) {
        let result = await reqShopCartList();
        if (result.code == 200) {
            // console.log(result.data);
            commit('GETSHOPCART', result.data);
        }
    },
    async deleteCart({ commit }, skuId) {//删除某一个产品
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }

    },
    async updateChecked({ commit }, { skuId, isChecked }) {//修改某个产品的选中状态
        let result = await reqUpdateCartChecked(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    updateAllCart({ getters, dispatch, commit }, isChecked) {//修改全部的产品的选中状态
        let arr = [];
        getters.shopCartData.cartInfoList.forEach(cart => {
            let promise = dispatch('updateChecked', { skuId: cart.skuId, isChecked });
            arr.push(promise);
        })
        return Promise.all(arr);
    },
    deleteCartByChecked({ getters, dispatch }) {//删除选中的全部商品
        let arr = [];//数组，用于存放每一个promise对象
        getters.shopCartData.cartInfoList.forEach(item => {
            if (item.isChecked == 1) {
                let promise = dispatch("deleteCart", item.skuId);
                arr.push(promise);
            }
        });
        return Promise.all(arr);//arr里面每个promise对象都成功，最终返回结果为成功的promise对象，在组件中就可以await
    }

};
const getters = {
    shopCartData(state) {
        return state.shopList[0] || {}
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}