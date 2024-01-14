import { reqCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from "@/api";
import { setToken,getToken,clearToken} from '@/utils/token'
//登录与注册模块的仓库
const state = {
    code: '',
    token:getToken(),
    userInfo: {}//页面一刷新，token始终存在，但用户信息没有
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    SETTOKEN(state, token) {
        state.token = token;
    },
    //存储用户信息
    GETUSERINGO(state, userInfo) {
        state.userInfo = userInfo;
    },
    //退出登录情况全部用户信息
    USERLOGOUT(state){
       state.token = '';
       state.userInfo = {};
       clearToken();
    }
};
const actions = {
    async getCode({ commit }, phone) {//获取验证码
        let result = await reqCode(phone);
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    async userRegister({ commit }, { phone, code, password }) {//用户注册
        let result = await reqRegister(phone, code, password);
        // console.log(result);//{code: 206, message: '验证码错误', data: null, ok: false}
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }
    },
    //登录业务
    async userLogin({ commit }, { phone, password }) {
        let result = await reqLogin(phone, password);//{code: 200, message: '成功', data: {nickName: '12111111111', name: '12111111111', userId: 862, token: 'ca7aadc5b2b341e39104c12f9164b801'}, ok: true}
        if (result.code == 200) {
            commit("SETTOKEN", result.data.token);
            setToken(result.data.token);//在本地持久化存储token，即便刷新页面vuex中的token会丢失但localStorage中依然有token
            return 'ok';
        } else {
            return Promise.reject(result.message);
        }

    },
    //携带token获取用户信息，token的携带在请求拦截器中配置
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit("GETUSERINGO", result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('fail'));
        }
    },
    //退出登录
    async userLogout({ commit }) {
        let result = await reqLogout();
        if (result.code == 200) {
            commit("USERLOGOUT");
            return 'ok';
        }else {
            return Promise.reject(new Error('fail'));
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
