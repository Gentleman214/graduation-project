<template>
  <page>
    <template slot="extra">
      <a-button type="primary" icon="plus">
        新增商品
      </a-button>
    </template>
    <template slot="content">
      <div class="flex flex-wrap">
        <div class="flex mr-20 mb-5">
          <span class="flex flex-center mr-5 bold nowrap">商品名</span>
          <a-input></a-input>
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
            allowClear
            :showSearch="true"
          />
        </div>
        <div class="flex mr-20 mb-5">
          <span class="flex flex-center mr-5 bold nowrap">供应商</span>
          <a-select class="min-w-100" v-model="supplier.selected" allowClear>
            <a-select-option
              v-for="item in supplier.list"
              :key="item.key"
              :value="item.key"
            >
              {{item.value}}
            </a-select-option>
          </a-select>
        </div>
        <a-button icon="search">筛选</a-button>
      </div>
      <a-table></a-table>
    </template>
  </page>
</template>

<script>
  export default {
    name: "product",
    data () {
      return {
        productCategoryList: [],
        supplier: {
          selected: undefined,
          list: []
        }
      }
    },
    mounted () {
      this.getProductCategoryList()
    },
    methods: {
      getProductCategoryList () {
        this.$api.data.getProductCategoryList().then(res => {
          if (res?.code === 200) {
            this.productCategoryList = res.data
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>