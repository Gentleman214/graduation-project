<template>
  <a-locale-provider :locale="zh_CN">
    <router-view></router-view>
  </a-locale-provider>
</template>

<script>
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn')
  export default {
    name: "App.vue",
    data () {
      return {
        zh_CN
      }
    }
  }
</script>

<style scoped>

</style>