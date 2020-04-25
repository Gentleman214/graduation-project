<template>
  <page>
    <template slot="extra">
      <a-button icon="plus" type="primary" @click="showAddModal = true">新增</a-button>
    </template>
    <template slot="content">
      <div class="flex">
        <a-tree :treeData="treeData" showIcon defaultExpandAll @select="onSelect">
          <a-icon type="down" slot="switcherIcon" />
          <a-icon
            v-for="item in treeData"
            :key="item.key"
            :slot="item.slots.icon"
            :type="item.slots.icon"
            class="mr-20 primary"
          >
          </a-icon>
        </a-tree>
        <div class="edit flex-child-grow" v-show="editObj.title">
          <div class="flex">
            <span class="item">ID</span>
            <span class="ml-20">{{editObj.key}}</span>
          </div>
          <div class="flex mt-10">
            <span class="item">标题</span>
            <a-input class="max-w-150" v-model="editObj.title"></a-input>
          </div>
          <div class="flex mt-10">
            <span class="item">图标</span>
            <span class="font-16 ml-5 primary"><a-icon :type="editObj.slots.icon" v-if="editObj.slots"></a-icon></span>
          </div>
          <div class="flex mt-10">
            <span class="item">排序值</span>
            <a-input-number v-model="editObj.sortIndex" :min="1" :max="treeData.length + 1"></a-input-number>
            <span class="warning font-12 margin">排序值代表了在菜单中的位置，排序值为{{editObj.sortIndex}}表示位于第{{editObj.sortIndex}}个</span>
          </div>
          <div class="flex mt-20 ml-20">
            <a-button type="danger" ghost @click="save">保存</a-button>
          </div>
        </div>
      </div>
      <a-modal v-model="showAddModal" :closable="false">
        <div class="flex">
          <span class="nowrap bold mt-5 mr-5 item">菜单类型：</span>
          <a-select v-model="menuType" class="min-w-100" placeholder="请选择">
            <a-select-option :value="1">一级菜单</a-select-option>
            <a-select-option :value="2">二级菜单</a-select-option>
          </a-select>
        </div>
        <div class="flex mt-20" v-if="menuType === 2">
          <span class="nowrap bold mt-5 mr-5 item">上级菜单：</span>
          <a-select v-model="parentId" class="min-w-100" placeholder="请选择">
            <a-select-option v-for="item in firstLevelMenu" :value="item.key" :key="item.key">{{item.title}}</a-select-option>
          </a-select>
        </div>
        <div class="flex mt-20" v-if="menuType">
          <span class="nowrap bold mt-5 mr-5 item">菜单名：</span>
          <a-input class="max-w-100"></a-input>
        </div>
      </a-modal>
    </template>
  </page>
</template>

<script>
  export default {
    data () {
      return {
        treeData: [],
        firstLevelMenu: [],
        initValueOfSortIndex: null, // 菜单的初始排序值
        showAddModal: false,
        menuType: undefined,
        parentId: undefined,
        editObj: {}
      }
    },
    mounted () {
      this.getMenu()
    },
    methods: {
      getMenu () {
        this.$api.role.getMenu().then(res => {
          if (res?.code === 200) {
            this.treeData = res.data
            if (this.treeData.length) {
              this.firstLevelMenu = this.treeData.filter(item => item.parentId === '0')
              this.treeData.forEach(item => {
                item.slots = { icon: item.icon }
              })
            }
          }
        })
      },
      onSelect(selectedKeys, info) {
        this.editObj = info.node.dataRef
        this.initValueOfSortIndex = this.editObj.sortIndex
      },
      save () {
        let params = {
          initVal: this.initValueOfSortIndex,
          id: this.editObj.key,
          name: this.editObj.title,
          index: this.editObj.sortIndex
        }
        if (params.initVal === params.index) {
          delete params.initVal
        }
        this.$api.role.editMenu(params).then(res => {
          if (res?.code === 200) {
            this.$message.success(res.userMsg)
            this.getMenu()
          }
        })
      }
    }
  }
</script>

<style scoped>
  .ant-tree {
    font-size: 16px;
    margin: 5px;
    padding: 5px;
    line-height: 2;
  }
  .max-w-150 {
    max-width: 150px;
  }
  .edit {
    margin-left: 50px;
    padding: 20px 50px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 10px;
  }
  .item {
    width: 60px;
    text-align: right;
    font-size: 16px;
    white-space: nowrap;
    margin: auto 20px auto 0;
    font-weight: 700;
  }
</style>
