<template>
  <page>
    <template slot="extra">
      <router-link to="authority/admin">
        <a-button type="primary">管理中心</a-button>
      </router-link>
    </template>
    <template slot="content">
      <a-input></a-input>
    </template>
  </page>
</template>

<script>
  export default {
    name: "role"
  }
</script>

<style scoped>

</style>
