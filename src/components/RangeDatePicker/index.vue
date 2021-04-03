<template>
  <a-space :size="90">
    <a-radio-group v-model="dateRangeType" @change="changeDateRangeType">
      <a-radio-button value="now"> 今天 </a-radio-button>
      <a-radio-button value="yesterday"> 昨天 </a-radio-button>
      <a-radio-button value="week"> 本周 </a-radio-button>
      <a-radio-button value="lastWeek"> 上周 </a-radio-button>
      <a-radio-button value="month"> 本月 </a-radio-button>
      <a-radio-button value="lastMonth"> 上月 </a-radio-button>
    </a-radio-group>
    <a-range-picker
      :value="[startDate, endDate]"
      :disabled-date="disabledRangePicker"
      style="max-width: 225px"
      :format="dateFormat"
      :allowClear="false"
      @change="changeDateRange"
      ><a-icon slot="suffixIcon" type="calendar"
    /></a-range-picker>
  </a-space>
</template>

<script>
import moment from 'moment'
import { DatepickerMixin } from '@/core/mixins'

let now = moment()

export default {
  name: 'RangeDatePicker',
  mixins: [DatepickerMixin],
  props: {
    onDateChanged: {
      type: Function,
    },
    value: {
      type: Array,
    },
  },
  data() {
    return {
      startDate: now,
      endDate: now,
      dateRangeType: 'now',
      dateFormat: 'YYYY-MM-DD',
    }
  },
  methods: {
    setDay(interval = 0) {
      this.startDate = moment().add(interval, 'days')
      this.endDate = moment().add(interval, 'days')
    },
    setWeek(interval = 0) {
      this.startDate = moment()
        .add(interval * 7, 'days')
        .startOf('week')
      this.endDate = moment.min(
        moment()
          .add(interval * 7, 'days')
          .endOf('week'),
        moment()
      )
    },
    setMonth(interval = 0) {
      this.startDate = moment().add(interval, 'months').startOf('month')
      this.endDate = moment.min(moment().add(interval, 'months').endOf('month'), moment())
    },
    changeDateRangeType(e) {
      this.setDateRangeType(e.target.value)
    },
    setDateRangeType(type) {
      switch (type) {
        case 'now':
          this.setDay(0)
          break
        case 'yesterday':
          this.setDay(-1)
          break
        case 'week':
          this.setWeek(0)
          break
        case 'lastWeek':
          this.setWeek(-1)
          break
        case 'month':
          this.setMonth(0)
          break
        case 'lastMonth':
          this.setMonth(-1)
          break
      }
      this.dateRangeType = type
      this.onDateChanged(this.startDate, this.endDate)
    },
    changeDateRange(dates) {
      this.dateRangeType = 'other'
      this.startDate = dates[0]
      this.endDate = dates[1]
      this.onDateChanged(this.startDate, this.endDate)
    },
  },
  created() {
    if (this.value) {
      this.startDate = this.value[0]
      this.endDate = this.value[1]
    }
  },
}
</script>

<style lang="less" scoped>
</style>