<template>
  <div
    class="goods-list-element"
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
.goods-list-element {
  height: 40px;
  display: flex;
  align-items: center;
  background: #fff;
}
</style>
