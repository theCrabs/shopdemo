<template>
    <div id="profile">
        <nav-bar class="profile-nav">
            <h3 slot="center">个人信息</h3>
        </nav-bar>
        <!-- 登陆模块 -->
        <login />
        <!-- 余额模块 -->
        <money />
         <!-- 下半部分 -->
        <profile-list />
    </div>
</template>

<script>
// 引入模块
    import NavBar from 'components/common/navbar/NavBar'
// 导入login栏
    import Login from './childProfile/Login'
// 导入余额模块
    import Money from './childProfile/Money'
// 导入profileList
  import ProfileList from './childProfile/ProfileList'

export default {
    name: 'profile',
    components: {
        NavBar,
        Login,
        Money,
        ProfileList
    }
}
</script>

<style scoped>
    .profile-nav {
        background-color: var(--color-tint);
        color: white;
        font-weight: normal;
    }
</style>