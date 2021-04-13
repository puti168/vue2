<template>
	<div class="game-container role">
		<div class="flex-h flex-bc">
			<h2 class="h2-line">{{ $t('new_1') }}</h2>
			<div class="flex-h handle">
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-search"
					@click="handleSearch"
				>
					{{ $t('btn.query') }}
				</el-button>
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-refresh"
					@click="handleReset"
				>
					{{ $t('btn.reset') }}
				</el-button>
				<el-button
					v-if="hasPermission('5420')"
					type="primary"
					size="medium"
					icon="el-icon-plus"
					@click.native.prevent="showAddEdit()"
				>
					新增
				</el-button>
				<el-button
					v-if="hasPermission('5440')"
					type="primary"
					size="medium"
					icon="el-icon-circle-plus-outline"
					@click="generateSql"
				>
					生成SQL
				</el-button>
			</div>
		</div>
		<div class="params flex-h flex-bc">
			<el-form ref="form" :inline="true" :model="form">
				<!-- 系统 -->
				<el-form-item :label="$t('label.system')">
					<el-select
						v-model="form.userType"
						size="medium"
						clearable
						style="width:280px;"
					>
						<el-option
							v-for="item in systemList"
							:key="item.itemName"
							:label="item.itemName"
							:value="item.itemCode"
						></el-option>
					</el-select>
				</el-form-item>
				<!-- 权限ID -->
				<el-form-item :label="$t('new_2')">
					<el-input
						v-model="form.id"
						size="medium"
						style="width:280px;"
						:placeholder="$t('message.pleaseEnter')"
						clearable
					></el-input>
				</el-form-item>
				<!-- 权限名称 -->
				<el-form-item :label="$t('new_3')">
					<el-input
						v-model="form.permissionName"
						size="medium"
						style="width:280px;"
						:placeholder="$t('message.pleaseEnter')"
						clearable
					></el-input>
				</el-form-item>
				<!-- 权限类型 -->
				<!-- 权限类型 0 菜单 1 按钮 3 放行 4 数据 -->
				<el-form-item :label="$t('new_4')">
					<el-select
						v-model="form.type"
						size="medium"
						clearable
						style="width:280px;"
					>
						<el-option :label="$t('label.noSelect')" value></el-option>
						<el-option label="菜单" :value="0"></el-option>
						<el-option label="按钮" :value="1"></el-option>
						<el-option label="放行" :value="3"></el-option>
						<el-option label="数据" :value="4"></el-option>
					</el-select>
				</el-form-item>
				<!-- 创建时间 -->
				<el-form-item :label="$t('new_5')">
					<el-date-picker
						v-model="form.time"
						size="medium"
						format="yyyy-MM-dd HH:mm:ss"
						type="datetimerange"
						:picker-options="pickerOptions"
						:default-time="defaultTime"
						:range-separator="$t('placeholder.to')"
						:start-placeholder="$t('placeholder.startTime')"
						:end-placeholder="$t('placeholder.endTime')"
						align="right"
						value-format="timestamp"
					></el-date-picker>
				</el-form-item>
			</el-form>
		</div>
		<div class="content">
			<el-divider></el-divider>
			<el-table
				:data="list"
				style="width: 100%"
				:header-cell-style="getRowClass"
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column
					align="center"
					prop="sysName"
					:label="$t('label.sysName')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="id"
					:label="$t('new_2')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="permissionName"
					:label="$t('new_3')"
				></el-table-column>
				<el-table-column align="center" :label="$t('new_4')">
					<template slot-scope="scope">
						<span>
							{{ typeList[scope.row.type] }}
						</span>
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="idPath"
					:label="$t('new_6')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="createdAt"
					:label="$t('label.times')"
				>
					<template v-if="scope.row.createdAt" slot-scope="scope">
						<span>
							{{ scope.row.createdAt | dateformat('{y}-{m}-{d} {h}:{i}:{s}') }}
						</span>
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					fixed="right"
					:label="$t('tableColumn.operating')"
					width="120"
				>
					<template slot-scope="scope">
						<el-button
							v-if="hasPermission('5450')"
							type="text"
							@click.native.prevent="showAuditDetail(scope.$index, scope.row)"
						>
							{{ $t('btn.view') }}
						</el-button>
						<el-button
							v-if="hasPermission('5430')"
							type="text"
							@click.native.prevent="showAddEdit(scope.row)"
						>
							{{ $t('btn.edit') }}
						</el-button>
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
			<detail
				:drawer.sync="drawer"
				:auditData.sync="dealData"
				@close="closeDetail"
			/>
			<SqlModal
				:drawer.sync="sqlValue"
				:auditData.sync="sqlData"
				@close="closeSql"
			/>
			<addEdit
				:systemList="systemList"
				:addEditType="addEditType"
				:drawer.sync="addEditValue"
				:auditData.sync="addEditData"
				@close="closeAddEdit"
			/>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import {
	systems,
	permissionDetail,
	generateSql,
	permissionList
} from '@/api/audit'
import { getCurrentDate } from '@/utils/index'
import detail from './components/detail'
import addEdit from './components/addEdit'
import SqlModal from './components/generateSql'
export default {
	name: 'SecurityAudit',
	components: { detail, addEdit, SqlModal },
	mixins: [list],
	data() {
		return {
			listLoading: false,
			drawer: false,
			sqlValue: false,
			addEditValue: false,
			addEditType: 'add',
			dealData: {},
			sqlData: {},
			addEditData: {},
			systemList: [],
			multipleSelection: [],
			typeList: ['菜单', '按钮', '', '放行', '数据'],
			list: [],
			form: {
				type: '',
				userType: '-1',
				permissionName: '',
				id: '',
				time: getCurrentDate()
			},
			reSearch: false
		}
	},
	watch: {
		form: {
			handler(val) {
				const { time } = val
				const { type, userName, agentName, operation } = val
				const forms = { type, userName, agentName, operation }
				const para = Object.values(forms).some((key) => {
					return key !== ''
				})
				if (para || time) {
					this.reSearch = true
				} else if (!para && !time && this.reSearch) {
					this.pageIndex = 1
					this.loadData()
					this.reSearch = false
				}
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		loadData() {
			this.listLoading = true
			if ((this.form.userType === '-1')) {
				systems().then((res) => {
					if (res.code === 200) {
						this.systemList = res.data
						this.form.userType = res.data[0].itemCode
						this.loadPermissionList()
					} else {
						this.$message({
							message: this.$t('message.getDataError'),
							type: 'error',
							duration: 1500
						})
					}
				})
			} else {
				this.loadPermissionList()
			}
		},
		loadPermissionList() {
			const create = this.form.time || []
			const [startTime, endTime] = create
			const { id, permissionName, userType, type } = this.form
			const form = { id, permissionName, userType, type }
			const params = {
				startTime: (startTime && startTime + '') || '',
				endTime: (endTime && endTime + '') || '',
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				...form
			}
			permissionList(params).then(
				(response) => {
					this.list = response.data.permissionBOList
					this.total = response.data.totalRecord
					this.listLoading = false
				},
				() => {
					this.listLoading = false
					this.$message({
						message: this.$t('message.getDataError'),
						type: 'error',
						duration: 2000
					})
				}
			)
		},
		handleSearch() {
			this.pageIndex = 1
			this.loadData()
		},
		handleReset() {
			Object.keys(this.form).forEach((key) => {
				this.form[key] = ''
			})
			this.form.time = getCurrentDate()
			this.form.userType = this.systemList[0].itemCode
			this.pageIndex = 1
			this.loadData()
		},
		showAddEdit(row) {
			if (row) {
				const {
					component,
					icon,
					id,
					idPath,
					path,
					orderNum,
					parentId,
					sysName,
					permissionName,
					remark,
					remarkEnglish,
					type,
					userType
				} = row
				this.addEditData = {
					component,
					icon,
					id,
					idPath,
					path,
					orderNum,
					parentId,
					sysName,
					permissionName,
					remark,
					remarkEnglish,
					type,
					userType
				}
				this.addEditType = 'edit'
			} else {
				this.addEditData = {
					userType: this.systemList[0].itemCode,
					icon: '',
					component: '',
					id: '',
					idPath: '',
					orderNum: '',
					parentId: '',
					path: '',
					permissionName: '',
					perms: '',
					remark: '',
					remarkEnglish: '',
					type: '1'
				}
				this.addEditType = 'add'
			}
			this.addEditValue = true
		},
		showAuditDetail(index, row) {
			const { id } = row
			if (!id) {
				this.$message({
					message: this.$t('message.getDataError'),
					type: 'error',
					duration: 1500
				})
				return
			}
			const params = { id }
			permissionDetail(params).then((res) => {
				if (res.code === 200) {
					this.dealData = res.data
					this.drawer = true
				} else {
					this.$message({
						message: this.$t('message.getDataError'),
						type: 'error',
						duration: 1500
					})
				}
			})
		},
		closeDetail() {
			this.drawer = false
			this.dealData = {}
		},
		closeAddEdit() {
			this.addEditValue = false
			this.addEditData = {}
			this.handleSearch()
		},
		handleSelectionChange(val) {
			this.multipleSelection = []
			val.forEach((item) => {
				this.multipleSelection.push(item.id)
			})
		},
		closeSql() {
			this.sqlValue = false
			this.sqlData = {}
		},
		generateSql() {
			if (this.multipleSelection.length === 0) {
				this.$message({
					message: '请至少选择一条数据',
					type: 'error'
				})
				return
			}
			const params = { ids: this.multipleSelection }
			generateSql(params).then((res) => {
				if (res.code === 200) {
					this.sqlData = res.data
					this.sqlValue = true
				} else {
					this.$message({
						message: this.$t('message.getDataError'),
						type: 'error',
						duration: 1500
					})
				}
			})
		}
	}
}
</script>
