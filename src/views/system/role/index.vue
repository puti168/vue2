<template>
	<div class="game-container role">
		<div class="flex-h flex-bc">
			<h2 class="h2-line">角色管理</h2>
			<div class="flex-h handle">
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-search"
					@click="handleSearch"
				>{{ $t('system_component_role_391') }}</el-button>
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-edit"
					@click="handleReset"
				>{{ $t('system_component_role_392') }}</el-button>
			</div>
		</div>
		<div class="params flex-h flex-bc">
			<el-form ref="form" :inline="true" :model="listQuery">
				<el-form-item :label="$t('system_component_role_380')">
					<el-date-picker
						v-model="listQuery.time"
						size="medium"
						format="yyyy-MM-dd"
						type="daterange"
						:picker-options="pickerOptions"
						:default-time="defaultTime"
						:range-separator="$t('dealer_index_212')"
						:start-placeholder="$t('dealer_index_213')"
						:end-placeholder="$t('dealer_index_214')"
						align="right"
						value-format="timestamp"
					></el-date-picker>
				</el-form-item>
				<el-form-item :label="$t('system_component_role_384')">
					<el-select
						v-model="listQuery.status"
						size="medium"
						:placeholder="$t('system_component_role_385')"
						clearable
						style="width:280px;"
					>
						<el-option :label="$t('system_component_role_385')" :value="-1"></el-option>
						<el-option :label="$t('system_component_role_386')" :value="1"></el-option>
						<el-option :label="$t('system_component_role_387')" :value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('system_component_role_388')">
					<el-input
						v-model="listQuery.updatedBy"
						size="medium"
						style="width:280px;"
						:placeholder="$t('system_component_role_389')"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item :label="$t('system_component_role_390')">
					<el-input
						v-model="listQuery.roleName"
						size="medium"
						style="width:280px;"
						:placeholder="$t('system_component_role_390')"
						clearable
					></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="content">
			<div class="head flex-h-end">
				<el-button
					v-if="hasPermission('5331')"
					type="primary"
					size="small"
					icon="el-icon-circle-plus-outline"
					@click="addRole"
				>{{ $t('system_component_role_379') }}</el-button>
			</div>
			<!-- <el-divider></el-divider> -->
			<el-table :data="list" style="width: 100%" :header-cell-style="getRowClass">
				<el-table-column
					align="center"
					type="index"
					:label="$t('system_component_role_393')"
					width="120"
				></el-table-column>
				<el-table-column align="center" prop="roleName" :label="$t('system_component_role_390')"></el-table-column>
				<el-table-column prop="status" :label="$t('system_component_role_384')">
					<template slot-scope="scope">
						<span
							:class="{
								'active-color': scope.row.status === '1',
								'stop-color': scope.row.status === '0'
							}"
						>
							{{
							scope.row.status === '1'
							? $t('system_component_role_386')
							: $t('system_component_role_387')
							}}
						</span>
						<el-switch
							:disabled="
								!hasPermission('5332') || scope.row.roleName === 'admin'
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
					prop="updateTime"
					:label="$t('system_component_role_394')"
					width="160"
				></el-table-column>
				<el-table-column align="center" prop="createBy" :label="$t('system_component_role_388')"></el-table-column>
				<el-table-column
					align="center"
					fixed="right"
					:label="$t('system_component_role_395')"
					min-width="100"
				>
					<template slot-scope="scope">
						<el-button
							v-if="hasPermission('5333') && scope.row.roleName !== '商户后台-超级管理员'"
							type="text"
							size="small"
							@click.native.prevent="editRow(scope.row)"
						>{{ $t('system_component_role_396') }}</el-button>
						<el-button
							v-if="hasPermission('5334') && scope.row.roleName !== '商户后台-超级管理员'"
							type="text"
							size="small"
							@click.native.prevent="popupDelDialog(scope.row, list)"
						>{{ $t('system_component_role_397') }}</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination
				v-if="total > 0"
				:current-page.sync="pageIndex"
				layout="total,sizes,prev,pager,next,jumper"
				:page-sizes="$store.getters.pageSizes"
				:total="total"
				:page-size="pageSize"
				@current-change="handleCurrentChange"
				@size-change="handleSizeChange"
			></el-pagination>
			<EditRole :drawer.sync="drawer" :deal-data.sync="dealData" :is-created.sync="isCreated" />
			<!-- 删除角色 -->
			<el-dialog
				:close-on-click-modal="false"
				:visible.sync="delDialogVisible"
				width="500px"
				center
				:destroy-on-close="true"
				@close="resetDelForm"
			>
				<template slot="title">
					<span>{{ $t('system_component_role_398') }}</span>
					<span class="stop-color">{{ $t('system_component_role_397') }}</span>
					<span>{{ $t('system_component_role_399') }}</span>
				</template>
				<el-form ref="delForm" :model="delForm">
					<el-form-item :label="$t('system_component_role_400')" prop="remark">
						<el-input
							v-model="delForm.remark"
							type="textarea"
							show-word-limit
							maxlength="50"
							rows="4"
							:placeholder="$t('system_component_role_401')"
						></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="delDialogVisible = false">{{ $t('system_component_role_402') }}</el-button>
					<el-button type="primary" @click="deleteRow">{{ $t('system_component_role_403') }}</el-button>
				</span>
			</el-dialog>
		</div>
		<el-dialog
			width="500px"
			:close-on-click-modal="false"
			center
			:visible.sync="dialogVisible"
			:destroy-on-close="true"
			@close="resetDialogForm"
		>
			<template slot="title">
				<div class="center">
					<span>{{ $t('system_component_role_398') }}</span>
					<span
						:class="{
							'active-color': dealerStatus.status === '1',
							'stop-color': dealerStatus.status === '0'
						}"
					>
						{{
						dealerStatus.status === '1'
						? $t('system_component_role_386')
						: $t('system_component_role_387')
						}}
					</span>
					<span>{{ $t('system_component_role_399') }}</span>
				</div>
			</template>
			<el-form ref="dialogForm" :model="dialogForm">
				<el-form-item :label="$t('system_component_role_400')" prop="remark">
					<el-input
						v-model="dialogForm.remark"
						type="textarea"
						maxlength="50"
						:placeholder="$t('system_component_role_401')"
						show-word-limit
						rows="4"
						@input="forceChange($event)"
					></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">{{ $t('system_component_role_402') }}</el-button>
				<el-button type="primary" @click="requestChange">{{ $t('system_component_role_403') }}</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { getRoles, delRole, updateStatus } from '@/api/role'
import EditRole from './EditRole'
import { message } from '@/utils/message'
export default {
	name: 'Role',
	components: { EditRole },
	mixins: [list],
	data() {
		return {
			dialogVisible: false,
			dealerStatus: {},
			dialogForm: {},
			delDialogVisible: false,
			drawer: false,
			isCreated: -1,
			dealData: {},
			list: [],
			listQuery: {},
			form: {
				originPwd: '',
				newPwd: '',
				rePwd: ''
			},
			delForm: {
				id: '',
				remark: ''
			}
		}
	},
	methods: {
		loadData(params = this.listQuery) {
			this.listLoading = true
			params = {
				...this.getParams(params),
				time: undefined
			}
			getRoles(params).then((response) => {
				this.list = response.data.roleList
				this.total = response.data.totalRecord
				this.listLoading = false
			})
		},
		change({ id, status, roleName }) {
			this.dialogVisible = true
			this.dealerStatus = {
				...this.dealerStatus,
				id,
				status: status === '1' ? '0' : '1',
				roleName
			}
		},
		forceChange() {
			this.$forceUpdate()
		},
		requestChange() {
			this.$refs.dialogForm.validate((valid) => {
				if (valid) {
					updateStatus({ ...this.dealerStatus, ...this.dialogForm })
						.then((response) => {
							this.loadData()
						})
						.then((_) => {
							this.dialogVisible = false
						})
				}
			})
		},
		resetDialogForm() {
			this.$refs.dialogForm.resetFields()
		},
		addRole() {
			this.drawer = true
			this.isCreated = 1
			this.dealData = {}
		},
		popupDelDialog(row) {
			this.delForm.id = row.id
			this.delForm.roleName = row.roleName
			this.delDialogVisible = true
		},
		deleteRow({ id }, index, rows) {
			this.$refs.delForm.validate((val) => {
				if (val) {
					delRole(this.delForm).then((_) => {
						if (_ && _.code === 200) {
							message({
								message: this.$t('system_component_role_404'),
								type: 'success'
							})
							this.delDialogVisible = false
							this.loadData()
						}
					})
				}
			})
		},
		resetDelForm() {
			this.$refs.delForm.resetFields()
		},
		editRow(data) {
			this.drawer = true
			this.dealData = data
			this.isCreated = 0
		},
		editRow1(index, row) {
			this.drawer = true
			this.roleData = row
			if (this.permissions.length === 0) this.getRoleManagePermissions()
			this.$api.roleManageRoleDetail({ id: row.id }).then((res) => {
				if (res.code === 200) {
					const currentPermissions = []
					res.data.assignedPermissions &&
						res.data.assignedPermissions.forEach((element) => {
							if (element.isExist === '1' && element.type !== '0') {
								currentPermissions.push(element.id)
							}
						})
					this.currentPermissions = currentPermissions
				}
			})
		},
		handleSearch() {
			const create = this.listQuery.time || []
			const [startTime, endTime] = create
			const params = {
				...this.listQuery,
				pageIndex: 1,
				startTime: startTime && startTime + '',
				endTime: endTime && endTime + ''
			}
			this.loadData(params)
		},
		handleCurrentChange() {
			this.loadData()
		},
		handleReset() {
			this.listQuery = {
				time: undefined,
				cardColourId: undefined, // 纸牌牌色:1、红牌，2、蓝牌
				createdBy: undefined
			}
			this.loadData({ pageIndex: 1 })
		}
	}
}
</script>
