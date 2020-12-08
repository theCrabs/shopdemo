<template>
  <div id="app">

    <keep-alive exclude="Details">
      <router-view></router-view>
    </keep-alive>

    <Main-tab-bar></Main-tab-bar>

  </div>
</template>

<script>
  import MainTabBar from 'components/content/MaintabBar'


export default {
  name: 'App',
  components: {
    MainTabBar,

  }
}
</script>

<style>
  @import url('~assets/css/base.css');

</style>
