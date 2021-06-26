<template>
	<div class="review-content">
		<div class="head">
			<span class="title">代理提现审核详情</span>
			<div class="right-btn">
				<el-button plain @click="goBack">返回</el-button>
			</div>
		</div>
		<div class="main-content">
			<div class="review-content">
				<p class="name">代理注册信息</p>
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
					</el-table>
				</div>
			</div>
			<div class="review-content">
				<p class="name">代理账号信息</p>
				<div class="review-flex">
					<el-table
						border
						size="mini"
						:data="[1]"
						style="width: 100%"
						:header-cell-style="getRowClass"
					>
						<el-table-column align="center" label="代理账号">
							<template>
								{{ list && list.userName ? list.userName : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="代理姓名">
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
						<el-table-column align="center" label="代理标签">
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
					<el-table
						border
						size="mini"
						:data="[1]"
						style="width: 100%"
						:header-cell-style="getRowClass"
					>
						<el-table-column align="center" label="累计总存款金额(万元)">
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
						<el-table-column align="center" label="累计总提款金额(万元)">
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
						<el-table-column align="center" label="累计总提款差额(万元)">
							<template>
								{{
									list && list.beforeModify
										? list.totalDepositAmount * 1 - list.totalWithdrawAmount * 1
										: '-'
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
						<el-table-column align="center" label="风险代理">
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
						<el-table-column align="center" label="上次提款后余额">
							<template>
								{{
									list && list.lastWithdrawalBalance
										? list.lastWithdrawalBalance
										: '-'
								}}
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
								{{ list && list.lastType ? list.lastType : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="上次是否为大额提款">
							<template>
								{{
									list && list.lastBig
										? Number(list.lastBig) === 0
											? '否'
											: '是'
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
								<td>{{ list && list.orderId ? list.orderId : '-' }}</td>
								<td class="td-title">订单来源</td>
								<td>{{ list && list.deviceNo ? list.deviceNo : '-' }}</td>
								<td class="td-title">提款IP</td>
								<td>{{ list && list.customerIp ? list.customerIp : '-' }}</td>
								<td class="td-title">是否为首提</td>
								<td>
									{{
										list && list.isFirst
											? Number(list.isFirst) === 1
												? '是'
												: '否'
											: '-'
									}}
								</td>
								<td class="td-title">是否为大额提款</td>
								<td>
									{{
										list && list.isBig
											? Number(list.isBig) === 1
												? '是'
												: '否'
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
										list && list.isContinuityWithDraw
											? Number(list.isContinuityWithDraw) === 1
												? '银行卡'
												: '虚拟币'
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
                    <div>
                        一审结果: {{ list && list.audit1Result ? list.audit1Result : '-' }}
                    </div>
				</div>
				<div class="review-flex">
					<div>二审人: {{ list && list.audit2Operator }}</div>
					<div>二审时间: {{ list && list.audit2Time }}</div>
					<div>二审备注: {{ list && list.audit2Desc }}</div>
                    <div>
                        二审结果: {{ list && list.audit1Result ? list.audit1Result : '-' }}
                    </div>
				</div>
			</div>
		</div>
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
		rowData: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			list: undefined
		}
	},
	computed: {},
	created() {
		this.getInfo()
	},
	mounted() {},
	methods: {
		goBack() {
			this.$emit('goBack')
		},
		getInfo() {
			const { thirdOrderNo, createdAt } = this.rowData
			const params = {
				thirdOrderNo,
				createdAt
			}
			this.$api.agentWithdrawDetailsAPI(params).then((res) => {
				this.loading = false
				const { code, data, msg } = res
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
