<template>
  <page :showTitle="false">
    <template slot="header">
      <div class="flex flex-justify-between">
        <div class="flex flex-wrap">
          <div class="flex mr-20 mb-5">
            <span class="flex flex-center mr-5 bold nowrap">工号</span>
            <a-input class="max-w-100" v-model="screening.staffId" @keydown.enter="fetchData" allowClear></a-input>
          </div>
          <div class="flex mr-20 mb-5">
            <span class="flex flex-center mr-5 bold nowrap">姓名</span>
            <a-input class="max-w-100" v-model="screening.name" @keydown.enter="fetchData" allowClear></a-input>
          </div>
          <div class="flex mr-20 mb-5">
            <span class="flex flex-center mr-5 bold nowrap">角色</span>
            <a-select class="min-w-100" v-model="authority.selected" allowClear>
              <a-select-option
                v-for="item in authority.list"
                :key="item.key"
                :value="item.key"
              >
                {{item.value}}
              </a-select-option>
            </a-select>
          </div>
          <div class="flex mr-20 mb-5">
            <span class="flex flex-center mr-5 bold nowrap">入职时间</span>
            <a-range-picker style="max-width: 220px" allowClear @change="setDateRange" />
          </div>
          <a-button icon="search" @click="fetchData">筛选</a-button>
        </div>
        <router-link to="/userInfo/add/0" v-if="$store.state.userInfo && $store.state.userInfo.authority === 0">
          <a-button icon="plus" type="primary">新增</a-button>
        </router-link>
      </div>
    </template>
    <template slot="content">
      <a-table
        :dataSource="list"
        :columns="columns"
        :pagination="pagination"
        rowKey="staffId"
        :loading="loading"
        @change="tableChange"
      >
        <template slot="action" slot-scope="text, row">
          <a-button type="primary" size="small" @click="edit(row.staffId)" ghost>编辑</a-button>
          <a-button type="danger" size="small" ghost>注销</a-button>
        </template>
      </a-table>
    </template>
  </page>
</template>

<script>
  const columns = [
    {
      title: '工号',
      dataIndex: 'staffId',
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      align: 'center'
    },
    {
      title: '入职时间',
      dataIndex: 'hiredate',
      align: 'center'
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      align: 'center'
    },
    {
      title: '年龄',
      dataIndex: 'birthday',
      align: 'center',
      customRender: (text) => {
        let thisYear = (new Date()).getFullYear()
        let birthYear = 0
        if (text) {
          birthYear = text.split('-')[0]
        }
        if (birthYear) {
          return thisYear - birthYear
        } else return ''
      }
    },
    {
      title: '权限',
      dataIndex: 'authority',
      align: 'center',
      customRender: (text) => {
        if (text === 0) return '管理员'
        if (text === 1) return '默认角色'
      }
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
  const authority = {
    selected: '',
    list: [
      {
        key: '',
        value: '全部'
      },
      {
        key: 0,
        value: '管理员'
      },
      {
        key: 1,
        value: '默认角色'
      }
    ]
  }
  export default {
    name: "index",
    data () {
      return {
        list: [],
        columns,
        pagination,
        authority,
        loading: false,
        screening: {
          staffId: '',
          name: '',
          dateRange: ['', '']
        }
      }
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.loading = true
        let params = {
          current: this.pagination.current,
          size: this.pagination.pageSize,
          authority: this.authority.selected,
          ...this.screening
        }
        this.$api.role.getUser(params).then(res => {
          if (res?.code === 200) {
            this.list = res.data.records
            this.pagination.total = res.data.total
          } else {
            this.$message.error(res.userMsg)
          }
        })
          .finally(() => {
            this.loading = false
          })
      },
      tableChange (pagination) {
        this.pagination = pagination
        this.fetchData()
      },
      setDateRange (date, dateString) {
        this.screening.dateRange = dateString
      },
      edit (id) {
        this.$router.push(`/userInfo/edit/${id}`)
      }
    }
  }
</script>

<style scoped>

</style>
