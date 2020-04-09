<template>
  <page>
    <template slot="content">
      商品分类：
      <a-cascader
        expandTrigger="hover"
        :fieldNames="{ label: 'name', value: 'name', children: 'children' }"
        :options="productCategoryList"
        placeholder="请选择"
        allowClear
        :showSearch="true"
      />
    </template>
  </page>
</template>

<script>
  export default {
    name: "product",
    data () {
      return {
        productCategoryList: []
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