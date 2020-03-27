<template>
  <page>
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
            <a-input-number v-model="editObj.sortIndex"></a-input-number>
            <span class="warning font-12 margin">排序值代表了在菜单中的位置，排序值为{{editObj.sortIndex}}表示位于第{{editObj.sortIndex}}个</span>
          </div>
          <div class="flex mt-20 ml-20">
            <a-button type="danger" ghost>保存</a-button>
          </div>
        </div>
      </div>
    </template>
  </page>
</template>

<script>
  const treeData = [
    {
      title: '控制面板',
      key: '100',
      sortIndex: 1,
      slots: {
        icon: 'area-chart',
      },
      children: []
    },
    {
      title: '数据录入',
      key: '200',
      sortIndex: 2,
      slots: {
        icon: 'form',
      },
      children: []
    },
    {
      title: '入库管理',
      key: '300',
      sortIndex: 3,
      slots: {
        icon: 'plus-circle',
      },
      children: []
    },
    {
      title: '出库管理',
      key: '400',
      sortIndex: 4,
      slots: {
        icon: 'minus-circle',
      },
      children: []
    },
    {
      title: '库内管理',
      key: '500',
      sortIndex: 5,
      slots: {
        icon: 'check-circle',
      },
      children: []
    },
    {
      title: '统计报表',
      key: '600',
      sortIndex: 6,
      slots: {
        icon: 'file-excel',
      },
      children: []
    },
    {
      title: '角色管理',
      key: '700',
      sortIndex: 7,
      slots: {
        icon: 'user',
      },
      children: [
        { title: '用户管理', key: '701', sortIndex: 1 },
        { title: '权限管理', key: '702', sortIndex: 2 }
      ],
    },
    {
      title: '系统设置',
      key: '800',
      sortIndex: 8,
      slots: {
        icon: 'setting',
      },
      children: [
        { title: '菜单管理', key: '801', sortIndex: 1 }
      ],
    }
  ]
  export default {
    name: "index",
    data () {
      return {
        treeData,
        editObj: {}
      }
    },
    methods: {
      onSelect(selectedKeys, info) {
        this.editObj = info.node.dataRef
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
