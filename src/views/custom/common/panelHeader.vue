<template>
  <div class="panel-header">{{ title }}</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang='scss' scoped>
.panel-header {
  font-size: 18px;
  font-weight: 600;
  color: #323233;
  padding: 24px 16px;
  border-bottom: 1px solid #f2f4f6;
}
</style>
