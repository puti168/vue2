export default {
	data() {
		const validatePassword = (rule, value, callback) => {
			if (value.length < 6) {
				callback(new Error('密码不能少于6位'))
			} else {
				callback()
			}
		}

		const validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请填写密码'))
			} else {
				if (this.form.rePwd !== '') {
					this.$refs.form.validateField('rePwd')
				}
				callback()
			}
		}
		const validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次填写密码'))
			} else if (value !== this.form.pwd) {
				callback(new Error('密码不匹配'))
			} else {
				callback()
			}
		}

		return {
			rules: {
				password: [
					{ type: 'number', message: '请填写数字' },
					{ required: true, trigger: 'blur', validator: validatePassword },
					{ required: true, validator: validatePass, trigger: 'blur' }
				],
				checkPass: [
					{ type: 'number', message: '请填写数字' },
					{ required: true, trigger: 'blur', validator: validatePassword },
					{ required: true, validator: validatePass2, trigger: 'blur' }
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
			this.pageNum = params.pageNum ? params.pageNum : this.pageNum
			return Object.assign({
				pageNum: this.pageNum,
				pageSize: this.pageSize,
				...params
			})
		},
		/**
		 * 加载更多
		 */
		loadMore() {
			this.pageNum++
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
		}
	}
}
