// 引入防抖动的封装函数 
import {debouce} from 'commons/utils'
// 导出混入变量
export const MixIn = {
  mounted () {
    const refresh = debouce(this.$refs.scroll.refresh,500);  //刷新，让滚动框架重新计算滚动区域
    // 事件总线，接收传递过来的事件
    this.$bus.$on('imgLoadOk', () => {
        refresh();// 防抖动
    })
    // 获取offsetTop值
    // 每一个组件都有一个$el属性，可以获取子组件元素的节点
    // console.log(this.$refs.tabTop2.$el.offsetTop)
    // console.log(11111)
  }
}


// backTOp按钮

// 返回首页导航按钮
  import BackTop from 'components/common/backTop/BackTop'

  export const backTopMixIn = {
    data () {
      return {
        isShowBackTop: false,  //默认设置是看不见的
      }
    },
    components: {
      BackTop,
    },
    methods: {
      // 返回顶部
      backClick () {
        this.$refs.scroll.scrollTo(0,0,300)
        // this.$refs.scroll.BS.scrollTo(0,0,500)  直接再Scroll组件封装一个方法，然后我们直接调用方法就ok
      },
      listenerBackTopShow (position) {
         // 当达到1000时将按钮显示出来,注意，position.y是负数
         this.isShowBackTop = -(position.y) > 1000
      }
    }
  }


  // 什么可以混入？
    /**
     * 第一，生命周期可以混入，即你在混入里写mouted，在组件里写mouted，他最后执行是会整合起来1的
     * 但是你methods的话，他只会整合里面的方法，而不会把某个方法里面的数据进行整合
     * 
     */
