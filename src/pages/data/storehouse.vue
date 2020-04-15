<template>
  <page>
    <template slot="extra">
      <a-button type="primary" icon="plus" @click="openModal('add')">新增仓库</a-button>
    </template>
    <template slot="content">
      <div>
        <a-collapse v-model="activeKey" v-show="list.length">
          <a-collapse-panel :key="item.id.toString()" v-for="item in list">
            <div slot="header" class="flex flex-justify-between">
              <h1 class="mt-5 font-14 bold">{{item.name}}</h1>
              <div style="padding: 5px 20px" class="font-18 primary">
                <a-tooltip>
                  <template slot="title"> 编辑该仓库信息</template>
                  <a-icon type="edit" @click="handleClick; openModal('edit', item.id)" />
                </a-tooltip>
              </div>
            </div>
            <div class="flex flex-wrap">
              <div class="min-w-300"><span class="item">仓库编号：{{item.id}}</span><span></span></div>
              <div class="min-w-300"><span class="item">仓库名：{{item.name}}</span><span></span></div>
              <div class="min-w-300"><span class="item">仓库地址：{{item.address}}</span><span></span></div>
              <div class="min-w-300"><span class="item">管理员：{{item.admin}}</span><span></span></div>
              <div class="min-w-300"><span class="item">联系电话：{{item.tel}}</span><span></span></div>
              <div class="min-w-300"><span class="item">占地面积：{{item.area}} m<sup>2</sup></span><span></span></div>
              <div class="min-w-300"><span class="item">状态：{{item.state}}</span><span></span></div>
              <div class="min-w-300"><span class="item">货架数：{{item.shelves}}</span><span></span></div>
              <div class="full-width mb-10"><span class="item">描述：{{item.spec}}</span><span></span></div>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
      <a-modal v-model="showModal" :title="modalTitle" okText="保存" :bodyStyle="bodyStyle" @ok="save" @cancel="cancel" :centered="true">
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="仓库名">
            <a-input v-model="form.name" allowClear />
          </a-form-item>
          <a-form-item label="地址">
            <a-input v-model="form.address" allowClear />
          </a-form-item>
          <a-form-item label="管理员">
            <a-auto-complete
              v-model="keywords"
              :dataSource="dataSource"
              allowClear
              @change="getUser"
              @select="select"
              placeholder="请输入员工号或姓名"
            />
          </a-form-item>
          <a-form-item label="联系电话">
            <a-input v-model="form.tel" allowClear />
          </a-form-item>
          <a-form-item label="占地面积">
            <a-input-number v-model="form.area" allowClear />m<sup>2</sup>
          </a-form-item>
          <a-form-item label="状态">
            <a-switch checkedChildren="可用" unCheckedChildren="停用" defaultChecked @change="setState" />
          </a-form-item>
          <a-form-item label="货架数">
            <a-input-number v-model="form.shelves" allowClear />
          </a-form-item>
          <a-form-item label="描述">
            <a-textarea :rows="4" v-model="form.spec" allowClear />
          </a-form-item>
        </a-form>
      </a-modal>
    </template>
  </page>
</template>
<script>
  export default {
    name: "storehouse",
    data() {
      return {
        list: [],
        activeKey: [],
        showModal: false,
        modalTitle: '',
        labelCol: {
          xs: { span: 2 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
        form: {
          name: '',
          address: '',
          admin: '',
          tel: '',
          area: '',
          state: '可用',
          shelves: '',
          spec: '',
        },
        bodyStyle: {
          padding: '8px'
        },
        keywords: '',
        dataSource: []
      };
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.$api.data.getAllStorehouse().then(res => {
          if (res?.code === 200) {
            this.list = res.data
            if (res.data[0]) {
              this.activeKey.push(res.data[0].id.toString())
            }
          }
        })
      },
      handleClick (event) {
        event.stopPropagation()
      },
      openModal (mode, id) {
        if (mode === 'add') {
          this.modalTitle = '新增仓库'
          this.showModal = true
        } else {
          this.form = this.list.find(item => item.id === id)
          this.keywords = this.form.admin
          this.modalTitle = '编辑仓库信息'
          this.showModal = true
        }
      },
      save () {
        if (!this.form.name) {
          this.$message.warning('请输入仓库名称')
          return
        }
        if (!this.form.address) {
          this.$message.warning('请输入仓储地址')
          return
        }
        if (!this.form.admin) {
          this.$message.warning('请添加管理员')
          return
        }
        let params = {
          ...this.form
        }
        this.$api.data.addOrUpdateStorehouse(params).then(res => {
          if (res?.code === 200) {
            this.$message.success(res.userMsg)
            this.fetchData()
          } else {
            this.$message.error(res.userMsg + ',请稍后重试')
          }
        })
        this.showModal = false
      },
      cancel () {
        this.showModal = false
      },
      getUser () {
        this.$api.role.getUserByStaffIdOrName(this.keywords).then(res => {
          if (res?.code === 200) {
            this.dataSource = res.data
          }
        })
      },
      select (value) {
        this.form.admin = value
      },
      setState (value) {
        if (value) {
          this.form.state = '可用'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .ant-form-item {
    margin-bottom: 10px;
  }
  .min-w-300 {
    min-width: 300px;
    margin-bottom: 10px;
  }
  .item {
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    margin-right: 5px;
  }
</style>