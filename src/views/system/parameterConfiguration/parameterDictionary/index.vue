<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="标签:">
						<el-input
							v-model="queryData.tag"
							maxlength="20"
							clearable
							size="medium"
							style="width: 220px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="字典名称:">
						<el-input
							v-model="queryData.k"
							clearable
							maxlength="20"
							size="medium"
							style="width: 220px; margin-right: 8px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
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
				>
					<el-table-column prop="memberLabelName" align="center" label="序号">
						<template slot-scope="scopes">
							{{ scopes.$index + 1 }}
						</template>
					</el-table-column>
					<el-table-column prop="k" align="center" label="字典code">
						<template slot-scope="scope">
							{{ scope.row.k || '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="tag" align="center" label="标签">
						<template slot-scope="scope">
							{{ scope.row.tag || '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="valueType" align="center" label="控制类型">
						<template slot-scope="scope">
							{{ scope.row.valueType || '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="module" align="center" label="模块">
						<template slot-scope="scope">
							{{ scope.row.module || '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="description" align="center" label="注释">
						<template slot-scope="scope">
							{{ scope.row.description || '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="v" align="center" label="值"></el-table-column>
					<el-table-column
						prop="operating"
						align="center"
						width="200"
						label="操作"
					>
						<template slot-scope="scope">
							<el-button type="primary" size="medium" @click="edit(scope.row)">
								编辑
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					:current-page.sync="pageNum"
					class="pageValue"
					background
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageSize"
					:page-sizes="pageSizes"
					:total="total"
					@current-change="handleCurrentChange"
					@size-change="handleSizeChange"
				></el-pagination>
			</div>
			<el-dialog
				title="创建/编辑"
				:visible.sync="dialogFormVisible"
				:destroy-on-close="true"
				width="480px"
				center
				class="rempadding"
			>
				<el-divider></el-divider>
				<el-form
					ref="formSub"
					:rules="rules"
					:model="dialogForm"
					label-width="90px"
				>
					<el-form-item label="字典code:" prop="k">
						<el-input
							v-model="dialogForm.k"
							disabled
							placeholder="请输入开发字段"
							maxlength="10"
						></el-input>
					</el-form-item>
					<el-form-item label="标签:" prop="tag">
						<el-input
							v-model="dialogForm.tag"
							placeholder="请定义标签"
							maxlength="20"
						></el-input>
					</el-form-item>
					<el-form-item label="控制类型:" prop="valueType">
						<el-input
							v-model="dialogForm.valueType"
							placeholder="请定义类型"
							maxlength="20"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item label="注释:" prop="description">
						<el-input
							v-model="dialogForm.description"
							placeholder="请输入备注详情"
							maxlength="50"
							type="textarea"
							show-word-limit
						></el-input>
					</el-form-item>
					<el-form-item label="值:" prop="v">
						<el-input
							v-model="dialogForm.v"
							placeholder="请输入值"
							maxlength="10"
							autocomplete="off"
						></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button
						type="primary"
						:disabled="subAddOrEidtDisabled"
						@click="subAddOrEidt"
					>
						提交
					</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
import { routerNames } from '@/utils/consts'
const startTime = dayjs()
	.startOf('day')
	.valueOf()
const endTime = dayjs()
	.endOf('day')
	.valueOf()
export default {
	name: routerNames.memberLabelConfig,
	components: {},
	mixins: [list],
	data() {
		this.search = this.throttle(this.search, 1000)
		this.reset = this.throttle(this.reset, 1000)
		return {
			form: {
				name: ''
			},
			searchTime: [startTime, endTime],
			queryData: {},
			tableData: [],
			dialogFormVisible: false,
			dialogForm: {},
			gameList: [],
			dialogGameVisible: false,
			title: '',
			labelName: '',
			id: '',
			page: 1,
			size: 5,
			summary: 0,
			subAddOrEidtDisabled: false
		}
	},
	computed: {
		rules() {
			const tagszn = (rule, value, callback) => {
				var reg = /^[\u4E00-\u9FA5]+$/
				if (reg.test(value)) {
					callback()
				} else {
					callback(new Error('只能输入中文'))
				}
			}
			const valueTypezn = (rule, value, callback) => {
				var reg = /^[\u4E00-\u9FA5]+$/
				if (reg.test(value)) {
					callback()
				} else {
					callback(new Error('只能输入中文'))
				}
			}
			const descriptionzn = (rule, value, callback) => {
				var reg = /^[\u4E00-\u9FA5]+$/
				if (reg.test(value)) {
					callback()
				} else {
					callback(new Error('只能输入中文'))
				}
			}
			const vzn = (rule, value, callback) => {
				var reg = /^[\u4E00-\u9FA5]+$/
				if (reg.test(value)) {
					callback()
				} else {
					callback(new Error('只能输入中文'))
				}
			}
			const tag = [{ required: true, validator: tagszn, trigger: 'blur' }]
			const valueType = [
				{ required: true, validator: valueTypezn, trigger: 'blur' }
			]
			const description = [
				{ required: true, validator: descriptionzn, trigger: 'blur' }
			]
			const v = [{ required: true, validator: vzn, trigger: 'blur' }]
			return {
				tag,
				valueType,
				description,
				v
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
			this.$api
				.getkvconfigQueryList(params)
				.then((res) => {
					this.loading = false
					const {
						code,
						data: { records, total },
						msg
					} = res
					if (code && code === 200) {
						this.tableData = records || []
						this.total = total || 0
					} else {
						this.$message({
							message: res && msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		subAddOrEidt() {
			const data = { ...this.dialogForm }
			data.id = this.dialogForm.id
			this.$refs.formSub.validate((valid) => {
				if (valid) {
					this.subAddOrEidtDisabled = true
					this.$api
						.getkvconfigUpdate(data)
						.then((res) => {
							const { code, msg } = res
							if (code && code === 200) {
								this.$message.success('修改成功')
								this.loadData()
							} else {
								this.$message({
									message: res && msg,
									type: 'error'
								})
							}
							this.dialogFormVisible = false
							this.disabledDelay('subAddOrEidtDisabled', false, 1000)
						})
						.catch(() => {})
				}
			})
		},
		reset() {
			this.queryData = {}
			this.pageNum = 1
			this.loadData()
		},
		edit(val) {
			this.title = '编辑'
			this.dialogForm.k = val.k
			this.dialogFormVisible = true
			this.dialogForm.id = val.id
		}
	}
}
</script>

<style lang="scss" scoped>
.params {
	padding: 15px 10px 20px 10px;
}
/deep/.el-dialog__header {
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
.fenye {
	text-align: center;
}
</style>
