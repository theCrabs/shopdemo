<template>
<!-- 投过票动态绑定class来改变颜色 -->
    <!-- <div class="tabbar-item" @click="isShow" :class="{isRed : isActive}" > -->
        <!-- 可以通过自己传入颜色 -->
    <div class="tabbar-item ignore" @click="isShow" :style='activeStyle'>

        <!-- 不写死，通过插槽传递个数和内容 -->
        <slot name="icon"></slot>   
        <slot name="text"></slot>
    </div>

</template>

<script>
export default {
    name: 'TabBarItem',
    // 父传子
    props: {
        // 点击那个传那个的路径
        path : String,  //传递过来的是一个字符串
        activeColor: {
            type: String,
            default: 'red'
        }
       
    },
    data () {
        return {
            // 名字与计算属性相同了，所以才报错
            // isActive: false,
        }
    },
    computed: {
        // 计算属性，当我们当前处于活跃的路由路径和我们传递过来的路径是一样时
        isActive () {
            return this.$route.path == this.path ;
        },
       activeStyle() {
        //   如果处于活跃状态，那么如果有传递颜色，过来，那么使用传递的，否则使用默认的红色
           return this.isActive ? {color: this.activeColor} : {}
       }
    },
    methods: {
        isShow () {
            // 如果已经在当前页面了，那么直接返回
            if (this.path === this.$route.path) return ;
            this.$router.push(this.path);
        },
    },
   
}
</script>

<style scoped>
/* ~，是引用我配置好的路径 */
     @import url('~assets/css/tabbarItem.css');
</style>