<template>
  <div class="login">
    <div class="login-img">
      <img src="~assets/img/profile/user.png" />
    </div>
    <div class="user-info">
      <p>登陆/注册</p>
      <p class="font-small"> 
        <span class="phone-img">
          <img src="~assets/img/profile/phone.png" />
        </span>
        <span>{{message}}</span>
      </p>
    </div>
    <div class="right-angle">
      <img src="~assets/img/profile/arrow_right.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      message: '暂未绑定手机号'
    }
  }
}
</script>

<style scoped>
  .login {
    padding: 20px 10px;
    display: flex;
    background-color: var(--color-tint);
  }
  .login-img {
    width: 60px;
    height: 60px;
    margin: 0 10px;
    background-color: #fff;
    border-radius: 50%;
  }
  .login-img img {
    width: 100%;
  }
  .user-info {
    flex: 1;
    padding: 5px 0;
    line-height: 25px;
    color: #fff;
  }
  .font-small {
    font-size: 14px;
  }
  .phone-img {
    vertical-align: middle;
  }
  .right-angle {
    width: 30px;
    text-align: center;
    line-height: 60px;
  }
  .right-angle img {
    width: 80%;
  }
</style>