<template>
  <div class="components-panel">
    <panel-header title="组件管理" />
    <draggable :list="pages" v-bind="{ animation: 300 }">
      <div v-for="(item, index) in pages" :key="index" class="component">
        {{ item.name }}组件
      </div>
    </draggable>
  </div>
</template>

<script>
import panelHeader from '../common/panelHeader'
import draggable from 'vuedraggable'
export default {
  components: { panelHeader, draggable },
  computed: {
    pages() {
      return this.$store.state.custom.pages
    }
  }
}
</script>
<style lang="scss" scoped>
.components-panel {
  .component {
    height: 40px;
    padding-left: 15px;
    line-height: 40px;
    font-size: 14px;
    cursor: move;
    border-bottom: 1px solid #eee;
  }
}
</style>
