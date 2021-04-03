<template>
  <div>
    <a-row v-for="(item, index) in content" :key="index">
      <a-col :span="16" style="text-align:left">{{ getName(index) }}</a-col
      ><a-col :span="8" style="text-align:right">{{ item.rate | formatNumber }}%</a-col>
    </a-row>
  </div>
</template>

<script>
import { formatNumber } from '@/utils/util'
export default {
  props: {
    content: {
      type: Array,
      required: true,
    },
  },
  created() {
    if (!this.content) {
      this.content = []
    }
  },
  methods: {
    getName(index) {
      const current = formatNumber(this.content[index].num, 0)
      if (index == 0) {
        return `0 - ${current}`
      }
      const last = formatNumber(this.content[index - 1].num, 0)
      if (index == this.content.length - 1) {
        return `${last} 以上`
      }
      return `${last} - ${current}`
    },
  },
}
</script>

<style lang="less" scoped>
</style>
