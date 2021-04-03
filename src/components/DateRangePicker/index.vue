<template>
  <a-space :size="0">
    <a-range-picker
      v-bind="otherAttrs"
      :disabled-date="disabledRangePicker"
      :value="timeValues"
      :allowClear="allowClear"
      @change="onChangeTime"
      @openChange="onOpenChange"
      @ok="onChangeTimeOk"
    >
      <a-icon slot="suffixIcon" type="calendar" />
    </a-range-picker>
  </a-space>
</template>
<script>
import PropTypes from 'ant-design-vue/es/_util/vue-types'
import { DatepickerMixin } from '@/core/mixins'

import moment from 'moment'
export default {
  props: {
    disabledType: PropTypes.oneOf(['2day', '31day', '1month', undefined]).def(undefined),
    value: PropTypes.array.def([]),
    allowClear: PropTypes.bool.def(true),
    showTime: PropTypes.bool.def(false),
  },
  mixins: [DatepickerMixin],
  data() {
    const [beginTime, endTime] = this.value
    return {
      timeValues: [beginTime, endTime],
      lastTimeValues: [beginTime, endTime],
    }
  },
  created() {
    this.$emit('input', this.condition)
    this.$emit('change', this.condition)
  },
  methods: {
    onChangeTime(value) {
      if (this.isValidTime(value)) {
        this.lastTimeValues = value
      }
      this.timeValues = value
      this.$emit('input', this.condition)
      this.$emit('change', this.condition)
    },
    onChangeTimeOk(value) {
      if (!this.isValidTime(value)) {
        return
      }
      this.lastTimeValues = value
      this.timeValues = value
      this.$emit('input', this.condition)
      this.$emit('change', this.condition)
    },
    onOpenChange(open) {
      if (!open && !this.isValidTime(this.timeValues)) {
        this.$message.warning(this.warning)
        this.timeValues = this.lastTimeValues
        this.$emit('input', this.condition)
        this.$emit('change', this.condition)
        return
      }
    },
    isValidTime(value) {
      if(!this.disabledType){
        return true
      }
      const [ beginTime, endTime ] = value
      if(!beginTime || !endTime){
        return false
      }
      return (
        (this.disabledType == '2day' && endTime.clone().subtract(2, 'days') <= beginTime) ||
        (this.disabledType == '31day' && endTime.clone().subtract(31, 'days') <= beginTime) ||
        (this.disabledType == '1month' && endTime.clone().subtract(1, 'months') <= beginTime)
      )
    },
  },
  computed: {
    otherAttrs() {
      return this.showTime
        ? {
            format: 'YYYY-MM-DD HH:mm:ss',
            showTime: {
              format: 'HH:mm:ss',
              defaultValue: [moment().startOf('day'), moment().endOf('day')],
            },
          }
        : { format: 'YYYY-MM-DD' }
    },
    condition() {
      return [this.timeValues[0], this.timeValues[1]]
    },
    warning() {
      switch (this.disabledType) {
        case '2day':
          return '查询时间跨度不能超过48小时'
        case '31day':
          return '查询时间跨度不能超过31天'
        case '1month':
          return '只能查询时间跨度1个月以内的数据'
      }
      return ''
    },
  },
  watch: {
    value(val) {
      const [ beginTime, endTime ] = val
      this.timeValues = [beginTime, endTime]
    },
  },
}
</script>
<style lang="less" scoped>
</style>