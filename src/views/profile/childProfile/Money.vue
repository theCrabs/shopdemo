<template>
  <div class="money">
    <money-item  
          v-for="item in moneyList"
          :listItem='item'
          class="money-item" />
  </div>
 

</template>

<script>
// 导入item
  import MoneyItem from './MoneyItem'

export default {
  name: 'Money',
  data () {
    return {
      moneyList: {
        Balance: {
          count: '0.00',
          desc: '我的余额',
          unit: '元'
        },
        Cfav: {
          count: 0,
          desc: '我的优惠',
          unit: '个'
        },
        Point: {
          count: 0,
          desc: '我的积分',
          unit: '分'
        }
      }
    }
  },
  components: {
    MoneyItem
    
  }
}
</script>

<style scoped>
  .money {
    display: flex;
    text-align: center;
    border-bottom: 10px solid #eee;
  }
  .money-item {
    flex: 1;
    border-right: 1px solid #eee;
    padding: 20px 0;
  }
  .money-item:last-child {
    border-right: none;
  }
</style>