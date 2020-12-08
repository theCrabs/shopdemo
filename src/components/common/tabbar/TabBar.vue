<template>
<!-- 这里只放该组件相关的，其它的用插槽代替 -->
    <div id="tabbar">
        <!-- 不写死，通过插槽，传递内容 -->
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'TabBar',

}
</script>

<style scoped>
   /* 导出样式 */
    @import url('~assets/css/tabbar.css');
</style>