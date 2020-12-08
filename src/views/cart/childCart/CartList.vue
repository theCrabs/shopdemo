<template>
  <scroll class="item-list">
    <cart-list-item 
          v-for="(item,index) in cartList" 
          :key="index"
          :product="item" />
  </scroll>
</template>


<script>
// 导入滚动模块
    import Scroll from 'components/common/scroll/Scroll'
// 引入每商品详细组件
    import  CartListItem from './CartListItem'
// 引入vuex的功能，将vuex的getters里面属性转化成组件内的计算属性
    import {mapGetters} from 'vuex'
export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>
  .item-list {
    height: calc(100% - 93px - 40px);
    overflow: hidden;
  }
  
</style>

