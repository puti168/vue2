import dayjs from 'dayjs'
import { shortcuts, shortcutsNoToday, shortcutsM } from '@/utils/consts'
import { formatCurrency } from '@/utils'
import Copy from '@/components/Copy/copy'
import { mapGetters } from 'vuex'

export default {
	components: { Copy },
	data() {
		return {
			list: [],
			total: 0,
			loading: false,
			pageNum: 1,
			pageSize: 10,
			pageSizes: [10, 20, 50],
			layout: 'total, sizes, prev, pager, next, jumper',
			defaultTime: ['00:00:00', '23:59:59'],
			sortable: true
		}
	},
	computed: {
		...mapGetters(['globalDics']),
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
		pickerOptionsM() {
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
				shortcuts: shortcutsM
			}
		},
		pickerOptionsNoToday() {
			const _this = this
			return {
				onPick({ maxDate, minDate }) {
					if (!maxDate) {
						_this.minDate = minDate
					}
				},
				shortcuts: shortcutsNoToday
			}
		},
		checkOrderParams() {
			const SortLine = new Map([
				['createDt', 'createDt'],
				['auditTime', 'auditTime'],
				['applyTime', 'applyTime'],
				['gameId', 'gameId'],
				['createdAt', 'createdAt'],
				['updatedAt', 'updatedAt'],
				['loginTime', 'loginTime'],
				['withdrawalTime', 'withdrawalTime'],
				['modifyDt', 'modifyDt']
			])
			return SortLine
		}
	},
	mounted() {
		const option = this.$options.doNotInit
		if (!option) {
			this.initList()
		}
	},
	watch: {
		page: 'loadData'
	},
	methods: {
		formatCurrency,
		getRowClass({ row, column, rowIndex, columnIndex }) {
			if (rowIndex === 0) {
				return 'background:#EFEFEF'
			} else {
				return ''
			}
		},
		typeFilter(val, type) {
			let name = ''
			this.globalDics[type].forEach((item) => {
				if (Number(item.code) === Number(val)) {
					name = item.description
				}
			})
			return name
		},
		/**
		 * 获取请求参数 默认只传递index(页码) pageSize(每页条数) 可以由调用方传递指定对象合并(或者覆盖)原参数
		 * @param params
		 * @returns {*}
		 */
		getParams(params) {
			return Object.assign(
				{
					pageNum: this.pageNum,
					pageSize: this.pageSize
				},
				params
			)
		},
		/**
		 * 初始化列表
		 */
		initList() {
			this.pageNum = 1
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
			this.pageNum = 1
			this.pageSize = value
			this.loadData()
		},
		handleCurrentChange(value) {
			this.pageNum = value
			this.loadData()
		},
		enterSearch(e) {
			const event = e || window.event
			const key = event.which || event.keyCode || event.charCode
			if (key === 13) {
				this.pageNum = 1
				this.loadData()
			}
		},
		search() {
			this.pageNum = 1
			this.loadData()
		},
		copy(e) {
			if (e) {
				this.$copyText(e).then(() => {
					this.$message({
						type: 'success',
						message: '复制成功'
					})
				})
			}
		},
		changeTableSort({ column, prop, order }) {
			this.pageNum = 1
			this.queryData.orderProperties = prop
			const orderParams = this.checkOrderParams.get(prop)
			if (orderParams) {
				if (order === 'ascending') {
					// 升序
					this.queryData.orderType = 'asc'
				} else if (column.order === 'descending') {
					// 降序
					this.queryData.orderType = 'desc'
				}
				this.loadData()
			}
		},
		filterChange(filters) {
			if (filters.type) {
				this.listQuery.type = filters.type[0]
			}
			this.loadData()
		}
	}
}
