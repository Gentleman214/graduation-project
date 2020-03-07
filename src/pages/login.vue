<template>
  <div class="full-height flex flex-align-center flex-justify-center">
    <div class="login-form flex flex-col flex-justify-around">
      <a-input placeholder="用户名" class="max-w-200" v-model="userName">
        <a-icon slot="prefix" type="user" />
      </a-input>
      <a-input placeholder="密码" class="max-w-200" v-model="password">
        <a-icon slot="prefix" type="lock" />
      </a-input>
      <a-button type="primary" @click="login">登录</a-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data () {
      return {
        userName: '',
        password: ''
      }
    },
    methods: {
      login () {
        if (!this.userName) {
          this.$message.error('请输入用户名')
          return
        }
        if (!this.password) {
          this.$message.error('请输入密码')
          return
        }
        if (this.userName !== 'admin') {
          this.$message.error('不存在该用户')
          return
        }
        if (this.password !== '123') {
          this.$message.error('密码输入错误')
          return
        }
        this.$store.commit('setToken', '3482950')
        let millisecond = new Date().getTime()
        let expiresTime = new Date(millisecond + 60 * 1000 * 60 * 1) // cookie一小时失效
        this.$cookie.set('token', '3482950', { expires: expiresTime })
        this.$router.replace('/')
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