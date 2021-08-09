<template>
	<div class="game-container account">
		<div class="params flex-h flex-bc">
			<el-form ref="form" :inline="true" :model="listQuery">
				<el-form-item label="用户名称：">
					<el-input
						v-model="listQuery.userName"
						size="medium"
						style="width: 280px"
						placeholder="请输入"
						maxlength="10"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item style="margin-left: 30px">
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
						@click="handleReset"
					>
						重置
					</el-button>
					<el-button
                        v-if="hasPermission('369')"
						type="success"
						icon="el-icon-folder-add"
						size="medium"
						@click="addUser"
					>
						新增
					</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="content">
			<el-table
				v-loading="loading"
				:data="list"
				style="width: 100%"
				:header-cell-style="getRowClass"
                border
			>
				<el-table-column
					align="center"
					type="index"
					:label="$t('system_component_account_275')"
					width="120"
				></el-table-column>
				<el-table-column align="center" prop="userName" label="用户名称" width="150">
					<template slot-scope="scope">
						{{ scope.row.userName || '-' }}
					</template>
				</el-table-column>
				<el-table-column align="center" prop="nickName" label="姓名" width="120">
					<template slot-scope="scope">
						{{ scope.row.nickName || '-' }}
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="googleAuthCode"
					label="谷歌验证秘钥"
					width="220"
				>
					<template slot-scope="scope">
						{{ scope.row.googleAuthCode || '-' }}
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="createAt"
					label="添加时间"
					width="180"
				>
					<template slot-scope="scope">
						{{ scope.row.createAt || '-' }}
					</template>
				</el-table-column>
				<el-table-column align="center" prop="createBy" label="创建人" width="150">
					<template slot-scope="scope">
						{{ scope.row.createBy || '-' }}
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="lastLoginAt"
					label="最后登录"
					width="180"
				>
					<template slot-scope="scope">
						{{ scope.row.lastLoginAt || '-' }}
					</template>
				</el-table-column>
				<el-table-column label="状态" align="center" width="120">
					<template slot-scope="scope">
						<el-switch
							:disabled="scope.row.userName === username"
							:value="scope.row.status === '1'"
							active-color="#58A3F7"
							inactive-color="#ff4949"
							@change="change(scope.row)"
						></el-switch>
					</template>
				</el-table-column>
				<!-- 操作，编辑 -->
				<el-table-column
					align="center"
					fixed="right"
					:label="$t('system_component_account_280')"
					min-width="360"
				>
					<template slot-scope="scope">
						<el-button
                            v-if="hasPermission('365')"
							type="primary"
							size="medium"
							@click.native.prevent="popupPwdDialog(scope.row)"
						>
							重置密码
						</el-button>
						<el-button
                            v-if="hasPermission('363')"
							type="primary"
							icon="el-icon-edit"
							size="medium"
							@click.stop="editRow(scope.row, list)"
						>
							编辑
						</el-button>
						<el-button
                            v-if="hasPermission('364')"
							type="danger"
							icon="el-icon-delete"
							:disabled="scope.row.status === '1'"
							size="medium"
							@click="deleteUser(scope.row)"
						>
							删除
						</el-button>
						<el-button
                            v-if="hasPermission('371')"
							type="primary"
							:disabled="scope.row.lockStatus === '0'"
							size="medium"
							@click="UnlockStatusUser(scope.row)"
						>
							解锁
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination
				v-if="total"
				:current-page="pageNum"
				background
				:total="total"
				:layout="layout"
				:page-sizes="pageSizes"
				:page-size="pageSize"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			></el-pagination>
		</div>
		<EditAccount
			:user-type="userType"
			:drawer.sync="drawer"
			:deal-data.sync="dealData"
			:is-created.sync="isCreated"
		/>
		<AccountUpdatePass
			:dialog.sync="dialog"
			:agentid="agentid"
			:userName="userName"
		/>
		<el-dialog
			width="500px"
			:close-on-click-modal="false"
			center
			:visible.sync="dialogVisible"
			:destroy-on-close="true"
			@close="closeDialog"
		>
			<div slot="title" class="center">
				<span>{{ $t('system_component_account_283') }}</span>
				<span
					:class="{
						'active-color': dealerStatus.status === '1',
						'stop-color': dealerStatus.status === '0'
					}"
				>
					{{
						dealerStatus.status === '1'
							? $t('system_component_account_266')
							: $t('system_component_account_267')
					}}
				</span>
				<span>{{ $t('system_component_account_284') }}</span>
			</div>
			<el-form ref="dialogForm" :model="dialogForm">
				<el-form-item :label="$t('system_component_account_285')" prop="remark">
					<el-input
						v-model="dialogForm.remark"
						type="textarea"
						maxlength="50"
						:placeholder="$t('system_component_account_286')"
					></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">
					{{ $t('system_component_account_287') }}
				</el-button>
				<el-button type="primary" @click="requestChange">
					{{ $t('system_component_account_288') }}
				</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import EditAccount from './EditAccount'
import AccountUpdatePass from '@/components/Dialog/UpdatePass'
import list from '@/mixins/list'
import { sleep } from '@/utils/sleep'
import { message } from '@/utils/message'
import { getUsername } from '@/utils/auth' // get token from cookie

export default {
	name: 'Account',
	components: { EditAccount, AccountUpdatePass },
	mixins: [list],
	data() {
        this.handleSearch = this.throttle(this.handleSearch, 1000)
        this.handleReset = this.throttle(this.handleReset, 1000)
		return {
			curUsername: '',
			username: getUsername(),
			userName: '',
			userType: '',
			loading: true,
			dialogVisible: false,
			dealerStatus: {},
			dialogForm: {
				remark: ''
			},
			agentid: 0,
			drawer: false,
			dialog: false,
			isCreated: false,
			dealData: {},
			list: [],
			listQuery: {
				userName: ''
			},
			form: {
				originPwd: '',
				newPwd: '',
				rePwd: ''
			},
			id: ''
		}
	},
	methods: {
		loadData() {
			const [startTime, endTime] = this.listQuery.time || []
			let params = {
				...this.listQuery,
				startTime: startTime && startTime + '',
				endTime: endTime && endTime + ''
			}
			params = {
				...this.getParams(params)
			}

			this.$api.getUsers(params).then((res) => {
				this.loading = false
				const {
					code,
					data: { records, total },
					msg
				} = res
				if (code && code === 200) {
					this.list = records || []
					this.total = total || 0
				} else {
					this.$message({
						message: res && msg,
						type: 'error'
					})
				}
			}).catch(() => (this.loading = false))
		},
		deleteUser(val) {
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			const { id } = val
			this.$confirm(`<strong>确定删除该账号吗?</strong>`, `确认提示`, {
				dangerouslyUseHTMLString: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$api
						.deleteUser({ id })
						.then((res) => {
							loading.close()
							const {
								code
							} = res
							if (code && code === 200) {
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
				})
				.catch(() => {
					loading.close()
				})
		},
		closeDialog() {
			this.$refs.dialogForm.resetFields()
		},
		change({ id, status, userName }) {
			this.dialogVisible = true
			this.dealerStatus = {
				...this.dealerStatus,
				id: id,
				status: status === '1' ? '0' : '1',
				userName
			}
		},
		requestChange() {
			this.$refs.dialogForm.validate((valid) => {
				if (valid) {
					this.$api
						.updateXPSStatus({ ...this.dealerStatus, ...this.dialogForm })
						.then(() => {
							this.loadData()
						})
						.then((_) => {
							this.dialogVisible = false
						})
				}
			})
		},
		editRow(data) {
			this.dealData = data
			this.isCreated = false
			this.drawer = true
		},
		popupPwdDialog(row) {
			this.curUsername = row.userName
			this.agentid = row.id
			this.userName = row.userName
			this.dialog = true
		},
		addUser() {
			this.drawer = true
			this.isCreated = true
		},
		updatePassword(form) {
			return this.$api
				.modifyPassword({
					pwd: form.pwd,
					newPwd: form.newPwd,
					resPwd: form.resPwd,
					userId: form.id,
					userName: this.userName
				})
				.then((res) => {
					const {
						code
					} = res
					if (code && code === 200) {
						this.$message({
							message: '操作成功',
							type: 'success'
						})

						if (this.curUsername === this.username) {
							sleep(1000).then(() => {
								this.$store
									.dispatch('user/logout')
									.then((_) => {
										location.reload()
									})
									.catch((err) => {
										message({ message: err.msg, type: 'error' })
										this.$router.go('/')
									})
							})
						}
					}
				})
		},
		handleSearch() {
			this.pageNum = 1
			this.loadData()
		},
		handleCurrentChange(val) {
			this.pageNum = val
			this.$nextTick(() => {
				this.loadData()
			})
		},
		handleReset() {
			this.listQuery = {
				userName: ''
			}
			this.loadData()
		},
		UnlockStatusUser(item) {
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			const { id, status } = item
			this.$confirm(`<strong>确定解锁该账号吗?</strong>`, `确认提示`, {
				dangerouslyUseHTMLString: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$api.unLockUser({ id, status })
							.then((res) => {
								loading.close()
								const { code } = res
								if (code && code === 200) {
									this.$message.success('解锁成功')
								} else {
									this.$message({
										type: 'error',
										message: '解锁失败!'
									})
								}
								this.loadData()
							})
							.catch(() => {
								loading.close()
							})
				})
				.catch(() => {
					loading.close()
				})
		}
	}
}
</script>
