<template>
  <page>
    <template slot="extra">
      <a-button type="primary" @click="exportExcel">导出</a-button>
    </template>
    <template slot="content">
      <div class="flex flex-wrap">
        <div class="flex mr-20 mb-5">
          <span class="flex flex-center mr-5 bold nowrap">涉及商品</span>
          <a-input style="min-width: 220px" placeholder="请输入商品名或商品编号" v-model="screening.product" @keydown.enter="fetchData" allowClear></a-input>
        </div>
        <div class="flex mr-20 mb-5">
          <span class="flex flex-center mr-5 bold nowrap">添加人</span>
          <a-input placeholder="请输入员工号或姓名" v-model="screening.operator" @keydown.enter="fetchData" allowClear></a-input>
        </div>
        <div class="flex mr-20 mb-5">
          <span class="flex flex-center mr-5 bold nowrap">添加时间</span>
          <a-range-picker style="max-width: 220px" allowClear @change="setDateRange" />
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
      </a-table>
    </template>
  </page>
</template>

<script>
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: '商品编号',
      dataIndex: 'product_id',
      align: 'center'
    },
    {
      title: '商品名',
      dataIndex: 'product_name',
      align: 'center'
    },
    {
      title: '单价',
      dataIndex: 'product_price',
      align: 'center'
    },
    {
      title: '入库数量',
      dataIndex: 'product_num',
      align: 'center'
    },
    {
      title: '入库时间',
      dataIndex: 'time',
      align: 'center',
      customRender: (text) => {
        return dateFormat(text, 'YYYY-MM-DD hh:ss:mm')
      }
    },
    {
      title: '添加人',
      align: 'center',
      dataIndex: 'operator_id',
      customRender: (text, row) => {
        return `${text}(${row.operator_name})`
      }
    },
    {
      title: '涉及金额',
      align: 'center',
      customRender: (text, row) => {
        return (row.product_num * row.product_price).toFixed(2)
      }
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

  import { dateFormat } from '../../util/dateFormat'
  export default {
    data () {
      return {
        list: [],
        columns,
        pagination,
        loading: false,
        screening: {
          type: 1,
          product: '',
          operator: '',
          startTime: '',
          endTime: ''
        }
      }
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      dateFormat,
      fetchData () {
        this.loading = true
        let params = {
          current: this.pagination.current,
          size: this.pagination.pageSize,
          ...this.screening
        }
        this.$api.enter.getBillList(params).then(res => {
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
      exportExcel () {
        let params = {
          current: this.pagination.current,
          size: this.pagination.pageSize,
          ...this.screening
        }
        let url = this.$api.enter.exportEnterBill(params)
        console.log(url)
        window.location.href = url
      },
      tableChange (pagination) {
        this.pagination = pagination
        this.fetchData()
      },
      setDateRange (date, dateString) {
        if (dateString[1]) {
          this.screening.startTime = dateString[0]
          this.screening.endTime = dateString[1]
          this.fetchData()
        } else {
          this.screening.startTime = this.screening.endTime = ''
        }
      }
    }
  }
</script>

<style scoped>

</style>