// 层级表格

export default {
	data() {
		return {
			tableLists: [{}],
			levels: []
		}
	},
	methods: {
		showChildren(same, level, opened, params) {
			const tableIndex = level - 1
			if ((same && opened) || (this.hasSearch && opened)) {
				this.tableLists[tableIndex].opened = false
				this.tableLists = this.tableLists.slice(0, tableIndex + 1)
				this.levels = this.levels.slice(0, tableIndex)
			} else if (!opened) {
				if (level === 1) this.hasSearch = false
				this.tableLists[tableIndex].opened = true
				this.tableLists[tableIndex].iconLoading = true
				this.tableLists[tableIndex].currentAgentId = params.agentId
				this.tableLists[tableIndex].currentType = params.accountType
				this.modifyData(level + 1, params, tableIndex)
			} else {
				this.tableLists = this.tableLists.slice(0, tableIndex + 1)
				this.tableLists[tableIndex].iconLoading = true
				this.tableLists[tableIndex].currentAgentId = params.agentId
				this.tableLists[tableIndex].currentType = params.accountType
				this.levels = this.levels.slice(0, tableIndex)
				this.modifyData(level + 1, params, tableIndex)
			}
		},
		/**
		 * actType 1为增加 2为修改
		 */
		mixinModifyData(level, params, tableIndex, actType, api, extraParams = {}) {
			if (actType !== 2) {
				this.levels.push({
					level,
					name: params.agentName
				})
			} else {
				this.tableLists.splice(tableIndex, 1, {
					...this.tableLists[tableIndex],
					loading: true
				})
			}

			const newParams = {
				pageSize: params.pageSize,
				pageIndex: params.pageIndex,
				type: 2,
				...extraParams
			}
			this.$api[api](newParams)
				.then((_) => {
					if (_.code === 200) {
						const data = _.data
						const total = data.totalRecord
						const list = data.record
						if (actType !== 2) {
							const modifyData = {
								level,
								total,
								parentName: params.agentName,
								parentId: params.agentId,
								accountType: params.accountType,
								levels: [...this.levels],
								opened: false,
								data: list
							}
							this.tableLists.splice(tableIndex, 1, {
								...this.tableLists[tableIndex],
								iconLoading: false
							})
							this.tableLists.push(modifyData)
							this.scrollToBottom()
						} else {
							const modifyData = {
								...this.tableLists[tableIndex],
								total,
								data: list,
								loading: false
							}
							this.tableLists.splice(tableIndex, 1, modifyData)
						}
					}
				})
				.catch(() => {
					if (actType !== 2) {
						this.tableLists.splice(tableIndex, 1, {
							...this.tableLists[tableIndex],
							iconLoading: false
						})
					} else {
						this.tableLists.splice(tableIndex, 1, {
							...this.tableLists[tableIndex],
							loading: false
						})
					}
				})
		},
		scrollToBottom() {
			this.$nextTick(() => {
				const elm = document.querySelector('.game-container')
				const h = elm && elm.getBoundingClientRect().height
				window && window.scrollTo(0, h + 100)
			})
		},
		mixinHandleSearch(api, extraParams) {
			this.levels = []
			this.hasSearch = true
			this.pageIndex = 1
			this.tableLists = []
			this.$api
				.reportSearch({
					searchAgentId: this.form.agentId
				})
				.then((res) => {
					if (res.code === 200) {
						const parentPath = res.data.parentPath || ''
						const ids = parentPath.split('/') || []
						const finalIds = ids.filter((val) => val) // 过滤掉空值
						Promise.all(
							finalIds.map((val, index) => {
								return this.getDataInturn(val, index + 1, api, extraParams)
							})
						).then((result) => {
							const lists = result || []
							const levels = []
							lists.forEach((element, index) => {
								if (index !== 0) {
									levels.push({
										level: element.level,
										name: lists[index - 1].data[0] && lists[index - 1].data[0].agentName
									})
									element.levels = [...levels]
								}
							})
							this.levels = levels
							lists.forEach((element, index) => {
								if (!lists[index + 1]) {
									element.opened = false
								}
							})
							this.tableLists = lists
						})
					}
				})
		},
		// 依次调用，得到结果
		getDataInturn(id, level, api, extraParams) {
			const params = {
				pageSize: 10,
				pageIndex: 1,
				searchAgentId: id,
				agentId: id,
				type: 1,
				...extraParams
			}
			return new Promise((resolve, reject) => {
				this.$api[api](params).then((res) => {
					if (res.code === 200) {
						const list = res.data.record
						const total = res.data.totalRecord
						const data = {
							level,
							total,
							opened: true,
							iconLoading: false,
							currentAgentId: id,
							data: list
						}
						resolve(data)
					} else {
						reject(res)
					}
				})
			})
		}
	}
}
