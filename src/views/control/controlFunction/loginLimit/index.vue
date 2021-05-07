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
					@sort-change="changeTableSort"
				>
					<el-table-column
						align="center"
						type="index"
						label="序号"
					></el-table-column>
					<el-table-column
						v-slot="scope"
						prop="ip"
						align="center"
						label="黑名单IP"
					>
						<Copy :title="scope.row.ip" :copy="copy" />
					</el-table-column>
					<el-table-column
						v-slot="scope"
						prop="merchantId"
						align="center"
                        label="商户ID"
					>
                        <Copy :title="scope.row.merchantId" :copy="copy" />
                    </el-table-column>
					<el-table-column
						prop="createBy"
						align="center"
						label="创建人"
					></el-table-column>
					<el-table-column
						prop="createDt"
						align="center"
						label="创建时间"
						sortable="custom"
					></el-table-column>
					<el-table-column
						prop="modifyDt"
						align="center"
						label="更新时间"
						sortable="custom"
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
					background
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageSize"
					:page-sizes="$store.getters.pageSizes"
					:total="total"
					@current-change="handleCurrentChange"
					@size-change="handleSizeChange"
				></el-pagination>
				<el-dialog
					:title="(moduleStatus === 'add' ? '添加' : '编辑') + 'IP黑名单'"
					:close-on-click-modal="false"
					:visible.sync="ipDialogVisible"
					width="500px"
					center
					@close="closeIpDialog"
				>
					<el-form ref="ipDialogForm" :model="ipDialogForm" label-width="80px">
						<el-form-item label="IP" prop="ip">
							<el-input v-model="ipDialogForm.ip" maxlength="15"></el-input>
						</el-form-item>
						<el-form-item label="备注" prop="remark">
							<el-input
								v-model="ipDialogForm.remark"
								type="textarea"
								maxlength="50"
								placeholder="50字以内"
							></el-input>
						</el-form-item>
					</el-form>
					<span slot="footer" class="dialog-footer">
						<el-button @click="ipDialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="commitIpDialog">确 定</el-button>
					</span>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { mapGetters } from 'vuex'

export default {
	name: 'IPBlack',
	mixins: [list],
	data() {
		return {
			form: {
				IP: '',
				createBy: '',
				time: []
			},
			dataList: [],
			total: 0,
			ipDialogVisible: false,
			ipDialogForm: {
				createBy: '',
				createDt: '',
				id: '',
				ip: '',
				merchantId: '',
				modifyBy: '',
				modifyDt: '',
				remark: ''
			},
			moduleStatus: '',
			editFormData: {}
		}
	},
	computed: {
		...mapGetters(['userInfo'])
	},
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
			this.form = {
				IP: '',
				createBy: '',
				time: []
			}
			this.loadData()
		},
		closeIpDialog() {
			this.$refs.ipDialogForm.resetFields()
		},
		add() {
			this.ipDialogVisible = true
			this.moduleStatus = 'add'
			this.ipDialogForm = {
				createBy: '',
				createDt: '',
				id: '',
				ip: '',
				merchantId: '',
				modifyBy: '',
				modifyDt: '',
				remark: ''
			}
		},
		commitIpDialog() {
			const Func =
				this.moduleStatus === 'add'
					? this.$api.ipBlackAdd
					: this.$api.ipBlackEdit
			this.$refs.ipDialogForm.validate((val) => {
				if (val) {
					const form = {
						// createBy: localStorage.getItem('username'),
						// id: '',
						ip: this.ipDialogForm.ip,
						merchantId: '',
						// modifyBy: localStorage.getItem('username'),
						remark: this.ipDialogForm.remark
					}
					Func(form).then((res) => {
						const { code } = res
						this.ipDialogVisible = false
						if (code === 200) {
							this.$message({
								type: 'success',
								message: this.moduleStatus === 'add' ? '创建成功' : '修改成功'
							})
							this.loadData()
						}
					})
				}
			})
		},
		deleteUp(val) {
			const { id } = val
			const _that = this
			this.$confirm('确定删除此黑名单IP吗?', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					_that.$api.ipBlackDelete(id).then((res) => {
						const { code } = res
						if (code === 200) {
							this.$message({
								type: 'success',
								message: '删除成功'
							})

							if (this.pageNum > 1) {
								this.loadData({
									pageNum: this.pageNum - 1
								})
							} else {
								this.loadData({
									pageNum: 1
								})
							}
						}
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
			this.moduleStatus = 'edit'
			this.ipDialogVisible = true
			this.ipDialogForm = val
		},
		handleCurrentChange() {
			this.loadData()
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
