<template>
	<div class="game-container report-container gameCreatePage-container">
		<div class="gameCreatePage-content">
			<div class="form-header">
				<span>页签创建</span>
				<span>
					<el-button type="info">返回</el-button>
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
							minlength="4"
							maxlength="11"
							oninput="value=value.replace(/(^\s*)|(\s*$)/g ,'')"
							placeholder="请输入"
							clearable
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item label="分类顺序:">
						<el-input
							v-model="queryData.hotSearch"
							size="medium"
							minlength="4"
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
							minlength="4"
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
				<div class="part-title">
					<span class="hotConfig">热门搜索配置</span>
				</div>
				<div class="content">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import Sortable from 'sortablejs'

export default {
	name: 'CreatePage',
	mixins: [list],
	data() {
		return {
			loading: false,
			queryData: {
				historyGameLimit: undefined,
				hotSearch: undefined,
				supportTerminal: undefined,
                clientDisplay: undefined
			},
			dataList: []
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

		for (let i = 0; i < 5; i++) {
			this.dataList[i] = {
				bankCode: '165416416464654',
				bankName: '中国银行',
				createDt: '2021-02-13 20:28:54',
				updateDt: '2021-02-13 20:28:54',
				vipSerialNum: '115',
				id: i + 100
			}
		}

		this.columnDrop()
	},
	updated() {
		console.log('新表格数据', this.dataList)
	},
	methods: {
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
		},

		// 列拖动
		columnDrop() {
			console.log('旧数据', this.dataList)
			const wrapperTr = document.querySelector('.el-table__body-wrapper tbody')
			const _this = this
			this.sortable = Sortable.create(wrapperTr, {
				animation: 180,
				delay: 0,
				onEnd: ({ newIndex, oldIndex }) => {
					const currRow = _this.dataList.splice(oldIndex, 1)[0]
					_this.dataList.splice(newIndex, 0, currRow)
				}
			})
		}
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
	background-color: #f7f7f7;
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
			.hotConfig {
				color: rgba(0, 0, 0, 0.847058823529412);
				font-size: 14px;
				font-weight: 650;
				display: inline-block;
				margin-right: 50px;
			}
		}
	}
}
</style>
