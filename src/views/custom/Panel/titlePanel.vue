<template>
  <div class="title-panel">
    <panel-header title="标题组件" />
    <el-form :model="element">
      <el-form-item label="文字">
        <el-input v-model="element.name" />
      </el-form-item>
      <el-form-item label="大小">
        <el-input v-model="element.fontSize" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mixins from './mixins'
export default {
  mixins: [mixins],
  props: {
    element: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped></style>
