<template>
  <div id="Details">
    <!-- 头部导航 -->
    <details-nav-bar
            class="top-details" 
            @titleClick='titleClick'
            ref="topNavBar"></details-nav-bar>
    <!-- 滚动模块 -->
    <scroll 
        class="d-wrapper" 
        ref="scroll"
        @contentScroll='contentScroll'
        :probe-type='3'>
      <!-- 轮播图组件 -->
      <detail-swiper :top-images='topImages'></detail-swiper>
      <!-- 基本信息组件 -->
      <detail-base-info :base-info='baseInfo'></detail-base-info>
      <!-- 店铺信息组件 -->
      <detail-shop-info :shop-info='shopInfo'></detail-shop-info>
      <!-- 商品图片组件 -->
       <detail-goods-info 
            :goods-info='goodsInfo'
            @imageLoadOk='imageLoadOk'>
      </detail-goods-info> 
      <!-- 商品尺寸大小 -->
      <detail-size 
            :size-info='sizeInfo' 
            ref="Size"></detail-size> 
      <!-- 评论区域组件 -->
      <detail-comment-info 
            :commemt-info='commemtInfo' 
            ref="comment"></detail-comment-info>
      <!-- 推荐商品数据列表 -->
     <goods-list 
          :goods='goodsInfoList' 
          :is-detail-msg='isDetailMsg' 
          ref="recommend"
          class="goods-list"></goods-list>
    </scroll>
     <!-- .native实现监听组件内原生事件 -->
    <back-top @click.native='backClick' v-show="isShowBackTop"></back-top>
   
    <!-- 底部工具栏 -->
    <detail-bottom-tab
          @addShopCar='addShopCar'
          @buyNow='buyNow'></detail-bottom-tab>
    <!-- toast组件 // 如果使用插件，这个就不需要了-->
    <!--
    <toast 
        :message='msg'
        :show='show' />
    -->
  </div>
</template>

<script>
// 引入标题模块
  import DetailsNavBar from './childComponents/DetailsNavBar'
// 引入网络请求模块,以及一个基本信息类
  import {getDetails,BaseInfo,ShopInfo,SizeInfo,getDetailsGoodsList} from 'network/details'
// 轮播图组件
  import DetailSwiper from './childComponents/detailSwiper'
// 基本信息组件
  import DetailBaseInfo from './childComponents/detailBaseInfo'
// 店铺信息组件
  import DetailShopInfo from './childComponents/DetailShopInfo'
// 商品图片组件
  import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
// 商品尺寸组件
  import DetailSize from './childComponents/DetailSize'
// 评论信息组件
  import DetailCommentInfo from './childComponents/DetailCommentInfo'
// 引入推荐商品数据列表模块
  import GoodsList from 'components/content/goods/GoodsList'
// 引入底部导航模块
  import DetailBottomTab from './childComponents/DetailBottomTab'
// 导入滚动模块
    import Scroll from 'components/common/scroll/Scroll'
// 引入防抖动的封装函数 （不适用混入时，可以留，这里用的混入，所以可以删除）
    import {debouce} from 'commons/utils'
// 返回首页导航按钮
    import BackTop from 'components/common/backTop/BackTop'
// 导入混入Minxi
    import {MixIn,backTopMixIn} from 'commons/mixin'
// 导入变量名
  import {ADDCART} from '../../store/mutations-types'
// 导入vuex中的actions属性，将actions中的函数映射到组件中
  import {mapActions} from 'vuex'

// 导入自己封装的toast组件
  //import Toast from 'components/common/toast/Toast'// 如果使用插件，这个就不需要了


export default {
  name: 'Details',
  data () {
    return {
      iid: null,
      topImages: [],  //轮播图数据
      baseInfo: {},   //基本信息保存
      shopInfo: {},    //店铺信息保存
      goodsInfo: {},   //商品图片等信息
      sizeInfo: {},   // 保存商品尺寸信息
      commemtInfo: {},   //品论数据保存
      goodsInfoList: [],  //推荐商品数据
      isDetailMsg: true,  //因为我们推荐数据的组件是用同一个的，所以用来区分数据
      themeTops: [],   //保存头部导航栏对应到的offsetTop值
      currentIndex: 0,   //防止滚动那里重复刷数据
      isShowBackTop: false,  //默认设置是看不见的
      /*
      msg: '',   //保存toast数据
      show: false  //是否显示toast
      */
    }
  },
  components: {
    DetailsNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailSize,
    DetailCommentInfo,
    GoodsList,
    DetailBottomTab,
    BackTop,
    Scroll,
    //Toast   //自己封装的toast组件 ,引用插件的话就不用这个了
  },
  created () {
    this.iid = this.$route.params.iid;  //保存传入的iid
    // 1、显示对应的数据
    getDetails(this.iid).then(res => {
      const data = res.result;
      //  2、保存详细里面的数据
      this.topImages = data.itemInfo.topImages
      console.log(res)
        
      // 3、保存基本信息数据
      // 重点二、把这个对象new出来，同时传递参数
      this.baseInfo = new BaseInfo(data.itemInfo,data.shopInfo.services,data.columns)

      // 4、保存店铺信息数据
      this.shopInfo = new ShopInfo(data.shopInfo);

      // 5、商品图片等信息
      this.goodsInfo = data.detailInfo;

      // 6、商品尺寸信息 
      this.sizeInfo = new SizeInfo(data.itemParams.info,data.itemParams.rule);

      // 7、评论信息
      // 判断是否有评论，因为存在没有评论的情况
      if (data.rate.cRate !== 0) this.commemtInfo = data.rate;

         /*this.$nextTick(() => {
            //$nextTick是等该组件创造完后再执行一个回调函数，
            //但是这个只是检测到你dom渲染出来就执行，而图片数据不一定渲染完了，所以高度还是有问题，所以用updated更新
            // 第二种方法就是再updated函数里写
            this.themeTops.push(0);
            this.themeTops.push(this.$refs.Size.$el.offsetTop);
            this.themeTops.push(this.$refs.comment.$el.offsetTop);
            this.themeTops.push(this.$refs.recommend.$el.offsetTop);
            console.log(this.themeTops)
          })*/
        

    }),
   
    // 推荐其它商品列表
    getDetailsGoodsList().then(res => {
      //  获取商品列表数据
      // console.log(res)
      this.goodsInfoList = res.data.list;
    })
  },

  // 不使用混入时
  /*mounted () {
     const refresh = debouce(this.$refs.scroll.refresh,500);  //刷新，让滚动框架重新计算滚动区域
    // 事件总线，接收传递过来的事件
    this.$bus.$on('imgLoadOk', () => {
        refresh();// 防抖动
    })
  },*/
  
  // 使用混入时
  mixins: [MixIn,backTopMixIn],
  methods: {
    ...mapActions({  //使用对象的形式映射进来
      'addCart': ADDCART
    }),
    imageLoadOk () {
      // 刷新
      this.$refs.scroll.refresh();

      // 获取高度，给我们头部导航栏定位锚点用，在这里监听是最好的，因为刷新完后，高度获取绝对正确
      this.themeTops.push(0);
      this.themeTops.push(this.$refs.Size.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      // 空间换时间,加入最大值
      this.themeTops.push(Number.MAX_VALUE)
      // console.log(this.themeTops)
    },
    titleClick (index) { //头部导航栏
      this.$refs.scroll.scrollTo(0,-this.themeTops[index],500)
    },
    contentScroll(position) {
      // 获取y值，为了方便我们对比。所以获取正值
      const positionY = -position.y
      // 保存数组长度
      const length = this.themeTops.length - 1;
      // 滚动，这个值与themeTops对比
      for (let i in this.themeTops) {  //获取的i是字符串
        // 这样子3没法获取到
        // if (positionY > this.themeTops[i] && positionY < this.themeTops[parseInt(i)+1]) {
        //   console.log(i)
        // }
            /*if (this.currentIndex != i && ((i < length -1 && positionY > this.themeTops[i] && positionY < this.themeTops[parseInt(i)+1]) || 
                (i == length -1 && positionY > this.themeTops[i]))) {
                  this.currentIndex = i;// 防止赋值过程过于频繁
                  // 改变对应锚点
                  this.$refs.topNavBar.currentIndex = i;
                }*/
        // 上面的判断式子过于长，对于我们来说，写的多，而且计算机读的时间也会长，所以采取空间换时间写法
        //空间换时间   ---  在数组里加入一个最大的值，虽然占空间，但是读取性能高 在数组里push进去 Number.MAX_VALUE
            if (this.currentIndex != i && (positionY > this.themeTops[i] && positionY < this.themeTops[parseInt(i) + 1])) {
               this.currentIndex = i;// 防止赋值过程过于频繁
               // 改变对应锚点
               this.$refs.topNavBar.currentIndex = i;
            }

      }
        // 当达到1000时将按钮显示出来,注意，position.y是负数
         this.listenerBackTopShow(position)
        //  console.log(position.y)
      
    },
    // 加入购物车
    addShopCar () {
      // 1、先获取数据
      const product = {};
      product.title = this.baseInfo.title
      product.price = this.baseInfo.NowPrice
      product.desc = this.baseInfo.desc
      product.image = this.topImages[0]
      product.iid = this.iid
      
      // 2、发送这个数据给vuex管理,共享
      // this.$store.dispatch(ADDCART,product).then(res => {
      //   console.log(res)  //vuex中的actions可以接收一个promise执行异步操作
      // })
      // 使用映射关系，直接将action中的方法映射到组件内，直接调用
      this.addCart(product).then(res => {
        /*// 如果使用插件，这个就不需要了
        this.msg = res
        this.show = true
        // 1.5s之后消失
        setTimeout(() => {
          this.show = false
          this.msg = ' '
        },1500)
        */
       this.$toast.show(res)
      })

    },
    buyNow () {
      console.log('立即购买')
    }
  }
  
  
}
</script>

<style scoped>
  #Details {
    overflow-x: hidden;
    height: 100vh;
  }
  .d-wrapper {
    height: calc(100% - 93px);
    position: relative;
    z-index: 100;
    background-color: white;
  }
   .goods-list {
     margin-top: 8px;
  }
  .top-details {
    position: relative;
    z-index: 101;
    background-color: white;
  }
 
</style>

