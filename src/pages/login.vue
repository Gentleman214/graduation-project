<template>
  <div class="full-height flex flex-align-center flex-justify-center">
    <div class="login-form flex flex-col flex-justify-center">
      <a-input placeholder="员工号" class="user-input" v-model="staffId">
        <a-icon slot="prefix" type="user" />
      </a-input>
      <a-input-password placeholder="密码" class="user-input" v-model="password">
        <a-icon slot="prefix" type="lock" />
      </a-input-password>
      <a-button type="primary" @click="login">登录</a-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data () {
      return {
        staffId: '',
        password: ''
      }
    },
    methods: {
      login () {
        if (!this.staffId) {
          this.$message.error('请输入用户名')
          return
        }
        if (!this.password) {
          this.$message.error('请输入密码')
          return
        }
        let params = {
          staffId: this.staffId,
          password: this.password
        }
        this.$api.common.login(params).then(res => {
          if (res?.code === 200) {
            let userInfo = {
              staffId: res.data.staffId,
              name: res.data.name
            }
            this.$store.commit('setToken', res.data.token)
            this.$store.commit('setUserInfo', userInfo)
            let millisecond = new Date().getTime()
            let expiresTime = new Date(millisecond + 60 * 1000 * 60 * 1) // cookie一小时失效
            this.$cookie.set('token', res.data.token, { expires: expiresTime })
            // this.$cookie.set('staffId', res.data.staffId, { expires: expiresTime })
            this.$router.replace('/')
          } else {
            this.$message.error(res?.userMsg ? res.userMsg : res.msg)
          }
        }).catch(err => {
          this.$message.error('请稍后重试')
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-form {
    height: 300px;
    padding: 0 40px;
    border: 1px solid #bfbfbf;
    border-radius: 15px;
    box-shadow:0 15px 25px rgba(0,0,0,0.5);
  }
  .user-input {
    max-width: 200px;
    margin-bottom: 20px;
  }
</style>
