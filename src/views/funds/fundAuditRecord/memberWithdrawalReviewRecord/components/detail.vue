<template>
	<div class="review-content">
		<div class="head">
			<span class="title">会员提现审核详情</span>
			<div v-if="type" class="right-btn">
				<el-button plain @click="goBack">取消</el-button>
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
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="最后登录时间">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="最后下注时间">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="注册端">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="注册IP">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="注册端设备编号">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="账号类型">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="注册域名">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="上级会员">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
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
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="会员姓名">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="账号状态">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="会员标签">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="备注">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="绑定银行卡数量">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="虚拟币账号数量">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
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
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="累计总存款次数">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="累计总提款金额（万元）">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="累计总提款次数">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="累计总存提款差额（万元）">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
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
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="风险银行卡">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="风险虚拟币">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="风险IP">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="风险终端设备号">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
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
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="上次提款金额">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column
							align="center"
							label="上次提款至本次提款间存款金额"
						>
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="上次提款方式">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="上次是否为大额提款">
							<template>
								{{ list.beforeModify ? list.beforeModify : '-' }}
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
								<td>33333333</td>
								<td class="td-title">订单来源</td>
								<td>PC</td>
								<td class="td-title">提款IP</td>
								<td>33333333333</td>
								<td class="td-title">是否为首提</td>
								<td>否</td>
								<td class="td-title">是否为大额提款</td>
								<td>否</td>
							</tr>
							<tr>
								<td class="td-title">今日提款次数</td>
								<td>33333333</td>
								<td class="td-title">免费提款次数</td>
								<td>PC</td>
								<td class="td-title">今日提款总额</td>
								<td>33333333333</td>
								<td class="td-title">是否连续提款</td>
								<td>否</td>
								<td class="td-title">提款方式</td>
								<td>否</td>
							</tr>
							<tr>
								<td class="td-title">提款设备终端</td>
								<td colspan="2">33333333</td>
								<td class="td-title">提款绑定域名</td>
								<td colspan="6">PC</td>
							</tr>
							<tr>
								<td class="td-title">提款银行信息</td>
								<td colspan="9">33333333</td>
							</tr>
							<tr>
								<td rowspan="2" class="td-title">账目审核信息</td>
								<td colspan="3" class="td-title">本次提款流水金额</td>
								<td colspan="2" class="td-title">申请金额</td>
								<td colspan="2" class="td-title">提款手续费</td>
								<td colspan="2" class="td-title">实际打款</td>
							</tr>
							<tr>
								<td colspan="3">1000.00</td>
								<td colspan="2">1000.00</td>
								<td colspan="2">1000.00</td>
								<td colspan="2">1000.00</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="review-content">
				<p class="name">审核信息</p>
				<div class="review-flex">
					<div>一审人: 111</div>
					<div>一审时间: 222</div>
					<div>一审备注: 3333</div>
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
			const params = {
				id: this.rowData.id
			}
			this.$api.memberWithdrawDetailsAPI(params).then((res) => {
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
