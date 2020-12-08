<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="Details">
        <div 
          v-for="(item,index) in titles" 
          class="Details-item"
          :class="{active: currentIndex == index}"
          @click='currentShow(index)'>
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
// 导航栏导入
  import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailsNavBar',
  data () {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    currentShow (index) {
      this.currentIndex = index;
      // 发送请求
      this.$emit('titleClick',index );
    },
    back () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .back {
    margin: 6px 13px;
  }
  .Details {
    display: flex;
    font-size: 13px;
  }
  .Details-item {
    flex: 1;
  }
  .active {
    color: var(--color-tint);
  }
</style>