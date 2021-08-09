<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="虚拟币账号地址:">
						<el-input
							v-model="queryData.virtualAddress"
							maxlength="100"
							size="medium"
							style="width: 228px"
							placeholder="请输入"
							:disabled="loading"
							name="virtualAddress"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="虚拟币种类:">
						<el-select
							v-model="queryData.virtualCoinKind"
							style="width: 255px"
							multiple
							placeholder="默认选择全部"
							:popper-append-to-body="false"
							clearable
						>
							<el-option
								v-for="item in virtualType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="虚拟币协议:">
						<el-select
							v-model="queryData.virtualAgreement"
							style="width: 240px"
							multiple
							placeholder="默认选择全部"
							:popper-append-to-body="false"
							collapse-tags
							clearable
						>
							<el-option
								v-for="item in virtualProtocolType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="绑定状态:">
						<el-select
							v-model="queryData.bindStatus"
							clearable
							style="width: 200px"
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in bindStatusType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="黑名单状态:">
						<el-select
							v-model="queryData.blackStatus"
							style="width: 175px"
							clearable
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in blackStatusType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="风控层级:" class="tagheight">
						<el-select
							v-model="queryData.windControlId"
							style="width: 270px"
							multiple
							placeholder="默认选择全部"
							:popper-append-to-body="false"
							clearable
						>
							<el-option
								v-for="item in vipDict"
								:key="item.windControlId"
								:label="item.windControlName"
								:value="item.windControlId"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="当前绑定会员账号:">
						<el-input
							v-model="queryData.bindUserName"
							clearable
							maxlength="11"
							size="medium"
							style="width: 212px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="会员姓名:" label-width="87px">
						<el-input
							v-model="queryData.userName"
							clearable
							maxlength="15"
							size="medium"
							style="width: 240px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="操作人:" label-width="71px">
						<el-input
							v-model="queryData.lastOperator"
							clearable
							maxlength="20"
							size="medium"
							style="width: 200px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="绑定账号次数:">
						<el-input
							v-model="queryData.bindAccountCount"
							maxlength="10"
							size="medium"
							style="width: 161px"
							placeholder="请输入"
							:disabled="loading"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="queryData.bindAccountCount = $event.target.value"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="会员提款被拒次数:">
						<el-input
							v-model="queryData.userWithdrawRefuseMinCount"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
							maxlength="10"
							name="userWithdrawRefuseMinCount"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
						-
						<el-input
							v-model="queryData.userWithdrawRefuseMaxCount"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
							maxlength="10"
							name="userWithdrawRefuseMaxCount"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
					</el-form-item>
					<el-form-item label="会员提款成功次数:">
						<el-input
							v-model="queryData.userWithdrawSuccessMinCount"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
							maxlength="10"
							name="userWithdrawSuccessMinCount"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
						-
						<el-input
							v-model="queryData.userWithdrawSuccessMaxCount"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
							maxlength="10"
							name="userWithdrawSuccessMaxCount"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
					</el-form-item>
					<el-form-item label="会员提款总金额:">
						<el-input
							v-model="queryData.userWithdrawMinAmount"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
							maxlength="10"
							name="userWithdrawMinAmount"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
						-
						<el-input
							v-model="queryData.userWithdrawMaxAmount"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
							maxlength="10"
							name="userWithdrawMaxAmount"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
					</el-form-item>

					<el-form-item label="代理提款被拒次数:">
						<el-input
							v-model="queryData.proxyWithdrawRefuseMinCount"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
							maxlength="10"
							name="proxyWithdrawRefuseMinCount"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
						-
						<el-input
							v-model="queryData.proxyWithdrawRefuseMaxCount"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
							maxlength="10"
							name="proxyWithdrawRefuseMaxCount"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
					</el-form-item>
					<el-form-item label="代理提款成功次数:">
						<el-input
							v-model="queryData.proxyWithdrawSuccessMinCount"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
							maxlength="10"
							name="proxyWithdrawSuccessMinCount"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
						-
						<el-input
							v-model="queryData.proxyWithdrawSuccessMaxCount"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
							maxlength="10"
							name="proxyWithdrawSuccessMaxCount"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
					</el-form-item>
					<el-form-item label="代理提款总金额:">
						<el-input
							v-model="queryData.proxyWithdrawMinAmount"
							size="medium"
							placeholder="最小数值"
							style="width: 107px"
							maxlength="10"
							name="proxyWithdrawMinAmount"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
						-
						<el-input
							v-model="queryData.proxyWithdrawMaxAmount"
							size="medium"
							placeholder="最大数值"
							style="width: 107px"
							maxlength="10"
							name="proxyWithdrawMaxAmount"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
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
					</el-form-item>
				</el-form>
			</div>
			<div class="content">
				<el-table
					v-loading="loading"
					border
					size="mini"
					class="small-size-table"
					:data="tableData"
					style="width: 100%"
					:header-cell-style="getRowClass"
					@sort-change="_changeTableSort"
				>
					<el-table-column
						prop="virtualAddress"
						align="center"
						width="240"
						label="虚拟币账号地址"
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.virtualAddress"
								:title="scope.row.virtualAddress"
								:copy="copy"
							>
								{{ scope.row.virtualAddress }}
							</Copy>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="virtualKind" align="center" width="150">
						<template slot="header">
							虚拟币种类
							<br />
							虚拟币协议
						</template>
						<template slot-scope="scope">
							{{ scope.row.virtualKind || '-' }}
							<br />
							{{ scope.row.virtualProtocol || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="blacklistStatus"
						align="center"
						label="黑名单状态"
						width="150"
					>
						<template slot="header" slot-scope="scope">
							<el-popover
								placement="top-start"
								title="提示"
								width="280"
								trigger="hover"
							>
								<div v-if="!scope.row">
									<p>
										启用中：如该卡待绑定则会员可对银行卡进行绑定操作，代理可对该卡进行提款
									</p>
									<p>
										禁用中：会员看不到该卡信息，也无法对该卡进行绑定操作；代理无法对该卡进行提款
									</p>
								</div>
								<div slot="reference" class="el-icon-question">
									<span class="other-class">黑名单状态</span>
								</div>
							</el-popover>
						</template>
						<template slot-scope="scope">
							<span v-if="scope.row.blacklistStatus === 0" class="disableRgba">
								{{ typeFilter(scope.row.blacklistStatus, 'blackStatusType') }}
							</span>
							<span
								v-else-if="scope.row.blacklistStatus === 1"
								class="normalRgba"
							>
								{{ typeFilter(scope.row.blacklistStatus, 'blackStatusType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="bindStatus"
						align="center"
						label="绑定状态"
						width="130"
					>
						<template slot="header" slot-scope="scope">
							<el-popover
								placement="top-start"
								title="提示"
								width="280"
								trigger="hover"
							>
								<div v-if="!scope.row">
									<p>绑定中：会员不可对银行卡进行绑定操作</p>
									<p>待绑定：如该卡启用中，会员则可以对该卡进行绑定；</p>
								</div>
								<div slot="reference" class="el-icon-question">
									<span class="other-class">绑定状态</span>
								</div>
							</el-popover>
						</template>
						<template slot-scope="scope">
							<span v-if="scope.row.bindStatus === 0" class="disableRgba">
								{{ typeFilter(scope.row.bindStatus, 'bindStatusType') }}
							</span>
							<span v-else-if="scope.row.bindStatus === 1" class="normalRgba">
								{{ typeFilter(scope.row.bindStatus, 'bindStatusType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="windControlName"
						align="center"
						label="风控层级"
						width="150"
					>
						<template slot-scope="scope">
							{{ scope.row.windControlName || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="bindNum"
						align="center"
						label="绑定账号次数"
						width="180"
					>
						<template slot="header" slot-scope="scope">
							<el-popover
								placement="top-start"
								title="提示"
								width="280"
								trigger="hover"
							>
								<div v-if="!scope.row">
									<p>绑定的用户数量，去重计算</p>
								</div>
								<div slot="reference" class="el-icon-question">
									<span class="other-class">绑定账号次数</span>
								</div>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column prop="bindUserName" align="center" width="120">
						<template slot="header">
							当前绑定会员账号
							<br />
							会员姓名
						</template>
						<template slot-scope="scope">
							<span>
								{{ scope.row.bindUserName || '-' }}
							</span>
							<br />
							<span>
								{{ scope.row.realName || '-' }}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="withdrawalSuccessNum"
						align="center"
						width="120"
					>
						<template slot="header">
							会员提款成功次数
							<br />
							会员提款被拒次数
						</template>
						<template slot-scope="scope">
							<span>
								{{ scope.row.withdrawalSuccessNum || '-' }}
							</span>
							<br />
							<span>
								{{ scope.row.withdrawalFailNum || '-' }}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="withdrawalTotalAmount"
						align="center"
						label="会员提款总金额"
						width="120px"
					>
						<template slot-scope="scope">
							{{ scope.row.withdrawalTotalAmount || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="proxyWithdrawalSuccessNum"
						align="center"
						width="120"
					>
						<template slot="header">
							代理提款成功次数
							<br />
							代理提款被拒次数
						</template>
						<template slot-scope="scope">
							<span>
								{{ scope.row.proxyWithdrawalSuccessNum || '-' }}
							</span>
							<br />
							<span>
								{{ scope.row.proxyWithdrawalFailNum || '-' }}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="proxyWithdrawalTotalAmount"
						align="center"
						label="代理提款总金额"
						width="120"
					>
						<template slot-scope="scope">
							{{ scope.row.proxyWithdrawalTotalAmount || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="createdAt"
						align="center"
						label="银行卡新增时间"
						sortable="custom"
						width="160"
					>
						<template slot-scope="scope">
							{{ scope.row.createdAt || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="withdrawalTime"
						align="center"
						label="最近提款时间"
						width="160"
						sortable="custom"
					>
						<template slot-scope="scope">
							{{ scope.row.withdrawalTime || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="updatedBy"
						align="center"
						label="最近操作人"
						width="120"
					>
						<template slot-scope="scope">
							{{ scope.row.updatedBy || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="updatedAt"
						align="center"
						label="最近操作时间"
						width="160"
						sortable="custom"
					>
						<template slot-scope="scope">
							{{ scope.row.updatedAt || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="operation"
						align="center"
						label="操作"
						width="160"
					>
						<template slot-scope="scope">
							<el-button
								v-if="hasPermission('245')"
								:type="scope.row.blacklistStatus === 0 ? 'success' : 'danger'"
								size="medium"
								@click="
									eidtDialog(
										scope.row.blacklistStatus === 0 ? '开启' : '禁用',
										scope.row
									)
								"
							>
								{{ scope.row.blacklistStatus === 0 ? '开启' : '禁用' }}
							</el-button>
							<el-button
								v-show="scope.row.bindStatus === 1"
								type="warning"
								size="medium"
								@click="eidtDialog('解绑', scope.row)"
							>
								解绑
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					:current-page.sync="pageNum"
					class="pageValue"
					background
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
			:title="moduleBox"
			center
			:visible.sync="editVisible"
			width="520px"
		>
			<el-form
				ref="editForm"
				:model="editData"
				label-width="105px"
				@submit.native.prevent="enterSearch"
			>
				<el-form-item
					v-if="moduleBox === '状态变更'"
					label="黑名单状态："
					prop="deviceType"
				>
					<el-select
						v-model="editData.status"
						placeholder="请选择"
						@change="changeAccountStatus"
					>
						<el-option
							v-for="item in blackStatusType"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="备注信息："
					prop="remark"
					:rules="[
						{ required: true, message: '请输入备注信息', trigger: 'blur' },
						{
							min: 2,
							max: 50,
							message: '长度在 2 到 50 个字符',
							trigger: 'blur'
						}
					]"
				>
					<el-input
						v-model="editData.remark"
						:maxlength="50"
						type="textarea"
						show-word-limit
						placeholder="请输入 2 到 50个字符"
					></el-input>
				</el-form-item>
				<el-form-item v-if="moduleBox === '解除绑定'">
					<el-checkbox v-model="checked">
						将该地址变更为黑名单禁用状态
					</el-checkbox>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button
					type="primary"
					:disabled="submitEditDisabled"
					@click="submitEdit"
				>
					确 定
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
export default {
	name: routerNames.VirtualManage,
	mixins: [list],
	data() {
		this.search = this.throttle(this.search, 1000)
		this.reset = this.throttle(this.reset, 1000)
		return {
			queryData: {},
			tableData: [],
			dataList: {},
			moduleBox: '',
			editVisible: false,
			editData: { status: '', remark: '' },
			checked: false,
			vipDict: [],
			submitEditDisabled: false
		}
	},
	computed: {
		virtualProtocolType() {
			return this.globalDics.virtualProtocolType || []
		},
		virtualType() {
			return this.globalDics.virtualType || []
		},
		blackStatusType() {
			return this.globalDics.blackStatusType || []
		},
		bindStatusType() {
			return this.globalDics.bindStatusType || []
		}
	},
	mounted() {
		this.getWindControllerLevelDict()
	},
	methods: {
		getWindControllerLevelDict() {
			this.$api
				.getWindControllerLevelDict({ windControlType: 4 })
				.then((res) => {
					if (res && res.code === 200) {
						this.vipDict = res.data
					} else {
						this.vipDict = []
					}
				})
		},
		loadData() {
			this.loading = true
			let params = {
				...this.queryData,
				dataType: 2
			}
			params = {
				...this.getParams(params)
			}
			this.$api
				.getListUserBankAndVirtual(params)
				.then((res) => {
					this.loading = false
					const {
						code,
						data: { record, totalRecord },
						msg
					} = res
					if (res && code && code === 200) {
						this.tableData =
							(res.data && record.length && Object.freeze(record)) || []
						this.total = (res.data && totalRecord) || 0
					} else {
						this.$message({
							message: res && msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		reset() {
			this.queryData = {}
			this.pageNum = 1
			this.loadData()
		},
		eidtDialog(text, val) {
			this.submitEditDisabled = false
			this.editData.remark = ''
			if (text === '开启' || text === '禁用') {
				this.moduleBox = '状态变更'
				this.editData.dataType = 2
				this.editData.id = val.id
				this.editData.userId = val.userId
				this.editData.status = val.blacklistStatus + ''
			} else {
				this.moduleBox = '解除绑定'
				this.editData.dataType = 2
				this.editData.id = val.id
				this.editData.userId = val.userId
				console.log(val.bindStatus === 1)
				this.checked = val.blacklistStatus === 0
			}
			this.$nextTick(() => {
				this.editVisible = true
			})
			console.log(text, val)
		},
		changeAccountStatus(val) {
			this.editData.status = val + ''
			console.log(val)
		},
		submitEdit() {
			const params = { ...this.editData }
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					this.submitEditDisabled = true
					if (this.moduleBox === '状态变更') {
						params.status = params.status * 1
						this.$api
							.setUpdateUserBankAndVirtualStatus(params)
							.then((res) => {
								if (res.code === 200) {
									this.$message.success('修改成功')
									this.editVisible = false
									this.pageNum = 1
									setTimeout(() => {
										this.loadData()
									}, 500)
								}
							})
							.catch(() => {})
					} else {
						delete params.status
						params.bindStatus = 0
						if (this.checked) {
							params.blacklistStatus = 0
						} else {
							params.blacklistStatus = 1
						}
						this.$api
							.setUpdateUserBankAndVirtualBindStatus(params)
							.then((res) => {
								if (res.code === 200) {
									this.$message.success('解绑成功')
									this.editVisible = false
									this.pageNum = 1
									setTimeout(() => {
										this.loadData()
									}, 500)
								}
							})
							.catch(() => {})
					}
				}
			})
		},
		cancel() {
			this.editData.remark = ''
			this.editVisible = false
		},
		_changeTableSort({ column, prop, order }) {
			if (prop === 'createdAt') {
				prop = 1
			}
			if (prop === 'withdrawalTime') {
				prop = 2
			}
			if (prop === 'updatedAt') {
				prop = 3
			}
			this.pageNum = 1
			this.queryData.orderKey = prop
			if (order === 'ascending') {
				// 升序
				this.queryData.orderType = 'asc'
			} else if (order === 'descending') {
				// 降序
				this.queryData.orderType = 'desc'
			} else {
				delete this.queryData.orderKey
				delete this.queryData.orderType
			}
			this.loadData()
		},
		checkValue(e) {
			const { name, value } = e.target
			switch (name) {
				case 'userWithdrawRefuseMinCount':
					if (
						!!this.queryData.userWithdrawRefuseMaxCount &&
						value &&
						value * 1 > this.queryData.userWithdrawRefuseMaxCount * 1
					) {
						this.$message({
							type: 'warning',
							message: `会员提款被拒次数最小值不能大于最大值`
						})
						this.queryData.userWithdrawRefuseMinCount = ''
					} else {
						this.queryData.userWithdrawRefuseMinCount = value
					}
					break
				case 'userWithdrawRefuseMaxCount':
					if (
						!!this.queryData.userWithdrawRefuseMinCount &&
						value &&
						value * 1 < this.queryData.userWithdrawRefuseMinCount * 1
					) {
						this.$message({
							type: 'warning',
							message: `会员提款被拒次数最大值不能小于最小值`
						})
						this.queryData.userWithdrawRefuseMaxCount = ''
					} else {
						this.queryData.userWithdrawRefuseMaxCount = value
					}
					break
				case 'userWithdrawSuccessMinCount':
					if (
						!!this.queryData.userWithdrawSuccessMaxCount &&
						value &&
						value * 1 > this.queryData.userWithdrawSuccessMaxCount * 1
					) {
						this.$message({
							type: 'warning',
							message: `会员提款成功次数最小值不能大于最大值`
						})
						this.queryData.userWithdrawSuccessMinCount = ''
					} else {
						this.queryData.userWithdrawSuccessMinCount = value
					}
					break
				case 'userWithdrawSuccessMaxCount':
					if (
						!!this.queryData.userWithdrawSuccessMinCount &&
						value &&
						value * 1 < this.queryData.userWithdrawSuccessMinCount * 1
					) {
						this.$message({
							type: 'warning',
							message: `会员提款成功次数最大值不能小于最小值`
						})
						this.queryData.userWithdrawSuccessMaxCount = ''
					} else {
						this.queryData.userWithdrawSuccessMaxCount = value
					}
					break
				case 'userWithdrawMinAmount':
					if (
						!!this.queryData.userWithdrawMaxAmount &&
						value &&
						value * 1 > this.queryData.userWithdrawMaxAmount * 1
					) {
						this.$message({
							type: 'warning',
							message: `会员提款总金额最小值不能大于最大值`
						})
						this.queryData.userWithdrawMinAmount = ''
					} else {
						this.queryData.userWithdrawMinAmount = value
					}
					break
				case 'userWithdrawMaxAmount':
					if (
						!!this.queryData.userWithdrawMinAmount &&
						value &&
						value * 1 < this.queryData.userWithdrawMinAmount * 1
					) {
						this.$message({
							type: 'warning',
							message: `会员提款总金额最大值不能小于最小值`
						})
						this.queryData.userWithdrawMaxAmount = ''
					} else {
						this.queryData.userWithdrawMaxAmount = value
					}
					break

				case 'proxyWithdrawRefuseMinCount':
					if (
						!!this.queryData.proxyWithdrawRefuseMaxCount &&
						value &&
						value * 1 > this.queryData.proxyWithdrawRefuseMaxCount * 1
					) {
						this.$message({
							type: 'warning',
							message: `代理提款被拒次数最小值不能大于最大值`
						})
						this.queryData.proxyWithdrawRefuseMinCount = ''
					} else {
						this.queryData.proxyWithdrawRefuseMinCount = value
					}
					break
				case 'proxyWithdrawRefuseMaxCount':
					if (
						!!this.queryData.proxyWithdrawRefuseMinCount &&
						value &&
						value * 1 < this.queryData.proxyWithdrawRefuseMinCount * 1
					) {
						this.$message({
							type: 'warning',
							message: `代理提款被拒次数最大值不能小于最小值`
						})
						this.queryData.proxyWithdrawRefuseMaxCount = ''
					} else {
						this.queryData.proxyWithdrawRefuseMaxCount = value
					}
					break
				case 'proxyWithdrawSuccessMinCount':
					if (
						!!this.queryData.proxyWithdrawSuccessMaxCount &&
						value &&
						value * 1 > this.queryData.proxyWithdrawSuccessMaxCount * 1
					) {
						this.$message({
							type: 'warning',
							message: `代理提款成功次数最小值不能大于最大值`
						})
						this.queryData.proxyWithdrawSuccessMinCount = ''
					} else {
						this.queryData.proxyWithdrawSuccessMinCount = value
					}
					break
				case 'proxyWithdrawSuccessMaxCount':
					if (
						!!this.queryData.proxyWithdrawSuccessMinCount &&
						value &&
						value * 1 < this.queryData.proxyWithdrawSuccessMinCount * 1
					) {
						this.$message({
							type: 'warning',
							message: `代理提款成功次数最大值不能小于最小值`
						})
						this.queryData.proxyWithdrawSuccessMaxCount = ''
					} else {
						this.queryData.proxyWithdrawSuccessMaxCount = value
					}
					break
				case 'proxyWithdrawMinAmount':
					if (
						!!this.queryData.proxyWithdrawMaxAmount &&
						value &&
						value * 1 > this.queryData.proxyWithdrawMaxAmount * 1
					) {
						this.$message({
							type: 'warning',
							message: `代理提款总金额最小值不能大于最大值`
						})
						this.queryData.proxyWithdrawMinAmount = ''
					} else {
						this.queryData.proxyWithdrawMinAmount = value
					}
					break
				case 'proxyWithdrawMaxAmount':
					if (
						!!this.queryData.proxyWithdrawMinAmount &&
						value &&
						value * 1 < this.queryData.proxyWithdrawMinAmount * 1
					) {
						this.$message({
							type: 'warning',
							message: `代理提款总金额最大值不能小于最小值`
						})
						this.queryData.proxyWithdrawMaxAmount = ''
					} else {
						this.queryData.proxyWithdrawMaxAmount = value
					}
					break
			}
		},
		enterSearch() {
			this.loadData()
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
/deep/ .tagheight .el-tag {
	height: 24px;
	line-height: 24px;
	min-width: 60px;
}
</style>
