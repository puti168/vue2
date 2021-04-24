<template>
	<div class="game-container report-container">
		<div class="header flex-h flex-bc">
			<h2 class="h2-line">终端登录限制管理</h2>
			<div class="head flex-h-end">
				<el-button
					type="primary"
					icon="el-icon-search"
					:disabled="loading"
					size="medium"
					@click="handleSearch"
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
					type="primary"
					icon="el-icon-folder-add"
					size="medium"
					@click="add"
				>
					新增
				</el-button>
			</div>
		</div>
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="form" label-width="100px">
					<el-form-item label="IP地址:">
						<el-input
							v-model="form.IP"
							size="medium"
							placeholder="请输入IP"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="创建人:">
						<el-input
							v-model="form.createBy"
							clearable
							size="medium"
							placeholder="创建人"
						></el-input>
					</el-form-item>
					<el-form-item label="创建时间:">
						<el-date-picker
							v-model="form.time"
							size="medium"
							:picker-options="pickerOptions"
							format="yyyy-MM-dd HH:mm:ss"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							clearable
							value-format="timestamp"
							style="width: 400px"
						></el-date-picker>
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
						align="center"
						type="index"
						label="序号"
					></el-table-column>
					<el-table-column
						prop="ip"
						align="center"
						label="黑名单IP"
					></el-table-column>
					<el-table-column
						prop="bankName"
						align="center"
						label="商户ID"
					></el-table-column>
					<el-table-column
						prop="createBy"
						align="center"
						label="创建人"
					></el-table-column>
					<el-table-column
						prop="createDt"
						align="center"
						label="创建时间"
					></el-table-column>
					<el-table-column
						prop="modifyDt"
						align="center"
						label="更新时间"
					></el-table-column>
					<el-table-column
						prop="remark"
						align="center"
						label="备注"
					></el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<el-button
								type="danger"
								icon="el-icon-delete"
								size="medium"
								@click="deleteUp(scope.row)"
							>
								删除
							</el-button>
							<el-button
								type="warning"
								icon="el-icon-edit"
								size="medium"
								@click.stop="editUp(scope.row)"
							>
								修改
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					v-show="!!total"
					:current-page.sync="pageNum"
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageSize"
					:page-sizes="$store.getters.pageSizes"
					:total="total"
					@current-change="handleCurrentChange"
					@size-change="handleSizeChange"
				></el-pagination>
				<el-dialog
					:title="moduleBox"
					center
					:visible.sync="editVisible"
					:before-close="closeFormDialog"
					width="410px"
				>
					<editForm v-if="moduleBox == '新增银行信息'" ref="addForm"></editForm>
					<editForm
						v-else
						ref="editForm"
						:editFormData="editFormData"
					></editForm>
					<div slot="footer" class="dialog-footer">
						<el-button @click="editVisible = false">取 消</el-button>
						<el-button
							v-if="moduleBox == '新增银行信息'"
							type="primary"
							@click="submitAdd"
						>
							确 定
						</el-button>
						<el-button v-else type="primary" @click="submitEdit">
							确 定
						</el-button>
					</div>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import editForm from './components/editForm'
export default {
	name: '',
	components: {
		editForm
	},
	mixins: [list],
	data() {
		return {
			form: {
				IP: '',
                createBy: '',
                time: []
			},
			dataList: [],
			moduleBox: '',
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
			this.dataList = []
			this.$api.ipBlackList(params).then((res) => {
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
		},
		handleSearch() {
			this.loading = true
			const create = this.form.time || []
			const [startTime, endTime] = create
			const params = {
				...this.form,
				pageNum: 1,
				startTime: startTime && startTime + '',
				endTime: endTime && endTime + ''
			}
			this.loadData(params)
		},
		reset() {
			this.formTime.time = []
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
		handleCurrentChange() {
			this.loadData()
		},
		closeFormDialog() {
			this.editVisible = false
		},
		enterSubmit() {
			this.query()
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__header {
	text-align: center;
	color: #909399;
	font-weight: 700;
}
</style>
