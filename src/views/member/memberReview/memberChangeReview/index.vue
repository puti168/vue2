<template>
	<div class="game-container report-container">
		<div class="review-content">
			<div class="head">
				<span class="title">会员账户修改审核详情</span>
				<div v-if="type" class="right-btn">
					<el-button plain @click="goBack">取消</el-button>
					<el-button type="success" @click="confirm(true)">一审通过</el-button>
					<el-button type="danger" @click="confirm(false)">一审拒绝</el-button>
				</div>
				<div v-else class="right-btn">
					<el-button plain @click="goBack">返回</el-button>
				</div>
			</div>
			<div class="main-content">
				<div v-if="registerInfo" class="review-content">
					<p class="name">会员注册信息</p>
					<div class="review-flex">
						<div>注册时间: {{ registerInfo.createDt }}</div>
						<div>上次登录时间: {{ registerInfo.lastLoginTime }}</div>
						<div>最后下注时间时间: {{ registerInfo.lastBetTime }}</div>
						<div>注册端: {{ registerInfo.deviceType }}</div>
					</div>
					<div class="review-flex">
						<div>上级代理: {{ registerInfo.parentProxyName }}</div>
						<div>账号类型: {{ registerInfo.accountType }}</div>
					</div>
				</div>
				<div v-if="accountInfo" class="review-content">
					<p class="name">会员账号信息</p>
					<div class="review-flex">
						<div>账号: {{ accountInfo.userName }}</div>
						<div>账号状态: {{ accountInfo.accountStatus }}</div>
						<div>VIP等级: {{ accountInfo.viptualNum }}</div>
						<div>银行卡数量: {{ accountInfo.cardNum }}</div>
					</div>
					<div class="review-flex">
						<div>虚拟币账号数量: {{ accountInfo.virtualNum }}</div>
						<div>风控层级: {{ accountInfo.windControlName }}</div>
						<div>会员标签: {{ accountInfo.labelName }}</div>
						<div>备注信息: {{ accountInfo.remark }}div></div>
					</div>
				</div>
				<div v-if="applyInfo" class="review-content more-height">
					<p class="name">申请信息</p>
					<div class="review-flex">
						<div>申请人: {{ applyInfo.applyName }}</div>
						<div>申请时间: {{ applyInfo.applyTime }}</div>
						<div>审核申请类型: {{ applyInfo.applyType }}</div>
						<div>申请原因: {{ applyInfo.applyInfo }}</div>
					</div>
					<div class="review-flex">
						<el-table
							border
							size="mini"
							:data="[1]"
							style="width: 100%"
							:header-cell-style="getRowClass"
						>
							<el-table-column align="center" label="修改前">
								<template>
									{{ applyInfo.beforeModify }}
								</template>
							</el-table-column>
							<el-table-column align="center" label="修改后">
								<template>
									{{ applyInfo.afterModify }}
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
				<div v-if="auditInfo" class="review-content">
					<p class="name">会员账号信息</p>
					<div class="review-flex">
						<div>一审人: {{ auditInfo.auditName }}</div>
						<div>一审时间: {{ auditInfo.auditTime }}</div>
						<div>一审备注: {{ auditInfo.auditRemark }}</div>
					</div>
				</div>
			</div>
		</div>
		<el-dialog
			:title="提交确认"
			center
			:visible.sync="visible"
			:before-close="closeFormDialog"
			width="410px"
		>
			<el-form
				ref="form"
				label-width="80px"
			>
				<el-form-item label="提交审核信息">
					<el-input
						v-model="auditRemark"
						clearable
						:max="50"
						size="medium"
						style="width: 280px"
						placeholder="请输入"
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="visible = false">取 消</el-button>
				<el-button
					type="primary"
					@click="auditOne"
				>
					提交
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
// import dayjs from 'dayjs'
export default {
	name: 'MemberChangeReview',
	components: {},
	mixins: [],
	data() {
		return {
			accountInfo: '',
			auditInfo: '',
			applyInfo: '',
			registerInfo: '',
			auditRemark: '',
			visible: false,
			action: false,
			// 审核 true 仅返回 false
			type: true
		}
	},
	computed: {},
	created() {
		this.getInfo()
		this.type = this.$route.query.type
	},
	mounted() {
		console.log(this.$route.query)
	},
	methods: {
		closeFormDialog() {},
		confirm(action) {
			this.auditRemark = ''
			this.action = action
		},
		auditOne() {
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			const params = {
				id: this.$route.query.id,
				userId: this.$route.query.userId,
				auditRemark: this.auditRemark,
				auditStatus: this.action ? 2 : 3
			}
			this.$api.audit(params).then((res) => {
				if (res.code === 200) {
					this.$message({
						type: 'success',
						message: '操作成功!'
					})
					this.$router.replace('memberChange')
					loading.close()
				} else {
					loading.close()
					this.$message({
						message: res.msg,
						type: 'error'
					})
				}
			})
		},
		goBack() {
			this.$router.push('memberChange')
		},
		getInfo() {
			const params = {
				userId: this.$route.query.userId,
				recordId: this.$route.query.id
			}
			this.$api.recordInfo(params).then((res) => {
				if (res.code === 200) {
					const response = res.data
					this.loading = false
					this.registerInfo = response.registerInfo
					this.applyInfo = response.applyInfo
					this.auditInfo = response.auditInfo
					this.accountInfo = response.accountInfo
				} else {
					this.loading = false
					this.$message({
						message: res.msg,
						type: 'error'
					})
				}
			})
		},
		getRowClass({ row, column, rowIndex, columnIndex }) {
			if (rowIndex === 0) {
				return 'background:#EFEFEF'
			} else {
				return ''
			}
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
			height: 150px;
			border: 1px solid rgba(192, 190, 190, 0.5);
			border-top: 0px;
			padding: 30px;
			.name {
				font-weight: 600;
			}
			.review-flex {
				position: relative;
				width: 100%;
				margin-top: 10px;
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
