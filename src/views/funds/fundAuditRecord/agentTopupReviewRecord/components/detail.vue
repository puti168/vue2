<template>
	<div class="review-content">
		<div class="head">
			<span class="title">代理人工加额审核详情</span>
			<div v-if="type" class="right-btn">
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
									list.accountStatus
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
								{{ list && list.bankCardNum ? list.bankCardNum : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="虚拟币账号数量">
							<template>
								{{ list && list.virtualNum ? list.virtualNum : '-' }}
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
								{{
									list && list.cardWindControlName
										? list.cardWindControlName
										: '-'
								}}
							</template>
						</el-table-column>
						<el-table-column align="center" label="风险虚拟币">
							<template>
								{{
									list && list.virtualWindControlName
										? list.virtualWindControlName
										: '-'
								}}
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
								{{
									list && list.deviceNoWindControlName
										? list.deviceNoWindControlName
										: '-'
								}}
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div class="review-content">
				<p class="name">审核详情</p>
				<div class="review-flex">
					<el-table
						border
						size="mini"
						:data="[1]"
						style="width: 100%"
						:header-cell-style="getRowClass"
					>
						<el-table-column align="center" label="申请人">
							<template>
								{{ list && list.operator ? list.operator : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="申请时间">
							<template>
								{{ list && list.operatorTime ? list.operatorTime : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="调整类型">
							<template>
								{{
									list.adjustType
										? typeFilter(list.adjustType, 'proxyPatchAddAdjustType')
										: '-'
								}}
								<!-- {{ list && list.adjustType ? list.adjustType : '-' }} -->
							</template>
						</el-table-column>
						<el-table-column align="center" label="增加金额">
							<template>
								{{ list && list.adjustAmount ? list.adjustAmount : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="申请原因">
							<template>
								{{ list && list.operatorRemark ? list.operatorRemark : '-' }}
							</template>
						</el-table-column>
					</el-table>
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
					<div v-if="list && list.audit1Result && list.audit1Result === '0'">
						一审结果: 未处理
					</div>
					<div v-else-if="list && list.audit1Result && list.audit1Result === '1'">
						一审结果: 通过
					</div>
					<div v-else-if="list && list.audit1Result && list.audit1Result === '2'">
						一审结果: 拒绝
					</div>
					<div v-else>
						一审结果: -
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
						二审备注: {{ list && list.audit2Desc ? list.audit2Desc : '-' }}
					</div>
                    <div v-if="list && list.audit2Result && list.audit2Result === '0'">
                        一审结果: 未处理
                    </div>
                    <div v-else-if="list && list.audit2Result && list.audit2Result === '1'">
                        一审结果: 通过
                    </div>
                    <div v-else-if="list && list.audit2Result && list.audit2Result === '2'">
                        一审结果: 拒绝
                    </div>
                    <div v-else>
                        一审结果: -
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
			list: {},
			form: {
				remark: ''
			},
			visible: false,
			action: false
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
			const params = {
				id: this.rowData.id
			}
			this.$api.proxyArtificialPatchAccountAddAuditauditDetail(params).then((res) => {
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
