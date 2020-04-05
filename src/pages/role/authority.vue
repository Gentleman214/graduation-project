<template>
  <page>
    <template slot="extra">
      <router-link to="authority/admin">
        <a-button type="primary">管理中心</a-button>
      </router-link>
    </template>
    <template slot="content">
      <a-auto-complete
        v-model="keywords"
        :dataSource="dataSource"
        allowClear
        @change="getUser"
        @select="select"
        @search="edit = false"
        style="width: 400px"
        placeholder="请输入员工号或姓名"
      />
      <div v-show="edit">
      </div>
    </template>
  </page>
</template>

<script>
  export default {
    name: "role",
    data () {
      return {
        keywords: '',
        edit: false,
        dataSource: []
      }
    },
    methods: {
      getUser () {
        this.$api.role.getUserByStaffIdOrName(this.keywords).then(res => {
          if (res?.code === 200) {
            this.dataSource = res.data
          }
        })
      },
      select () {
        this.edit = true
      }
    }
  }
</script>

<style scoped>

</style>
