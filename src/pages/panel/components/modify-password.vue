<template>
  <a-drawer
    title="修改密码"
    placement="right"
    :closable="false"
    @close="closeDrawer"
    :visible="showDrawer"
    :width="500"
  >
    <div class="flex">

    </div>
  </a-drawer>
</template>

<script>
  export default {
    data() {
      return {
        showDrawer: false
      }
    },
    methods: {
      openDrawer () {
        this.showDrawer = true;
      },
      closeDrawer () {
        this.showDrawer = false;
      }
    }
  }
</script>

<style scoped>

</style>