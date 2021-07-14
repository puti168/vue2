<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="风控类型:">
						<el-select
							v-model="queryData.windControlType"
							size="medium"
							placeholder="默认选择全部"
							clearable
							style="width: 180px"
							@change="getMerchantDict($event)"
						>
							<el-option
								v-for="item in windLevelTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="风控层级:">
						<el-select
							v-model="queryData.windControlLevelName"
							size="medium"
							placeholder="默认选择全部"
							clearable
							multiple
							:maxlength="10"
							style="width: 300px"
						>
							<el-option label="全部" value="all"></el-option>
							<el-option
								v-for="item in vipDict"
								:key="item.id"
								:label="item.windControlLevelName"
								:value="item.windControlLevelName"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="创建人:" prop="createBy">
						<el-input
							v-model="queryData.createdBy"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
							maxlength="15"
						></el-input>
					</el-form-item>
					<el-form-item label="最近操作人:" prop="updatedBy">
						<el-input
							v-model="queryData.updatedBy"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
							maxlength="15"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							icon="el-icon-search"
							:disabled="loading"
							size="medium"
							@click="search"
						>
							查询
						</el-button>
						<el-button
							icon="el-icon-refresh-left"
							:disabled="loading"
							size="medium"
							@click="reset"
						>
							重置
						</el-button>
						<el-button
							v-if="hasPermission('338')"
							type="warning"
							icon="el-icon-folder"
							:disabled="loading"
							size="medium"
							@click="addLabel"
						>
							创建
						</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="content">
				<el-table
					v-loading="loading"
					border
					size="mini"
					class="small-size-table"
					:data="tableData"
					style="width: 100%"
					:header-cell-style="getRowClass"
					@sort-change="_changeTableSort"
				>
					<el-table-column
						prop="windControlType"
						align="center"
						label="风控类型"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.windControlType">
								{{ typeFilter(scope.row.windControlType, 'windLevelType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="windControlLevelName"
						align="center"
						label="风控层级"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.windControlLevelName">
								{{ scope.row.windControlLevelName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="miaoShu" align="center" label="风控层级描述">
						<template slot-scope="scope">
							<span v-if="!!scope.row.description">
								{{ scope.row.description }}
							</span>
							<span v-else>-</span>
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
						sortable="custom"
						width="160px"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.createdAt">
								{{ scope.row.createdAt }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="updatedBy" align="center" label="最近操作人">
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
						label="最近操作时间"
						sortable="custom"
						width="160px"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.updatedAt">
								{{ scope.row.updatedAt }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="operating"
						align="center"
						label="操作"
						width="240px"
					>
						<template slot-scope="scope">
							<el-button
								v-if="hasPermission('339')"
								type="primary"
								icon="el-icon-edit"
								:disabled="loading"
								size="medium"
								@click="edit(scope.row)"
							>
								编辑信息
							</el-button>

							<el-button
								v-if="hasPermission('340')"
								type="danger"
								icon="el-icon-delete"
								:disabled="loading"
								size="medium"
								@click="deleteLabel(scope.row)"
							>
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					:total="total"
					:current-page.sync="pageNum"
					class="pageValue"
					background
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageSize"
					:page-sizes="pageSizes"
					@current-change="handleCurrentChange"
					@size-change="handleSizeChange"
				></el-pagination>
			</div>
			<el-dialog
				:title="title"
				:visible.sync="dialogFormVisible"
				:destroy-on-close="true"
				width="520px"
				class="rempadding"
				@close="clear"
			>
				<el-divider></el-divider>
				<el-form
					ref="formSub"
					:model="dialogForm"
					label-width="120px"
					:rules="rules"
				>
					<el-form-item label="风控类型:" prop="windControlType">
						<el-select
							v-model="dialogForm.windControlType"
							size="medium"
							placeholder="默认选择全部"
							clearable
							:disabled="title === '编辑'"
							style="width: 330px"
							@change="getMerchantDict($event)"
						>
							<el-option
								v-for="item in windLevelTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="风控层级:" prop="windControlLevelName">
						<el-input
							v-model="dialogForm.windControlLevelName"
							:maxlength="10"
							autocomplete="off"
							style="width: 330px"
							placeholder="请输入"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="风控描述信息:" prop="description">
						<el-input
							v-model="dialogForm.description"
							type="textarea"
							style="width: 330px"
							:maxlength="50"
							show-word-limit
						></el-input>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button type="primary" @click="subAddOrEdit">保存</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
// import { isHaveEmoji, notSpecial2 } from '@/utils/validate'

export default {
	name: routerNames.createRiskRank,
	components: {},
	mixins: [list],
	data() {
		return {
			queryData: {
				windControlType: undefined,
				windControlLevelName: ['all'],
				createdBy: undefined,
				updatedBy: undefined
			},
			tableData: [],
			dialogFormVisible: false,
			dialogForm: {
				windControlType: '1',
				windControlLevelName: undefined,
				description: undefined
			},
			total: 0,
			title: '',
			vipDict: []
		}
	},
	computed: {
		windLevelTypeArr() {
			return this.globalDics.windLevelType
		},
		rules() {
			return {
				windControlType: [
					{ required: true, message: '请选择风控类型', trigger: 'change' }
				],
				windControlLevelName: [
					{ required: true, message: '请填入风控层级', trigger: 'blur' },
					{ min: 2, max: 10, message: '请填入风控层级', trigger: 'blur' }
				],
				description: [
					{ required: true, message: '请填入风控层级描述', trigger: 'blur' },
					{ min: 2, max: 50, message: '请填入风控层级描述', trigger: 'blur' }
				]
			}
		},
		windControlLevelName() {
			return this.queryData.windControlLevelName
		}
	},
	watch: {
		windControlLevelName(newVal, oldVal) {
			const newIdx = newVal.indexOf('all')
			const oldIdx = oldVal.indexOf('all')
			if (newIdx !== -1 && oldIdx === -1 && newVal.length > 1) {
				this.queryData.windControlLevelName = ['all']
			} else if (newIdx !== -1 && oldIdx !== -1 && newVal.length > 1) {
				this.queryData.windControlLevelName.splice(newVal.indexOf('all'), 1)
			}
		}
	},
	mounted() {
		// this.getMerchantDict('')
	},
	methods: {
		loadData() {
			this.loading = true
			let params = {
				...this.queryData
			}
			params = {
				...this.getParams(params)
			}
			// const idx = params.windControlLevelName.findIndex(
			// 	(item) => item === 'all'
			// )
			// params.windControlLevelName.splice(idx, 1)
			params.windControlLevelName =
				params.windControlLevelName &&
				params.windControlLevelName.length &&
				params.windControlLevelName[0] !== 'all'
					? params.windControlLevelName
					: undefined
			params.createdBy = params.createdBy ? params.createdBy : undefined
			params.updatedBy = params.updatedBy ? params.updatedBy : undefined
			this.$api
				.riskRankListAPI(params)
				.then((res) => {
					const { code, data } = res
					if (code === 200) {
						this.tableData = data.record
						this.total = data.totalRecord
						this.loading = false
					} else {
						this.loading = false
					}
				})
				.catch(() => {
					this.loading = false
				})

			setTimeout(() => {
				this.loading = false
			}, 1000)
		},
		reset() {
			this.pageNum = 1
			this.$refs['form'].resetFields()
			this.queryData = {
				windControlType: undefined,
				windControlLevelName: ['all'],
				createdBy: undefined,
				updatedBy: undefined
			}
			this.loadData()
		},
		switchClick(val) {
			const status = val.labelStatus === 0 ? 1 : 0
			console.log(val)
			this.$confirm(
				`<strong>是否对 ${val.gameLabelName} 进行${
					val.labelStatus === 1 ? '启用' : '禁用'
				}操作?</strong></br><span style='font-size:12px;color:#c1c1c1'>一旦操作将会立即生效</span>`,
				`确认提示`,
				{
					dangerouslyUseHTMLString: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			)
				.then(() => {
					this.$api
						.setUpdateStatus({ id: val.id, status: status })
						.then((res) => {
							if (res.code === 200) {
								this.loadData()
							}
						})
				})
				.catch(() => {})
		},
		addLabel() {
			this.dialogFormVisible = true
            this.$refs['form'].resetFields()
			this.title = '新增'
			this.dialogForm = {
				windControlType: '1',
				windControlLevelName: undefined,
				info: undefined
			}
		},
		edit(val) {
			this.title = '编辑'
			val.windControlType = val.windControlType + ''
			this.dialogForm = { ...val }
			this.dialogFormVisible = true
		},
		deleteLabel(val) {
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			const { id } = val
			this.$confirm(`<strong>确定删除此条配置?</strong>`, `确认提示`, {
				dangerouslyUseHTMLString: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$api
						.deleteRiskRankAPI({ id })
						.then((res) => {
							loading.close()
							const { code } = res
							if (code === 200) {
								this.$message.success('删除成功')
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
						})
				})
				.catch(() => {
					loading.close()
				})

			setTimeout(() => {
				loading.close()
			}, 1000)
		},
		subAddOrEdit() {
			const params = {
				...this.dialogForm
			}
			const handleClick =
				this.title !== '编辑'
					? this.$api.createRiskRankAPI
					: this.$api.updateRiskRankAPI
			this.$refs.formSub.validate((valid) => {
				if (valid) {
					handleClick(params).then((res) => {
						const { code, msg } = res
						if (code === 200) {
							this.$message({
								message: `${this.title !== '编辑' ? '新增' : '更新'}成功`,
								type: 'success'
							})
							this.reset()
						} else {
							this.$message({
								message: msg,
								type: 'error'
							})
						}
					})
					this.dialogFormVisible = false
				}
			})
		},
		checkValue(e) {
			const { value } = e.target
			this.queryData.gameLabelId = value
			console.log(value)
		},
		_changeTableSort({ column, prop, order }) {
			if (prop === 'createdAt') {
				prop = 1
			}
			if (prop === 'updatedAt') {
				prop = 2
			}
			this.queryData.orderKey = prop
			if (order === 'ascending') {
				// 升序
				this.queryData.orderType = 'asc'
			} else if (column.order === 'descending') {
				// 降序
				this.queryData.orderType = 'desc'
			}
			this.loadData()
		},
		clear() {
			this.$refs.formSub.resetFields()
		},
		// 获取风控层级
		getMerchantDict(val) {
			this.queryData.windControlLevelName = []

			this.$api
				.getSelectWindControlLevel({
					windControlType: val * 1
				})
				.then((res) => {
					const { code, data, msg } = res
					if (code === 200) {
						this.vipDict = data || []
					} else {
						this.$message({
							message: msg,
							type: 'error'
						})
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
/deep/ .tagheight .el-tag {
	height: 24px;
	line-height: 24px;
	min-width: 60px;
}
/deep/ .rempadding .el-dialog__body {
	padding: 0;
	padding-bottom: 30px;

	.contentBox,
	form {
		padding: 0 20px;
	}
}
/deep/.el-input-number__decrease,
/deep/.el-input-number__increase {
	display: none;
}
/deep/.el-input-number--medium .el-input__inner {
	padding: 0 15px;
	text-align: left;
}

.decoration {
	text-decoration: underline;
	cursor: pointer;
}
.bodyBox {
	max-height: 400px;
	overflow: auto;
}
p {
	display: flex;
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #e8e8e8;
	justify-content: space-around;
	span {
		display: inline-block;
		width: 50%;
		text-align: center;
	}
}
.headerBox {
	color: #000000d8;
	background: #fafafa;
	font-family: 'PingFang SC ', 'PingFang SC', sans-serif;
	font-weight: 650;
	border-top: 1px solid #e8e8e8;
	margin-top: 15px;
}
</style>
