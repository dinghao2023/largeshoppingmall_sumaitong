import request from './request';

//如果获取mock接口的数据，利用底下axios
import mockRequest from './mockRequest';

export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' });//商品分类的数据接口
export const reqGetBannerList = () => mockRequest({ url: '/banner', method: 'get' });//获取banner数据的接口函数
export const reqGetFloorList = () => mockRequest({ url: '/floor', method: 'get' });//获取Floor(楼层)数据接口的函数

export const reqSearchList = (data) => request({ url: "/list", method: 'post', data });//获取搜索页面数据，携带参数至少是一个空对象。
export const reqDetailList = (skuId) => request({ url: `/item/${skuId}`, method: 'get' });//获取产品详情的接口
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });//添加到购物车(这里skuNum正数表示增加，负数表示减少)
export const reqShopCartList = () => request({ url: '/cart/cartList', method: 'get' });//获取购物车的数据
export const reqDeleteCartById = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });//删除购物车商品
export const reqUpdateCartChecked = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });//修改某一个产品的选中状态

export const reqCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'get' });//获取验证码
export const reqRegister = (phone, code, password) => request({ url: `/user/passport/register`, method: 'post', data: { phone, code, password } });//用户注册接口
export const reqLogin = (phone, password) => request({ url: `/user/passport/login`, method: 'post', data: { phone, password } });//登录接口
export const reqUserInfo = () => request({ url: `/user/passport/auth/getUserInfo`, method: 'get' });//获取用户信息
export const reqLogout = () => request({ url: `/user/passport/logout`, method: 'get' });//退出登录【通知服务器销毁当前token身份】

export const reqAddressInfo = () => request({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' });//获取用户地址
export const reqShopCartInfo = () => request({ url: `/order/auth/trade`, method: 'get' });//获取购物清单
export const reqSubmitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data });//提交订单
export const reqOrderPay = (orderId) => request({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });//获取支付信息
export const reqOrderStatus = (orderId) => request({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });//查询支付订单状态
export const reqMyList = (page, limit) => request({ url: `/order/auth/${page}/${limit}`, method: 'get' });//获取用户订单列表列表 page表示获取第几页，limit为每一页多少条数据
