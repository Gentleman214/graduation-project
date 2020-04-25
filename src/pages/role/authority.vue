<template>
  <page>
    <template slot="extra">
      <a-button icon="plus" type="primary" class="margin" @click="add">添加角色</a-button>
    </template>
    <template slot="content">
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
            :treeData="allMenu"
            v-model="menuList"
          />
          <a-button class="margin-20" type="danger" ghost @click="save">保存</a-button>
          <a-button class="mt-20" type="primary" ghost @click="cancel">取消</a-button>
        </div>
      </div>

      <a-modal v-model="showAdd" :closable="false" @ok="save" @cancel="cancel" :centered="true">
        <div>
          <span class="nowrap bold">角色名：</span>
          <a-input class="max-w-200" v-model="editName"></a-input>
        </div>
        <div class="mt-20">
          <span class="nowrap bold">权限配置：</span>
          <a-tree
            checkable
            :defaultExpandAll="true"
            :treeData="allMenu"
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
  export default {
    name: "admin",
    data () {
      return {
        columns,
        allMenu: [],
        showAdd: false,
        editId: '', // 当前编辑行的id
        editName: '', // 当前编辑行的name
        menuList: [],
        roleList: []
      }
    },
    mounted () {
      this.getRoleList()
      this.getMenu()
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
      getMenu () {
        this.$api.role.getMenu().then(res => {
          if (res?.code === 200) {
            this.allMenu = res.data
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
        this.$api.role.addOrUpdateRole(params).then(res => {
          if (res?.code === 200) {
            this.$message.success(res.userMsg)
          } else {
            this.$message.error(res.userMsg)
          }
        })
        // console.log(params)
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
