<template>
<!-- vue中不介意直接操作dom，所以添加一个 -->
  <div class="wrapper" ref='wrapper'>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 导入better-scroll框架
  import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      BS: null
    }
  },
  mounted () {
    // 这里的el不通过他们的class，而是我们自己绑定一个ref
    // 这样获取到的节点是唯一的
    // 1、创建对象
    this.BS = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad

    }),
    // 2、监听滚动位置
     this.BS.on('scroll', (position) => {
      //  console.log(position)
      // 把位置传递给父组件
      this.$emit('contentScroll', position)
    })
    // 3、上拉加载
     this.BS.on('pullingUp', () => {
      //  console.log('上拉加载')
      // 发送加载请求给父组件
      this.$emit('pullingUp');
     })

  },
   methods: {
    // es6新语法,给我们time设置一个默认值
    scrollTo(x,y,time=300) {
      // 调用框架的scrollTo方法
       this.BS && this.BS.scrollTo(x,y,time);
    },
    refresh() {
      this.BS && this.BS.refresh();
    },
    finishPullUp() {
      this.BS && this.BS.finishPullUp();
    },
    getScrollY() {
      return this.BS ? this.BS.y : 0
    }
  }
}
</script>

/**
  ref如果是绑定再组件中的，那么通过this.$refs.refname获取到的是一个组件对象
  ref如果是绑定再元素中的，那么通过this.$refs.refname获取到的就是一个元素节点
 */