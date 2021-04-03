<template>
  <a-button
    v-bind="$attrs"
    class="bd-time-btn"
    :style="{ width: width + 'px' }"
    :href="href"
    :disabled="tbDisabled"
    :type="type"
    @click="handleClick"
  >
    <span v-if="showCountdown"><a-statistic-countdown :value="deadline" format="s[s]" @finish="onFinish" /></span>
    <template v-else>{{ text }}</template>
  </a-button>
</template>

<script>
import PropTypes from 'ant-design-vue/es/_util/vue-types'
import { getUri } from '@/utils/request'

export default {
  name: 'TimeButton',
  props: {
    time: PropTypes.integer.def(10),
    width: PropTypes.number.def(64),
    text: PropTypes.string.def('导出'),
    config: PropTypes.object,
    type: PropTypes.string.def('primary'),
  },
  data() {
    return {
      tbDisabled: this.disabled || !!this.disabled,
      tbTime: this.time,
      deadline: null,
    }
  },
  methods: {
    handleClick(event) {
      const { tbDisabled } = this
      if (tbDisabled) {
        return
      }
      this.deadline = Date.now() + this.time * 1000
      this.tbDisabled = true
      this.$emit('click', event)
    },
    onFinish() {
      this.tbDisabled = false
    },
  },
  computed: {
    href() {
      if (this.config && this.config.url) {
        return getUri(this.config)
      }
      return undefined
    },
    showCountdown() {
      return !this.disabled && this.tbDisabled
    },
  },
}
</script>

<style lang="less" scoped>
.bd-time-btn /deep/ .ant-statistic {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  list-style: none;
  -webkit-font-feature-settings: 'tnum';
  font-feature-settings: 'tnum';
}
.bd-time-btn /deep/ .ant-statistic-content {
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
</style>
