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
							style="width: 200px"
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
							collapse-tags
							:maxlength="10"
							style="width: 260px"
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
					<el-form-item label="创建人:">
						<el-input
							v-model="queryData.createdBy"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 200px"
							maxlength="15"
						></el-input>
					</el-form-item>
					<el-form-item label="最近操作人:">
						<el-input
							v-model="queryData.updatedBy"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 200px"
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
								{{
									typeFilter(scope.row.windControlType || '-', 'windLevelType')
								}}
							</span>
							<span>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="windControlLevelName"
						align="center"
						label="风控层级"
					>
						<template slot-scope="scope">
							{{ scope.row.windControlLevelName || '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="miaoShu" align="center" label="风控层级描述">
						<template slot-scope="scope">
							{{ scope.row.description || '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="createdBy" align="center" label="创建人">
						<template slot-scope="scope">
							{{ scope.row.createdBy || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="createdAt"
						align="center"
						label="创建时间"
						sortable="custom"
						width="160"
					>
						<template slot-scope="scope">
							{{ scope.row.createdAt || '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="updatedBy" align="center" label="最近操作人">
						<template slot-scope="scope">
							{{ scope.row.updatedBy || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="updatedAt"
						align="center"
						label="最近操作时间"
						sortable="custom"
						width="160"
					>
						<template slot-scope="scope">
							{{ scope.row.updatedAt || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="operating"
						align="center"
						label="操作"
						width="240"
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
				custom-class="way"
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
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		this.reset = this.throttle(this.reset, 1000)
		this._changeTableSort = this.throttle(this._changeTableSort, 1000)
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
			return this.globalDics.windLevelType || []
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
					this.loading = false
					if (res?.code === 200) {
						const { record, totalRecord } = res.data || {}
						this.tableData = Array.isArray(record) ? Object.freeze(record) : []
						this.total = totalRecord || 0
					} else {
						this.$message({
							message: res?.msg || '接口请求异常',
							type: 'error'
						})
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
			const { id } = val
			this.$confirm(`<strong>确定删除此条配置?</strong>`, `确认提示`, {
				dangerouslyUseHTMLString: true,
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
						.deleteRiskRankAPI({ id })
						.then((res) => {
							loading.close()
							if (res?.code === 200) {
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
					setTimeout(() => {
						loading.close()
					}, 1000)
				})
				.catch(() => {})
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
		_changeTableSort({ column, prop, order }) {
			const obj = {
				createdAt: 1,
				updatedAt: 2
			}
			this.queryData.orderKey = obj[prop]
			if (order === 'ascending') {
				// 升序
				this.queryData.orderType = 'asc'
			} else if (column.order === 'descending') {
				// 降序
				this.queryData.orderType = 'desc'
			} else {
				delete this.queryData.orderType
				delete this.queryData.orderKey
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
					const { code, data, msg } = res || {}
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
