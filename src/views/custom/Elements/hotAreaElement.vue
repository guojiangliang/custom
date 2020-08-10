<template>
  <div
    :style="
      `padding-top: ${element.padding}px;padding-bottom: ${element.padding}px;`
    "
    class="image-element"
  >
    <div v-if="element.imgUrl" class="image">
      <img :src="element.imgUrl" alt="" />
      <template v-for="(item, index) in element.area">
        <div
          v-if="!item.isDel"
          :key="index"
          :style="
            `width: ${item.pw};height: ${item.ph};left: ${item.px}; top:${item.py};`
          "
          class="hot-area"
        >
          {{ item.url ? formatUrl(item.url) : '暂无链接' }}
        </div>
      </template>
    </div>
    <div v-else class="no-image">
      <p>点击编辑图片广告</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    element: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      show: true
    }
  },
  mounted() {},
  methods: {
    formatUrl(val) {
      switch (val) {
        case '1':
          return '店铺首页'
        case '2':
          return '我的页面'
        case '3':
          return '发现页面'
        case '4':
          return '购物车页面'
        case '5':
          return '全部商品'
        case '6':
          return '分类页面'
        case '7':
          return '自定义外链'
        case '8':
          return '商品详情'
        default:
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.image-element {
  .image {
    position: relative;
    img {
      width: 100%;
    }
    .hot-area {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background: rgba(100, 160, 248, 0.5);
      border: 1px solid #fff;
      font-size: 12px;
      z-index: 9;
    }
  }
  .no-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 120px;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    background: #66b1ff;
    text-align: center;
  }
}
</style>
