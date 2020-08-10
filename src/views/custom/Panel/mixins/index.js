import panelHeader from '../../common/panelHeader'
export default {
  components: { panelHeader },
  props: {
    element: {
      type: Object,
      default: () => {}
    }
  }
}
