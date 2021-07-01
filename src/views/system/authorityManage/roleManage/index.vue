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
									{{ formatTime(scope.row.createdAt) }}
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
									@click.stop="openEdit(scope.row)"
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
		<editPage v-else :editData="rowData" @back="back"></editPage>
	</transition>
</template>

<script>
import list from '@/mixins/list'
// import { routerNames } from '@/utils/consts'
import editPage from './components/editPage'
import dayjs from 'dayjs'

export default {
	name: 'RoleManage',
	components: { editPage },
	mixins: [list],
	data() {
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
	computed: {},
	mounted() {},
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
					if (code === 200) {
						this.dataList = records || []
						this.total = total || 0
					} else {
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
					console.log('id', id)
					this.$api.deleteRoleAPI({ id }).then((res) => {
						console.log(res)
						const { code } = res
						if (code === 200) {
							loading.close()
							this.$message({
								type: 'success',
								message: '删除成功!'
							})
						} else {
							loading.close()
							this.$message({
								type: 'error',
								message: '删除失败!'
							})
						}

						this.reset()
					})

					setTimeout(() => {
						loading.close()
					}, 1500)
				})
				.catch(() => {})
		},
		openEdit(val) {
			if (val) {
				const { id } = val
				id && this.getRoleList(id, val)
				console.log(val)
			}
			this.editPage = true
		},
		async getRoleList(id, value) {
			const { code, data } = await this.$api.getRolePermissionsAPI({
				roleId: id
			})
			if (code === 200) {
				const arr = JSON.parse(JSON.stringify(data)) || []
				const _arr = []
				arr.forEach((item) => {
					if (item.isExist === '1') {
						_arr.push(item.id)
					}
				})
				console.log('_arr', _arr)
				// console.log('value', value)
				this.rowData = Object.assign({ chooseIds: _arr }, value)
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
