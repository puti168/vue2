<template>
	<div class="review-content">
		<div class="head">
			<span class="title">会员提现审核详情</span>
			<div v-if="type" class="right-btn">
				<el-button plain @click="goBack">取消</el-button>
				<el-button type="success" @click="confirm(true)">
					{{
						activeName === '0'
							? '一审通过'
							: activeName === '1'
							? '二审通过'
							: '三审通过'
					}}
				</el-button>
				<el-button type="danger" @click="confirm(false)">
					{{
						activeName === '0'
							? '一审拒绝'
							: activeName === '1'
							? '二审拒绝'
							: '三审拒绝'
					}}
				</el-button>
			</div>
			<div v-else class="right-btn">
				<el-button plain @click="goBack">返回</el-button>
			</div>
		</div>
		<div class="main-content">
			<div class="review-content">
				<p class="name">会员注册信息</p>
				<div class="review-flex">
					<el-table
						border
						size="mini"
						:data="[1]"
						style="width: 100%"
						:header-cell-style="getRowClass"
					>
						<el-table-column align="center" label="注册时间">
							<template>
								{{ list && list.createDt ? list.createDt : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="最后登录时间">
							<template>
								{{ list && list.lastLoginTime ? list.lastLoginTime : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="最后下注时间">
							<template>
								{{ list && list.lastBetTime ? list.lastBetTime : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="注册端">
							<template>
								{{
									list && list.deviceType
										? typeFilter(list.deviceType, 'deviceType')
										: '-'
								}}
							</template>
						</el-table-column>
						<el-table-column align="center" label="注册IP">
							<template>
								{{ list && list.registerIp ? list.registerIp : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="注册端设备编号">
							<template>
								{{ list && list.deviceNo ? list.deviceNo : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="账号类型">
							<template>
								{{
									list && list.accountType
										? typeFilter(list.accountType, 'accountType')
										: '-'
								}}
							</template>
						</el-table-column>
						<el-table-column align="center" label="注册域名">
							<template>
								{{
									list && list.registerReference ? list.registerReference : '-'
								}}
							</template>
						</el-table-column>
						<el-table-column align="center" label="上级代理">
							<template>
								{{ list && list.parentProxyName ? list.parentProxyName : '-' }}
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div class="review-content">
				<p class="name">会员账号信息</p>
				<div class="review-flex">
					<el-table
						border
						size="mini"
						:data="[1]"
						style="width: 100%"
						:header-cell-style="getRowClass"
					>
						<el-table-column align="center" label="会员账号">
							<template>
								{{ list && list.userName ? list.userName : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="会员姓名">
							<template>
								{{ list && list.realName ? list.realName : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="账号状态">
							<template>
								{{
									list && list.accountStatus
										? typeFilter(list.accountStatus, 'accountStatusType')
										: '-'
								}}
							</template>
						</el-table-column>
						<el-table-column align="center" label="会员标签">
							<template>
								{{ list && list.labelName ? list.labelName : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="备注">
							<template>
								{{ list && list.remark ? list.remark : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="绑定银行卡数量">
							<template>
								{{ list && list.bankNum ? list.bankNum : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="虚拟币账号数量">
							<template>
								{{ list && list.virtualNum ? list.virtualNum : '-' }}
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="review-flex">
					<el-table
						border
						size="mini"
						:data="[1]"
						style="width: 100%"
						:header-cell-style="getRowClass"
					>
						<el-table-column align="center" label="累计总存款金额（万元）">
							<template>
								{{
									list && list.totalDepositAmount
										? list.totalDepositAmount
										: '-'
								}}
							</template>
						</el-table-column>
						<el-table-column align="center" label="累计总存款次数">
							<template>
								{{ list && list.totalDepositNum ? list.totalDepositNum : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="累计总提款金额（万元）">
							<template>
								{{
									list && list.totalWithdrawAmount
										? list.totalWithdrawAmount
										: '-'
								}}
							</template>
						</el-table-column>
						<el-table-column align="center" label="累计总提款次数">
							<template>
								{{
									list && list.totalWithdrawNum ? list.totalWithdrawNum : '-'
								}}
							</template>
						</el-table-column>
						<el-table-column align="center" label="累计总存提款差额（万元）">
							<template>
								{{
									list && list.totalWithdrawDiff ? list.totalWithdrawDiff : '-'
								}}
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div class="review-content">
				<p class="name">账号风控层级</p>
				<div class="review-flex">
					<el-table
						border
						size="mini"
						:data="[1]"
						style="width: 100%"
						:header-cell-style="getRowClass"
					>
						<el-table-column align="center" label="风险会员">
							<template>
								{{ list && list.windControlName ? list.windControlName : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="风险银行卡">
							<template>
								{{ list && list.windBank ? list.windBank : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="风险虚拟币">
							<template>
								{{ list && list.windVirtual ? list.windVirtual : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="风险IP">
							<template>
								{{
									list && list.ipWindControlName ? list.ipWindControlName : '-'
								}}
							</template>
						</el-table-column>
						<el-table-column align="center" label="风险终端设备号">
							<template>
								{{ list && list.windEquipment ? list.windEquipment : '-' }}
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div class="review-content">
				<p class="name">近期存提款信息</p>
				<div class="review-flex">
					<el-table
						border
						size="mini"
						:data="[1]"
						style="width: 100%"
						:header-cell-style="getRowClass"
					>
						<el-table-column align="center" label="上次提款时间">
							<template>
								{{ list && list.lastTime ? list.lastTime : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="上次提款金额">
							<template>
								{{ list && list.lastAmount ? list.lastAmount : '-' }}
							</template>
						</el-table-column>
						<el-table-column
							align="center"
							label="上次提款至本次提款间存款金额"
						>
							<template>
								{{
									list && list.lastBetweenThisDepositAmount
										? list.lastBetweenThisDepositAmount
										: '-'
								}}
							</template>
						</el-table-column>
						<el-table-column align="center" label="上次提款方式">
							<template>
								{{
									list && list.lastType
										? typeFilter(list.lastType, 'payDataType')
										: '-'
								}}
							</template>
						</el-table-column>
						<el-table-column align="center" label="上次是否为大额提款">
							<template>
								{{
									list && list.lastBig
										? typeFilter(list.lastBig, 'withdrawBiggerType')
										: '-'
								}}
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div class="review-content">
				<p class="name">本次提款信息</p>
				<div class="review-flex">
					<table class="review-table">
						<tbody>
							<tr>
								<td class="td-title">订单号</td>
								<td>
									{{ list && list.thirdOrderNo ? list.thirdOrderNo : '-' }}
								</td>
								<td class="td-title">订单来源</td>
								<td>{{ list && list.deviceNo ? list.deviceNo : '-' }}</td>
								<td class="td-title">提款IP</td>
								<td>{{ list && list.customerIp ? list.customerIp : '-' }}</td>
								<td class="td-title">是否为首提</td>
								<td>
									{{
										list && list.isOneWith
											? typeFilter(list.isOneWith, 'withdrawOneStatus')
											: '-'
									}}
								</td>
								<td class="td-title">是否为大额提款</td>
								<td>
									{{
										list && (list.isBig || list.isBig + '' === '0')
											? typeFilter(String(list.isBig), 'withdrawBiggerType')
											: '-'
									}}
								</td>
							</tr>
							<tr>
								<td class="td-title">今日提款次数</td>
								<td>
									{{ list && list.dayWithDrawNum ? list.dayWithDrawNum : '-' }}
								</td>
								<td class="td-title">免费提款次数</td>
								<td>{{ list && list.freeNum ? list.freeNum : '-' }}</td>
								<td class="td-title">今日提款总额</td>
								<td>
									{{
										list && list.dayWithDrawNumSum
											? list.dayWithDrawNumSum
											: '-'
									}}
								</td>
								<td class="td-title">是否连续提款</td>
								<td>
									{{
										list && list.isContinuityWithDraw
											? Number(list.isContinuityWithDraw) === 1
												? '是'
												: '否'
											: '-'
									}}
								</td>
								<td class="td-title">提款方式</td>
								<td>
									{{
										list && list.withdrawType
											? typeFilter(list.withdrawType, 'payDataType')
											: '-'
									}}
								</td>
							</tr>
							<tr>
								<td class="td-title">提款设备终端</td>
								<td colspan="2">
									{{
										list && list.withdrawDeviceType
											? list.withdrawDeviceType
											: '-'
									}}
								</td>
								<td class="td-title">提款绑定域名</td>
								<td colspan="6">
									{{ list && list.withdrawDomain ? list.withdrawDomain : '-' }}
								</td>
							</tr>
							<tr>
								<td class="td-title">提款银行信息</td>
								<td colspan="9">
									{{ list && list.bankInfo ? list.bankInfo : '-' }}
								</td>
							</tr>
							<tr>
								<td rowspan="2" class="td-title">账目审核信息</td>
								<td colspan="3" class="td-title">本次提款流水金额</td>
								<td colspan="2" class="td-title">申请金额</td>
								<td colspan="2" class="td-title">提款手续费</td>
								<td colspan="2" class="td-title">实际打款</td>
							</tr>
							<tr>
								<td colspan="3">
									{{ list && list.withdrawWater ? list.withdrawWater : '-' }}
								</td>
								<td colspan="2">
									{{ list && list.orderAmount ? list.orderAmount : '-' }}
								</td>
								<td colspan="2">
									{{
										list && list.orderRateAmount ? list.orderRateAmount : '-'
									}}
								</td>
								<td colspan="2">
									{{ list && list.realAmount ? list.realAmount : '-' }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="review-content">
				<p class="name">审核信息</p>
				<div class="review-flex">
					<div>
						一审人:
						{{ list && list.audit1Operator ? list.audit1Operator : '-' }}
					</div>
					<div>
						一审时间: {{ list && list.audit1Time ? list.audit1Time : '-' }}
					</div>
					<div>
						一审备注: {{ list && list.audit1Desc ? list.audit1Desc : '-' }}
					</div>
				</div>
				<div class="review-flex">
					<div>
						二审人:
						{{ list && list.audit2Operator ? list.audit2Operator : '-' }}
					</div>
					<div>
						二审时间: {{ list && list.audit2Time ? list.audit2Time : '-' }}
					</div>
					<div>
						二审备注: {{ list && list.audit2Desc ? list.audit2Time : '-' }}
					</div>
				</div>
				<div class="review-flex">
					<div>
						三审人:
						{{ list && list.audit3Operator ? list.audit3Operator : '-' }}
					</div>
					<div>
						三审时间: {{ list && list.audit3Time ? list.audit3Time : '-' }}
					</div>
					<div>
						三审备注: {{ list && list.audit3Desc ? list.audit3Desc : '-' }}
					</div>
				</div>
			</div>
		</div>
		<el-dialog
			title="提交确认"
			center
			:visible.sync="visible"
			:before-close="closeFormDialog"
			width="610px"
			class="audit-confirm"
		>
			<el-form ref="form" :model="form" :rules="formRules">
				<el-form-item v-if="action" label="提交审核信息">
					<el-input
						v-model="form.remark"
						clearable
						type="textarea"
						:maxlength="50"
						show-word-limit
						:autosize="{ minRows: 4, maxRows: 4 }"
						style="width: 380px"
						placeholder="请输入"
					></el-input>
				</el-form-item>
				<el-form-item v-else label="提交审核信息" prop="remark">
					<el-input
						v-model="form.remark"
						clearable
						type="textarea"
						:maxlength="50"
						show-word-limit
						:autosize="{ minRows: 4, maxRows: 4 }"
						style="width: 380px"
						placeholder="请输入"
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="visible = false">取 消</el-button>
				<el-button type="primary" @click="auditOne">
					提交
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import list from '@/mixins/list'
// import dayjs from 'dayjs'
export default {
	components: {},
	mixins: [list],
	props: {
		// 审核 true 仅返回 false
		type: Boolean,
		activeName: {
			type: String,
			default: ''
		},
		rowData: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			list: {},
			form: {
				remark: ''
			},
			visible: false,
			action: false
		}
	},
	computed: {
		formRules() {
			return {
				remark: [{ required: true, message: '备注必填', trigger: 'blur' }]
			}
		}
	},
	created() {
		this.getInfo()
	},
	mounted() {},
	methods: {
		closeFormDialog() {
			this.visible = false
		},
		confirm(action) {
			this.remark = ''
			this.action = action
			this.visible = true
		},
		auditOne() {
			console.log('this.rowData', this.rowData)
			this.$refs.form.validate((valid) => {
				if (valid) {
					const loading = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					})
					const params = {
						thirdOrderNo: this.rowData.thirdOrderNo,
						createdAt: this.rowData.createdAt,
						auditDesc: this.form.remark,
						auditResult: this.action ? 1 : 2,
						orderStatus: this.rowData.orderStatus
					}

					this.$api
						.memberWithDrawUserupdateWithdraw(params)
						.then((res) => {
							loading.close()
							if (res.code === 200) {
								this.$message({
									type: 'success',
									message: '操作成功!'
								})
								this.visible = false
								this.goBack()
							} else {
								this.$message({
									message: res.msg,
									type: 'error'
								})
							}
						})
						.catch(() => {
							loading.close()
						})
				}
			})
		},
		goBack() {
			this.$emit('goBack')
		},
		getInfo() {
			const params = {
				thirdOrderNo: this.rowData.thirdOrderNo,
				createdAt: this.rowData.createdAt
			}
			this.$api.selectMemberWithdrawUser(params).then((res) => {
				this.loading = false
				const { code, msg, data } = res
				if (code === 200) {
					this.list = data
				} else {
					this.$message({
						message: msg,
						type: 'error'
					})
				}
			})
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
.review-content {
	width: 100%;
	color: #666666;
	.review-table {
		width: 100%;
		text-align: center; /*文本居中*/
		border-collapse: collapse; /*表格的边框合并，如果相邻，则共用一个边框*/
		border-spacing: 0;
		border: 1px solid #bcbec2;
		td {
			border-right: 1px solid #bcbec2;
			border-bottom: 1px solid #bcbec2;
			height: 36px;
			line-height: 36px;
		}
		.td-title {
			background: #dfe1e4;
		}
	}
	.head {
		height: 70px;
		line-height: 70px;
		width: 100%;
		background: #000;
		border-radius: 2px;
		padding: 0 30px;
		.title {
			font-weight: 600;
			color: rgb(192, 190, 190);
		}
		.right-btn {
			float: right;
		}
	}
	.main-content {
		.review-content {
			min-height: 150px;
			border: 1px solid rgba(192, 190, 190, 0.5);
			border-top: 0px;
			padding: 30px;
			.name {
				font-weight: 600;
			}
			.review-flex {
				position: relative;
				width: 100%;
				margin-top: 15px;
				div {
					display: inline-block;
					width: 24%;
				}
			}
		}
		.more-height {
			height: 200px;
		}
	}
}
</style>
