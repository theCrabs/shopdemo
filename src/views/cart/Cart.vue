<template>
   <div class="cart">
       <nav-bar class="shop-cart">
          <div slot="center" class="head">购物车({{length}})</div>
       </nav-bar>
       <!-- 商品列表 -->
       <cart-list />
       <!-- 底部工具栏 -->
        <cart-button-bar />
   </div>
</template>
 
<script>
// 引入模块
    import NavBar from 'components/common/navbar/NavBar'
// 引入常量名
    import {SHOPLENGTH} from 'store/mutations-types'
// 引入商品列表组件
    import CartList from './childCart/CartList'
// 引入工具栏组件
    import CartButtonBar from './childCart/CartButtonBar'
// 引入vuex功能，将getters里面的属性转化成我们组件的计算属性,导入的格式是固定下方的
    import {mapGetters} from 'vuex'

export default {
    name: 'cart',
    components: {
        NavBar,
        CartList,
        CartButtonBar
    },
    computed: {
        // 两种方法
        // 第一种，数组引入要的属性，这种名字就和引入的一样
        // ...mapGetters([SHOPLENGTH])  //上方直接通过shopLength调用

        // 第二种，对象方式引入，可以改变属性名字
        ...mapGetters({  //将getters的属性转化成计算属性
            length: SHOPLENGTH  //通过length调用
        })
    }
}
</script>
<style scoped>
    .cart {
        height: 100vh;
        width: 100%;
    }
    .shop-cart {
        background-color: var(--color-tint);
    }
    .head {
        color: #fff;
    }
</style>