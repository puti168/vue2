<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="head flex-h-end">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item>
						<el-button
							v-if="hasPermission('256')"
							type="primary"
							:disabled="loading"
							size="medium"
							class="pattern"
							@click="open"
						>
							初始化提款设置
						</el-button>

						<el-button
							v-if="hasPermission('254')"
							type="primary"
							class="pattern"
							:disabled="loading"
							size="medium"
							@click="addLabel"
						>
							新增会员提款设置
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
				>
					<el-table-column
						prop="operating"
						align="center"
						label="操作"
						width="240px"
					>
						<template slot-scope="scope">
							<el-link
								v-if="hasPermission('255')"
								type="primary"
								size="medium"
								@click="edit(scope.row)"
							>
								修改
							</el-link>
						</template>
					</el-table-column>
					<el-table-column
						prop="vipNum"
						align="center"
						label="VIP等级"
						width="128px"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.vipNum || scope.row.vipNum === 0">
								{{ scope.row.vipNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="dateTotalNum"
						align="center"
						label="单日提款总次数"
						width="240px"
					></el-table-column>
					<el-table-column
						prop="dateMaxAmount"
						align="center"
						label="单日最高提款总额"
						width="240px"
					></el-table-column>
					<el-table-column
						prop="bankCardMinAmount"
						align="center"
						label="银行卡单次提款最低限额"
						width="240px"
					></el-table-column>
					<el-table-column
						prop="bankCardMaxAmount"
						align="center"
						label="银行卡单次提款最高限额"
						width="240px"
					></el-table-column>
					<el-table-column
						prop="virtualCardMinAmount"
						align="center"
						width="240px"
						label="虚拟币单次提款最低限额"
					></el-table-column>
					<el-table-column
						prop="virtualCardMaxAmount"
						width="240px"
						align="center"
						label="虚拟币单次提款最高限额"
					></el-table-column>
					<el-table-column
						prop="bigAmount"
						align="center"
						width="240px"
						label="大额提款标记金额"
					></el-table-column>
				</el-table>
				<!-- 分页 -->
			</div>
			<el-dialog
				:visible.sync="dialogFormVisible"
				:destroy-on-close="true"
				width="970px"
			>
				<div class="form-header">
					<span>{{ title }}会员资提款设置</span>
					<span>
						<code style="color: #ff3b30">*</code>
						为必填项
					</span>
				</div>
				<el-form
					ref="formSub"
					:rules="rules"
					class="demo-form-inline"
					:model="dialogForm"
				>
					<el-form-item prop="vipSerialNum" label="VIP等级：">
						<el-select
							v-model="dialogForm.vipNumName"
							style="width: 600px"
							value-key="vipSerialNum"
							placeholder="默认选择全部"
							@change="vipQuota($event)"
						>
							<el-option
								v-for="item in vipNumName"
								:key="item.vipSerialNum"
								:label="item.vipNumName"
								:value="item"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="单日提款次数：" prop="dayWithdrawalNum">
						<el-input
							v-model="dialogForm.dayWithdrawalNum"
							disabled
							name="dayWithdrawalNum"
							style="width: 556px"
							class="chief"
							placeholder="请输入金额，为0不限制"
						></el-input>
						<span>次</span>
					</el-form-item>
					<el-form-item label="单日提款总额：" prop="dayWithdrawalQuota">
						<el-input
							v-model="dialogForm.dayWithdrawalQuota"
							disabled
							name="dayWithdrawalQuota"
							style="width: 556px"
							class="chief"
						></el-input>
						<span>元</span>
					</el-form-item>
					<el-form-item label="大额提款标记金额：" prop="bigAmount">
						<el-input-number
							v-model="dialogForm.bigAmount"
							style="width: 526px"
							placeholder="请输入金额"
						></el-input-number>
						<span>元</span>
					</el-form-item>
					<el-form-item
						label="银行卡单次提款最低额度："
						prop="bankCardMinAmount"
					>
						<el-input-number
							v-model="dialogForm.bankCardMinAmount"
							style="width: 486px"
							placeholder="请输入金额"
						></el-input-number>
						<span>元</span>
					</el-form-item>
					<el-form-item
						label="银行卡单次提款最高额度："
						prop="bankCardMaxAmount"
					>
						<el-input-number
							v-model="dialogForm.bankCardMaxAmount"
							name="bankCardMaxAmount"
							style="width: 486px"
							placeholder="请输入金额"
						></el-input-number>
						<span>元</span>
					</el-form-item>
					<el-form-item
						label="虚拟币单次提款最低额度："
						prop="virtualCardMinAmount"
					>
						<el-input-number
							v-model="dialogForm.virtualCardMinAmount"
							style="width: 486px"
							placeholder="请输入金额"
						></el-input-number>
						<span>元</span>
					</el-form-item>
					<el-form-item
						label="虚拟币单次提款最高额度："
						prop="virtualCardMaxAmount"
					>
						<el-input-number
							v-model="dialogForm.virtualCardMaxAmount"
							name="virtualCardMaxAmount"
							style="width: 486px"
							placeholder="请输入金额"
						></el-input-number>
						<span>元</span>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<span slot="footer" class="dialog-footer">
					<el-button
						type="primary"
						icon="el-icon-search"
						:disabled="loading"
						size="medium"
						@click="add"
					>
						提交
					</el-button>
					<el-button @click="reset">重置</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'

export default {
	name: 'GameLabel',
	mixins: [list],
	data() {
		return {
			vipNumName: [],
			vipExclusive: [],
			vipadd: {},
			queryData: {},
			dialogFormQuota: {},
			tableData: [],
			dialogFormVisible: false,
			dialogForm: {
				dayWithdrawalNum: undefined,
				dayWithdrawalQuota: undefined,
				bankCardMaxAmount: '',
				bankCardMinAmount: '',
				dateFreeNum: '',
				bigAmount: '',
				vipSerialNum: '',
				vipNumName: '',
				virtualCardMaxAmount: '',
				virtualCardMinAmount: ''
			},
			title: '',
			isDisabled: true
		}
	},
	computed: {
		rules() {
			// 银行卡单次提款最高额度
			const bankCardMaxlimit = (rule, value, callback) => {
				let vip = ''
				const num = this.dialogForm.vipSerialNum
				for (let i = 0; i < this.vipExclusive.length; i++) {
					const ele = this.vipExclusive[i]
					if (num === ele.vipele) {
						console.log(ele.vipele, '111')
						vip = ele.dayWithdrawalQuotaele
					}
				}
				console.log(num, '111')
				if (value > vip) {
					callback(new Error('输入不能大于单日最高提款总额，请重新输入'))
				} else {
					callback()
				}
			}

			// 2.银行卡单次最低提款额度
			const bankCardMinlimit = (rule, value, callback) => {
				if (value > this.dialogForm.bankCardMaxAmount) {
					callback(new Error('输入不能大于银行卡单次最高额度，请重新输入'))
				} else {
					callback()
				}
			}
			// 虚拟币单次提款最高额度
			const virtualCardMaxlimit = (rule, value, callback) => {
				let vip = ''
				const num = this.dialogForm.vipSerialNum
				for (let i = 0; i < this.vipExclusive.length; i++) {
					const ele = this.vipExclusive[i]
					if (num === ele.vipele) {
						console.log(ele.vipele, '111')
						vip = ele.dayWithdrawalQuotaele
					}
				}
				if (value > vip) {
					callback(new Error('输入不能大于单日最高提款总额，请重新输入'))
				} else {
					callback()
				}
			}
			// 2.虚拟币单次最低额度
			const virtualCardMinlimit = (rule, value, callback) => {
				if (value > this.dialogForm.virtualCardMaxAmount) {
					callback(new Error('输入不能大于虚拟币单次最高额度，请重新输入'))
				} else {
					callback()
				}
			}
			// 大额标记
			const bigAmountlimit = (rule, value, callback) => {
				let vip = ''
				const num = this.dialogForm.vipSerialNum
				for (let i = 0; i < this.vipExclusive.length; i++) {
					const ele = this.vipExclusive[i]
					if (num === ele.vipele) {
						console.log(ele.vipele, '111')
						vip = ele.dayWithdrawalQuotaele
					}
				}
				if (value > vip) {
					callback(new Error('输入不能大于单日最高提款总额，请重新输入'))
				} else {
					callback()
				}
			}
			const dateFreeNum = [{ required: false, trigger: 'blur' }]
			const bankCardMaxAmount = [
				{ required: true, validator: bankCardMaxlimit, trigger: 'blur' }
			]
			const bankCardMinAmount = [
				{ required: true, validator: bankCardMinlimit, trigger: 'blur' }
			]

			const virtualCardMaxAmount = [
				{ required: true, validator: virtualCardMaxlimit, trigger: 'change' }
			]
			const virtualCardMinAmount = [
				{ required: true, validator: virtualCardMinlimit, trigger: 'change' }
			]
			const bigAmount = [
				{ required: true, validator: bigAmountlimit, trigger: 'blur' }
			]
			return {
				bankCardMinAmount,
				dateFreeNum,
				bankCardMaxAmount,
				virtualCardMaxAmount,
				virtualCardMinAmount,
				bigAmount
			}
		}
	},
	created() {
		this.getEnums()
	},
	mounted() {},
	methods: {
		// 下拉框
		vipQuota(evt) {
			this.$refs['formSub'] && this.$refs['formSub'].resetFields()
			this.dialogForm = {
				vipSerialNum: evt.vipSerialNum,
				vipNumName: evt.vipNumName
			}
			this.queryDetails(evt.vipSerialNum, this.$refs['formSub'])
		},
		queryDetails(type, el) {
			this.$api
				.getMemberWithdrawalGetWithdrawal({ vipSerialNum: type })
				.then((res) => {
					const { code, data } = res
					if (code === 200) {
						this.$nextTick(() => {
                            this.dialogForm = {
                                dayWithdrawalNum: data.dayWithdrawalNum,
                                dayWithdrawalQuota: data.dayWithdrawalQuota,
                                ...this.dialogForm
                            }
						})
					}
				})
		},
		add() {
			const params = {
				...this.dialogForm
			}
			console.log(params, '11222')
			if (this.title === '新增') {
				this.$refs.formSub.validate((valid) => {
					if (valid) {
						console.log(params, '33322')
						this.$confirm(
							`<strong>您确认要执行新增会员提款设置的操作?</strong>`,
							`确认提示`,
							{
								dangerouslyUseHTMLString: true,
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}
						)
							.then(() => {
								this.$api.getMemberWithdrawalAdd(params).then((res) => {
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
			} else {
				const params = {
					...this.dialogForm
				}
				this.$refs.formSub.validate((valid) => {
					if (valid) {
						console.log(params)
						this.$confirm(
							`<strong>您确认要执行修改会员提款设置的操作?</strong>`,
							`确认提示`,
							{
								dangerouslyUseHTMLString: true,
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}
						)

							.then(() => {
								this.$api.getWithdrawSettingMemberUpdate(params).then((res) => {
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
		},
		open() {
			this.$confirm('您确定要初始化会员提款设置？请谨慎操作！！！', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$api.getWithdrawSettingMemberreset().then((res) => {
						console.log(res, '90')
						if (res.code === 200) {
							console.log(res)
							this.$message.success('初始化会员提款设置成功!')
							this.loadData()
						}
						this.dialogFormVisible = false
					})
				})
				.catch(() => {})
		},
		reset() {
			this.queryData = {}

			if (this.title === '新增') {
				this.dialogForm = {
					dateTotalNum: '',
					bankCardMaxAmount: '',
					bankCardMinAmount: '',
					dateFreeNum: '',
					bigAmount: '',
					vipSerialNum: '',
					virtualCardMaxAmount: '',
					virtualCardMinAmount: ''
				}
			} else {
				this.dialogForm = {
					dateTotalNum: '',
					bankCardMaxAmount: '',
					bankCardMinAmount: '',
					dateFreeNum: '',
					bigAmount: '',
					vipSerialNum: '',
					virtualCardMaxAmount: '',
					virtualCardMinAmount: ''
				}
			}
		},
		loadData() {
			this.loading = true
			let params = {
				...this.queryData
			}
			params = {
				...this.getParams(params)
			}
			this.$api
				.getMemberWithdrawalSelectAll(params)
				.then((res) => {
					if (res.code === 200) {
						this.tableData = res.data
						this.total = res.data.totalRecord
						this.loading = false
					} else {
						this.loading = false
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		getEnums() {
			this.$api.getMemberWithdrawalSelect().then((res) => {
				if (res.code === 200) {
					//  for (let i = 0; i < res.data.length; i++) {
					//       const obj = {}
					//       const ele = res.data[i]
					//       obj.vipele= ele.vipSerialNum
					//       obj.dayWithdrawalQuotaele = ele.dayWithdrawalQuota
					//       this.vipExclusive.push(obj)
					//        console.log(obj,"222");
					//     }
					this.vipNumName = res.data
					console.log(this.vipNumName, '234')
				}
			})
		},

		addLabel() {
			this.title = '新增'
			this.isDisabled = false
			this.queryData = {}
			this.dialogForm = {
				dateTotalNum: '',
				bankCardMaxAmount: '',
				bankCardMinAmount: '',
				dateMaxAmount: '',
				dateFreeNum: '',
				bigAmount: '',
				vipSerialNum: '',
				virtualCardMaxAmount: '',
				virtualCardMinAmount: ''
			}
			this.dialogFormVisible = true
		},
		edit(val) {
			this.title = '修改'
			this.dialogForm = { ...val }
			this.dialogFormVisible = true
			this.isDisabled = true
		}
	}
}
</script>

<style lang="scss" scoped>
.demo-form-inline {
	padding-left: 150px;
	padding-top: 30px;
}
.el-form--inline {
	line-height: 4;
}
.sun {
	width: 120px;
}
.chief {
	width: 180px;
}
.form-header {
	width: 930px;
	left: 0px;
	background-color: #d3d7df;
	height: 45px;
	line-height: 45px;
	span:nth-child(1) {
		position: absolute;
		left: 30px;
		top: 65px;
		color: #666;
		font-size: 27px;
		font-weight: 700;
	}
	span:nth-child(2) {
		position: absolute;
		right: 30px;
		color: #999;
		font-weight: 400;
		font-size: 18px;
		top: 60px;
	}
}
.pattern {
	padding-left: 8px;
	padding-right: 8px;
}
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
/deep/.el-input-number__decrease,
/deep/.el-input-number__increase {
	display: none;
}
/deep/.el-input__inner {
	padding: 0 15px;
	text-align: left;
}
</style>
