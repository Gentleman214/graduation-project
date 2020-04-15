<template>
  <page>
    <template slot="content">
      <a-tabs @change="tabChange" type="card">
        <a-tab-pane tab="库存紧缺" :key="1">
          库存数量小于等于<a-input-number v-model="stock_num.minimum" />
          <a-button icon="sync" @click="fetchData(1)">盘点</a-button>
        </a-tab-pane>
        <a-tab-pane tab="库存不足" :key="2">
          库存数量大于<a-input-number  v-model="stock_num.smaller" />小于<a-input-number  v-model="stock_num.larger" />
          <a-button icon="sync" @click="fetchData(2)">盘点</a-button>
        </a-tab-pane>
        <a-tab-pane tab="库存充足" :key="3">
          库存数量大于等于<a-input-number v-model="stock_num.maxnum" />
          <a-button icon="sync" @click="fetchData(3)">盘点</a-button>
        </a-tab-pane>
      </a-tabs>
      <a-table
        class="mt-10"
        :dataSource="list"
        :columns="columns"
        :pagination="pagination"
        rowKey="id"
        :loading="loading"
        @change="tableChange"
      >
        <template slot="stock_num" slot-scope="text, row">
          <span v-if="type === 1" class="error bold">{{text}}</span>
          <span v-if="type === 2" class="warning bold">{{text}}</span>
          <span v-if="type === 3" class="success bold">{{text}}</span>
        </template>
        <template slot="action" slot-scope="text, row">
          <a-button type="primary" size="small" ghost @click="">详情</a-button>
        </template>
      </a-table>
    </template>
  </page>
</template>
<script>
  const columns = [
    {
      title: '商品编号',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: '商品名',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '分类',
      dataIndex: 'category',
      align: 'center'
    },
    {
      title: '供应商',
      dataIndex: 'supplier',
      align: 'center'
    },
    {
      title: '库存数量',
      dataIndex: 'stock_num',
      scopedSlots: { customRender: 'stock_num' },
      align: 'center',
      sorter: (a, b) => a.stock_num - b.stock_num
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
    name: "stock-check",
    data () {
      return {
        columns,
        pagination,
        list: [],
        type: 1,
        stock_num: {
          minimum: 10,
          smaller: 10,
          larger: 100,
          maxnum: 100
        },
        loading: false
      }
    },
    mounted () {
      this.fetchData(1)
    },
    methods: {
      fetchData (type) {
        if (type === 1 && this.check(this.stock_num.minimum)) {
          let params = {
            type: 1,
            num: this.stock_num.minimum
          }
          this.checkStock(params)
        }
        if (type === 2 && this.check(this.stock_num.smaller) && this.check(this.stock_num.larger)) {
          let params = {
            type: 2,
            num: [ this.stock_num.smaller, this.stock_num.larger ]
          }
          this.checkStock(params)
        }
        if (type === 3 && this.check(this.stock_num.maxnum)) {
          let params = {
            type: 3,
            num: this.stock_num.maxnum
          }
          this.checkStock(params)
        }
      },
      checkStock (params) {
        this.$api.depository.checkStock(params).then(res => {
          if (res?.code === 200) {
            this.list = res.data.records
            this.pagination.total = res.data.total
          } else {
            this.list.splice(0)
            this.$message.error(res.userMsg)
          }
        })
      },
      tabChange (value) {
        this.list.splice(0)
        this.type = value
        this.fetchData(value)
      },
      tableChange (pagination) {
        this.pagination = pagination
        this.fetchData()
      },
      check (num) {
        if (num <= 0) {
          this.$message.warning('盘点的库存数量不能小于等于0')
          return false
        }
        if (num % 1 !== 0) {
          this.$message.warning('盘点的库存数量只能为整数')
          return false
        }
        return true
      }
    }
  }
</script>

<style scoped>

</style>