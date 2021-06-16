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
					<el-form-item label="角色名称：">
						<el-input
							v-model="queryData.roleName"
							clearable
							size="medium"
							style="width: 180px"
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
						<el-button
							type="warning"
							icon="el-icon-folder"
							:disabled="loading"
							size="medium"
							style="padding: 0 5px"
							@click="createRole()"
						>
							添加角色
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
					:data="dataList"
					style="width: 100%"
					:header-cell-style="getRowClass"
				>
					<el-table-column
						type="index"
						align="center"
						label="序号"
						width="100"
					></el-table-column>
					<el-table-column prop="roleName" align="center" label="角色名称">
						<template slot-scope="scope">
							<span v-if="!!scope.row.roleName">
								{{ scope.row.roleName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="remark" align="center" label="角色描述">
						<template slot-scope="scope">
							<span v-if="!!scope.row.remark">
								{{ scope.row.remark }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="createdAt" align="center" label="添加时间">
						<template slot-scope="scope">
							<span v-if="!!scope.row.createdAt">
								{{ scope.row.createdAt }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="createBy" align="center" label="创建人">
						<template slot-scope="scope">
							<span v-if="!!scope.row.createBy">
								{{ scope.row.createBy }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<el-button
								type="warning"
								icon="el-icon-edit"
								size="medium"
								@click.stop="editUp(scope.row)"
							>
								编辑
							</el-button>
							<el-button
								type="danger"
								icon="el-icon-delete"
								size="medium"
								@click="deleteUp(scope.row)"
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
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'

export default {
	name: routerNames.roleManage,
	components: {},
	mixins: [list],
	data() {
		return {
			queryData: {
				roleName: undefined
			},
			dataList: [],
			total: 0,
			showForm: '',
			editVisible: false,
			editFormData: {}
		}
	},
	computed: {},
	mounted() {},
	methods: {
		loadData(params) {
			params = {
				...this.getParams(params)
			}
			this.loading = true
			this.$api
				.getRoleListPage(params)
				.then((res) => {
					const {
						code,
						data: { records, total },
						msg
					} = res
					if (code === 200) {
						this.loading = false
						this.dataList = records || []
						this.total = total || 0
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
		reset() {
			this.$refs['form'].resetFields()
			this.queryData = {
				roleName: undefined
			}
			this.loadData()
		},

		add() {
			this.moduleBox = '新增银行信息'
			this.editVisible = true
		},
		submitAdd() {
			console.log(this.$refs.addForm)
			//   setAddBank(this.queryData).then((res) => {
			//     console.log(res);
			//   });
		},
		deleteUp(val) {
			console.log(val)
			this.$confirm('确定删除此银行卡号吗?', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
					// setDeleteBank(val).then((res) => {
					//   console.log(res);
					// });
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
		},
		editUp(val) {
			this.moduleBox = '修改银行信息'
			this.editVisible = true
			this.editFormData = val
		},
		submitEdit() {
			// setEidteBank().then((res) => {
			//   console.log(res);
			// });
		},
		closeFormDialog() {
			this.editVisible = false
		},
		createRole() {}
	}
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
	text-align: center;
	color: #909399;
	font-weight: 700;
}
</style>
