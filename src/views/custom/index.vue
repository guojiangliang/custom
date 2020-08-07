<template>
  <div class="custom-page">
    <div class="header">
      <el-button
        size="mini"
        type="primary"
        @click="handleSave"
      >
        保存
      </el-button>
      <el-button
        size="mini"
        type="warning"
      >
        预览
      </el-button>
      <el-button
        size="mini"
        type="success"
      >
        还原
      </el-button>
    </div>
    <div class="content">
      <!--左侧组件栏-->
      <el-scrollbar class="left-scrollbar">
        <div
          v-for="item in menus"
          :key="item.type"
          class="left-box"
        >
          <div class="title">{{ item.categoryName }}</div>
          <draggable
            class="component-list"
            :list="item.list"
            :sort="false"
            :group="{ name: 'comp', pull: 'clone', put: false }"
            @end="onEnd"
            @start="onStart"
          >
            <div
              v-for="val in item.list"
              :key="val.type"
              class="component-item"
            >
              {{ val.name }}
            </div>
          </draggable>
        </div>
      </el-scrollbar>
      <!--中间页面-->
      <el-scrollbar class="middle-page">
        <div class="page-header">
          <div class="page-title">{{ setting.title }}</div>
        </div>
        <div
          class="page"
          :style="`background:${setting.bg}`"
        >
          <draggable
            class="page-drag"
            v-bind="{ animation: 300 }"
            :list="pages"
            group="comp"
            @end="changePos"
          >
            <div
              v-for="(item, index) in pages"
              :key="index"
              class="elements"
              :class="active === index ? 'active' : ''"
              @click="onSelect(index)"
            >
              <div
                class="del-btn"
                @click.stop="doDel(index)"
              >
                <img
                  src="../../assets/images/del.png"
                  alt="删除"
                >
              </div>
              <component
                :is="formatType(item.type,'Element')"
                :element="item"
              />
            </div>
          </draggable>
        </div>
        <div class="footer">
          页面底部
        </div>
      </el-scrollbar>
      <!--右侧操作弹窗-->
      <el-scrollbar class="right-panel">
        <div class="right-menus">
          <div
            v-for="item in rightMenu"
            :key="item.active"
            :class="active === item.active ? 'active' : ''"
            @click="goMenu(item.active,item.type)"
          >
            {{ item.name }}
          </div>
        </div>
        <component
          :is="formatType(editElement.type,'Panel')"
          v-if="editElement && editElement.type"
          :element="editElement"
        />
        <div v-else>暂无组件</div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
// 页面组件
import elements from './mixins/elements'
// 组件参数配置
import panels from './mixins/panels'
import { mapState } from 'vuex'
export default {
  components: { draggable },
  mixins: [elements, panels],
  data() {
    return {
      len: 0,
      rightMenu: [{
        name: '页面设置',
        active: -1,
        type: 'setting'
      }, {
        name: '组件管理',
        active: -2,
        type: 'components'
      }]
    }
  },
  computed: {
    ...mapState({
      pages: state => state.custom.pages,
      menus: state => state.custom.menus,
      active: state => state.custom.active,
      setting: state => state.custom.setting,
      editElement: state => state.custom.editElement
    })
  },
  mounted() { },
  created() {
    // 模拟后端数据返回
    // setTimeout(() => {
    //   const pages = [
    //     { 'type': 'title', 'name': '标题', 'fontSize': '12' },
    //     { 'type': 'rich', 'name': '富文本', 'fontSize': '32' },
    //     { 'type': 'title', 'name': '标题', 'fontSize': '22' },
    //     { 'type': 'rich', 'name': '富文本', 'fontSize': '22' }
    //   ]
    //   this.$store.commit('custom/SET_PAGE_DATA', pages)
    // }, 1000)
  },
  methods: {
    // 开始拖拽，记录当前数据长度
    onStart(evt) {
      this.len = this.pages.length
    },
    onEnd(evt) {
      if (this.pages.length > this.len) {
        // 数据变长,添加数据成功
        this.$store.commit('custom/SET_ACTIVE', { index: evt.newIndex, type: 'new' })
      }
    },
    // 交换元素位置也要更新active
    changePos(evt) {
      this.$store.commit('custom/SET_ACTIVE', { index: evt.newIndex })
      // 交换完成给panel赋值
    },
    onSelect(index) {
      this.$store.commit('custom/SET_ACTIVE', { index })
    },
    formatType(type, name) {
      switch (type) {
        case type:
          return `${type + name}`
      }
    },
    doDel(index) {
      this.$store.commit('custom/DELETE_ELEMENT', index)
    },
    // 保存数据，把pages传给后端
    handleSave() {
      console.log(JSON.stringify(this.pages))
    },
    // 前往菜单项
    goMenu(index, type) {
      this.$store.commit('custom/SET_ACTIVE', { index, type })
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-page {
  min-height: calc(100vh - 124px);
  background: #f8f8f8;
  .header {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-bottom: 1px solid #eee;
    padding: 0 20px;
    box-sizing: border-box;
    background: #fff;
  }
  .content {
    display: flex;
    .left-scrollbar {
      flex: 0 0 200px;
      height: calc(100vh - 124px);
      border-right: 1px solid #eee;
      background: #fff;
      .left-box {
        padding-top: 20px;
        .title {
          font-size: 16px;
          font-weight: bold;
          padding-left: 10px;
        }
        .component-list {
          width: 200px;
          margin-top: 15px;
          display: flex;
          flex-wrap: wrap;
          padding: 0 10px;
          .component-item {
            flex: 0 0 85px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px dashed #222;
            font-size: 12px;
            margin-right: 10px;
            margin-bottom: 15px;
            box-sizing: border-box;
            transition: transform 0ms !important;
            cursor: move;
            &:nth-child(2n) {
              margin-right: 0;
            }
            &:hover {
              border: 1px solid #155bd4;
              background: #155bd4;
              color: #fff;
            }
          }
        }
      }
    }
    .middle-page {
      flex: 1;
      padding-bottom: 15px;
      height: calc(100vh - 124px);
      .page-header {
        height: 64px;
        width: 375px;
        margin: 0 auto;
        background-image: url('../../assets/images/page-header.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        position: relative;
        box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
        margin-top: 60px;
        .page-title {
          width: 180px;
          margin: 0 auto;
          height: 64px;
          text-align: center;
          padding-top: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          box-sizing: border-box;
        }
      }
      .page {
        width: 375px;
        min-height: 500px;
        margin: 0 auto;
        box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
        border-top: 1px solid #eee;
        .page-drag {
          min-height: 500px;
          .sortable-ghost {
            position: relative;
            display: block;
            overflow: hidden;
            width: 100%;
            height: 40px;
            background-image: url('../../assets/images/com-bg.png');
            text-align: center;
            line-height: 40px;
            &::before {
              content: '组件放置区域';
              position: absolute;
              left: 50%;
              right: 0;
              top: 50%;
              width: 120px;
              height: 24px;
              text-align: center;
              line-height: 24px;
              background: cornflowerblue;
              color: #fff;
              font-size: 12px;
              transform: translate(-50%, -50%);
              z-index: 2;
            }
          }
          .elements {
            position: relative;
            &.sortable-ghost {
              // 组件相互拖拽排序不显示文字
              &::before {
                content: ' ';
                background: none;
              }
            }
            cursor: move;
            .del-btn {
              display: none;
              position: absolute;
              width: 36px;
              height: 25px;
              background: #fff;
              top: -2px;
              cursor: pointer;
              img {
                display: block;
                width: 20px;
                margin: 0 auto;
                padding-top: 2px;
              }
            }
            &:hover {
              border: 1px dashed #155bd4;
              .del-btn {
                display: block;
                right: -37px;
              }
            }
            &.active {
              // active必须在hover之后，用选中实体线覆盖虚线
              border: 2px solid #155bd4;
              .del-btn {
                right: -38px;
              }
            }
          }
        }
      }
      .footer {
        width: 375px;
        height: 147px;
        margin: 0 auto;
        background: #fff;
        box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
      }
    }
    .right-panel {
      position: relative;
      flex: 0 0 450px;
      height: calc(100vh - 124px);
      border-left: 1px solid #eee;
      background: #fff;
      .right-menus {
        position: fixed;
        right: 460px;
        top: 150px;
        width: 94px;
        div {
          width: 94px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          background: #fff;
          color: #222;
          font-size: 12px;
          margin-bottom: 15px;
          cursor: pointer;
          &:last-child {
            margin-bottom: 12px;
          }
          &.active {
            background: #155bd4;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
