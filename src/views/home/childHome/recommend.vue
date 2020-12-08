<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommendItem">
      <a :href="item.link">
        <!-- 使用插件 -->
        <img v-lazy="item.image" alt="" @load="recommondImgLoad">
      </a>
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recommend',
  data () {
    return {
      ImgLoad: false,  
    }
  },
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    recommondImgLoad () {
      if(!this.ImgLoad) {
        this.$emit('recommondImgLoad')
        this.ImgLoad = true
      }
     
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    margin-top: 50px;
    padding-bottom: 15px;
    font-size: 14px;
    border-bottom: 5px solid #cfdcfc;
  }
  .recommendItem {
    flex: 1;
  }
  .recommendItem img {
    width: 90%;
  }
  .recommendItem p {
    padding-top: 5px;
  }
</style>