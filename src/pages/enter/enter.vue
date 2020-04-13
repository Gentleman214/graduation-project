<template>
  <page>
    <template slot="content">
      <div style="padding: 24px">
        <div class="flex mr-50">
          <span class="bold font-14 nowrap mt-5 mr-5">入库商品</span>
          <a-auto-complete
            v-model="keywords"
            :dataSource="dataSource"
            allowClear
            @change="getProduct"
            @select="select"
            @blur="check"
            style="min-width: 300px"
            placeholder="请输入商品编号或商品名"
          />
          <router-link to="product/add/0">
            <a-button type="link">没有该商品信息？前往添加</a-button>
          </router-link>
        </div>
       <div class="mt-20" v-show="showProductInfo">
         <a-card>
           <template slot="title">
             <span class="warning font-14">请仔细核对该商品信息，如信息不同（例如产地、生产日期、保质期等不同），需要重新添加商品</span>
             <router-link to="product/add/0">
               <a-button type="link">前往添加</a-button>
             </router-link>
           </template>
           <div>
             <div class="flex flex-wrap">
               <div class="min-w-300"><span class="item">商品编号：</span><span>{{productInfo.id}}</span></div>
               <div class="min-w-300"><span class="item">商品名：</span><span>{{productInfo.name}}</span></div>
               <div class="min-w-300"><span class="item">现有库存：</span><span>{{productInfo.stock_num}}</span></div>
               <div class="min-w-300"><span class="item">商品分类：</span><span>{{productInfo.category}}</span></div>
               <div class="min-w-300"><span class="item">所属供应商：</span><span>{{productInfo.supplier_name}}</span></div>
               <div class="min-w-300"><span class="item">产地：</span><span>{{productInfo.place}}</span></div>
               <div class="min-w-300"><span class="item">规格：</span><span>{{productInfo.spec}}</span></div>
               <div class="min-w-300"><span class="item">包装：</span><span>{{productInfo.pack}}</span></div>
               <div class="min-w-300"><span class="item">单位：</span><span>{{productInfo.unit}}</span></div>
               <div class="min-w-300"><span class="item">单价：</span><span>{{productInfo.price}}</span></div>
               <div class="min-w-300"><span class="item">生产日期：</span><span>{{dateFormat(productInfo.manufacture_date, 'YYYY-MM-DD hh:mm:ss')}}</span></div>
               <div class="min-w-300"><span class="item">过期日期：</span><span>{{dateFormat(productInfo.expiration_date, 'YYYY-MM-DD hh:mm:ss')}}</span></div>
               <div class="min-w-300"><span class="item">保质期：</span><span>{{productInfo.quality_guarantee_period}}</span></div>
             </div>
           </div>
           <template slot="actions">
             <div>
               <span>入库数量</span>
               <a-input-number v-model="enterNum"></a-input-number>
             </div>
             <a-button type="primary" @click="submitToEnter">提交入库</a-button>
           </template>
         </a-card>
       </div>
      </div>
    </template>
  </page>
</template>

<script>
  import { dateFormat } from '../../util/dateFormat'
  import { mapState } from 'vuex'
  export default {
    name: "index",
    data () {
      return {
        keywords: '',
        enterNum: 0,
        showProductInfo: false,
        dataSource: [],
        productInfo: {}
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo
      })
    },
    methods: {
      dateFormat,
      getProduct () {
        if (this.keywords) {
          this.$api.enter.getProductByIdOrName(this.keywords).then(res => {
            if (res?.code === 200) {
              this.dataSource = res.data
            }
          })
        } else {
          this.showProductInfo = false
        }
      },
      select (value) {
        if (value) {
          this.showProductInfo = true
          let id = value.split('-')[0]
          this.$api.data.getProductInfoById(id).then(res => {
            if (res?.code === 200) {
              this.productInfo = res.data
            } else {
              this.$message.error(res.userMsg)
            }
          })
        }
      },
      check () {
        if (this.keywords && this.keywords.split('-').length !== 2) {
          this.$message.warning('请输入商品名或商品编号进行搜索，并在下拉框中选择对应的商品编号和商品名', 5)
        }
      },
      submitToEnter () {
        if (!this.enterNum) {
          this.$message.warning('请填写入库数量')
          return
        }
        if (this.enterNum < 0) {
          this.$message.warning('入库数量不能小于0')
          return
        }
        if (this.enterNum % 1 !== 0) {
          this.$message.warning('入库数量只能为整数')
          return
        }
        let params = {
          type: 1,
          product_id: this.productInfo.id,
          product_name: this.productInfo.name,
          product_num: this.enterNum,
          product_price: this.productInfo.price,
          operator_id: this.userInfo.staffId,
          operator_name: this.userInfo.name
        }
        this.$api.enter.addEnterBill(params).then(res => {
          if (res?.code === 200) {
            this.productInfo.stock_num += this.enterNum
            this.$message.success(res.userMsg)
          } else {
            this.$message.error(res.userMsg)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  /deep/ .ant-card-head {
    padding: 5px;
  }
  /deep/ .ant-card-head-title {
    padding: 5px;
  }
  /deep/ .ant-card-body {
    padding: 16px;
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