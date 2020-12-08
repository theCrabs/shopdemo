import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入模块，懒加载方式
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Details = () => import('../views/details/Details')

// 1、安装插件
Vue.use(VueRouter)

// 2、创建对象
const routes = [
   {
        path: '',
        redirect: 'Home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/details/:iid',
        component: Details
    }
  ]

const router = new VueRouter({
  routes,
  mode: 'history' //改变path的显示模式，非哈希模式
})

// 导出router
export default router