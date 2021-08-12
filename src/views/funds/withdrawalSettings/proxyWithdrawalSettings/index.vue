<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="head flex-h-end">
				<el-button
					v-if="hasPermission('257')"
					type="primary"
					style="padding: 0 15px"
					:disabled="loading"
					size="medium"
					@click="addLabel"
				>
					新增代理提款设置
				</el-button>
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
				>
					<el-table-column
						align="center"
						label="序号"
						type="index"
						width="80"
					></el-table-column>
					<el-table-column
						prop="operating"
						align="center"
						label="操作"
						width="110"
					>
						<template slot-scope="scope">
							<el-link
								v-if="hasPermission('258')"
								type="primary"
								size="medium"
								@click="edit(scope.row)"
							>
								修改
							</el-link>
							<el-link
								v-if="
									scope.row.withdrawStatus !== 0 &&
										scope.row.proxyAccount !== '0' &&
										hasPermission('259')
								"
								type="primary"
								size="medium"
								@click="deleteLabel(scope.row)"
							>
								删除
							</el-link>
						</template>
					</el-table-column>
					<el-table-column
						prop="withdrawStatus"
						align="center"
						label="状态"
						width="110"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.withdrawStatus === 0">开启</span>
							<span v-else-if="scope.row.withdrawStatus === 1">关闭</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="proxyAccount"
						align="center"
						label="代理账号"
						width="120"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.proxyAccount === '0'">通用</span>
							<span v-else>{{ scope.row.proxyAccount }}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="proxyName"
						align="center"
						label="代理姓名"
						width="120"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.proxyName === '0'">-</span>
							<span v-else>{{ scope.row.proxyName }}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="proxyAccountType"
						align="center"
						label="代理类型"
						width="120"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.proxyAccount === '0'">-</span>
							<span v-else>
								{{
									typeFilter(scope.row.proxyAccountType, 'accountType')
										? typeFilter(scope.row.proxyAccountType, 'accountType')
										: '-'
								}}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="proxyAccountStatus"
						align="center"
						label="代理状态"
						width="110"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.proxyAccount === '0'">-</span>
							<span v-else>
								{{
									typeFilter(scope.row.proxyAccountStatus, 'accountStatusType')
										? typeFilter(
												scope.row.proxyAccountStatus,
												'accountStatusType'
										  )
										: '-'
								}}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="windControlName"
						align="center"
						label="风控层级"
						width="110"
					>
						<template slot-scope="scope">
							{{ scope.row.windControlName || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="bankCardMinAmount"
						align="center"
						label="银行卡单次提款最低限额"
						width="170"
					>
						<template slot-scope="scope">
							{{ scope.row.bankCardMinAmount || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="bankCardMaxAmount"
						align="center"
						label="银行卡单次提款最高限额"
						width="170"
					>
						<template slot-scope="scope">
							{{ scope.row.bankCardMaxAmount || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="virtualCardMinAmount"
						align="center"
						label="虚拟币单次提款最低限额"
						width="170"
					>
						<template slot-scope="scope">
							{{ scope.row.virtualCardMinAmount || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="virtualCardMaxAmount"
						align="center"
						label="虚拟币单次提款最高限额"
						width="170"
					>
						<template slot-scope="scope">
							{{ scope.row.virtualCardMaxAmount || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="dateTotalNum"
						align="center"
						label="单日提款总次数"
						width="130"
					>
						<template slot-scope="scope">
							{{ scope.row.dateTotalNum || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="dateMaxAmount"
						align="center"
						label="单日提款总额度"
						width="130"
					>
						<template slot-scope="scope">
							{{ scope.row.dateMaxAmount || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="bigAmount"
						align="center"
						label="大额提现标记金额"
						width="140"
					>
						<template slot-scope="scope">
							{{ scope.row.bigAmount || '-' }}
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
			<el-dialog
				:visible.sync="dialogFormVisible"
				:destroy-on-close="true"
				width="915px"
			>
				<div class="form-header">
					<span class="fontSize">{{ titel }}代理提款设置</span>
					<span>
						<code style="color: #ff3b30">*</code>
						为必填项
					</span>
				</div>
				<el-form
					v-if="isUniversal"
					ref="formProxy"
					:inline="true"
					class="information"
					:model="queryData"
					label-width="92px"
				>
					<h3>代理信息</h3>
					<el-form-item
						prop="proxyAccount"
						class="proxyItem"
						label="代理账号："
						:rules="[
							{ required: true, message: '请输入代理账号', trigger: 'blur' },
							{
								min: 1,
								max: 11,
								message: '长度在 1 到 11 个字符',
								trigger: 'blur'
							}
						]"
					>
						<el-input
							v-model="queryData.proxyAccount"
							:disabled="isDisabled"
							class="proxyInput"
							maxlength="11"
							@keyup.enter.native="enterSearch"
							@blur="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="代理姓名：" class="proxyItem">
						<el-input
							v-model="queryData.proxyName"
							disabled
							class="proxyInput"
						></el-input>
					</el-form-item>
					<el-form-item label="代理类型：" class="proxyItem">
						<el-select
							v-model="queryData.accountType"
							disabled
							class="proxyInput"
							placeholder=""
						>
							<el-option
								v-for="item in accountType"
								:key="item.description"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="代理状态：" class="proxyItem">
						<el-select
							v-model="queryData.accountStatus"
							disabled
							class="proxyInput"
							placeholder=""
						>
							<el-option
								v-for="item in accountStatusType"
								:key="item.description"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="风控层级：" class="proxyItem">
						<el-input
							v-model="queryData.windControlName"
							disabled
							class="proxyInput"
						></el-input>
					</el-form-item>
				</el-form>
				<el-form
					ref="formSub"
					:rules="rules"
					:inline="true"
					class="information"
					:model="dialogForm"
				>
					<h3>提款配置</h3>
					<el-form-item
						label="银行卡单次提款最低限额："
						prop="bankCardMinAmount"
						class="proxyItem"
						label-width="190px"
					>
						<el-input-number
							v-model="dialogForm.bankCardMinAmount"
							class="setInput"
							:min="0"
							:precision="0"
							placeholder="请输入，0为不限制"
						></el-input-number>
						<span>元</span>
					</el-form-item>
					<el-form-item
						label="银行卡单次提款最高限额："
						prop="bankCardMaxAmount"
						class="proxyItem"
						label-width="190px"
					>
						<el-input-number
							v-model="dialogForm.bankCardMaxAmount"
							class="setInput"
							:min="0"
							:precision="0"
							placeholder="请输入，0为不限制"
						></el-input-number>
						<span>元</span>
					</el-form-item>
					<el-form-item
						label="虚拟币单次提款最低限额："
						prop="virtualCardMinAmount"
						class="proxyItem"
						label-width="190px"
					>
						<el-input-number
							v-model="dialogForm.virtualCardMinAmount"
							class="setInput"
							:min="0"
							:precision="0"
							placeholder="请输入，0为不限制"
						></el-input-number>
						<span>元</span>
					</el-form-item>
					<el-form-item
						label="虚拟币单次提款最高限额："
						prop="virtualCardMaxAmount"
						class="proxyItem"
						label-width="190px"
					>
						<el-input-number
							v-model="dialogForm.virtualCardMaxAmount"
							class="setInput"
							:min="0"
							:precision="0"
							placeholder="请输入，0为不限制"
						></el-input-number>
						<span>元</span>
					</el-form-item>
					<el-form-item
						label="单日最高提款次数："
						prop="dateTotalNum"
						class="proxyItem"
						label-width="190px"
					>
						<el-input-number
							v-model="dialogForm.dateTotalNum"
							class="setInput"
							:min="0"
							:precision="0"
							placeholder="请输入，0为不限制"
						></el-input-number>
						<span>次</span>
					</el-form-item>
					<el-form-item
						label="单日最高提款总额："
						prop="dateMaxAmount"
						class="proxyItem"
						label-width="190px"
					>
						<el-input-number
							v-model="dialogForm.dateMaxAmount"
							class="setInput"
							:min="0"
							:precision="0"
							placeholder="请输入，0为不限制"
						></el-input-number>
						<span>元</span>
					</el-form-item>
					<el-form-item
						label="大额提款标记金额："
						prop="bigAmount"
						class="proxyItem"
						label-width="190px"
					>
						<el-input-number
							v-model="dialogForm.bigAmount"
							class="setInput"
							:min="0"
							:precision="0"
							placeholder="请输入，0为不限制"
						></el-input-number>
						<span>元</span>
					</el-form-item>
					<el-form-item
						label="状态："
						prop="withdrawStatus"
						style="width: 100%; padding-left: 15px"
						label-width="190px"
					>
						<el-select
							v-model="dialogForm.withdrawStatus"
							class="setInput"
							:disabled="dialogForm.proxyAccount === '0'"
							:popper-append-to-body="false"
						>
							<el-option label="开启" :value="0"></el-option>
							<el-option label="关闭" :value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div slot="footer" style="text-align: center" class="dialog-footer">
					<el-button
						type="primary"
						icon="el-icon-search"
						:disabled="loading"
						size="medium"
						@click="subAddOrEidt"
					>
						提交
					</el-button>
					<el-button @click="reset">重置</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
export default {
	name: routerNames.gameLabel,
	components: {},
	mixins: [list],
	data() {
		return {
			queryData: {},
			tableData: [],
			dialogFormVisible: false,
			dialogForm: {
				bankCardMinAmount: 0,
				bankCardMaxAmount: 0,
				virtualCardMinAmount: 0,
				virtualCardMaxAmount: 0,
				dateTotalNum: 0,
				dateMaxAmount: 0,
				bigAmount: 0,
				withdrawStatus: 0
			},
			titel: '',
			isDisabled: true,
			isUniversal: true,
			withdrawStatus: ''
		}
	},
	computed: {
		accountType() {
			return this.globalDics.accountType
		},
		accountStatusType() {
			return this.globalDics.accountStatusType
		},

		rules() {
			const bankCardMinAmountRules = (rule, value, callback) => {
				console.log(value)
				if (!Number.isInteger(value) || value < 0) {
					callback(new Error('请输入金额'))
				} else if (value > this.dialogForm.bankCardMaxAmount) {
					callback(new Error('不能大于银行卡单次提款最高额度，请重新输入'))
				} else if (value > this.dialogForm.dateMaxAmount) {
					callback(new Error('不能大于单日最高提款总额，请重新输入'))
				} else {
					callback()
				}
			}
			const bankCardMaxAmountRules = (rule, value, callback) => {
				console.log(value)
				if (!Number.isInteger(value) || value < 0) {
					callback(new Error('请输入金额'))
				} else if (value < this.dialogForm.bankCardMinAmount) {
					callback(new Error('不能小于银行卡单次提款最低额度，请重新输入'))
				} else if (value > this.dialogForm.dateMaxAmount) {
					callback(new Error('不能大于单日最高提款总额，请重新输入'))
				} else {
					callback()
				}
			}
			const virtualCardMinAmountRules = (rule, value, callback) => {
				console.log(value)
				if (!Number.isInteger(value) || value < 0) {
					callback(new Error('请输入金额'))
				} else if (value > this.dialogForm.virtualCardMaxAmount) {
					callback(new Error('不能大于虚拟币单次提款最高额度，请重新输入'))
				} else if (value > this.dialogForm.dateMaxAmount) {
					callback(new Error('不能大于单日最高提款总额，请重新输入'))
				} else {
					callback()
				}
			}
			const virtualCardMaxAmountRules = (rule, value, callback) => {
				console.log(value)
				if (!Number.isInteger(value) || value < 0) {
					callback(new Error('请输入金额'))
				} else if (value < this.dialogForm.virtualCardMinAmount) {
					callback(new Error('不能小于虚拟币单次提款最低额度，请重新输入'))
				} else if (value > this.dialogForm.dateMaxAmount) {
					callback(new Error('不能大于单日最高提款总额，请重新输入'))
				} else {
					callback()
				}
			}
			const dateMaxAmountRules = (rule, value, callback) => {
				console.log(value)
				if (!Number.isInteger(value) || value < 0) {
					callback(new Error('请输入金额'))
				} else if (value < this.dialogForm.bankCardMinAmount) {
					callback(new Error('不能小于银行卡单次提款最低限额，请重新输入'))
				} else if (value < this.dialogForm.bankCardMaxAmount) {
					callback(new Error('不能小于银行卡单次提款最高限额，请重新输入'))
				} else if (value < this.dialogForm.virtualCardMinAmount) {
					callback(new Error('不能小于虚拟币单次提款最低限额，请重新输入'))
				} else if (value < this.dialogForm.virtualCardMaxAmount) {
					callback(new Error('不能小于虚拟币单次提款最高限额，请重新输入'))
				} else if (value < this.dialogForm.bigAmount) {
					callback(new Error('不能小于大额提款标记金额，请重新输入'))
				} else {
					callback()
				}
			}
			const bigAmountRules = (rule, value, callback) => {
				console.log(value)
				if (!Number.isInteger(value) || value < 0) {
					callback(new Error('请输入金额'))
				} else if (value > this.dialogForm.dateMaxAmount) {
					callback(new Error('不能大于单日最高提款总额，请重新输入'))
				} else {
					callback()
				}
			}
			const bankCardMinAmount = [
				{ required: true, validator: bankCardMinAmountRules, trigger: 'blur' }
			]
			const bankCardMaxAmount = [
				{ required: true, validator: bankCardMaxAmountRules, trigger: 'blur' }
			]
			const virtualCardMinAmount = [
				{
					required: true,
					validator: virtualCardMinAmountRules,
					trigger: 'blur'
				}
			]
			const virtualCardMaxAmount = [
				{
					required: true,
					validator: virtualCardMaxAmountRules,
					trigger: 'blur'
				}
			]
			const dateTotalNum = [
				{ required: true, message: '请输入', trigger: 'blur' }
			]
			const dateMaxAmount = [
				{ required: true, validator: dateMaxAmountRules, trigger: 'blur' }
			]
			const bigAmount = [
				{ required: true, validator: bigAmountRules, trigger: 'blur' }
			]
			const withdrawStatus = [
				{ required: true, message: '请选择状态', trigger: 'blur' }
			]
			return {
				bankCardMinAmount,
				bankCardMaxAmount,
				virtualCardMinAmount,
				virtualCardMaxAmount,
				dateTotalNum,
				dateMaxAmount,
				bigAmount,
				withdrawStatus
			}
		}
	},
	mounted() {},
	methods: {
		loadData() {
			this.loading = true
			const params = {
				...this.getParams(params)
			}

			this.$api
				.getProxyWithdrawalSelectPage(params)
				.then((res) => {
					if (res.code === 200) {
						this.tableData = res.data.records
						this.total = res.data.total
						this.loading = false
					} else {
						this.loading = false
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		getProxyDetailQueryDetail(val) {
			this.$api.getProxyDetailQueryDetail({ userName: val }).then((res) => {
				if (res.code === 200) {
					const {
						id,
						realName,
						accountType,
						accountStatus,
						windControlName
					} = {
						...res.data
					}
					this.$set(this.queryData, 'proxyId', id)
					this.$set(this.queryData, 'proxyName', realName)
					this.$set(this.queryData, 'accountType', accountType + '')
					this.$set(this.queryData, 'accountStatus', accountStatus + '')
					this.$set(this.queryData, 'windControlName', windControlName)
				}
			})
		},
		enterSearch() {
			const val = this.queryData.proxyAccount
			this.getProxyDetailQueryDetail(val)
		},

		reset() {
			this.dialogForm = {
				bankCardMinAmount: 0,
				bankCardMaxAmount: 0,
				virtualCardMinAmount: 0,
				virtualCardMaxAmount: 0,
				dateTotalNum: 0,
				dateMaxAmount: 0,
				bigAmount: 0,
				withdrawStatus: 1
			}
			if (this.titel === '编辑' && !this.isUniversal) {
				this.dialogForm.withdrawStatus = this.withdrawStatus
			}
		},
		addLabel() {
			this.titel = '新增'
			this.isDisabled = false
			this.isUniversal = true
			this.queryData = {}
			this.dialogForm = {
				bankCardMinAmount: 0,
				bankCardMaxAmount: 0,
				virtualCardMinAmount: 0,
				virtualCardMaxAmount: 0,
				dateTotalNum: 0,
				dateMaxAmount: 0,
				bigAmount: 0,
				withdrawStatus: 1
			}
			this.dialogFormVisible = true
		},
		edit(val) {
			this.titel = '编辑'
			console.log('编辑', val)
			this.isDisabled = true
			this.isUniversal = val.proxyAccount !== '0'
			const {
				id,
				proxyAccount,
				proxyName,
				proxyAccountType,
				proxyAccountStatus,
				windControlName
			} = { ...val }
			this.withdrawStatus = val.withdrawStatus
			this.$set(this.queryData, 'proxyId', id)
			this.$set(this.queryData, 'proxyAccount', proxyAccount)
			this.$set(this.queryData, 'proxyName', proxyName)
			this.$set(
				this.queryData,
				'accountType',
				proxyAccountType === 0 ? '' : proxyAccountType + ''
			)
			this.$set(
				this.queryData,
				'accountStatus',
				proxyAccountStatus === 0 ? '' : proxyAccountStatus + ''
			)
			this.$set(this.queryData, 'windControlName', windControlName)
			this.dialogForm = { ...val }
			this.dialogFormVisible = true
		},
		deleteLabel(val) {
			this.$confirm(`<strong>确定删除此条配置吗?</strong>`, `确认提示`, {
				dangerouslyUseHTMLString: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$api.setProxyWithdrawalDelete(val.id).then((res) => {
						if (res.code === 200) {
							this.$message.success('删除成功')
							this.loadData()
						}
					})
				})
				.catch(() => {})
		},
		subAddOrEidt() {
			if (this.titel === '新增') {
				this.$refs.formProxy.validate((valid) => {
					if (valid) {
						const params = {
							...this.dialogForm,
							proxyId: this.queryData.proxyId
						}
						this.$refs.formSub.validate((valid) => {
							if (valid) {
								console.log(params)
								this.$confirm(
									`<strong>您确认要执行新增代理提款设置的操作?</strong>`,
									`确认提示`,
									{
										dangerouslyUseHTMLString: true,
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										type: 'warning'
									}
								)
									.then(() => {
										this.$api.setProxyWithdrawalAdd(params).then((res) => {
											if (res.code === 200) {
												console.log(res)
												this.$message.success('新增成功!')
												this.loadData()
											}
											this.dialogFormVisible = false
										})
									})
									.catch(() => {})
							}
						})
					}
				})
			} else {
				const params = {
					...this.dialogForm,
					id: this.queryData.proxyId,
					proxyName: this.queryData.proxyName,
					proxyAccount: this.queryData.proxyAccount
				}
				this.$refs.formSub.validate((valid) => {
					if (valid) {
						console.log(params)
						this.$confirm(
							`<strong>您确认要执行修改代理提款设置的操作?</strong>`,
							`确认提示`,
							{
								dangerouslyUseHTMLString: true,
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}
						)
							.then(() => {
								console.log(params)
								this.$api.setproxyWithdrawalUpdate(params).then((res) => {
									if (res.code === 200) {
										console.log(res)
										this.$message.success('修改成功!')
										this.loadData()
									}
									this.dialogFormVisible = false
								})
							})
							.catch(() => {})
					}
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.content {
	margin-top: 15px;
}

.form-header {
	background-color: #f2f2f2;
	height: 45px;
	line-height: 45px;
	padding: 0 15px;
	border: 1px solid #cccccc;
	display: flex;
	justify-content: space-between;
	.fontSize {
		font-size: 18px;
		font-weight: 700;
	}
}
.information {
	margin: 5px 0;
	padding: 0 15px;
	border: 1px solid #dcdfe6;
	.proxyItem {
		padding-left: 15px;
		/deep/.el-icon-arrow-up:before {
			content: '';
		}
	}
	.proxyInput {
		width: 140px;
	}
	.setInput {
		width: 160px;
	}
	/deep/label {
		font-weight: 500;
	}
}
/deep/.el-input-number__decrease,
/deep/.el-input-number__increase {
	display: none;
}
/deep/.el-input__inner {
	padding: 0 15px;
	text-align: left;
}
/deep/.el-form-item__error {
	width: 260px;
}
</style>
