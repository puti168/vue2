<template>
	<div class="game-container account">
		<div class="flex-h flex-bc">
			<h2 class="h2-line">账号管理</h2>
			<div class="flex-h handle">
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-search"
					@click="handleSearch"
				>
					{{ $t('system_component_account_273') }}
				</el-button>
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-edit"
					@click="handleReset"
				>
					{{ $t('system_component_account_274') }}
				</el-button>
			</div>
		</div>
		<div class="params flex-h flex-bc">
			<el-form ref="form" :inline="true" :model="listQuery">
				<el-form-item :label="$t('system_component_account_260')">
					<el-date-picker
						v-model="listQuery.time"
						size="medium"
						format="yyyy-MM-dd"
						:picker-options="pickerOptions"
						:default-time="defaultTime"
						type="daterange"
						:range-separator="$t('dealer_index_212')"
						:start-placeholder="$t('dealer_index_213')"
						:end-placeholder="$t('dealer_index_214')"
						align="right"
						value-format="timestamp"
					></el-date-picker>
				</el-form-item>
				<el-form-item :label="$t('system_component_account_264')">
					<el-select
						v-model="listQuery.status"
						size="medium"
						:placeholder="$t('system_component_account_265')"
						clearable
						style="width:280px;"
					>
						<el-option
							:label="$t('system_component_account_265')"
							value="-1"
						></el-option>
						<el-option
							:label="$t('system_component_account_266')"
							:value="1"
						></el-option>
						<el-option
							:label="$t('system_component_account_267')"
							:value="0"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('system_component_account_271')">
					<el-input
						v-model="listQuery.userName"
						size="medium"
						style="width:280px;"
						:placeholder="$t('system_component_account_272')"
						clearable
					></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="content">
			<div class="head flex-h-end">
				<el-button
					v-if="hasPermission('5321')"
					type="primary"
					size="medium"
					icon="el-icon-circle-plus-outline"
					@click="addUser"
				>
					{{ $t('system_component_account_258') }}
				</el-button>
			</div>
			<el-divider></el-divider>
			<el-table
				v-loading="loading"
				:data="list"
				style="width: 100%"
				:header-cell-style="getRowClass"
			>
				<el-table-column
					align="center"
					type="index"
					:label="$t('system_component_account_275')"
					width="120"
				></el-table-column>
				<el-table-column
					align="center"
					prop="userName"
					:label="$t('system_component_account_271')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="nickName"
					:label="$t('system_component_account_276')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="roleName"
					:label="$t('system_component_account_277')"
					width="200"
				></el-table-column>
				<el-table-column
					align="center"
					prop="googleAuthCode"
					:label="$t('login_index_260')"
					width="200"
				></el-table-column>
				<el-table-column
					align="center"
					prop="createAt"
					:label="$t('system_component_account_260')"
					width="160"
				></el-table-column>
				<el-table-column
					align="center"
					prop="createBy"
					:label="$t('system_component_account_278')"
				></el-table-column>
				<el-table-column
					prop="status"
					:label="$t('system_component_account_264')"
				>
					<template slot-scope="scope">
						<span
							:class="{
								'active-color': scope.row.status === '1',
								'stop-color': scope.row.status === '0'
							}"
						>
							{{
								scope.row.status === '1'
									? $t('system_component_account_266')
									: $t('system_component_account_267')
							}}
						</span>
						<el-switch
							v-if="scope.row.userType === '1'"
							:disabled="
								!hasPermission('5322') || scope.row.userName === username
							"
							:value="scope.row.status === '1'"
							active-color="#13ce66"
							inactive-color="#ff4949"
							@change="change(scope.row)"
						></el-switch>
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="lastLoginTime"
					:label="$t('system_component_account_279')"
					width="160"
				></el-table-column>
				<!-- 操作，编辑 -->
				<el-table-column
					align="center"
					fixed="right"
					:label="$t('system_component_account_280')"
					min-width="200"
				>
					<template slot-scope="scope">
						<el-button
							v-if="hasPermission('5323')"
							type="text"
							size="small"
							@click.native.prevent="popupPwdDialog(scope.row)"
						>
							{{ $t('system_component_account_281') }}
						</el-button>
						<el-button
							v-if="hasPermission('5324')"
							type="text"
							size="small"
							@click.native.prevent="editRow(scope.row, list)"
						>
							{{ $t('system_component_account_282') }}
						</el-button>
						<el-button
							v-if="hasPermission('5228')"
							type="text"
							size="small"
							@click.native.prevent="setRange(scope.row)"
						>
							{{ $t('tableColumn.setRanges') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<!-- <el-pagination
				v-if="total"
				:current-page="pageIndex"
				:total="total"
				:layout="layout"
				:page-sizes="pageSizes"
				:page-size="pageSize"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			></el-pagination>-->
		</div>
		<EditAccount
			:user-type="userType"
			:drawer.sync="drawer"
			:deal-data.sync="dealData"
			:is-created.sync="isCreated"
		/>
		<!-- 设置范围 -->
		<SetRanges
			v-if="showRanges"
			:userId="userId"
			:drawer.sync="showRanges"
			@close="closeRangesDialog"
		/>
		<AccountUpdatePass :dialog.sync="dialog" :agentid="agentid" />
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
import SetRanges from './SetRanges'
import AccountUpdatePass from '@/components/Dialog/UpdatePass'
import list from '@/mixins/list'
import { getUsers } from '@/api/user'
import { modifyPassword, updateXPSStatus, updateStatus } from '@/api/user'
import { message } from '@/utils/message'
import { getUsername } from '@/utils/auth' // get token from cookie
import { sleep } from '@/utils/sleep'
import md5 from 'js-md5'

export default {
	name: 'Account',
	components: { EditAccount, AccountUpdatePass, SetRanges },
	mixins: [list],
	data() {
		return {
			curUsername: '',
			username: getUsername(),
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
			listQuery: {},
			form: {
				originPwd: '',
				newPwd: '',
				rePwd: ''
			},
			showRanges: false,
			userId: ''
		}
	},
	computed: {},
	methods: {
		loadData(params = this.listQuery) {
			params = {
				...params,
				time: undefined
			}
			getUsers(params).then((response) => {
				this.loading = false
				this.list = response.data
			})
		},
		closeDialog() {
			this.$refs.dialogForm.resetFields()
		},
		change({ id, status, userName, userType }) {
			this.dialogVisible = true
			this.userType = userType
			this.dealerStatus = {
				...this.dealerStatus,
				userId: id,
				status: status === '1' ? '0' : '1',
				userName
			}
		},
		requestChange() {
			this.$refs.dialogForm.validate((valid) => {
				if (valid) {
					if (this.userType === '2') {
						updateXPSStatus({ ...this.dealerStatus, ...this.dialogForm })
							.then((response) => {
								this.loadData()
							})
							.then((_) => {
								this.dialogVisible = false
							})
					} else {
						updateStatus({ ...this.dealerStatus, ...this.dialogForm })
							.then((response) => {
								this.loadData()
							})
							.then((_) => {
								this.dialogVisible = false
							})
					}
				}
			})
		},
		updatePassword(form) {
			return modifyPassword({
				pwd: md5(form.password + this.userName),
				rePwd: md5(form.passwordAgain + this.userName),
				userId: form.id,
				userName: this.userName
			}).then((_) => {
				if (_.code === 200) {
					message({
						message: this.$t('system_component_account_289'),
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
									message({ message: err.message, type: 'error' })
									this.$router.go('/')
								})
						})
					}
				}
			})
		},
		// 设置范围
		setRange(row) {
			console.log('设置范围', row)
			this.userId = row.id
			this.showRanges = true
		},
		closeRangesDialog() {
			this.showRanges = false
			this.userId = ''
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
		handleSearch() {
			const create = this.listQuery.time || []
			const [startTime, endTime] = create
			const params = {
				...this.listQuery,
				startTime: startTime && startTime + '',
				endTime: endTime && endTime + ''
			}
			this.loadData(params)
		},
		handleCurrentChange(val) {
			this.pageIndex = val
			this.$nextTick(() => {
				this.loadData()
			})
		},
		handleReset() {
			this.listQuery = {
				time: undefined,
				cardColourId: undefined, // 纸牌牌色:1、红牌，2、蓝牌
				createdBy: undefined
			}
			this.loadData()
		}
	}
}
</script>
