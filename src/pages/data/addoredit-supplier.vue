<template>
  <div>
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="供应商名称">
        <a-input v-model="form.name" allowClear />
      </a-form-item>
      <a-form-item label="供应商电话">
        <a-input v-model="form.tel" allowClear />
      </a-form-item>
      <a-form-item label="供应商地址">
        <a-input v-model="form.address" allowClear />
      </a-form-item>
      <a-form-item label="联系人">
        <a-input v-model="form.contact_person" allowClear />
      </a-form-item>
      <a-form-item label="联系方式">
        <a-input v-model="form.contact_phone" allowClear />
      </a-form-item>
    </a-form>
    <div class="ml-100">
      <a-button class="mr-20" @click="save" type="primary">保存</a-button>
      <a-button class="mr-20" @click="cancel" type="danger">取消</a-button>
      <a-button @click="$router.back()">返回</a-button>
    </div>
  </div>
</template>
<script>
  import { isMobile } from '../../util/check'
  export default {
    data() {
      return {
        labelCol: {
          xs: { span: 2 },
          sm: { span: 2 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        form: {
          name: '',
          tel: '',
          address: '',
          contact_person: '',
          contact_phone: ''
        }
      }
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      isMobile,
      fetchData () {
        if (this.$route.params.mode === 'add') {
          return
        }
        let id = this.$route.params.id
        this.$api.data.getSupplierInfoById(id).then(res => {
          this.form = res.data
        })
      },
      save () {
        if (!this.form.name) {
          this.$message.warning('请输入供应商名称')
          return
        }
        if (!this.form.address) {
          this.$message.warning('请输入供应商地址')
          return
        }
        if (!this.form.contact_person) {
          this.$message.warning('请输入联系人')
          return
        }
        if (!this.form.contact_phone) {
          this.$message.warning('请输入联系电话')
          return
        }
        if (!isMobile(this.form.contact_phone)) {
          this.$message.warning('联系电话不正确，请重新输入')
          return
        }
        let params = {
          ...this.form
        }
        this.$api.data.addOrUpdateSupplier(params).then(res => {
          if (res?.code === 200) {
            this.$message.success(res.userMsg)
            this.$router.back()
          }
        })
      },
      cancel () {
        if (this.$route.params.mode === 'add') {
          this.form.name = this.form.tel = this.form.address = this.form.contact_person = this.form.contact_phone = ''
        } else {
          this.fetchData()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .ml-100 {
    margin-left: 100px;
  }
  .ant-form-item {
    margin-bottom: 10px;
  }
</style>
