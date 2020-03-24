<template>
  <a-modal>

  </a-modal>
</template>

<script>
  export default {
    name: "modal",
    props: {
      title: {
        type: [String],
        default: ''
      },
      centered: {
        type: [Boolean],
        default: false
      }
    }
  }
</script>

<style scoped>

</style>