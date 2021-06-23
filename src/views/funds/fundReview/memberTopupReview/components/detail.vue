<template>
	<div class="review-content">
		<div class="head">
			<span class="title">会员人工加额审核详情</span>
			<div v-if="type" class="right-btn">
				<el-button plain @click="goBack">取消</el-button>
				<el-button type="success" @click="confirm(true)">
					{{ activeName === '0' ? '一审通过' : '二审通过' }}
				</el-button>
				<el-button type="danger" @click="confirm(false)">
					{{ activeName === '0' ? '一审拒绝' : '二审拒绝' }}
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
								{{ list.createDt ? list.createDt : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="最后登录时间">
							<template>
								{{ list.lastLoginTime ? list.lastLoginTime : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="最后下注时间">
							<template>
								{{ list.lastBetTime ? list.lastBetTime : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="注册端">
							<template>
								{{
									list.deviceType
										? typeFilter(list.deviceType, 'deviceType')
										: '-'
								}}
							</template>
						</el-table-column>
						<el-table-column align="center" label="注册IP">
							<template>
								{{ list.registerIp ? list.registerIp : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="注册端设备编号">
							<template>
								{{ list.deviceNo ? list.deviceNo : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="账号类型">
							<template>
								{{
									list.account_type
										? typeFilter(list.account_type, 'accountType')
										: '-'
								}}
							</template>
						</el-table-column>
						<el-table-column align="center" label="注册域名">
							<template>
								{{ list.registerReference ? list.registerReference : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="上级代理">
							<template>
								{{ list.parentProxyName ? list.parentProxyName : '-' }}
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
								{{ list.userName ? list.userName : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="会员姓名">
							<template>
								{{ list.realName ? list.realName : '-' }}
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
						<el-table-column align="center" label="会员标签">
							<template>
								{{ list.labelName ? list.labelName : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="备注">
							<template>
								{{ list.labelName ? list.labelName : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="绑定银行卡数量">
							<template>
								{{ list.bankCardNum ? list.bankCardNum : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="虚拟币账号数量">
							<template>
								{{ list.virtualNum ? list.virtualNum : '-' }}
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
								{{ list.windControlName ? list.windControlName : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="风险银行卡">
							<template>
								{{ list.cardWindControlName ? list.cardWindControlName : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="风险虚拟币">
							<template>
								{{
									list.virtualWindControlName
										? list.virtualWindControlName
										: '-'
								}}
							</template>
						</el-table-column>
						<el-table-column align="center" label="风险IP">
							<template>
								{{ list.ipWindControlName ? list.ipWindControlName : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="风险终端设备号">
							<template>
								{{
									list.deviceNoWindControlName
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
					<table class="review-table">
						<tbody>
							<tr>
								<td class="td-title">申请人</td>
								<td>
									{{ list.operator ? list.operator : '-' }}
								</td>
								<td class="td-title">申请时间</td>
								<td>
									{{ list.operatorTime ? list.operatorTime : '-' }}
								</td>
								<td class="td-title">申请原因</td>
								<td colspan="3">
									{{ list.operatorRemark ? list.operatorRemark : '-' }}
								</td>
							</tr>
							<tr>
								<td class="td-title">调整类型</td>
								<td>
									{{
										list.adjustType
											? typeFilter(list.adjustType, 'memberPatchAddAdjustType')
											: '-'
									}}
								</td>
								<td class="td-title">活动类型</td>
								<td>
									{{ list.activityId ? list.activityId : '-' }}
								</td>
								<td class="td-title">活动名称</td>
								<td>
									{{ list.activityId ? list.activityId : '-' }}
								</td>
								<td class="td-title">流水倍数</td>
								<td style="width: 80px">
									{{ list.validMultiple ? list.validMultiple : '-' }}
								</td>
							</tr>
							<tr>
								<td class="td-title">增加金额</td>
								<td>
									{{ list.adjustType ? list.adjustAmount : '-' }}
								</td>
								<td class="td-title">增加前余额</td>
								<td>
									{{ list.changeBefore ? list.changeBefore : '-' }}
								</td>
								<td class="td-title">增加后余额</td>
								<td style="width: 80px">
									{{ list.changeAfter ? list.changeAfter : '-' }}
								</td>
								<td class="td-title">实际到账金额</td>
								<td>
									{{ list.validAmount ? list.validAmount : '-' }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="review-content">
				<p class="name">审核信息</p>
				<div class="review-flex">
					<div>一审人: {{ list.audit1Operator }}</div>
					<div>一审时间: {{ list.audit1Time }}</div>
					<div>一审备注: {{ list.audit1Desc }}</div>
				</div>
				<div v-if="activeName === '1'" class="review-flex">
					<div>二审人: {{ list.audit2Operator }}</div>
					<div>二审时间: {{ list.audit2Time }}</div>
					<div>二审备注: {{ list.audit2Desc }}</div>
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
				<el-form-item label="提交审核信息" prop="remark">
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
				remark: [
					{ required: true, message: '审核拒绝备注必填', trigger: 'blur' }
				]
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
			this.$refs.form.validate((valid) => {
				if (valid) {
					const loading = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					})
					const params = {
						id: this.rowData.id,
						remark: this.form.remark,
						auditStatus: this.action ? 1 : 2,
						orderStatus: this.action ? this.activeName === '0' ? 3 : 7 : this.activeName === '0' ? 5 : 6,
						userType: 1
					}

					this.$api
						.memberArtificialPatchAccountAddAuditauditRecord(params)
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
				id: this.rowData.id,
				bizType: 1
			}
			this.$api
				.memberArtificialPatchAccountAddAuditAuditDetail(params)
				.then((res) => {
					if (res.code === 200) {
						const response = res.data
						this.loading = false
						this.list = response
					} else {
						this.loading = false
						this.$message({
							message: res.msg,
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
