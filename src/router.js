//vue-router插件
//插件的引入
import Vue from 'vue'
import VueRouter from 'vue-router'
//引入组件
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Users from './components/user/Users.vue'
import Rights from './components/power/Rights.vue'
import Roles from './components/power/Roles.vue'
import Cate from './components/goods/Cate.vue'
import Params from './components/goods/Params.vue'
// import GoodsList from './components/goods/List.vue'
import Add from './components/goods/Add.vue'
// import Order from './components/order/Order.vue'
import Report from './components/report/Report.vue'


//插件的注册
Vue.use(VueRouter)

//使用规则
const router = new VueRouter({
    //当用户访问一个地址时，加载页面给用户使用
    routes: [
        //重定向，当访问/时到/login
        { path: '/', redirect: '/login' },
        //规定用户访问的路由地址，指定当前地址所加载的组件
        { path: '/login', component: Login },
        //Welcome,Users为home子路由
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [{ path: '/welcome', component: Welcome },
                { path: '/users', component: Users },
                { path: '/rights', component: Rights },
                { path: '/roles', component: Roles },
                { path: '/categories', component: Cate },
                { path: '/params', component: Params },
                { path: '/goods', component: List },
                { path: '/goods/add', component: Add },
                { path: '/reports', component: Report }

            ]
        }

    ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示放行
    //     next()  放行    next('/login')  强制跳转

    if (to.path === '/login') return next()
        // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

export default router