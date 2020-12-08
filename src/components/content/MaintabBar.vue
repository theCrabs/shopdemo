<template>
  <!-- 这个TabBar就是TabBar组件里替换插槽内容的 -->
    <Tab-bar>
     <!-- 这里的path是发送给子组件的数据，由于不需要改变，所以没有绑定属性 -->
       <Tab-bar-item path='/home' activeColor='blue'>
          <i class="icon iconfont" slot="icon">&#xe621;</i>
          <span slot="text">首页</span>
       </Tab-bar-item>
       <Tab-bar-item path='/category'>
          <i class="icon iconfont" slot="icon">&#xe682;</i>
          <span slot="text">分类</span>
       </Tab-bar-item>
       <Tab-bar-item path='/cart'>
          <i class="icon iconfont" slot="icon">&#xe636;</i>
          <span slot="text">购物车</span>
       </Tab-bar-item>
       <Tab-bar-item path='/profile'>
         <i class="icon iconfont" slot="icon">&#xe613;</i>
          <span slot="text">我的</span>
       </Tab-bar-item>
   </Tab-bar>
</template>

<script>
  import TabBar from '../common/tabbar/TabBar'
  import TabBarItem from '../common/tabbar/TabBar-item'
  export default {
    name: 'MainTabBar',
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style>
  /* 引入css样式 */
   /* 引入字体样式 */
    @import url('~assets/fonts/iconfont.css');

</style>
