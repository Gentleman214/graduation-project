<template>
  <a-drawer
    placement="right"
    :closable="false"
    @close="closeDrawer"
    :visible="showDrawer"
    :width="500"
  >
    <template slot="title">
      <a-icon type="edit" />
      修改密码
    </template>
    <div class="flex flex-col">
      <div class="flex flex-child-grow mt-20">
        <span class="nowrap item">原密码：</span>
        <a-input-password v-model="oldPsd" @focusout="judge"></a-input-password>
      </div>
      <span class="tip error" v-show="tip1 && !correctFlag"><a-icon type="info-circle" class="mr-5" />{{tip1}}</span>
      <div class="flex flex-child-grow mt-20">
        <span class="nowrap item">新密码：</span>
        <a-input-password v-model="newPsd"></a-input-password>
      </div>
      <span class="tip error" v-show="tip2"><a-icon type="info-circle" class="mr-5" />{{tip2}}</span>
      <div class="flex flex-child-grow mt-20">
        <span class="nowrap item">再次确认：</span>
        <a-input-password v-model="confirmPsd"></a-input-password>
      </div>
      <span class="tip error" v-show="tip3"><a-icon type="info-circle" class="mr-5" />{{tip3}}</span>
    </div>
    <div class="flex flex-justify-center mt-20">
      <a-button type="primary" class="mr-20" @click="submit" :disabled="!correctFlag || !legalFlag || !sameFlag">确认</a-button>
      <a-button class="ml-20" @click="closeDrawer">取消</a-button>
    </div>
  </a-drawer>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        showDrawer: false,
        oldPsd: '',
        newPsd: '',
        confirmPsd: '',
        tip1: '',
        tip2: '',
        tip3: '',
        correctFlag: false, // 密码是否正确
        legalFlag: false, // 密码是否合法
        sameFlag: false // 两次输入是否相同
      }
    },
    watch: {
      'newPsd': function (value) {
        if (value.length < 6) {
          this.tip2 = '密码长度不能小于6位'
          this.legalFlag = false
        } else if (value === '000000') {
          this.tip2 = '新密码不能和默认密码相同'
          this.legalFlag = false
        } else if (value === this.oldPsd) {
          this.tip2 = '新密码不能和原密码相同'
          this.legalFlag = false
        } else if (value === this.confirmPsd){
          this.tip3 = ''
          this.sameFlag = true
        } else {
          this.tip2 = ''
          this.legalFlag = true
        }
      },
      'confirmPsd': function (value) {
        if (value !== this.newPsd) {
          this.tip3 = '两次输入的密码不一致'
          this.sameFlag = false
        } else {
          this.tip3 = ''
          this.sameFlag = true
        }
      }
    },
    computed: {
      ...mapState({
        userInfo: state => {
          return state.userInfo
        }
      })
    },
    methods: {
      submit () {
        let params = {
          staffId: this.userInfo.staffId,
          password: this.newPsd
        }
        this.$api.role.changePassword(params).then(res => {
          if (res?.code === 200) {
            this.$message.success(res.userMsg)
          } else {
            this.$message.error(res.userMsg)
          }
        }).finally(() => this.showDrawer = false)
      },
      judge () {
        let params = {
          staffId: this.userInfo.staffId,
          password: this.oldPsd
        }
        this.$api.role.checkPassword(params).then(res => {
          if (res?.code === 200) {
            this.tip1 = res.userMsg
            this.correctFlag = res.flag
          }
        })
      },
      openDrawer () {
        this.showDrawer = true;
      },
      closeDrawer () {
        this.showDrawer = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  .item {
    margin-top: 5px;
    width: 100px;
    text-align: right;
  }
  .tip {
    margin-left: 80px;
    font-size: 12px;
  }
</style>
