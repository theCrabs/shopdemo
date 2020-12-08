<template>
  <div class="goods-item"  @click="goodsItemClick">
    <!-- 这个组件是被home，detail两个组件复用的，由于图片数据不一样，所以这里v-if判断 -->
    <!-- 图片链接 -->
    <!-- img的src改成v-lazy是因为使用懒加载插件 -->
    <img 
      v-lazy="goodsItem.show.img" alt="" 
      @load="imgLoadOk"
      v-if="!isDetailMsg" />
      <!-- detail组件的推荐商品数据 -->
    <img v-lazy="goodsItem.image" alt="" v-else />
    <!-- 下面文字 -->
    <div class="context">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="cafv">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    },
    isDetailMsg: {
      type: Boolean
    }
  },
  methods: {
    imgLoadOk () {
      // 事件总线，发送出事件
      this.$bus.$emit('imgLoadOk');

    // 不使用混入时，进入哪个就发送给哪个组件请求刷新
    //  if (this.$route.path.indexOf('/home')) {
    //     this.$bus.$emit('HomeimgLoadOk');
    //  } else if (this.$route.path.indexOf('/details')) {
    //     this.$bus.$emit('DetailImgLoad');
    //  }
    },
    goodsItemClick () {
      // 路由跳转
      if (/details/.test(this.$route.path)) {
        //  跳转到其它路径
        this.$toast.show(this.goodsItem.title)
      } else {
        // 跳转到详情页
        this.$router.push('./details/' + this.goodsItem.iid)  //使用push而不用replace是因为后面要有返回功能
      }
      
    }
  }
}
</script>

<style scoped>
  .goods-item {
    position: relative;
    padding-bottom: 40px;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .goods-item .context {
    position: absolute;
    bottom: 5px;
    left: 0px;
    right: 0px;
    font-size: 12px;
    text-align: center;
  }
  .context p {
    width: 100%;
    /* 文字超过点点隐藏 */
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .price {
    color: var(--color-tint);
    padding-right: 20px;
  }
  .cafv {
    position: relative;
  }
  .cafv::before {
    display: inline-block;
    content: ' ';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url(~assets/img/common/collect.svg) 0 0/14px 14px;
  }
</style>