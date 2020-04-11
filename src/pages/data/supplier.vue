<template>
  <page title="供应商列表">
    <template slot="extra">
      <router-link to="supplier/add/0">
        <a-button type="primary" icon="plus">新增</a-button>
      </router-link>
    </template>
    <template slot="content">
      <div class="flex flex-wrap">
        <div class="flex mr-20 mb-5">
          <span class="flex flex-center mr-5 bold nowrap">供应商名称</span>
          <a-input class="max-w-150" v-model="screening.name" @keydown.enter="fetchData" allowClear></a-input>
        </div>
        <div class="flex mr-20 mb-5">
          <span class="flex flex-center mr-5 bold nowrap">联系人</span>
          <a-input class="max-w-150" v-model="screening.contact_person" @keydown.enter="fetchData" allowClear></a-input>
        </div>
        <a-button icon="search" @click="fetchData">筛选</a-button>
      </div>
      <a-table
        :dataSource="list"
        :columns="columns"
        :pagination="pagination"
        rowKey="id"
        :loading="loading"
        @change="tableChange"
      >
        <template slot="action" slot-scope="text, row">
          <div v-if="$store.state.userInfo && $store.state.userInfo.authority === 1">
            <router-link :to="`supplier/edit/${row.id}`">
              <a-button type="primary" size="small" ghost>编辑</a-button>
            </router-link>
            <a-popconfirm placement="right" okText="确定" cancelText="取消" @confirm="deleteSupplier(row.id)">
              <template slot="title">
                <span>确定要删除该供应商吗？</span>
              </template>
              <a-button type="danger" size="small" ghost>删除</a-button>
            </a-popconfirm>
          </div>
          <span v-else>--</span>
        </template>
      </a-table>
    </template>
  </page>
</template>

<script>
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '电话',
      dataIndex: 'tel',
      align: 'center'
    },
    {
      title: '地址',
      dataIndex: 'address',
      align: 'center'
    },
    {
      title: '联系人',
      dataIndex: 'contact_person',
      align: 'center'
    },
    {
      title: '联系方式',
      dataIndex: 'contact_phone',
      align: 'center'
    },
    {
      title: '操作',
      align: 'center',
      scopedSlots: { customRender: 'action' }
    }
  ]
  const pagination = {
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total) => `共${total}条数据`,
    pageSizeOptions: ['5', '10', '20', '30', '50'],
    showQuickJumper: true,
    showSizeChanger: true
  }
  export default {
    data () {
      return {
        columns,
        pagination,
        loading: false,
        screening: {
          name: '',
          contact_person: ''
        },
        list: []
      }
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        let params = {
          current: this.pagination.current,
          size: this.pagination.pageSize,
          ...this.screening
        }
        this.loading = true
        this.$api.data.getSupplierList(params).then(res => {
          if (res?.code === 200) {
            this.list = res.data.records
            this.pagination.total = res.data.total
          }
        }).finally(() => {
          this.loading = false
        })
      },
      deleteSupplier (id) {
        this.$api.data.deleteSupplierById(id).then(res => {
          if (res?.code === 200) {
            this.$message.success(res.userMsg)
            this.fetchData()
          } else {
            this.$message.error(res.userMsg)
          }
        })
      },
      tableChange (pagination) {
        this.pagination = pagination
        this.fetchData()
      }
    }
  }
</script>

<style scoped>

</style>