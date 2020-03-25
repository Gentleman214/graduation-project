<template>
  <div id="user-info" class="padding">
    <div class="info flex">
      <div class="flex flex-col max-w-100">
        <a-avatar :size="100" icon="user" />
        <a-button class="mt-5" size="small" type="primary" ghost>更换头像</a-button>
      </div>
      <div class="basic-info">
        <p>用户名：{{$store.state.userInfo.name}}</p>
        <p>性别：男</p>
        <p>联系方式：123456</p>
        <p>入职时间：{{dateFormat(new Date(), 'YYYY-MM-DD hh:mm:ss')}}</p>
        <p>出生日期：{{dateFormat(new Date(), 'YYYY-MM-DD')}}</p>
        <p>年龄：22</p>
        <p>职位：搬砖</p>
        <p>角色：
          <a-radio-group v-model="form.authority">
            <a-radio :value="0">管理员</a-radio>
            <a-radio :value="1">默认角色</a-radio>
          </a-radio-group>
        </p>
        <div class="mt-20">
          <a-button type="primary" ghost>编辑</a-button>
          <a-button class="ml-20" @click="() => $router.back()">返回</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { dateFormat } from "../util/dateFormat";
  export default {
    name: "user-info",
    data () {
      return {
        edit: false,
        form: {
          authority: 0
        }
      }
    },
    methods: {
      dateFormat
    }
  }
</script>

<style scoped lang="scss">
  #user-info .info { padding: 20px;border: 1px solid rgba(0, 0, 0, 0.08);border-radius: 10px;box-shadow: 2px 0 6px rgba(0, 0, 0, 0.08);}
  #user-info .basic-info { margin-left: 50px }
</style>