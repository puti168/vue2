
import moment from 'moment'
export default {
    data() {
        return {
            pickerOptions: {
                disabledDate: this.disabledRangeMonthPicker,
            },
            maxMonth:0,
            maxDay:0
        }
    },
    methods: {
        /**
         * 禁止选择系统上线前的日期与禁止选择大于当前的日期
         * @param {*} current 
         */
        disabledRangePicker(current) {
            return current && (current < moment('2020-01-01', 'YYYY-MM-DD') || current > moment().add(this.maxDay, 'days').endOf('day'));
        },
        /**
         * 禁止选择系统上线前的月份与禁止选择大于当前的日期的月份
         * @param {*} current 
         */
        disabledRangeMonthPicker(time) {
            if (!time) {
                return false
            }
            let current = moment(time)
            return current && (current < moment('2020-01-31', 'YYYY-MM-DD').startOf('month') || current > moment().add(this.maxMonth, 'months').endOf('month'));
        },
        limitRangePicker([minDay, maxDay]) {
            const min = moment(minDay)
            const max = moment(maxDay)
            if (max.clone().subtract(1, 'months') < min && min.clone().add(1, 'months') > max) {
              return
            }
            this.$message.warning('日期跨度不能超过一个月')
            const lastDay = moment().add(-1, 'days')
            this.searchForm.days = [lastDay, lastDay]
            return false
          },
    }
}