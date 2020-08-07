<template>
  <div class="setting-panel">
    <panel-header title="页面设置" />
    <el-form :model="setting">
      <el-form-item label="页面标题">
        <el-input v-model="setting.title" />
      </el-form-item>
      <el-form-item label="页面背景">
        <el-color-picker
          v-model="setting.bg"
          :predefine="predefineColors"
          show-alpha
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import panelHeader from '../common/panelHeader'
export default {
  components: { panelHeader },
  data() {
    return {
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577',
        '#FF838B'
      ]
    }
  },
  computed: {
    setting() {
      return this.$store.state.custom.setting
    }
  },
  mounted() { },
  created() { },
  methods: {}
}
</script>
<style lang='scss' scoped>
</style>
