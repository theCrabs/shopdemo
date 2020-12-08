<template>
    <div id="home">
        <nav-bar class="home-nav">
            <h3 slot="center">购物街</h3>
        </nav-bar>
         <!-- 分页导航栏 -->
        <tab-control 
            :titles="['流行','精品','新款']" 
            @tabClick='tabClick'
            ref="tabTop1"
            class="isFixed"
            v-show="isFixed"></tab-control>
        <!-- 通过添加ref,那么父组件就可以直接拿到子组件里的数据，方法，属性，通过this.$refs.名字.方法名/属性名 -->
        <!-- props传递数据过去给子组件，表示需要监听滚动 -->
        <scroll class="Wrapper"  
                ref="scroll" 
                :probeType='3'
                @contentScroll='contentScroll'
                :pullUpLoad='true'
                @pullingUp='LoadMore'>
            <!-- 轮播图组件 -->
            <home-swiper 
                :banner='banner'
                @swiperImgLoad='swiperImgLoad'
                ></home-swiper>
            <!-- 推荐模块 -->
            <recommend 
                :recommends='recommends'
                ref="recommondTop"
                @recommondImgLoad='recommondImgLoad'></recommend>
            <!-- 流行模块 -->
            <feature></feature>
            <!-- 分页导航栏 -->
            <tab-control 
                :titles="['流行','精品','新款']" 
                @tabClick='tabClick'
                ref="tabTop2"></tab-control>
            <!-- 列表对应的信息 -->
            <!-- 通过tabControl传递过来的点击哪个，来决定请求哪个数据 -->
            <goods-list :goods="goodsData"></goods-list>
        </scroll>
        <!-- 返回首页导航按钮 -->
        <!-- .native实现监听组件内原生事件 -->
        <back-top @click.native='backClick' v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
// 引入模块
    import NavBar from 'components/common/navbar/NavBar'
// 网络请求模块
    import {getHomeMultidata,getHomeTabData} from 'network/home'
// 轮播图组件
    import HomeSwiper from './childHome/homeSwiper'
// 推荐模块
    import Recommend from './childHome/recommend'
// 流行模块
    import Feature from './childHome/Feature'
// 分页导航栏
    import TabControl from 'components/content/common/tabControl/TabControl'
// 商品数据列表
    import GoodsList from 'components/content/goods/GoodsList'
// 导入滚动模块
    import Scroll from 'components/common/scroll/Scroll'
// 返回首页导航按钮
    import BackTop from 'components/common/backTop/BackTop'
// 引入防抖动的封装函数 （不适用混入时，可以留，这里用的混入，所以可以删除）
    import {debouce} from 'commons/utils'
// 引入混入 
    import {MixIn} from 'commons/mixin'
export default {
    name: 'home',
    data () {
        return {
            results: null,
            banner: [],  //banner数据，请求过来的   
            recommends: [],
            // tabControl三个选项的对应数据
            goods: {
                'pop': { //流行
                    page: 1, list: []
                },
                'new': { //新款
                    page: 1, list: []
                },
                'sell': { //精品
                    page: 1, list: []
                }
            },
            currentGoods: 'pop',
            isShowBackTop: false,  //默认设置是看不见的
            tabOffsetTop: 0,   //用于接收tabControl的offsetTop值
            isFixed: false,    //默认不需要固定tabControl  这个方法效果不行
            saveY: 0,  // 保存用户浏览的高度
        }
    },
    components: {
        NavBar,
        HomeSwiper,
        Recommend,
        Feature,
        TabControl,
        GoodsList,
        Scroll,
        BackTop,
    },
    created () { // 组件一旦创建就发送请求获取数据
    // 一般不建议把请求的其它操作也写再这里，所以封装成一个方法调用
        // 1、请求多个数据
        this.getHomeMultidata();  
        this.getHomeTabData('pop');
        this.getHomeTabData('new');
        this.getHomeTabData('sell');
    },

// 不适用混入时的刷新
    /*mounted () {
        const refresh = debouce(this.$refs.scroll.refresh,500);  //刷新，让滚动框架重新计算滚动区域
        // 事件总线，接收传递过来的事件
        this.$bus.$on('imgLoadOk', () => {
            refresh();// 防抖动
        }),
        // 获取offsetTop值
        // 每一个组件都有一个$el属性，可以获取子组件元素的节点
        console.log(this.$refs.tabTop2.$el.offsetTop)
    }*/
    // 使用混入
    mixins: [MixIn],

    activated () {   //组件处于活跃状态调用
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        // 刷新
        this.$refs.scroll.refresh()
    },
    deactivated () {  //组件处于不活跃状态调用
        // 获取我们上滑的高度，记录用户操作
        this.saveY = this.$refs.scroll.getScrollY();
    },
    methods: {
         /**
         * 组件相关方法
         */
        // 三个分类
        tabClick (index) {
            // 根据索引请求对应数据
            switch(index) {
                case 0:
                    this.currentGoods = 'pop';
                    break
                case 1:
                    this.currentGoods = 'sell';
                    break;
                case 2:
                    this.currentGoods = 'new';
            }
            // 因为有一个伪分类栏。所以他们两个的点击要对应一起
            this.$refs.tabTop1.currentIndex = index;
            this.$refs.tabTop2.currentIndex = index;
        },
        // 返回顶部
        backClick () {
            this.$refs.scroll.scrollTo(0,0,300)
           // this.$refs.scroll.BS.scrollTo(0,0,500)  直接再Scroll组件封装一个方法，然后我们直接调用方法就ok
        },
        // 轮播图请求完成，获取tabControl高度
        swiperImgLoad () {
            // 接收高度
           this.tapOffsetTop;
        },
        // 推荐模块完成，获取图片
        recommondImgLoad () {
            this.tapOffsetTop;
            // console.log(this.tabOffsetTop)
        },
        /**
         * 网络请求相关方法
         */
        getHomeMultidata () {
           getHomeMultidata ().then( res => {
                this.results = res.data //我们所需要的全部数据
                this.banner = res.data.banner.list;  //数据里面的banner数据
                this.recommends = res.data.recommend.list;  //一次类推
            })
        },
        getHomeTabData(type) {
            // 获取一下那一页的数据
            const page = this.goods[type].page;
            getHomeTabData(type,page).then(res => {
                // ...就是相当于(for (item in res.data.list) 功能，遍历每一个元素，然后添加进数组)
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page += 1;
                // 告诉页面，我已经刷新数据成功了
                this.$refs.scroll.finishPullUp();
              
            })
           
        },
        LoadMore() {
            // 上拉加载更多
            this.getHomeTabData(this.currentGoods);
        
        }
    },
    computed: {
        goodsData () {
            return this.goods[this.currentGoods].list;
        },
        contentScroll (position) {
            return position => {
                // console.log(position)
                // 当达到1000时将按钮显示出来,注意，position.y是负数
                this.isShowBackTop = -(position.y) > 1000
                // 判断是否需要固定tabControl
                //tabControl的高度减去首页头部标题高度
                this.isFixed = -(position.y) > (this.tabOffsetTop - 44);
            }
        },
        tapOffsetTop () {  // 获取tabControl的高度
         // 因为tabControl的高度受轮播图和推荐模块图片加载速度的影响，所以下面做三目运算符
        // 最高的那个值就是我们要的
            this.tabOffsetTop = this.$refs.recommondTop.$el.offsetTop > this.$refs.tabTop2.$el.offsetTop ? this.$refs.recommondTop.$el.offsetTop : this.$refs.tabTop2.$el.offsetTop;
        }
          
    }

}
</script>

<style scoped>
    #home {
        /* 高度自适应二特有的，通过定位 */
        position: relative;
        height: 100vh;  /*给我们home100个视口*/
    }
    .navBar {
        /* 由于这个导航条的背景色是每个页面都不固定的，所以再每个页面单独设置 */
        background-color: var(--color-tint);
       
        color: white;
        /* 浏览器原生js时使用的局部滚动，现在使用插件，已经不需要这个了 */
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 99;
    }
    /* 高度自适应方式二 */
    .Wrapper {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;        
        right: 0;
        bottom: 49px;
    }
    /* 滚动自适应高度方式一 */
   /* .Wrapper {
        //减去头部 
        height: calc(100% - 44px);
        overflow: hidden;
    } 
    */
    /* tabControl固定位置，效果不行 */
    /*.isFixed {
        position: fixed;
        left: 0;
        right: 0;
        top: 44px;
    }*/
    /*偷天换日，当我们上滑到一定距离，这个显示*/
    .isFixed {
        position: relative;
        top: 44px;
        z-index: 99;
    }
</style>