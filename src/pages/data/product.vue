<template>
  <page>
    <template slot="extra">
      <router-link to="product/add/0">
        <a-button type="primary" icon="plus">新增商品</a-button>
      </router-link>
    </template>
    <template slot="content">
      <div class="flex flex-wrap">
        <div class="flex mr-20 mb-5">
          <span class="flex flex-center mr-5 bold nowrap">商品名</span>
          <a-input v-model="screening.name" @keydown.enter="fetchData" allowClear></a-input>
        </div>
        <div class="flex mr-20 mb-5">
          <span class="flex flex-center mr-5 bold nowrap">商品分类</span>
          <a-cascader
            expandTrigger="hover"
            :fieldNames="{ label: 'name', value: 'name', children: 'children' }"
            :options="productCategoryList"
            :popupClassName="'cascader'"
            class="min-w-200"
            placeholder="请选择"
            @change="changeProductCategory"
            allowClear
            :showSearch="true"
          />
        </div>
        <div class="flex mr-20 mb-5">
          <span class="flex flex-center mr-5 bold nowrap">供应商</span>
          <a-select
            mode="multiple"
            v-model="supplier.selected"
            class="min-w-200"
            @change="selectedSupplier"
            placeholder="请选择"
          >
            <a-select-option
              v-for="item in supplier.list"
              :key="item.id"
              :value="item.id"
            >
              {{item.name}}
            </a-select-option>
          </a-select>
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
  import { dateFormat } from '../../util/dateFormat'
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
      title: '商品分类',
      dataIndex: 'category',
      align: 'center'
    },
    {
      title: '产地',
      dataIndex: 'place',
      align: 'center'
    },
    {
      title: '库存数量',
      dataIndex: 'stock_num',
      align: 'center'
    },
    {
      title: '生产日期',
      dataIndex: 'manufacture_date',
      align: 'center',
      customRender: (text) => {
        return dateFormat(text, 'YYYY-MM-DD hh:mm:ss')
      }
    },
    {
      title: '保质期',
      dataIndex: 'quality_guarantee_period',
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
    name: "product",
    data () {
      return {
        columns,
        pagination,
        loading: false,
        productCategoryList: [],
        supplier: {
          selected: [],
          list: []
        },
        screening: {
          name: '', // 商品名
          category: '' // 商品分类
        },
        list: [] // 商品列表
      }
    },
    mounted () {
      this.getProductCategoryList()
      this.getSupplierList()
      this.fetchData()
    },
    methods: {
      fetchData () {
        let params = {
          current: this.pagination.current,
          size: this.pagination.pageSize,
          supplier: this.supplier.selected,
          ...this.screening
        }
        this.loading = true
        this.$api.data.getProdutList(params).then(res => {
          if (res?.code === 200) {
            this.list = res.data.records
          }
        }).finally(() => {
          this.loading = false
        })
      },
      getProductCategoryList () {
        this.$api.data.getProductCategoryList().then(res => {
          if (res?.code === 200) {
            this.productCategoryList = res.data
          }
        })
      },
      getSupplierList () {
        this.$api.data.getSupplierListForScreening().then(res => {
          if (res?.code === 200) {
            this.supplier.list = res.data
          }
        })
      },
      changeProductCategory (value, selectedOptions) {
       if (value.length) {
         this.screening.category = selectedOptions[selectedOptions.length - 1].id
         this.fetchData()
       } else {
         this.screening.category = ''
         this.fetchData()
       }
      },
      tableChange (pagination) {
        this.pagination = pagination
        this.fetchData()
      },
      selectedSupplier () {
        this.fetchData()
      }
    }
  }
</script>

<style scoped lang="scss">
</style>