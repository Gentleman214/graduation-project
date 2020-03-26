<template>
  <page :showTitle="false" :showHeader="false">
    <template slot="content">
      内容区
      {{$store.state.userInfo}}
      <modify-password ref="drawer"></modify-password>
    </template>
  </page>
</template>

<script>
  import { mapState } from 'vuex'
  import modifyPassword from '../../components/modify-password.vue'
  export default {
    name: "index",
    components: { modifyPassword },
    mounted () {
      this.openNotification()
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo,
        notice: state => state.notice
      })
    },
    methods: {
      openNotification() {
        if (this.userInfo.modify && this.notice && this.notice.modifyPassword) {
          const key = `open${Date.now()}`
          this.$notification['warning']({
            message: '消息通知',
            description: '为保障您的账号安全，请尽快修改默认密码～',
            style: { 'padding': '20px' },
            duration: 4,
            btn: h => {
              return h(
                'a-button',
                {
                  props: {
                    type: 'primary',
                  },
                  on: {
                    click: () => {
                      this.$notification.close(key)
                      this.$refs.drawer.openDrawer()
                    },
                  },
                },
                '去修改',
              )
            },
            key,
            onClose: close
          })
        }
        if (this.userInfo.perfect && this.notice && this.notice.perfectInfo) {
          const key = `open${Date.now()}---`
          this.$notification['warning']({
            message: '消息通知',
            description: '您的信息不完全，请尽快完善您的个人信息～',
            style: { 'padding': '20px', 'margin-top': '200px' },
            duration: 6,
            btn: h => {
              return h(
                'a-button',
                {
                  props: {
                    type: 'primary',
                  },
                  on: {
                    click: () => {
                      this.$notification.close(key)
                      this.$router.push(`/userInfo/edit/${this.userInfo.staffId}`)
                    },
                  },
                },
                '去完善',
              )
            },
            key,
            onClose: close
          })
        }
        this.$store.commit('setNotice', null)
      }
    }
  }
</script>

<style scoped>

</style>
