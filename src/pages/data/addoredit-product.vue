<template>
  <page>
    <template slot="content">
      <div>
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="商品名">
            <a-input v-model="form.name" allowClear />
          </a-form-item>
          <a-form-item label="商品分类">
            <a-cascader
              expandTrigger="hover"
              v-model="form.category"
              :fieldNames="{ label: 'name', value: 'name', children: 'children' }"
              :options="productCategoryList"
              :popupClassName="'cascader'"
              class="min-w-200"
              placeholder="请选择"
              @change="changeProductCategory"
              allowClear
              :showSearch="true"
            />
          </a-form-item>
          <a-form-item label="所属供应商">
            <div class="flex">
              <a-select class="min-w-200" v-model="form.supplier_id" @change="setSupplier">
                <a-select-option v-for="item in supplierList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
              </a-select>
              <router-link to="/supplier/add/0">
                <a-button type="link">没有对应供应商？前往添加</a-button>
              </router-link>
            </div>
          </a-form-item>
          <a-form-item label="库存数量">
            <a-input-number class="min-w-100" v-model="form.stock_num" allowClear />
          </a-form-item>
          <a-form-item label="产地">
            <a-input v-model="form.place" allowClear />
          </a-form-item>
          <a-form-item label="商品规格">
            <a-input v-model="form.spec" allowClear />
          </a-form-item>
          <a-form-item label="商品包装">
            <a-radio-group v-model="form.pack">
              <a-radio value="袋装">袋装</a-radio>
              <a-radio value="包装">包装</a-radio>
              <a-radio value="瓶装">瓶装</a-radio>
              <a-radio value="罐装">罐装</a-radio>
              <a-radio value="桶装">桶装</a-radio>
              <a-radio value="箱盒">箱盒</a-radio>
              <a-radio value="散装">散装</a-radio>
              <a-radio value="其他">其他</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="单位">
            <a-input v-model="form.unit" allowClear />
          </a-form-item>
          <a-form-item label="商品价格">
            <a-input-number class="min-w-100" v-model="form.price" allowClear />
          </a-form-item>
          <a-form-item label="生产日期">
            <a-date-picker v-model="form.manufacture_date" showTime allowClear @change="calculQualityGuaranteePeriod" />
          </a-form-item>
          <a-form-item label="过期日期">
            <a-date-picker v-model="form.expiration_date" showTime allowClear @change="calculQualityGuaranteePeriod" />
          </a-form-item>
          <a-form-item label="保质期" v-show="form.quality_guarantee_period">
            <span>{{form.quality_guarantee_period}}</span>
          </a-form-item>
          <a-form-item label="备注">
            <a-textarea :rows="4" v-model="form.remark"></a-textarea>
          </a-form-item>
        </a-form>
        <div class="ml-100">
          <a-button class="mr-20" @click="save" type="primary">保存</a-button>
          <a-button @click="$router.back()">返回</a-button>
        </div>
      </div>
    </template>
  </page>
</template>
<script>
  import moment from "moment"
  import { dateFormat } from '../../util/dateFormat'
  export default {
    data() {
      return {
        labelCol: {
          xs: { span: 2 },
          sm: { span: 2 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
        productCategoryList: [],
        supplierList: [],
        form: {
          name: null,
          category_id: null,
          category: [],
          supplier_id: undefined,
          supplier_name: undefined,
          stock_num: null,
          place: null,
          spec: null,
          pack: null,
          unit: null,
          price: null,
          remark: null,
          manufacture_date: null, // 生产日期
          expiration_date: null, // 过期日期
          quality_guarantee_period: null
        }
      }
    },
    created () {
      this.fetchData()
      this.getProductCategoryList()
      this.getSupplierList()
    },
    methods: {
      dateFormat,
      fetchData () {
        if (this.$route.params.mode === 'add') {
          return
        }
        let id = this.$route.params.id
        this.$api.data.getProductInfoById(id).then(res => {
          this.form = { ...res.data }
          this.form.category = this.form.category.split('/')
          this.form.manufacture_date = this.form.manufacture_date ? moment(this.form.manufacture_date, 'YYYY-MM-DD hh:mm:ss') : null
          this.form.expiration_date = this.form.expiration_date ? moment(this.form.expiration_date, 'YYYY-MM-DD hh:mm:ss') : null
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
            this.supplierList = res.data
          }
        })
      },
      changeProductCategory (value, selectedOptions) {
        if (value.length) {
          this.form.category_id = selectedOptions[selectedOptions.length - 1].id
        } else {
          this.screening.category_id = null
        }
      },
      setSupplier (value) {
        this.form.supplier_name = this.supplierList.find(item => item.id === value).name
      },
      calculQualityGuaranteePeriod () { // 计算商品保质期
        if (this.form.manufacture_date && this.form.expiration_date) {
          let str = ''
          let year = this.form.expiration_date._d.getFullYear() - this.form.manufacture_date._d.getFullYear()
          let month = this.form.expiration_date._d.getMonth() - this.form.manufacture_date._d.getMonth()
          let day = this.form.expiration_date._d.getDate() - this.form.manufacture_date._d.getDate()
          if (year < 0 && month <0 && day < 0) {
            this.$message.warning('过期日期小于生产日期，则说明商品已过期，请重新核对！')
            return
          }
          if ( year > 0) {
            str += `${year}年`
          }
          if ( month > 0) {
            str += `${month}个月`
          }
          if (year <= 0 && month <= 0 && day > 0) {
            str += `${day}天`
          }
          this.form.quality_guarantee_period = str
        }
      },
      save () {
        if (!this.form.name) {
          this.$message.warning('请输入商品名称')
          return
        }
        if (!this.form.category.length) {
          this.$message.warning('请选择商品分类')
          return
        }
        if (!this.form.supplier_id) {
          this.$message.warning('请选择所属供应商')
          return
        }
        if (!this.form.stock_num) {
          this.$message.warning('请填写库存数量')
          return
        }
        if (!this.form.manufacture_date._d) {
          this.$message.warning('请选择生产日期')
          return
        }
        if (!this.form.expiration_date._d) {
          this.$message.warning('请选择过期日期')
          return
        }
        let params = {
          ...this.form
        }
        params.category = params.category.join('/')
        params.manufacture_date = dateFormat(params.manufacture_date, 'YYYY-MM-DD hh:mm:ss')
        params.expiration_date = dateFormat(params.expiration_date, 'YYYY-MM-DD hh:mm:ss')
        this.$api.data.addOrUpdateProduct(params).then(res => {
          if (res?.code === 200) {
            this.$message.success(res.userMsg)
            this.$router.back()
          }
        })
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
