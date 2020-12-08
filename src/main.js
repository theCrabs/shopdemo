import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入解决延迟的fastclick 
import fastClick from 'fastclick'
// 导入toast.js文件
import toast from 'components/common/toast'
// 1、导入图片懒加载插件 vue-lazyload
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
// 对象原型的方式添加事件总线
Vue.prototype.$bus = new Vue();

// 安装插件
Vue.use(toast)  //安装完自动执行那边的install函数,而且默认传递Vue过去
// 解决移动端延迟300ms
fastClick.attach(document.body)
// 安装插件懒加载
Vue.use(VueLazyLoad,{
   // 未加载的占位图片
   loading: require("@/assets/img/common/placeholder.png")
   //图片加载失败时加载
   // error
})  //2、安装插件

new Vue({
  render: h => h(App),
  router,
  store  // 这里挂在完后，哪个组件都可以通过$store.state/action.../getters.属性名  来调用共享的数据
}).$mount('#app')
