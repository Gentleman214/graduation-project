<template>
  <div>
    <div class="page-header" v-if="showHeader">
      <div class="flex flex-justify-between">
        <div class="flex-child-grow">
          <div class="page-title" v-if="showTitle">{{title||$route.meta.title}}</div>
          <div class="page-description" v-if="description">{{description}}</div>
          <slot name="header"></slot>
        </div>
        <div class="flex flex-align-end">
          <slot name="extra"></slot>
        </div>
      </div>
    </div>
    <div style="padding: 5px">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Breadcrumb } from 'ant-design-vue'
  Vue.use(Breadcrumb)
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      description: {
        type: String,
        default: ''
      },
      showTitle: {
        type: Boolean,
        default: true
      }
    }
  }
</script>
<style lang="scss" type="text/less">
  .page-header{
    background:#fff;padding:5px 10px;border-bottom: 1px solid #e8e8e8;
    .page-title{font-size: 20px;font-weight: 700;color: rgba(0,0,0,.85);margin-bottom:5px;}
    .page-description{margin-bottom:16px;}
  }
</style>
