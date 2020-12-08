<template>
  <div class="goods-list">
    <goods-list-item 
      v-for="(item,index) in goods" 
      :key="index"
      :goodsItem='item'
      :isDetailMsg='isDetailMsg'
     ></goods-list-item>
  </div>
</template>

<script>
// 列表项
    import GoodsListItem from 'components/content/goods/GoodsListItem'
export default {
  name: 'GoodsList',
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    },
    isDetailMsg: {
      type: Boolean,
      default: false
    }
  },
  components: {
    GoodsListItem
  },
 
}
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>