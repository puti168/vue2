<template>
  <a-tree-select
    v-bind="extraProps"
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    :tree-data="treeData"
    :value="selectedValue"
    :allowClear="allowClear"
    show-search
    treeNodeFilterProp="title"
    :placeholder="placeholder"
    :replaceFields="{ children: 'childList', key: 'uniteMerNum', value: 'uniteMerNum', title: 'uniteMerName' }"
    @change="change"
  >
  </a-tree-select>
</template>

<script>
import { StoreMixin } from '@/core/mixins'
import { getMerchantTree, getMerchantRootTree } from '@/api/merchant/list'
export default {
  props: {
    gameType: {
      type: String,
    },
    forParent: {
      type: Boolean,
      default: false,
    },
    allowClear: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
    },
    api: {
      type: Function,
      default: getMerchantTree,
    },
    query: {
      type: Object,
      default: () => ({}),
    },
    placeholder: {
      type: String,
      default: '输入商户名称或下拉选择',
    },
  },
  mixins: [StoreMixin],
  data() {
    return {
      treeData: [],
      selectedValue: undefined,
    }
  },
  created() {
    this.loadData(true)
  },
  computed: {
    extraProps() {
      let defaultExpandedKeys = {}
      if (this.treeData.length > 0) {
        defaultExpandedKeys = { treeDefaultExpandedKeys: [this.treeData[0].uniteMerNum] }
      }
      return { ...this.$attrs, ...defaultExpandedKeys }
    },
    useCache() {
      return !(this.query && this.forParent)
    },
  },
  methods: {
    change: function (value) {
      this.selectedValue = value
      this.$emit('input', value)
    },
    loadData(init) {
      if (init && this.useCache && this.getUserInfo('merchants')) {
        this.treeData = this.getUserInfo('merchants')
        this.selectedValue = this.getValue(init)
        this.$emit('input', this.selectedValue)
        return
      }
      let param = { ...this.query }
      if (this.gameType) {
        param = { dataSources: this.gameType, ...param }
      }
      let request = this.api
      if (this.forParent) {
        request = getMerchantRootTree
      }
      request(param).then((res) => {
        this.treeData = res.data || []
        if (this.useCache) {
          this.setUserInfo('merchants', this.treeData)
        }
        this.selectedValue = this.getValue(init)
        this.$emit('input', this.selectedValue)
      })
    },
    getValue(init) {
      if (init) {
        return this.value
      }
      if (this.treeData.some((v) => v.uniteMerNum == this.value)) {
        return this.value
      }
      return undefined
    },
  },
  watch: {
    value(val) {
      this.selectedValue = val
      this.$emit('input', val)
    },
  },
}
</script>