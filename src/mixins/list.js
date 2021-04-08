import dayjs from 'dayjs'
import { shortcuts } from '@/utils/consts'
import { formatCurrency } from '@/utils'

export default {
	data() {
		return {
			list: [],
			// 时间选择器格式
			dateType: 'daterange',
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			pageSizes: [5, 10, 20, 50, 100, 200, 500],
			layout: 'total, sizes, prev, pager, next, jumper',
			defaultTime: ['00:00:00', '23:59:59'],
			hadSearch: false,
			loading: false
		}
	},
	computed: {
		// pickerOptions 可以超90天
		pickerOptions() {
			const _this = this
			return {
				disabledDate(time) {
					const now = dayjs()
						.endOf('day')
						.valueOf()
					return time.getTime() > now
				},
				onPick({ maxDate, minDate }) {
					if (!maxDate) {
						_this.minDate = minDate
					}
				},
				shortcuts: shortcuts
			}
		},
		pickerOptions_no_90() {
			const _this = this
			return {
				disabledDate(time) {
					// 1.超过90天的查询时间，提示“起止时间不可超过90天”
					// 2.查询截至时间不可以超过当前时间
					// const before = dayjs(_this.minDate)
					// 	.subtract(90, 'days')
					// 	.valueOf()
					// const after = dayjs(_this.minDate)
					// 	.add(90, 'days')
					// 	.valueOf()
					const now = dayjs(
						dayjs()
							.add(1, 'd')
							.format('YYYY-MM-DD')
					).valueOf()
					// // 如果after-now大于0,说明选择时间在当前时间90天之前
					// if (after - now < 0) {
					// 	return time.getTime() > after || time.getTime() < before
					// } else {
					// 	return time.getTime() > now
					// }
					return time.getTime() > now
				},
				onPick({ maxDate, minDate }) {
					if (!maxDate) {
						_this.minDate = minDate
					}
				},
				shortcuts: shortcuts
			}
		}
	},
	created() {
		const option = this.$options.doNotInit
		if (!option) {
			this.initList()
		}
	},
	mounted() {},
	watch: {
		page: 'loadData'
	},
	methods: {
		formatCurrency,
		onSelectTimeFocus() {
			const dayNum = dayjs().date()
			const weekNum = dayjs().day()
			if (weekNum === 1) {
				const nodeLists = document.querySelectorAll('.el-picker-panel__shortcut')
				nodeLists &&
					nodeLists.forEach((val) => {
						if (val.textContent === '当周') {
							val.className = 'el-picker-panel__shortcut disabled-week'
							val.setAttribute('disabled', true)
						}
					})
			}
			if (dayNum === 1) {
				const nodeLists = document.querySelectorAll('.el-picker-panel__shortcut')
				nodeLists &&
					nodeLists.forEach((val) => {
						if (val.textContent === '当月') {
							val.className = 'el-picker-panel__shortcut disabled-week'
							val.setAttribute('disabled', true)
						}
					})
			}
		},
		getSummaries(param) {
			const { columns, data } = param
			const sums = []
			columns.forEach((column, index) => {
				if (index === 0) {
					sums[index] = '总价'
					return
				}
				const values = data.map((item) => Number(item[column.property]))
				if (!values.every((value) => isNaN(value))) {
					sums[index] = values.reduce((prev, curr) => {
						const value = Number(curr)
						if (!isNaN(value)) {
							return prev + curr
						} else {
							return prev
						}
					}, 0)
					sums[index] += ' 元'
				} else {
					sums[index] = 'N/A'
				}
			})

			return sums
		},
		getRowClass({ row, column, rowIndex, columnIndex }) {
			if (rowIndex === 0) {
				return 'background:#EFEFEF'
			} else {
				return ''
			}
		},
		/**
		 * 获取请求参数 默认只传递index(页码) pageSize(每页条数) 可以由调用方传递指定对象合并(或者覆盖)原参数
		 * @param params
		 * @returns {*}
		 */
		getParams(params) {
			return Object.assign(
				{
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				},
				params
			)
		},
		/**
		 * 加载更多
		 */
		loadMore() {
			this.pageIndex++
		},
		/**
		 * 推送到list中 因为vue的监听特性 只能用push进行数据的添加 如果有特殊处理 通过传递一个filter来过滤数据
		 * @param list
		 * @param filter
		 */
		pushToList(list, filter) {
			list.forEach((item) => {
				if (typeof filter === 'function') {
					this.list.push(filter(item))
				} else {
					this.list.push(item)
				}
			})
		},
		/**
		 * 初始化列表
		 */
		initList() {
			this.pageIndex = 1
			this.list = []
			this.loadData()
		},
		/**
		 * @overwrite
		 * 加载数据方法 用到该mixin的都应该重写该方法 否则无法实现加载数据
		 */
		loadData() {
			// 每个列表自己的获取数据的方法需要重写
		},
		// 改变列表条数
		handleSizeChange(value) {
			this.pageSize = value
			this.loadData()
		}
	}
}
