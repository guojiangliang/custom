<template>
  <div
    class="title-element"
    :style="`font-size: ${element.fontSize}px;`"
  >
    {{ element.name }}
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    element: {
      type: Object,
      default: () => { }
    }
  }
}
</script>
<style lang="scss" scoped>
.title-element {
  height: 40px;
  display: flex;
  align-items: center;
  background: #fff;
}
</style>
