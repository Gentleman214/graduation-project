<template>
  <div id="user-info" class="padding">
    <div class="info flex">
      <div class="flex flex-col max-w-100">
        <a-avatar :size="100" icon="user" />
        <a-button class="mt-5" size="small" type="primary" ghost>更换头像</a-button>
      </div>
      <div class="basic-info">
        <div>
          <span class="item">工号：</span>
          <span>{{info.staff_id}}</span>
        </div>
        <div>
          <span class="item">用户名：</span>
          <a-input allowClear v-if="edit" style="max-width: 150px" v-model="info.name"></a-input>
          <span v-else>{{info.name}}</span>
        </div>
        <div>
          <span class="item">性别：</span>
          <a-radio-group v-model="info.gender" v-if="edit">
            <a-radio value="男">男</a-radio>
            <a-radio value="女">女</a-radio>
          </a-radio-group>
          <span v-else>{{info.gender}}</span>
        </div>
        <div>
          <span class="item">联系方式：</span>
          <a-input allowClear v-if="edit" style="max-width: 150px" v-model="info.phone" maxLength="11"></a-input>
          <span v-else>{{info.phone}}</span>
        </div>
        <div>
          <span class="item">入职时间：</span>
          <a-date-picker v-if="edit" v-model="info.hiredate" :disabled="!isManage"></a-date-picker>
          <span v-else-if="info.hiredate">{{dateFormat(info.hiredate, 'YYYY-MM-DD')}}</span>
          <span v-else>--</span>
        </div>
        <div>
          <span class="item">出生日期：</span>
          <a-date-picker v-if="edit" v-model="info.birthday" :showToday="false"></a-date-picker>
          <span v-else-if="info.birthday">{{dateFormat(info.birthday, 'YYYY-MM-DD')}}</span>
          <span v-else>--</span>
        </div>
        <div>
          <span class="item">年龄：</span>
          {{computeAge(info.birthday)}}
        </div>
        <div>
          <span class="item">工龄：</span>
          {{computeWordingYears(info.hiredate)}}
        </div>
        <div>
          <span class="item">职位：</span>
          <a-cascader
            v-if="edit"
            :options="role"
            v-model="info.role"
            :disabled="!isManage"
            expandTrigger="hover"
            placeholder="请选择"
          />
          <span v-else>{{info.role && info.role.length ? info.role.join('-') : ''}}</span>
        </div>
        <div>
          <span class="item">系统角色：</span>
          <a-radio-group v-model="info.authority" v-if="edit" :disabled="!isManage">
            <a-radio :value="1">管理员</a-radio>
            <a-radio :value="2">默认角色</a-radio>
          </a-radio-group>
          <span v-else>{{info.authority === 1 ? '管理员' : '默认角色'}}</span>
        </div>
        <div class="mt-20">
          <a-button class="mr-20" v-show="!edit" type="primary" ghost @click="edit = true">编辑</a-button>
          <a-button class="mr-20" v-show="edit" type="danger" ghost @click="save">保存</a-button>
          <a-button class="mr-20" v-show="edit" type="primary" ghost @click="edit = false">取消</a-button>
          <a-button @click="() => $router.back()">返回</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { dateFormat } from '../util/dateFormat';
  import { isMobile } from '../util/check';
  import moment from "moment";
  const role = [
    {
      value: '系统',
      label: '系统',
      children: [
        {
          value: '管理员',
          label: '管理员'
        },
        {
          value: '默认角色',
          label: '默认角色'
        }
      ]
    },
    {
      value: '库存',
      label: '库存',
      children: [
        {
          value: '入库管理',
          label: '入库管理'
        },
        {
          value: '出库管理',
          label: '出库管理'
        }
      ]
    }
  ]
  export default {
    name: "user-info",
    data () {
      return {
        role,
        edit: false,
        isManage: false,
        info: {
          staff_id: '',
          name: '',
          gender: '',
          phone: '',
          head_pic: '',
          hiredate: null,
          birthday: null,
          authority: 2,
          role: []
        }
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo
      })
    },
    mounted () {
      this.getUserInfo()
    },
    watch:{
      '$route': 'getUserInfo' // 防止在新增用户界面点了个人中心不刷新
    },
    methods: {
      dateFormat,
      isMobile,
      getUserInfo () {
        let id = ''
        if (this.$store.state.userInfo.authority === 1) {
          this.isManage = true
        }
        if (this.$route.params.mode === 'add') {
          this.edit = true
          return
        }
        if (this.$route.params.mode === 'my') {
          id = this.userInfo.staffId
        } else  {
          this.edit = true
          id = this.$route.params.id
        }
        this.$api.role.getUserInfoByStaffId(id).then(res => {
          if (res?.code === 200) {
            this.info = { ...res.data }
            this.info.hiredate = this.info.hiredate ? moment(this.info.hiredate, 'YYYY-MM-DD') : null
            this.info.birthday = this.info.birthday ? moment(this.info.birthday, 'YYYY-MM-DD') : null
            this.info.role = this.info.role?.length ? this.info.role.split('-') : []
          } else {
            this.$message.error(res.userMsg)
          }
        })
      },
      computeAge (birthDay) {
        if (!birthDay) { // 计算年龄
          return ''
        } else {
          return (new Date()).getFullYear() - (new Date(birthDay)).getFullYear()
        }
      },
      computeWordingYears (hiredate) { // 计算工龄
        let year = 0
        let month = 0
        if (!hiredate) {
          return ''
        } else {
          year = ((new Date()).getFullYear() - (new Date(hiredate)).getFullYear()) < 0 ? 0 : (new Date()).getFullYear() - (new Date(hiredate)).getFullYear()
          month = ((new Date()).getMonth() - (new Date(hiredate)).getMonth()) < 0 ?
            (new Date()).getMonth() + 12 - (new Date(hiredate)).getMonth() :
            (new Date()).getMonth() - (new Date(hiredate)).getMonth()
        }
        if (year === 0) {
          return `${month}个月`
        }
        return `${year}年${month}个月`
      },
      save () {
        if (!this.info.name) {
          this.$message.warning('姓名不能为空')
          return
        }
        if (this.info.phone && !isMobile(this.info.phone)) {
          this.$message.warning('手机号码不合法')
          return
        }
        let params = { ...this.info }
        if (params.birthday) {
          params.birthday = dateFormat(params.birthday, 'YYYY-MM-DD')
        }
        if (params.hiredate) {
          params.hiredate = dateFormat(params.hiredate, 'YYYY-MM-DD')
        }
        params.role = params.role.join('-') || ''
        this.$api.role.addOrUpdateUser(params).then(res => {
          if (res?.code === 200) {
            this.$message.success(res.userMsg)
            this.info = { ...res.data }
            this.info.hiredate = this.info.hiredate ? moment(this.info.hiredate, 'YYYY-MM-DD') : null
            this.info.birthday = this.info.birthday ? moment(this.info.birthday, 'YYYY-MM-DD') : null
            this.info.role = this.info.role?.length ? this.info.role.split('-') : []
            this.isManage = (res.data.authority === 1)
            this.edit = false
          } else {
            this.$message.error('保存失败')
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  #user-info .info { padding: 20px;border: 1px solid rgba(0, 0, 0, 0.08);border-radius: 10px;box-shadow: 2px 0 6px rgba(0, 0, 0, 0.08);}
  #user-info .basic-info { margin-left: 50px }
  #user-info .basic-info>div { min-height: 40px; display: flex; align-items: center }
  #user-info .basic-info .item { width: 80px; text-align:right; white-space: nowrap; margin-right: 5px}
</style>
