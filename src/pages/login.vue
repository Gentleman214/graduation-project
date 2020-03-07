<template>
  <div class="full-height flex flex-align-center flex-justify-center">
    <div class="login-form flex flex-col flex-justify-around">
      <a-input placeholder="用户名" class="max-w-200">
        <a-icon slot="prefix" type="user" />
      </a-input>
      <a-input placeholder="密码" class="max-w-200">
        <a-icon slot="prefix" type="lock" />
      </a-input>
      <a-button type="primary" @click="login">登录</a-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    methods: {
      login () {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-form {
    height: 150px;
  }
  .max-w-200 {
    max-width: 200px;
  }
</style>