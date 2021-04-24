<template>
	<div class="game-container report-container">
		<div class="header flex-h flex-bc">
			<h2 class="h2-line">银行卡黑名单</h2>
			<div class="head flex-h-end">
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
				<el-form
					ref="form"
					:inline="true"
					:model="queryData"
					label-width="100px"
				>
					<el-form-item label="银行卡号">
						<el-input
							v-model="queryData.cardNo"
							clearable
							size="medium"
							style="width: 280px"
							placeholder="请输入银行卡号"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="id">
						<el-input
							v-model="queryData.id"
							clearable
							size="medium"
							style="width: 280px"
							placeholder="请输入id"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="时间">
						<el-date-picker
							v-model="formTime.time"
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
							style="width: 280px"
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
						prop="cardNo"
						align="center"
						label="银行卡号"
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
						prop="modifyBy"
						align="center"
						label="更新人"
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
								编辑
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					:current-page.sync="pageNum"
					class="pageValue"
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageSize"
					:page-sizes="pageSizes"
					:total="total"
					@current-change="handleCurrentChange"
					@size-change="handleSizeChange"
				></el-pagination>

			</div>
		</div>
    <el-dialog
					:title="title"
					center
					:visible.sync="editVisible"
					:before-close="closeFormDialog"
					width="410px"
				>
					<editForm ref="editForm" :type="title" :editFormData="editFormData" @refresh="search"></editForm>
					<div slot="footer" class="dialog-footer">
						<el-button @click="editVisible = false">取 消</el-button>
						<el-button @click="submit">
							确 定
						</el-button>
					</div>
				</el-dialog>
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
			queryData: {},
			formTime: {
				time: []
			},
			dataList: [],
			title: '',
			showForm: '',
			editVisible: false,
			editFormData: {}
		}
	},
	computed: {},
	mounted() {},
	methods: {
		loadData() {
      this.loading = true
			const [startTime, endTime] = this.formTime.time || []
			let params = {
				...this.queryData,
				pageNum: 1,
				startTime: startTime && startTime + '',
				endTime: endTime && endTime + ''
			}
			params = {
				...this.getParams(params)
			}
			this.$api.blackList(params).then((res) => {
				if (res.code === 200) {
					const response = res.data
					this.loading = false
					this.dataList = response.records
					this.total = response.total
				} else {
					this.loading = false
					this.$message({
						message: res.msg,
						type: 'error'
					})
				}
			})
		},
		search() {
			this.pageNum = 1
			this.loadData()
		},
		reset() {
			this.queryData = {}
			this.formTime.time = []
			this.loadData()
		},

		add() {
			this.title = '新增'
			this.editVisible = true
      this.editFormData = {}
		},
		deleteUp(val) {
			this.$confirm('确定删除此银行卡号吗?', {
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
						.delBlackList({
							id: val.id
						})
						.then(() => {
							loading.close()
              this.search()
							this.$message({
								type: 'success',
								message: '删除成功!'
							})
						})
						.catch(() => {
							loading.close()
						})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
		},
		editUp(val) {
			this.title = '编辑'
			this.editVisible = true
			this.editFormData = val
		},
		submit() {
			this.$refs.editForm.submit()
		},
		handleCurrentChange() {
			this.loadData()
		},
		closeFormDialog() {
			this.editVisible = false
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
</style>
