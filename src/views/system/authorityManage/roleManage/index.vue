<template>
	<transition name="fade-transform" mode="out-in">
		<div v-if="!editPage" class="game-container report-container">
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
                                :maxlength="20"
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
                                v-if="hasPermission('359')"
								type="success"
								icon="el-icon-folder-add"
								:disabled="loading"
								size="medium"
								style="padding: 0 5px"
								@click="openEdit()"
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
								{{ scope.row.roleName || '-' }}
							</template>
						</el-table-column>
						<el-table-column prop="remark" align="center" label="角色描述">
							<template slot-scope="scope">
								{{ scope.row.remark || '-' }}
							</template>
						</el-table-column>
						<el-table-column prop="createdAt" align="center" label="添加时间">
							<template slot-scope="scope">
								{{ formatTime(scope.row.createdAt) || '-' }}
							</template>
						</el-table-column>
						<el-table-column prop="createBy" align="center" label="创建人">
							<template slot-scope="scope">
								{{ scope.row.createBy || '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="操作">
							<template slot-scope="scope">
								<el-button
                                    v-if="hasPermission('360')"
									type="warning"
									icon="el-icon-edit"
									size="medium"
									@click.stop="openEdit(scope.row)"
								>
									编辑
								</el-button>
								<el-button
                                    v-if="hasPermission('361')"
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
		<editPage v-else :editData.sync="rowData" @back="back"></editPage>
	</transition>
</template>

<script>
import list from '@/mixins/list'
import editPage from './components/editPage'
import dayjs from 'dayjs'

export default {
	name: 'RoleManage',
	components: { editPage },
	mixins: [list],
	data() {
        this.search = this.throttle(this.search, 1000)
        this.reset = this.throttle(this.reset, 1000)
		return {
			queryData: {
				roleName: undefined
			},
			dataList: [],
			total: 0,
			rowData: undefined,
			editPage: false
		}
	},
	methods: {
		loadData() {
			let params = {
				...this.queryData
			}
			params = {
				...this.getParams(params)
			}
			this.loading = true
			this.$api
				.getRoleListPageAPI(params)
				.then((res) => {
					const {
						code,
						data: { records, total },
						msg
					} = res
					this.loading = false
                    if (code && code === 200) {
						this.dataList = records || []
						this.total = total || 0
					} else {
						this.$message({
							message: res && msg,
							type: 'error'
						})
					}
				})
				.catch(() => (this.loading = false))
		},
		reset() {
			this.$refs['form'].resetFields()
			this.queryData = {
				roleName: undefined
			}
			this.loadData()
		},
		deleteUp(val) {
			const { id } = val
			this.$confirm('确定删除此角色吗?', {
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
					this.$api.deleteRoleAPI({ id }).then((res) => {
                        loading.close()
						const { code } = res
                        if (code && code === 200) {
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
						this.reset()
					})
                    .catch(() => loading.close())
				})
		},
		openEdit(val) {
			if (val) {
				const { id } = val
				id && this.getRoleList(id, val)
			} else {
                this.rowData = undefined
            }
			this.editPage = true
		},
		async getRoleList(id, value) {
			const { code, data } = await this.$api.getRolePermissionsAPI({
				roleId: id
			}).catch(() => { this.loading = false })
			this.loading = false
            if (code && code === 200) {
				const _arr = []
				data &&
					data.length &&
					data.forEach((item) => {
						if (item.isExist === '1') {
							_arr.push(item.id)
						}
					})
				this.rowData = { ...value, chooseIds: _arr }
			}
		},
		back() {
			this.editPage = false
			this.loadData()
		},
		formatTime(time) {
			return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
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
