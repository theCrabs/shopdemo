<template>
  <swiper>
    <swiper-item v-for="item in banner">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// 引入轮播图组件
    import Swiper from 'components/common/swiper/Swiper'
    import SwiperItem from 'components/common/swiper/SwiperItem'  
export default {
  name: 'HomeSwiper',
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data () {
    return {
      ImgLoadOk: false,   //防止重复发送请求
    }
  },
  methods: {
    swiperImgLoad() {
      if (!this.ImgLoadOk) {
        this.$emit('swiperImgLoad');
        this.ImgLoadOk = true
      }
    
    }
  },
  components: {
     Swiper,
     SwiperItem
  }
}
</script>

<style scoped>

</style>