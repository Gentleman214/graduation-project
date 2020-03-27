<template>
  <page>
    <template slot="content">
      <a-button icon="plus" type="primary" class="margin" @click="add">添加角色</a-button>
      <div class="flex">
        <a-table class="flex-child-grow" style="max-width: 500px" :dataSource="roleList" :columns="columns" rowKey="id" :pagination="false" :bordered="true">
          <template slot="action" slot-scope="text, row">
            <a-button type="primary" @click="edit(row.id, row.name, row.menu)" ghost>编辑</a-button>
            <a-popconfirm placement="right" okText="确定" cancelText="取消" @confirm="deleteRole">
              <template slot="title">
                <span>确定要删除吗？</span>
              </template>
              <a-button type="danger" ghost>删除</a-button>
            </a-popconfirm>
          </template>
        </a-table>
        <div class="edit" style="min-width: 300px" v-if="editId">
          <div class="ml-20 font-16 bold"><a-icon class="mr-5" type="edit" />正在编辑{{editName}}...</div>
          <a-tree
            checkable
            :defaultExpandAll="true"
            :treeData="treeData"
            v-model="menuList"
          />
          <a-button class="margin-20" type="danger" ghost @click="save">保存</a-button>
          <a-button class="mt-20" type="primary" ghost @click="cancel">取消</a-button>
        </div>
      </div>

      <a-modal v-model="showAdd" :closable="false" @ok="save" @cancel="cancel">
        <div>
          <span class="nowrap bold">角色名：</span>
          <a-input class="max-w-200" v-model="editName"></a-input>
        </div>
        <div class="mt-20">
          <span class="nowrap bold">权限配置：</span>
          <a-tree
            checkable
            :defaultExpandAll="true"
            :treeData="treeData"
            v-model="menuList"
          />
        </div>
      </a-modal>
    </template>
  </page>
</template>

<script>
  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: '角色名',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '操作',
      align: 'center',
      scopedSlots: { customRender: 'action' }
    }
  ]
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
    name: "admin",
    data () {
      return {
        columns,
        treeData,
        showAdd: false,
        editId: '', // 当前编辑行的id
        editName: '', // 当前编辑行的name
        menuList: [],
        roleList: []
      }
    },
    mounted () {
      this.getRoleList()
    },
    methods: {
      getRoleList () {
        this.$api.role.getRoleList().then(res => {
          if (res?.code === 200){
            this.roleList = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      deleteRole () {

      },
      add () {
        this.showAdd = true
        this.editId = this.editName = ''
        this.menuList.splice(0)
      },
      edit (id, name, menu) {
        this.editId = id
        this.editName = name
        this.menuList = menu.split(',')
      },
      save () {
        if (!this.editName) {
          this.$message.warning('角色名不能为空~')
          return
        }
        let params = {
          id: this.editId,
          name: this.editName,
          menu: this.menuList.join(',')
        }
        console.log(params)
      },
      cancel () {
        this.editId = this.editName = ''
        this.menuList.splice(0)
      }
    }
  }
</script>

<style scoped>
  .margin-20 {
    margin: 20px;
  }
  .edit {
    margin-left: 30px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 10px;
  }
</style>
