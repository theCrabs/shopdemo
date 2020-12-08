<template>
  <div class="checkBtn" 
        :class="{isCheck : isCheck}" >
      <i class="icon iconfont">&#xe660;</i>
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isCheck: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
   .checkBtn {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #666;
    margin: auto 5px;
    color: white;
  }
  .checkBtn i {
    vertical-align: middle;
    
  }
  .isCheck {
    background-color: skyblue;
    border-color: skyblue;
  }
</style>