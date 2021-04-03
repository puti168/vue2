/**
 * 表格-树状数据'懒'渲染
 * 使用参考：src\views\report\finance\settlementinput\index.vue
 */
const treeMixin = {
  data() {
    return {
      childrenPropName: "childList",
      sourceDataMap: {}
    }
  },
  methods: {
    resetSourceDataMap() {
      this.sourceDataMap = {}
    },
    addTreeNodeToSourceDataMap(node, internal) {
      if(!internal){
        this.resetSourceDataMap()
      }
      if (Array.isArray(node)) {
        return node.forEach(v => this.addTreeNodeToSourceDataMap(v, true))
      }
      const map = this.sourceDataMap
      if (!node[this.childrenPropName] || !node[this.childrenPropName].length) {
        node[this.childrenPropName] = null
        return
      }
      node[this.childrenPropName].forEach((v) => {
        if (v[this.childrenPropName] && v[this.childrenPropName].length > 0) {
          map[v.id] = v[this.childrenPropName]
          v[this.childrenPropName] = []
        }
      })
    },
    onTreeNodeExpand(expanded, record) {
      if (expanded && record[this.childrenPropName] && record[this.childrenPropName].length == 0) {
        record[this.childrenPropName] = this.sourceDataMap[record.id]
        delete this.sourceDataMap[record.id]
        this.addTreeNodeToSourceDataMap(record, true)
      }
    },
  }
}

export default treeMixin
