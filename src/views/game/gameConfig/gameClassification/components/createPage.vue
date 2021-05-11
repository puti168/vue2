<template>
	<div class="game-container report-container gameCreatePage-container">
		<div class="gameCreatePage-content">
			<div class="form-header">
				<span>页签创建</span>
				<span>
					<el-button type="info" @click="back">返回</el-button>
					<el-button type="success">保存</el-button>
				</span>
			</div>
			<div class="content-part2">
				<p class="part-title">分类名称</p>
				<el-form
					ref="form"
					:model="queryData"
					:inline="true"
					label-width="100px"
					class="form-content"
				>
					<el-form-item label="分类名称:">
						<el-input
							v-model="queryData.historyGameLimit"
							size="medium"
							maxlength="10"
							placeholder="请输入"
							clearable
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item label="分类顺序:">
						<el-input
							v-model="queryData.hotSearch"
							size="medium"
							maxlength="11"
							oninput="value=value.replace(/(^\s*)|(\s*$)/g ,'')"
							placeholder="请输入"
							clearable
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item label="支持终端:">
						<el-select
							v-model="queryData.supportTerminal"
							size="medium"
							placeholder="默认选择全部"
							clearable
							multiple
							style="width: 300px"
						>
							<el-option
								v-for="item in terminalTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="页签备注:">
						<el-input
							v-model="queryData.hotSearch"
							size="medium"
							maxlength="11"
							oninput="value=value.replace(/(^\s*)|(\s*$)/g ,'')"
							placeholder="请输入"
							clearable
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item
						label="客户端分类显示:"
						label-width="130px"
						prop="clientDisplay"
					>
						<el-select
							v-model="queryData.clientDisplay"
							size="medium"
							placeholder="全部"
							clearable
							style="width: 180px"
						>
							<el-option
								v-for="item in gameDisplayArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<div class="content-part3">
				<div class="content">
					<p class="hotConfig">分类包含游戏</p>
					<div class="demo">
						<Transfer
							id="transfer"
							ref="transfer"
							v-model="value"
							filterable
							:data="data"
							:filter-method="filterMethod"
							:target-order="'push'"
							:titles="['已包含', '游戏平台']"
							:props="{ key: 'id', label: 'label', status: 'status' }"
							:left-default-checked="hasCheckedWHLeftData"
							:right-default-checked="hasCheckedWHRightData"
							@left-check-change="handleWHLeftChange"
							@right-check-change="handleWHRightChange"
						></Transfer>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
// import Sortable from 'sortablejs'
import Transfer from '@/components/transfer'

const generateData = () => {
	const data = []
	for (let i = 1; i <= 30; i++) {
		data.push({
			id: i,
			label: `斗地主`,
            status: '维护中'
		})
	}
	return data
}

export default {
	name: 'CreatePage',
	components: { Transfer },
	mixins: [list],
	data() {
		return {
			filterMethod(query, item) {
				const regStr = query.replace(/\*/g, '.*')
				const reg = new RegExp(regStr)
				return reg.test(item.label)
			},
			loading: false,
			queryData: {
				historyGameLimit: undefined,
				hotSearch: undefined,
				supportTerminal: undefined,
				clientDisplay: undefined
			},
			dataList: [],
			data: generateData(),
			value: [4, 2, 1],
			shiftKey: false,
			firstWHLeftLocation: -1, // 数据左边起始值
			lastWHLeftLocation: -1, // 数据左边终止值
			hasCheckedWHLeftData: [], // 数据左边选中的数据
			firstWHRightLocation: -1, // 数据右边起始值
			lastWHRightLocation: -1, // 数据右边终止值
			hasCheckedWHRightData: [] // 数据右边选中的数据
		}
	},
	computed: {
		terminalTypeArr() {
			return [...this.globalDics.terminalnType]
		},
		gameDisplayArr() {
			return [...this.globalDics.gameDisplayType]
		}
	},
	mounted() {
		document.body.ondrop = function(event) {
			event.preventDefault()
			event.stopPropagation()
		}

		window.addEventListener('keydown', (e) => {
			if (e.keyCode === 16 && e.shiftKey) {
				this.shiftKey = true
			}
		})
		window.addEventListener('keyup', (e) => {
			this.shiftKey = false
		})
		// const el = document
		// 	.querySelector('.el-transfer')
		// 	.querySelectorAll('.el-checkbox-group')[1]
		// new Sortable(el, {
		// 	forceFallback: false,
		// 	onUpdate: (event) => {
		// 		const box = this.$el
		// 			.querySelector('.el-transfer')
		// 			.querySelectorAll('.el-checkbox-group')[1]
		// 		const nums = this.$el
		// 			.querySelector('.el-transfer')
		// 			.querySelectorAll('.el-checkbox-group')[1].childNodes.length
		// 		console.log(nums, event.newIndex)
		// 		if (event.newIndex >= nums) {
		// 			return
		// 		}
		// 		const newIndex = event.newIndex
		// 		const oldIndex = event.oldIndex
		// 		const $label = box.children[newIndex]
		// 		const $oldLabel = box.children[oldIndex]
		// 		box.removeChild($label)
		// 		if (newIndex < oldIndex) {
		// 			box.insertBefore($label, $oldLabel)
		// 		} else {
		// 			box.insertBefore($label, $oldLabel.nextSibling)
		// 		}
		// 		const item = this.value.splice(oldIndex, 1)
		// 		this.value.splice(newIndex, 0, item[0])
		// 	}
		// })
	},
	updated() {
		// console.log('新表格数据', this.dataList)
	},
	methods: {
	    back() {
	        this.$emit('back')
        },
		handleWHLeftChange(key, key1) {
			const _this = this
			console.log(_this.hasCheckedWHLeftData)
			_this.hasCheckedWHLeftData = _this.commonChangeFuc(
				key,
				key1,
				_this.hasCheckedWHLeftData,
				_this.firstWHLeftLocation,
				_this.lastWHLeftLocation,
				_this.data,
				'id'
			)
			console.log(_this.hasCheckedWHLeftData)
		},
		handleWHRightChange(key, key1) {
			var _this = this
			console.log(_this.hasCheckedWHRightData)
			_this.hasCheckedWHRightData = _this.commonChangeFuc(
				key,
				key1,
				_this.hasCheckedWHRightData,
				_this.firstWHRightLocation,
				_this.lastWHRightLocation,
				_this.value,
				false
			)
			console.log(_this.hasCheckedWHRightData)
		},
		commonChangeFuc(
			key,
			key1,
			hasCheckedData,
			firstLocation,
			lastLocation,
			arrList,
			value
		) {
			let k
			const _this = this
			let cFlag = false // 取消勾选
			// debugger
			for (var i = 0; i < key.length; i++) {
				if (key[i] === key1[0]) {
					cFlag = true // 选中
				}
			}
			if (cFlag) {
				if (key.length === 1) {
					firstLocation = 0
					hasCheckedData.push(key[0])
				} else if (key.length > 1) {
					// eslint-disable-next-line no-unused-vars
					const arr = []
					// 当前有选中数据 并且 按住shift
					if (_this.shiftKey) {
						// if (isRight) {
						for (let i = 0; i < arrList.length; i++) {
							const item = value ? arrList[i][value] : arrList[i]
							if (item === key[key.length - 2]) {
								firstLocation = i
							}
							if (item === key1[0]) {
								lastLocation = i
							}
						}
						if (firstLocation !== -1 && lastLocation !== -1) {
							if (firstLocation < lastLocation) {
								for (k = 0; k < arrList.length; k++) {
									const item = value ? arrList[k][value] : arrList[k]

									if (k >= firstLocation && k <= lastLocation) {
										hasCheckedData.push(item)
									}
								}
							} else if (firstLocation > lastLocation) {
								for (k = 0; k < arrList.length; k++) {
									if (k >= lastLocation && k <= firstLocation) {
										// eslint-disable-next-line no-undef
										hasCheckedData.push(item)
									}
								}
							}
						}
					} else {
						// 不再按shift
						hasCheckedData.push(key1[0])
					}
				}
			} else {
				// 取消选中的
				hasCheckedData = []
				for (let i = 0; i < key.length; i++) {
					if (key[i] !== key1[0]) {
						hasCheckedData.push(key[i])
					}
				}
			}
			// 去重
			hasCheckedData = new Set(hasCheckedData)
			hasCheckedData = Array.from(hasCheckedData)
			return hasCheckedData
		},
		add() {
			this.loading = true
			const params = {
				...this.form
			}
			this.$refs['form'].validate((valid) => {
				console.log('valid', valid)
				if (valid) {
					this.$api
						.addMemberAPI(params)
						.then((res) => {
							this.loading = false
							const { code, data, msg } = res
							if (code === 200) {
								this.$confirm(`会员${data}资料提交成功`, {
									confirmButtonText: '确定',
									type: 'success',
									showCancelButton: false
								})
								this.reset()
							} else {
								this.$message({
									message: msg,
									type: 'error'
								})
							}
						})
						.catch(() => {
							this.loading = false
						})
				}
			})

			setTimeout(() => {
				this.loading = false
			}, 1000)
		},
		reset() {
			this.$refs['form'].resetFields()
			this.form = {
				historyGameLimit: undefined,
				hotSearch: undefined
			}
		},
		checkValue(val) {},
		addRow() {
			const lastRow = this.dataList[this.dataList.length - 1]
			const new_row = lastRow.id + 1
			this.dataList.push({ id: new_row })
		},
		deleteRow(val) {
			this.$confirm('确定删除此游戏吗?', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					// const loading = this.$loading({
					// 	lock: true,
					// 	text: 'Loading',
					// 	spinner: 'el-icon-loading',
					// 	background: 'rgba(0, 0, 0, 0.7)'
					// })
					// this.$api
					// 	.setDeleteRole('', val.id)
					// 	.then((res) => {
					// 		loading.close()
					// 		this.$message({
					// 			type: 'success',
					// 			message: '删除成功!'
					// 		})
					// 		this.loadData()
					// 	})
					// 	.catch(() => {
					// 		loading.close()
					// 	})
				})
				.catch(() => {})
		}

		// 列拖动
		// columnDrop() {
		// 	console.log('旧数据', this.dataList)
		// 	const wrapperTr = document.querySelector('.el-table__body-wrapper tbody')
		// 	const _this = this
		// 	this.sortable = Sortable.create(wrapperTr, {
		// 		animation: 180,
		// 		delay: 0,
		// 		onEnd: ({ newIndex, oldIndex }) => {
		// 			const currRow = _this.dataList.splice(oldIndex, 1)[0]
		// 			_this.dataList.splice(newIndex, 0, currRow)
		// 		}
		// 	})
		// }
	}
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
	text-align: center;
	color: #909399;
	font-weight: 700;
}
/deep/ .el-button--info {
	background-color: #fff;
	color: rgba(0, 0, 0, 0.64);
}
/deep/ .el-button--info:hover {
	background-color: #eeeded;
}
/deep/ .el-transfer__buttons {
	/deep/ button {
		display: block;
		margin: 0;
		&:first-child {
			margin-bottom: 12px;
		}
	}
}
.demo {
	text-align: left;
    height: 450px;
}
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
	text-align: left;
	width: 300px;
	height: 300px;
	background-color: #42b983;
	overflow: scroll;
}
li {
	display: block;
	margin: 20px 10px;
	border: 1px solid #444;
}
a {
	color: #42b983;
}
.gameCreatePage-container {
	background-color: #f5f5f5;
	margin: 0;
	min-height: calc(100vh - 105px);
	.gameCreatePage-content {
		width: 70%;
		margin: 0 auto;
		background-color: #fff;
		position: relative;
		padding-bottom: 30px;
		.form-header {
			height: 55px;
			line-height: 55px;
			width: 100%;
			background-color: rgba(0, 0, 0, 1);
			span:nth-child(1) {
				position: absolute;
				left: 30px;
				top: 0;
				color: rgba(255, 255, 255, 0.847058823529412);
				font-size: 16px;
				font-weight: 700;
			}
			span:nth-child(2) {
				position: absolute;
				right: 30px;
				top: 0;
				color: #999;
				font-weight: 400;
				font-size: 14px;
			}
		}
		.form-header:after {
			content: '.';
			height: 0;
			display: table;
			clear: both;
		}
		.content-part2 {
			width: 100%;
			padding: 25px 35px 20px;
			position: relative;
			.part-title {
				color: rgba(0, 0, 0, 0.847058823529412);
				font-size: 14px;
				font-weight: 650;
			}
			.form-content {
				margin-top: 20px;
			}
		}
		.content-part2::after {
			position: absolute;
			content: '';
			width: 100%;
			background-color: rgba(233, 233, 233, 1);
			height: 1px;
			left: 0;
			bottom: 0;
		}
		.content-part3 {
			width: 100%;
			padding: 25px 35px 20px;
			.content {
				margin: 0 auto;
				width: 100%;
				padding-left: 100px;
                padding-bottom: 50px;
				.hotConfig {
					color: rgba(0, 0, 0, 0.847058823529412);
					font-size: 14px;
					font-weight: 650;
					display: inline-block;
					margin-right: 50px;
					margin-bottom: 10px;
				}
			}
		}
	}
}
</style>
