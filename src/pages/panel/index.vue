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
  import modifyPassword from '../../components/modify-password.vue'
  export default {
    name: "index",
    components: { modifyPassword },
    mounted () {
      this.openNotification()
    },
    methods: {
      openNotification() {
        if (this.$store.state.flagOfModifyPassword) {
          const key = `open${Date.now()}`
          this.$notification['warning']({
            message: '消息通知',
            description: '为保障您的账号安全，请尽快修改默认密码～',
            style: { 'padding': '20px' },
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
        this.$store.commit('setFlagOfModifyPassword', false)
      }
    }
  }
</script>

<style scoped>

</style>
