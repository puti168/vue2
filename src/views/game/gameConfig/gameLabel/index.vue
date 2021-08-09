<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form
					ref="form"
					:inline="true"
					:model="queryData"
					label-width="100px"
				>
					<el-form-item label="游戏标签ID:">
						<el-input
							v-model="queryData.gameLabelId"
							maxlength="3"
							clearable
							size="medium"
							style="width: 300px"
							placeholder="请输入"
							:disabled="loading"
							oninput="value=value.replace(/[^\w\.\/]/ig ,'')"
							@keyup.enter.native="enterSearch"
							@blur="checkValue($event)"
						></el-input>
					</el-form-item>
					<el-form-item label="标签名称:">
						<el-input
							v-model="queryData.gameLabelName"
							clearable
							:maxlength="10"
							size="medium"
							style="width: 300px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="状态:" class="tagheight">
						<el-select
							v-model="queryData.status"
							style="width: 300px"
							clearable
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option label="全部" value=""></el-option>
							<el-option label="禁用中" :value="0"></el-option>
							<el-option label="开启中" :value="1"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item style="margin-left: 28px">
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
							v-if="hasPermission('1020119')"
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
						prop="gameLabelId"
						align="center"
						label="游戏标签ID"
						sortable="custom"
						width="120px"
					></el-table-column>
					<el-table-column
						prop="gameLabelName"
						align="center"
						label="标签名称"
						width="170px"
					></el-table-column>
					<el-table-column
						prop="labelStatus"
						align="center"
						label="状态"
						width="100"
					>
						<template slot-scope="scope">
							<div v-if="scope.row.labelStatus === 0" class="disableRgba">
								已禁用
							</div>
							<div v-else-if="scope.row.labelStatus === 1" class="normalRgba">
								开启中
							</div>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="description"
						align="center"
						label="标签描述"
						min-width="200"
					></el-table-column>
					<el-table-column
						prop="gameLabelCount"
						align="center"
						label="已标签游戏"
						width="120"
					>
						<template slot-scope="scope">
							<div
								v-if="scope.row.gameLabelCount"
								class="blueColor decoration"
								@click="lookGame(scope.row)"
							>
								{{ scope.row.gameLabelCount }}
							</div>
							<div v-else>{{ scope.row.gameLabelCount }}</div>
						</template>
					</el-table-column>
					<el-table-column
						prop="createdBy"
						align="center"
						label="创建人"
						width="100"
					></el-table-column>
					<el-table-column
						prop="createdAt"
						align="center"
						label="创建时间"
						sortable="custom"
						width="160"
					></el-table-column>
					<el-table-column
						prop="updatedBy"
						align="center"
						label="最近操作人"
						width="100"
					></el-table-column>
					<el-table-column
						prop="updatedAt"
						align="center"
						label="最近操作时间"
						sortable="custom"
						width="160"
					></el-table-column>
					<el-table-column
						prop="operating"
						align="center"
						label="操作"
						width="240"
					>
						<template slot-scope="scope">
							<el-button
								v-if="hasPermission('1020120')"
								:disabled="loading"
								:type="scope.row.labelStatus ? 'danger' : 'success'"
								size="medium"
								class="noicon"
								@click="switchClick(scope.row)"
							>
								{{ scope.row.labelStatus ? '禁用' : '开启' }}
							</el-button>
							<el-button
								v-if="hasPermission('1020121')"
								type="primary"
								icon="el-icon-edit"
								:disabled="scope.row.labelStatus === 1"
								size="medium"
								@click="edit(scope.row)"
							>
								编辑信息
							</el-button>

							<el-button
								v-if="hasPermission('1020122')"
								type="warning"
								icon="el-icon-delete"
								:disabled="scope.row.labelStatus === 1"
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
				class="rempadding"
				@close="clear"
			>
				<el-divider></el-divider>
				<el-form ref="formSub" :model="dialogForm" label-width="90px">
					<el-form-item
						label="标签名称:"
						prop="gameLabelName"
						:rules="[
							{ required: true, message: '请输入标签名称', trigger: 'blur' },
							{
								min: 1,
								max: 10,
								message: '长度在 2 到 10 个字符',
								trigger: 'blur'
							}
						]"
					>
						<el-input
							v-model="dialogForm.gameLabelName"
							:maxlength="10"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item
						label="描述:"
						prop="description"
						:rules="[
							{ required: true, message: '请输入描述内容', trigger: 'blur' },
							{
								min: 2,
								max: 50,
								message: '长度在 2 到 50 个字符',
								trigger: 'blur'
							}
						]"
					>
						<el-input
							v-model="dialogForm.description"
							type="textarea"
						></el-input>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button
						:disabled="addOrEidtDisabled"
						type="primary"
						@click="subAddOrEidt"
					>
						保存
					</el-button>
				</div>
			</el-dialog>
			<el-dialog
				title="标签游戏"
				:visible.sync="dialogGameVisible"
				:destroy-on-close="true"
				width="480px"
				class="rempadding"
			>
				<el-divider></el-divider>
				<div class="contentBox disableColor">标签名称：{{ labelName }}</div>
				<p class="headerBox">
					<span>游戏名称</span>
					<span>添加时间</span>
				</p>
				<div class="bodyBox">
					<p v-for="(item, i) in gameList" :key="i">
						<span>{{ item.gameName }}</span>
						<span>{{ item.createdAt }}</span>
					</p>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
export default {
	name: routerNames.gameLabel,
	components: {},
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		this._changeTableSort = this.throttle(this._changeTableSort, 1000)
		return {
			queryData: {},
			tableData: [],
			dialogFormVisible: false,
			dialogForm: {},
			gameList: [],
			dialogGameVisible: false,
			title: undefined,
			labelName: undefined,
			addOrEidtDisabled: false
		}
	},
	computed: {},
	mounted() {},
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
				.getTabelData(params)
				.then((res) => {
					const {
						code,
						data: { record, totalRecord }
					} = res || {}
					if (code && code === 200) {
						this.tableData =
							(record && record.length && Object.freeze(record)) || []
						this.total = totalRecord || 0
						this.loading = false
					} else {
						this.loading = false
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		lookGame(val) {
			this.loading = true
			this.labelName = val.gameLabelName
			const data = {}
			data.gameLabelId = val.gameLabelId
			data.gameLabelName = val.gameLabelName
			this.$api.getGameLabelRelation(data).then((res) => {
				if (res && res.code === 200) {
					this.loading = false
					this.gameList = res.data || []
					this.dialogGameVisible = true
				}
			})
		},
		reset() {
			this.queryData = {}
			this.pageNum = 1
			this.loadData()
		},
		switchClick(val) {
			const status = val.labelStatus === 0 ? 1 : 0
			console.log(val)
			this.$confirm(
				`<strong>是否对 ${val.gameLabelName} 进行${
					val.labelStatus === 0 ? '启用' : '禁用'
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
							if (res && res.code === 200) {
								this.loadData()
							}
						})
				})
				.catch(() => {})
		},
		addLabel() {
			this.title = '新增'
			this.dialogForm = {}
			this.dialogFormVisible = true
		},
		edit(val) {
			this.title = '编辑'
			this.dialogForm = { ...val }
			this.dialogFormVisible = true
		},
		deleteLabel(val) {
			const data = {}
			data.id = val.id
			data.description = val.description
			data.gameLabelName = val.gameLabelName
			this.$confirm(`<strong>确定删除此条标签类型吗?</strong>`, `确认提示`, {
				dangerouslyUseHTMLString: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$api.setUpdateDelete(data).then((res) => {
						if (res && res.code === 200) {
							this.$message.success('删除成功')
							this.loadData()
						}
					})
				})
				.catch(() => {})
		},
		subAddOrEidt() {
			const data = {}
			data.id = this.dialogForm.id
			data.description = this.dialogForm.description
			data.gameLabelName = this.dialogForm.gameLabelName
			this.$refs.formSub.validate((valid) => {
				if (valid) {
					this.addOrEidtDisabled = true
					if (this.title === '新增') {
						this.$api.addObGameLabel(data).then((res) => {
							if (res && res.code === 200) {
								this.$message.success('创建成功')
								this.pageNum = 1
								this.dialogFormVisible = false
								this.loadData()
								this.disabledDelay('addOrEidtDisabled', false)
							}
						})
					} else {
						this.$api.setUpdateLabel(data).then((res) => {
							if (res && res.code === 200) {
								this.$message.success('修改成功')
								this.dialogFormVisible = false
								this.loadData()
								this.disabledDelay('addOrEidtDisabled', false)
							}
						})
					}
				}
			})
		},
		checkValue(e) {
			const { value } = e.target
			this.queryData.gameLabelId = value
			console.log(value)
		},
		_changeTableSort({ column, prop, order }) {
			const obj = {
				gameLabelId: 1,
				createdAt: 2,
				updatedAt: 3
			}
			this.pageNum = 1
			this.queryData.orderKey = prop && obj[prop]
			if (order === 'ascending') {
				// 升序
				this.queryData.orderType = 'asc'
			} else if (order === 'descending') {
				// 降序
				this.queryData.orderType = 'desc'
			} else {
				delete this.queryData.orderKey
				delete this.queryData.orderType
			}
			this.loadData()
		},
		clear() {
			this.$refs.formSub.resetFields()
		},
		enterSubmit() {
			this.loadData()
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
