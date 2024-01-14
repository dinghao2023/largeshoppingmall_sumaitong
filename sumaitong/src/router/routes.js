export default [
    {
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: { show: true },//路由元信息---控制footer组件的显示与隐藏
    },
    {
        path: '/search/:keyword?',//声明接收params参数，加上?表示参数可有可无
        //不管你访问不访问search，都加载search路由组件
        component: () => import('@/pages/Search'),
        meta: { show: true },
        name: 'search',
        //路由也可以传递props数据，拥有三种写法
        //如果 props 被设置为 true，params参数将会被设置为组件属性
        // props:true,
        // props:{a:1,b:2}
        props: (route) => ({ keyWord: route.params.keyWord, k: route.query.k })

    },
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: { show: false }
    }, {
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: { show: false }
    },
    // 重定向，跳转到home路由组件
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/detail/:skuId',
        component: () => import('@/pages/Detail'),
        meta: { show: true },
    },
    {
        path: '/addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: { show: true },
        name: "addcartsuccess"
    },
    {
        path: '/shopcart',
        component: () => import('@/pages/ShopCart'),
        meta: { show: true }
    },
    {
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {//路由独享守卫
            if (from.path == "/shopcart") {//用户必须从购物车页面跳转而来，才能放行
                next();
            } else {
                //如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
                next(false);//中断当前的导航，重置到from的地址
            }
        }
    },
    {
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {//路由独享守卫
            //必须从交易页面而来，才能进入支付页面
            if (from.path == '/trade') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: { show: true }
    },
    {
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: { show: true },
        children: [
            {
                path: "myorder",
                component: () => import('@/pages/Center/myOrder'),
            },
            {
                path: 'grouporder',
                component: () => import('@/pages/Center/groupOrder')
            },
            {
                path: '/center',
                redirect: '/center/myorder'//重定向，跳转到/center时直接到/center/myorder
            }
        ]
    }
]