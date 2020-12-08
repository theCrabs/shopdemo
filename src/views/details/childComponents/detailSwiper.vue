<template>
  <swiper class="topImages">
    <swiper-item v-for="item in topImages" class="topImages-item">
      <img :src="item" />
    </swiper-item>
  </swiper>
</template>

<script>
// 引入轮播图组件
    import Swiper from 'components/common/swiper/Swiper'
    import SwiperItem from 'components/common/swiper/SwiperItem' 
export default {
  name: 'DetailSwiper',
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  mounted () {
    
  }
}
</script>

<style scoped>
  .topImages {
    top: 0px !important;
    height: 250px;
    overflow: hidden;
  }
  .topImages-item img{
    height: 100%;
  }
</style>