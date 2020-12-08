<template>
  <div class="bar">
    <!-- 左边全选的部分 -->
    <div class="choose">
      <check-button 
            :is-check='isCheckAll'
            class="bar-btn" 
            @click.native='SelectAll'/>
      <span class="choose-all">全选</span>
    </div>
    <!-- 中间价格部分 -->
    <div class="price">
      合计: <span class="allPrice">{{allPrice}}</span>元
    </div>
    <!-- 右边去计算部分 -->
    <div class="calculate">
      提交订单({{allCount}})
    </div>
  </div>
</template>

<script>
// 引入打勾组件
  import CheckButton from 'components/content/checkButton/CheckButton'
// 引入vuex功能，将getters里面的属性转化成我们组件的计算属性,导入的格式是固定下方的
  import {mapGetters} from 'vuex'
export default {
  name: 'CartButtonBar',
  components: {
    CheckButton
  },
  computed: {
    // 将状态管理vuex的getters属性引入为组件computed属性
    ...mapGetters(['cartList']),
     isZero () {  //判断是否购物车没有数据
       if (this.cartList.length == 0) return 0
    },
    allPrice () {   // 总价格
      this.isZero
      return '￥' + this.cartList.filter(item => {
        return item.checked  //返回这个为true的
      }).reduce((preValue,item) => {  //遍历返回的，然后相加得总数
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    allCount () {  //总数量
      this.isZero
      return this.cartList.filter(item => {
        return item.checked
      }).length
    },
    isCheckAll() {  // 判断是否全选
      if (this.cartList.length == 0) return false  //如果为空，直接是false
      // 方案一  建议，因为性能高一点
      return !this.cartList.find(item => {  //只要取到了，就代表有没有选中的，所以返回true，所以我们要去取反
        return !item.checked   //find 高阶函数：找到一个是false的就停止遍历
      })
      // 方案二
      /*return !this.cartList.filter(item => {
        return !item.checked
      }).length   //这里只要不是0，取反都得false*/
    }
  },
  methods: { 
    SelectAll () {  //点击全选按钮
    if (this.isCheckAll) { //全部选中
      this.cartList.forEach((item,index) => item.checked = false)
    } else {  //部分或者没有选中
       this.cartList.forEach((item,index) => item.checked = true)
    }
    

    }
  }

}
</script>

<style scoped>
  .bar {
    height: 40px;
    position: relative;
    display: flex;
    z-index: 115;
    background-color: #fff;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    font-size: 13px;
    line-height: 40px;
  }
  .bar-btn {
    display: inline-block;
    position: absolute;
    top: 10px;
    color: #fff;
    line-height: 20px;
  }
  .choose-all {
    position: absolute;
    left: 30px;
  }
  .choose {
    width: 80px;
  }
  .price {
   flex: 1;
  }
  .allPrice {
    color: var(--color-tint);
    margin: 0 3px;
  }
  .calculate {
    width: 100px;
    text-align: center;
    background-image: linear-gradient(90deg,#ff6034,#ee0a24);
    color: #fff;
  } 
</style>