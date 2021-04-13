export default {
	data() {
		return {
			list: [],
			currentPage: 1,
			limit: 10,
			total: 0,
			loading: false,
			pageIndex: 1,
			pageSize: 10,
			pageSizes: [10, 20, 50],
			layout: 'total, sizes, prev, pager, next, jumper',
			defaultTime: ['00:00:00', '23:59:59']
		}
	},
	computed: {
		pickerOptions() {
			return {
				onPick: (obj) => {
					if (!obj.maxDate) {
						const timeRange = 90 * 24 * 3600 * 1000
						this._minTime = obj.minDate.getTime() - timeRange
						this._maxTime = obj.minDate.getTime() + timeRange
					} else {
						this._minTime = this._maxTime = null
					}
				},
				disabledDate: (time) => {
					if (this._minTime && this._maxTime) {
						return (
							time.getTime() < this._minTime || time.getTime() > this._maxTime
						)
					}
				},
				shortcuts: [
					{
						// eslint-disable-next-line no-undef
						text: this.$t('placeholder.lastWeek'),
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
							picker.$emit('pick', [start, end])
						}
					},
					{
						// eslint-disable-next-line no-undef
						text: this.$t('placeholder.lastMonth'),
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
							picker.$emit('pick', [start, end])
						}
					},
					{
						// eslint-disable-next-line no-undef
						text: this.$t('placeholder.lastThreeMonths'),
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
							picker.$emit('pick', [start, end])
						}
					}
				]
			}
		}
	},
	created() {
		const option = this.$options.doNotInit
		if (!option) {
			this.initList()
		}
	},
	watch: {
		page: 'loadData'
	},
	methods: {
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
		getParams(params = {}) {
			this.pageIndex = params.pageIndex ? params.pageIndex : this.pageIndex
			return Object.assign({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				...params
			})
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
		handleSizeChange(pageSize) {
			this.pageSize = pageSize
			this.pageIndex = 1 // 重置分页数据
			this.initList()
			this.$nextTick(() => {
				this.loadData()
			})
		},
		handleCurrentChange(pageIndex) {
			this.pageIndex = pageIndex
			this.initList()
			this.$nextTick(() => {
				this.loadData()
			})
		},
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
			this.list = []
			this.loadData()
		},
		/**
		 * @overwrite
		 * 加载数据方法 用到该mixin的都应该重写该方法 否则无法实现加载数据
		 */
		loadData() {
			// 每个列表自己的获取数据的方法需要重写
		}
	}
}
