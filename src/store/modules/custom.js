import Vue from 'vue'
import { deepClone } from '@/utils'
const state = {
  pages: [], // 页面数据
  setting: {
    title: '页面标题', // 页面标题
    bg: '#f8f8f8' // 页面背景
  },
  active: -1, // 选中的组件下标，默认-1为页面设置，-2为组件管理
  editElement: {
    // 默认值为页面设置
    type: 'setting',
    index: -1
  },
  menus: [
    // 组件基础数据
    {
      type: 'base',
      categoryName: '基础组件',
      list: [
        {
          type: 'rich',
          name: '富文本'
        },
        {
          type: 'title',
          name: '标题'
        },
        {
          type: 'goods',
          name: '商品'
        },
        {
          type: 'goodsList',
          name: '商品列表'
        },
        {
          type: 'goodsCategory',
          name: '商品分类'
        },
        {
          type: 'imgNav',
          name: '图片导航'
        },
        {
          type: 'hotArea',
          name: '热区图片'
        },
        {
          type: 'carousel',
          name: '轮播图'
        },
        {
          type: 'video',
          name: '视频'
        },
        {
          type: 'topMenu',
          name: '顶部菜单'
        }
      ]
    },
    {
      type: 'marketing',
      categoryName: '营销组件',
      list: [
        {
          type: 'shopWindow',
          name: '橱窗'
        },
        {
          type: 'cardList',
          name: '卡片列表'
        },
        {
          type: 'goodsSale',
          name: '商品促销'
        },
        {
          type: 'notice',
          name: '公告'
        },
        {
          type: 'scrollTopNav',
          name: '滑动置顶导航'
        }
      ]
    },
    {
      type: 'other',
      categoryName: '其他组件',
      list: [
        {
          type: 'line',
          name: '分割线'
        },
        {
          type: 'blank',
          name: '辅助空白'
        }
      ]
    }
  ]
}

const mutations = {
  /*
   *@Description: 设置下标方法，如果是新增元素，则需要解耦
   *@params: index 当前元素下标
   *@params：type 类型 new为新设立
   *@MethodAuthor:  Liangguojiang
   *@Date: 2020-08-06 12:20:23
   */
  // 核心逻辑，设置下标，基于原数据深度复制，然后利用浅复制配置当前编辑元素
  SET_ACTIVE(state, data) {
    // 记录当前下标
    state.active = data.index
    if (data.type === 'new') {
      // 由于数组间数据的耦合,需要用深复制解耦，取消原数据与现有数据的关联
      Vue.set(state.pages, data.index, deepClone(state.pages[data.index]))
    }
    if (data.index >= 0) {
      // 常规组件,直接数据对象赋值（浅复制），editElement和pages对应元素数据同步修改
      state.editElement = state.pages[data.index]
    } else {
      // 如果为负数则为右侧菜单页面设置和组件管理
      state.editElement = {
        // 默认值为页面设置
        type: data.type,
        index: data.index
      }
    }
  },
  // 页面数据赋值
  SET_PAGE_DATA(state, pages) {
    state.pages = pages
  },
  // 删除元素
  // 删除选中元素的前面、后面和自身元素，如果删除选中元素后面的元素，下标不变
  DELETE_ELEMENT(state, index) {
    if (index < state.active) {
      // 选中元素前面的
      state.active = state.active - 1 // 高亮元素减1
    } else if (index === state.active) {
      // 选中的元素
      if (index === state.pages.length - 1) {
        // 最后一个元素
        state.active = -1
      } else {
        state.active = index
      }
    }
    // 删除最后一个元素
    state.pages.splice(index, 1)
    // 更新编辑元素,-1为页面设置
    if (state.active === -1) {
      state.editElement = {
        type: 'setting',
        index: -1
      }
    } else {
      // 页面设置
      state.editElement = deepClone(state.pages[state.active])
      state.editElement.index = state.active
    }
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
