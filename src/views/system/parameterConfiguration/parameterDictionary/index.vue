<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="标签名称:">
						<el-input
							v-model="queryData.memberLabelName"
							maxlength="10"
							clearable
							size="medium"
							style="width: 180px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="创建人:">
						<el-input
							v-model="queryData.createdBy"
							clearable
							maxlength="10"
							size="medium"
							style="width: 180px; margin-right: 20px"
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
				<el-button
					type="primary"
          class="addstyle"
					:disabled="loading"
					size="medium"
					@click="addLabel"
				>
					创建
				</el-button>
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
						prop="memberLabelName"
						align="center"
						label="序号"
					></el-table-column>
					<el-table-column
						prop="memberLabelName"
						align="center"
						label="字典code"
					></el-table-column>
					<el-table-column
						prop="memberLabelName"
						align="center"
						label="标签"
					></el-table-column>
					<el-table-column prop="description" align="center" label="用户端">
						<template slot-scope="scope">
							<span v-if="scope.row.description !== ''">
								{{ scope.row.description }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="description" align="center" label="类型">
						<template slot-scope="scope">
							<span v-if="scope.row.description !== ''">
								{{ scope.row.description }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="description" align="center" label="注释">
						<template slot-scope="scope">
							<span v-if="scope.row.descriptionq !== ''">
								{{ scope.row.description }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="createdAt"
						align="center"
						label="创建时间"
						sortable="custom"
					></el-table-column>
					<el-table-column
						prop="updatedBy"
						align="center"
						label="最近修改人"
					></el-table-column>
					<el-table-column
						prop="updatedAt"
						align="center"
						label="最近修改时间"
						sortable="custom"
					></el-table-column>
					<el-table-column prop="description" align="center" label="时效性">
						<template slot-scope="scope">
							<span v-if="scope.row.description !== ''">
								{{ scope.row.description }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="operating" align="center" label="操作">
						<template slot-scope="scope">
							<el-button
								type="primary"
								icon="el-icon-edit"
								size="medium"
								@click="edit(scope.row)"
							>
								编辑信息
							</el-button>
							<el-button
								type="primary"
								icon="el-icon-edit"
								size="medium"
								@click="lookGame(scope.row)"
							>
								修改记录
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
				@close="clear"
			>
				<el-divider></el-divider>
				<el-form ref="formSub" :model="dialogForm" label-width="90px">
					<el-form-item label="字典code:" prop="memberLabelName">
						<el-input
							v-model="dialogForm.memberLabelName"
							placeholder="请输入开发字段"
							maxlength="10"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item label="标签:" prop="memberLabelName">
						<el-input
							v-model="dialogForm.memberLabelName"
							placeholder="请定义标签"
							maxlength="10"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item label="类型:" prop="memberLabelName">
						<el-input
							v-model="dialogForm.memberLabelName"
							placeholder="请定义类型"
							maxlength="10"
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
					<el-form-item label="字典code:" prop="memberLabelName">
						<el-input
							v-model="dialogForm.memberLabelName"
							placeholder="请输入开发字段"
							maxlength="10"
							autocomplete="off"
						></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button type="primary" @click="subAddOrEidt">提交</el-button>
				</div>
			</el-dialog>
			<el-dialog
				title="查看记录"
				:visible.sync="dialogGameVisible"
				:destroy-on-close="true"
				width="1100px"
				class="rempadding"
			>
				<el-form ref="form" :model="form" :inline="true" label-width="80px">
					<el-form-item label="修改时间:">
            <el-date-picker
              v-model="searchTime"
              size="medium"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              :clearable="false"
              :default-time="defaultTime"
              style="width: 375px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="操作账号">
						<el-input v-model="form.name" placeholder="请输入账号" style="width:200px"></el-input>
					</el-form-item>
          <el-form-item label="IP">
						<el-input v-model="form.name" placeholder="请输入IP" style="width:200px"></el-input>
					</el-form-item>
				</el-form>
				<el-table
					v-loading="loading"
					size="mini"
					class="small-size-table"
					:data="gameList"
					style="width: 100%; margin: 15px 0"
					:header-cell-style="getRowClass"
				>
					<el-table-column prop="userName" align="center" label="序号">
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.userName"
								:title="scope.row.userName"
								:copy="copy"
							>
								{{ scope.row.userName }}
							</Copy>
						</template>
					</el-table-column>
					<el-table-column prop="userName" align="center" label="操作人账号">
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.userName"
								:title="scope.row.userName"
								:copy="copy"
							>
								{{ scope.row.userName }}
							</Copy>
						</template>
					</el-table-column>
					<el-table-column
						prop="updatedBy"
						align="center"
						label="操作人"
					></el-table-column>
					<el-table-column
						prop="accountTypeName"
						align="center"
						label="角色"
					></el-table-column>
					<el-table-column
						prop="accountTypeName"
						align="center"
						label="IP"
					></el-table-column>
					<el-table-column
						prop="accountTypeName"
						align="center"
						label="操作类型"
					></el-table-column>
					<el-table-column
						prop="accountTypeName"
						align="center"
						label="备注"
					></el-table-column>
					<el-table-column
						prop="updatedAt"
						align="center"
						label="操作时间"
					></el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					:current-page.sync="page"
					background
					class="fenye"
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="size"
					:page-sizes="[5, 10, 15]"
					:total="summary"
					@current-change="handleCurrentChangeDialog"
					@size-change="handleSizeChangeDialog"
				></el-pagination>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
export default {
	name: routerNames.memberLabelConfig,
	components: {},
	mixins: [list],
	data() {
		return {
			form: {
				name: ''
			},
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
			summary: 0
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
				.getMemberPageLabel(params)
				.then((res) => {
					if (res.code === 200) {
						this.tableData = res.data.record
						this.total = res.data.totalRecord
						this.loading = false
					} else {
						this.loading = false
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		subAddOrEidt() {
			console.log(this.title)
			const data = {}
			data.description = this.dialogForm.description
			data.memberLabelName = this.dialogForm.memberLabelName
			this.$refs.formSub.validate((valid) => {
				if (valid) {
					if (this.title === '新增') {
						console.log('新增')

						this.$api.setMemberAddOrEditMemberLabel(data).then((res) => {
							if (res.code === 200) {
								this.$message.success('新增成功')
								this.pageNum = 1
								this.loadData()
							}
							this.dialogFormVisible = false
						})
					} else {
						data.id = this.dialogForm.id
						this.$api.setMemberAddOrEditMemberLabel(data).then((res) => {
							if (res.code === 200) {
								this.$message.success('修改成功')
								this.loadData()
							}
							this.dialogFormVisible = false
						})
					}
				}
			})
		},
		// 弹框标签添加人数
		getMemberMemberInfoByLabelId(val) {
			const params = {}
			params.id = val
			params.pageNum = this.page
			params.pageSize = this.size
			this.$api.getMemberMemberInfoByLabelId(params).then((res) => {
				if (res.code === 200) {
					this.gameList = res.data.record
					this.dialogGameVisible = true
				}
			})
		},
		lookGame(val) {
			this.labelName = val.memberLabelName
			this.summary = val.peopleNum * 1
			this.id = val.id
			this.getMemberMemberInfoByLabelId(val.id)
		},
		reset() {
			this.queryData = {}
			this.pageNum = 1
			this.loadData()
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
		handleCurrentChangeDialog(val) {
			console.log(111, val)
			this.page = val
			this.getMemberMemberInfoByLabelId(this.id)
		},
		handleSizeChangeDialog(val) {
			console.log(222, val)
			this.size = val
			this.getMemberMemberInfoByLabelId(this.id)
		}
	}
}
</script>

<style lang="scss" scoped>
.addstyle{}
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
