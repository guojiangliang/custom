<template>
  <div
    class="rich-element"
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
  },
  data() {
    return {}
  },
  computed: {
    pages() {
      return this.$store.state.custom.pages
    }
  },
  created() {
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.rich-element {
  height: 40px;
  display: flex;
  align-items: center;
  background: #fff;
}
</style>
