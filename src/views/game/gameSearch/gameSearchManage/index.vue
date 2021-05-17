<template>
	<div class="game-container report-container gameSearch-container">
		<div class="gameSearch-content">
			<div class="form-header">
				<span>游戏搜索管理</span>
				<span>
					<el-button type="success">保存</el-button>
				</span>
			</div>
			<div class="content-part2">
				<p class="part-title">配置信息</p>
				<el-form
					ref="form"
					:model="queryData"
					:inline="true"
					label-width="100px"
					class="form-content"
				>
					<el-form-item label="历史游戏上限:">
						<el-input
							v-model="queryData.historyGameLimit"
							size="medium"
							minlength="4"
							maxlength="11"
							onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
							placeholder="请输入"
							clearable
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item label="热门搜索上限:">
						<el-input
							v-model="queryData.hotSearch"
							size="medium"
							minlength="4"
							maxlength="11"
							onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
							placeholder="请输入"
							clearable
							style="width: 180px"
						></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="content-part3">
				<div class="part-title">
					<span class="hotConfig">热门搜索配置</span>
					<el-button type="primary" @click="addRow">新增</el-button>
				</div>
				<div class="content">
					<el-table
						v-loading="loading"
						border
						size="mini"
						class="small-size-table"
						:data="dataList"
						style="width: 100%"
						:header-cell-style="getRowClass"
						row-key="id"
						:row-style="{ height: '45px' }"
						@sort-change="changeTableSort"
					>
						<el-table-column
							prop="userName"
							align="center"
							label="展示顺序"
							width="120px"
						>
							<template slot-scope="scope">
								<span v-if="!!scope.row.displayOrder">
									{{ scope.row.displayOrder }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="searchInfo"
							align="center"
							label="搜索词条信息"
							width="220px"
						>
							<template slot-scope="scope">
								<span>
									<el-input
										v-model="scope.row.searchInfo"
										size="medium"
										maxlength="20"
										placeholder="请输入"
										clearable
										style="width: 180px"
									></el-input>
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="createdBy" align="center" label="创建人">
							<template slot-scope="scope">
								<span v-if="!!scope.row.createdBy">
									{{ scope.row.createdBy }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="createdAt"
							align="center"
							label="创建时间"
							width="180px"
							:formatter="dateFormat"
						></el-table-column>
						<el-table-column prop="updatedBy" align="center" label="最新操作人">
							<template slot-scope="scope">
								<span v-if="!!scope.row.updatedBy">
									{{ scope.row.updatedBy }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="updatedAt"
							align="center"
							label="最新操作时间"
							width="180px"
							:formatter="dateFormat"
						></el-table-column>
						<el-table-column align="center" label="操作">
							<template slot-scope="scope">
								<el-button
									type="danger"
									icon="el-icon-edit"
									size="medium"
									@click="deleteRow(scope.row)"
								>
									删除
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<!-- 分页 -->
					<el-pagination
						v-show="!!total"
						:current-page.sync="pageNum"
						class="pageValue"
						background
						layout="total, sizes,prev, pager, next, jumper"
						:page-size="pageSize"
						:page-sizes="$store.getters.pageSizes"
						:total="total"
						@current-change="handleCurrentChange"
						@size-change="handleSizeChange"
					></el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { routerNames } from '@/utils/consts'
import list from '@/mixins/list'
import dayjs from 'dayjs'
import Sortable from 'sortablejs'
import { getUsername } from '@/utils/auth'

export default {
	name: routerNames.gameSearchManage,
	mixins: [list],
	data() {
		return {
			loading: false,
			queryData: {
				historyGameLimit: undefined,
				hotSearch: undefined
			},
			dataList: []
		}
	},
	computed: {},
	mounted() {
		document.body.ondrop = function(event) {
			event.preventDefault()
			event.stopPropagation()
		}
		this.columnDrop()
	},
	updated() {
		console.log('新表格数据', this.dataList)
	},
	methods: {
		loadData() {
			this.dataList = []
			this.loading = true
			let params = {
				...this.queryData
			}
			params = {
				...this.getParams(params)
			}

			this.$api
				.gameSearchListAPI(params)
				.then((res) => {
					const {
						code,
						data: { obSearchConfigList },
						msg
					} = res
					if (code === 200) {
						this.loading = false
						this.dataList = obSearchConfigList || []
					} else {
						this.loading = false
						this.$message({
							message: msg,
							type: 'error'
						})
					}
				})
				.catch(() => (this.loading = false))

			setTimeout(() => {
				this.loading = false
			}, 1000)
		},
		dateFormat(row, column, cellValue, index) {
			if (cellValue === undefined || cellValue === null) {
				return ''
			}
			return dayjs(cellValue).format('YY-MM-DD HH:mm')
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
			const displayOrder = lastRow.displayOrder + 1
			this.dataList.push({
				id: new_row,
				updatedBy: getUsername(),
				createdBy: getUsername(),
                createdAt: new Date(),
                updatedAt: new Date(),
                displayOrder,
                searchInfo: ''
			})
		},
		deleteRow(val) {
			const { id } = val
			this.$confirm('确定删除此游戏吗?', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					const loading = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					})
					this.$api
						.gameSearchDeleteAPI({ id })
						.then((res) => {
							loading.close()
							const { code } = res
							if (code === 200) {
								this.$message({
									type: 'success',
									message: '删除成功!'
								})
							} else {
								this.$message({
									type: 'error',
									message: '删除失败!'
								})
							}
							this.loadData()
						})
						.catch(() => {
							loading.close()
							this.$message({
								type: 'error',
								message: '删除失败!'
							})
						})
				})
				.catch(() => {})
		},

		// 列拖动
		columnDrop() {
			console.log('旧数据', this.dataList)
			const wrapperTr = document.querySelector('.el-table__body-wrapper tbody')
			const _this = this
			this.sortable =
				wrapperTr &&
				Sortable.create(wrapperTr, {
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

<style lang="scss">
/deep/.el-dialog__header {
	text-align: center;
	color: #909399;
	font-weight: 700;
}
.gameSearch-container {
	background-color: #f5f5f5;
	margin: 0;
	min-height: calc(100vh - 105px);
	.gameSearch-content {
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
				top: 14px;
				color: #999;
				font-weight: 400;
				font-size: 14px;
				height: 30px;
				line-height: 20px;
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
				margin-top: 40px;
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
