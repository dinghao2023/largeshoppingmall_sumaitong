## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



```mermaid
graph LR
M(前台项目API地址<br>http://gmall-h5-api.atguigu.cn)
M-->A["获取商品分类列表 reqCategoryList<br>请求地址：/api/product/getBaseCategoryList"]
M-->C("获取mock数据")
C-->B["获取banner数据 reqGetBannerList<br>请求地址：/mock/banner"]
C-->D["获取Floor数据 reqGetFloorList<br>请求地址：/mock/floor"]
M-->E["获取Search页面数据 reqSearchList<br>请求地址：/api/list"]
M-->F["获取Detail页面产品详情数据 reqDetailList<br>请求地址：/api/item/${skuId}"]
M-->G["加入购物车 reqAddOrUpdateShopCart<br>请求地址：/api/cart/addToCart/${skuId}/${skuNum}"]
M-->H["获取购物车数据 reqShopCartList<br>请求地址：/api/cart/cartList"]
M-->I["删除购物车商品 reqDeleteCartById<br>请求地址：/api/cart/deleteCart/${skuId}"]
M-->J["修改某个产品的选中状态 reqUpdateCartChecked<br>请求地址：/api/cart/checkCart/${skuId}/${isChecked}"]
M-->K["获取验证码 reqCode<br>请求地址：/api/user/passport/sendCode/${phone}"]
M-->L["用户注册 reqRegister<br>请求地址：/api/user/passport/register"]
M-->N["登录 reqLogin<br>请求地址：/api/user/passport/login"]
M-->O["获取用户信息 reqUserInfo<br>get 请求地址：/api/user/passport/auth/getUserInfo"]
M-->P["退出登录 reqLogout<br>get 请求地址：/api/user/passport/logout"]
M-->Q["获取用户地址信息 reqAddressInfo<br>get 请求地址：/api/user/userAddress/auth/findUserAddressList"]
M-->R["获取购物清单 reqShopCartInfo<br>get 请求地址：/api/order/auth/trade"]
M-->S["提交订单 reqSubmitOrder<br>post 请求地址：/api/order/auth/submitOrder?tradeNo=${tradeNo}"]
M-->T["获取支付信息 reqOrderPay<br>get 请求地址：/api/payment/weixin/createNative/${orderId}"]
M-->U["查询支付订单状态 reqOrderStatus<br>get 请求地址：/api/payment/weixin/queryPayStatus/${orderId}"]
M-->V["获取用户订单列表 reqMyList<br>get 请求地址：/api/order/auth/${page}/${limit}"]
```

