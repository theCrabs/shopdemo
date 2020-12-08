<template>
  <div class="navBar">
    <!-- 找个div包裹是为了给我们slot添加样式，但是由于slot后期渲染是被替换的，所以只能通过div包裹添加 -->
    <div class="left">
      <slot name='left'></slot>
    </div>
    <div class="center">
      <slot name='center'></slot>
    </div>
    <div class="right">
      <slot name='right'></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
  .navBar {
    display: flex;
    line-height: 44px;
    height: 44px;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
  }
  .left,.right{
    width: 60px;
  }
  .center {
    flex: 1;
    text-align: center;
  }
</style>