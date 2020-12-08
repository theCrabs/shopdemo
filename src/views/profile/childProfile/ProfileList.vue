<template>
  <div class="profileList">
    <profile-list-item class="profile-list-item">
      <i slot="image" class="icon iconfont">&#xe613;</i>
      <span slot="desc">我的消息</span>
    </profile-list-item>
    <profile-list-item class="profile-list-item">
      <i slot="image" class="icon iconfont">&#xe71d;</i>
      <span slot="desc">积分商城</span>
    </profile-list-item>
    <profile-list-item class="profile-list-item special">
      <i slot="image" class="icon iconfont">&#xe6ad;</i>
      <span slot="desc">会员卡</span>
    </profile-list-item>
    <profile-list-item class="profile-list-item">
      <i slot="image" class="icon iconfont">&#xe636;</i>
      <span slot="desc">购物车</span>
    </profile-list-item>
    <profile-list-item class="profile-list-item">
      <i slot="image" class="icon iconfont">&#xe60c;</i>
      <span slot="desc">点赞购物APP</span>
    </profile-list-item>
  </div>
</template>

<script>
// 导入item
  import ProfileListItem from './ProfileListItem'
export default {
  name: 'ProfileList',
  components: {
    ProfileListItem
  }
}
</script>

<style scoped>
  .profile-list-item {
    padding: 10px 0 0 15px;
    display: flex;
  }
  .profile-list-item i {
    font-size: 22px;
    height: 25px;
  }
  .profile-list-item span {
    font-size: 15px;
    margin-left: 10px;
    flex: 1;
    line-height: 35px;
    border-bottom: 1px solid #ddd;
  }
  /* 第三个样式特别 */
  .special {
    border-bottom: 10px solid #ddd;
  }
  .special .profile-list-item span {
    border-bottom: none;
  }
</style>