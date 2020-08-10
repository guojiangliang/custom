<template>
  <div class="hot-area-panel">
    <panel-header title="热区组件" />
    <el-form label-width="100px" class="area-form">
      <el-form-item label="上下边距：">
        <el-slider v-model="element.padding" show-input />
      </el-form-item>
      <el-form-item class="select-img" label="选择图片：">
        <single-image
          v-if="element.imgUrl === ''"
          @input="handleUploadSuccess"
        />
        <img v-if="element.imgUrl" :src="element.imgUrl" alt="热区图片" />
        <!--删除按钮-->
        <div v-if="element.imgUrl" @click="handleDelImg">删除图片</div>
      </el-form-item>
      <div class="button">
        <el-button
          type="primary"
          round
          @click.stop="handleDraw(element.imgUrl)"
        >
          绘制热区
        </el-button>
      </div>
    </el-form>
    <el-dialog
      :visible.sync="dialogAreaVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="热区编辑器"
      width="50%"
    >
      <el-dialog
        v-if="element.area[index]"
        :visible.sync="innerVisible"
        :modal="false"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :modal-append-to-body="true"
        width="30%"
        title="设置链接"
        append-to-body
      >
        <el-form>
          <el-form-item label="链接到">
            <el-select v-model="element.area[index].url" placeholder="请选择">
              <el-option label="店铺首页" value="1" />
              <el-option label="我的页面" value="2" />
              <el-option label="发现页面" value="3" />
              <el-option label="购物车页面" value="4" />
              <el-option label="商品详情" value="8" />
              <el-option label="全部商品" value="5" />
              <el-option label="分类页面" value="6" />
              <el-option label="自定义外链" value="7" />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="element.area[index].url === '7'"
            label="自定义外链"
          >
            <el-input v-model="element.area[index].customLink" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="saveUrl">确 定</el-button>
        </div>
      </el-dialog>
      <div ref="hot-area" class="hot-area">
        <div class="hot-img">
          <img ref="image" :src="element.imgUrl" alt="" />
        </div>
        <template v-if="element.area.length > 0">
          <template v-for="(item, key) in element.area">
            <vue-draggable-resizable
              v-if="!item.isDel"
              :id="`drag_${item.id}`"
              :key="item.id"
              :parent="true"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              style="border: 1px solid #000;background:#fff;text-align: center;"
              @activated="onActivated(key)"
              @dragstop="onDragstop"
              @resizestop="onResizestop"
            >
              <p
                style="min-width: 50px;min-height: 50px;"
                @dblclick.stop="setUrl(key)"
              >
                {{ item.url ? formatUrl(item.url) : `双击设置链接` }}
              </p>
              <div class="close" @click="delHotArea(item.id)">
                <i class="el-icon-error" />
              </div>
            </vue-draggable-resizable>
          </template>
        </template>
      </div>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button v-if="element.area.length > 0 && empty" @click="emptyHotArea">清空热区</el-button> -->
        <!-- <el-button v-if="element.area.length > 0" @click="delHotArea">删除热区</el-button> -->
        <el-button @click="addHotArea">添加热区</el-button>
        <el-button type="primary" @click="saveHotArea">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixins from './mixins'
import singleImage from '@/components/Upload/SingleImage'
import vueDraggableResizable from 'vue-draggable-resizable'

import img from '@/assets/404_images/404.png'
export default {
  components: { singleImage, vueDraggableResizable },
  mixins: [mixins],
  data() {
    return {
      dialogAreaVisible: false,
      innerVisible: false,
      activeAreaIndex: -1,
      img,
      index: -1,
      tmpUrl: '' // 每次进入存储当前链接
    }
  },
  methods: {
    handleUploadSuccess(url) {
      this.element.imgUrl = url
      // 成功上传以后清空原有热区
      this.element.area = []
    },
    handleDelImg() {
      this.element.imgUrl = ''
      this.element.area = []
    },
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
    },
    onResizestop(x, y, w, h) {
      // 修改尺寸完成回调
      if (
        this.element.area.length > 0 &&
        this.element.area[this.activeAreaIndex]
      ) {
        const area = this.element.area[this.activeAreaIndex]
        area.x = x
        area.y = y
        area.w = w
        area.h = h
        // 把整数计算成百分比
        area.px = x / 5 + '%'
        area.py = (y * 100) / this.element.height + '%'
        area.pw = w / 5 + '%'
        area.ph = (h * 100) / this.element.height + '%'
      }
    },
    onDragstop(x, y) {
      // 拖拽完成回调
      if (
        this.element.area.length > 0 &&
        this.element.area[this.activeAreaIndex]
      ) {
        const area = this.element.area[this.activeAreaIndex]
        area.x = x
        area.y = y
        area.px = x / 5 + '%'
        area.py = (y * 100) / this.element.height + '%'
      }
    },
    onActivated(index) {
      this.activeAreaIndex = index
    },
    setUrl(index) {
      this.index = index
      this.tmpUrl = this.element.area[index].url
      this.innerVisible = true
    },
    cancel() {
      this.element.area[this.index].url = this.tmpUrl
      this.innerVisible = false
    },
    saveUrl() {
      this.innerVisible = false
    },
    handleDraw(imgUrl) {
      if (imgUrl) {
        this.dialogAreaVisible = true
        var img = new Image()
        img.src = imgUrl
        img.onload = () => {
          // 根据原始宽度按比例计算出图片的高度
          this.element.height = parseInt((500 * img.height) / img.width)
          this.$refs['hot-area'].style.height = this.element.height + 'px'
        }
      } else {
        this.$notify.error({
          title: '提示',
          message: '请先上传图片！',
          duration: 1500
        })
      }
    },
    delHotArea(id) {
      // 单个删除热区与插件起冲突，暂不支持
      // 冲突临时解决方案，直接操作dom把内容remove掉，数据仍然存着，提交时把isDel为false的提交给后台
      this.element.area.forEach((item, index) => {
        if (item.id === id) {
          document.getElementById('drag_' + id).remove()
          this.element.area[index].isDel = true
        }
      })
      // this.element.area.splice(index, 1)

      // if (this.activeAreaIndex !== -1) {
      //   setTimeout(() => {
      //     this.element.area.splice(this.activeAreaIndex, 1)
      //     this.activeAreaIndex = -1
      //   }, 15000)
      // } else {
      //   this.$notify.error({
      //     title: '提示',
      //     message: '请先选择要删除的热区！',
      //     duration: 1500
      //   })
      // }
    },
    emptyHotArea() {
      this.element.area = []
    },
    addHotArea() {
      setTimeout(() => {
        this.element.area.push({
          id: new Date().getTime(),
          x: 0,
          y: 0,
          w: 100,
          h: 50,
          url: '',
          customLink: '',
          goodsImgUrl: '',
          px: '0',
          py: '0',
          pw: '20%', // 100/500
          ph: (50 * 100) / this.element.height + '%',
          isDel: false
        })
      }, 100)
    },
    saveHotArea() {
      this.dialogAreaVisible = false
    }
  }
}
</script>
<style lang="scss">
.hot-area-panel {
  .area-form {
    width: 420px;
    margin: 0 auto;
    padding-top: 15px;
    .select-img {
      img {
        width: 300px;
      }
    }
    .button {
      text-align: center;
    }
  }
  .hot-area {
    position: relative;
    width: 500px;
    margin: 0 auto;
    img {
      width: 100%;
    }
    .draggable {
      background: transparent !important;
      border: 1px solid #fff !important;
      cursor: move;
      .handle-tl {
        left: -5px;
        top: -5px;
      }
      .handle-tm {
        top: -5px;
      }
      .handle-tr {
        top: -5px;
        right: -5px;
      }
      .handle-mr {
        right: -5px;
      }
      .handle-br {
        bottom: -5px;
        right: -5px;
      }
      .handle-bm {
        bottom: -5px;
      }
      .handle-bl {
        bottom: -5px;
        left: -5px;
      }
      .handle-ml {
        left: -5px;
      }
      p {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        background: rgba(100, 160, 248, 0.5);
        margin: 0;
      }
      .close {
        position: absolute;
        top: -8px;
        right: -8px;
        z-index: 99999;
        font-size: 16px;
        color: #000;
        cursor: pointer;
      }
    }
  }
}
</style>
