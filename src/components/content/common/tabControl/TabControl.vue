<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" 
         class="tab-item"
         :class="{active: currentIndex === index}"
         @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'TabControl',
  data () {
    return {
      currentIndex: 0  
    }
  },
  props: {
    titles : {
      type: Array,
      default () {
        return [];
      }
    }
  },
  methods: {
    // 改变tabControl的对应
    itemClick (index) {
      this.currentIndex = index;
      // 返回数据给父组件，让父组件显示对应点击数据
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    /* tabControl吸顶效果，就是到达某一位置后变成fixed定位 */
    /* position: sticky; */
    /* 到达44px后固定 */
    /* top: 44px; */
    /* z-index: 9; */
    background-color: #ffffff;
  }
  .tab-item {
    flex: 1;
  }
  .tab-item span {
    padding: 5px;
  }
  /* 点击哪个，哪个添加class */
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 2px solid var(--color-tint);
  }
  
  
</style>