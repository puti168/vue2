<template>
	<div class="game-container report-container">
		<div class="review-content">
			<div class="head">
				<span class="title">新增会员审核详情</span>
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
				<div class="review-content">
					<p class="name">新增会员信息</p>
					<div class="review-flex">
						<div>
							账号类型: {{ typeFilter(list.accountType, 'accountType') }}
						</div>
						<div>会员账号: {{ list.userName }}</div>
						<div>登录密码: {{ list.password }}</div>
						<div>上级代理: {{ list.parentProxyName }}</div>
					</div>
					<div class="review-flex">
						<div>性别: {{ typeFilter(list.genderType, 'genderType') }}</div>
						<div>VIP经验: {{ list.vipExperienceVal }}</div>
						<div>邮箱: {{ list.email }}</div>
						<div>姓名: {{ list.realName }}</div>
					</div>
					<div class="review-flex">
						<div>手机号码: {{ list.mobile }}</div>
					</div>
				</div>
				<div class="review-content">
					<p class="name">申请信息</p>
					<div class="review-flex">
						<div>申请人: {{ list.applyName }}</div>
						<div>申请时间: {{ list.applyTime }}</div>
						<div>申请信息: {{ list.applyInfo }}</div>
					</div>
				</div>
				<div class="review-content">
					<p class="name">审核信息信息</p>
					<div class="review-flex">
						<div>一审人: {{ list.auditName }}</div>
						<div>一审时间: {{ list.auditTime }}</div>
						<div>一审备注: {{ list.remark }}</div>
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
		>
			<el-form ref="form" label-width="100px">
				<el-form-item label="提交审核信息">
					<el-input
						v-model="remark"
						clearable
						type="textarea"
						:max="50"
						:autosize="{ minRows: 4, maxRows: 4 }"
						size="medium"
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
import { routerNames } from '@/utils/consts'
// import dayjs from 'dayjs'
export default {
	name: routerNames.addMemberReview,
	components: {},
	mixins: [list],
	data() {
		return {
			list: {},
			visible: false,
			remark: '',
			action: false,
			// 审核 true 仅返回 false
			type: true
		}
	},
	computed: {
		accountType() {
			return this.globalDics.accountType
		},
		genderType() {
			return this.globalDics.genderType
		}
	},
	created() {
		if (this.$route.name === 'addMemberReview') {
			this.getInfo()
			this.type = this.$route.query.type
		}
	},
	mounted() {},
	methods: {
		closeFormDialog() {},
		confirm(action) {
			this.remark = ''
			this.action = action
			this.visible = true
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
				remark: this.remark,
				auditStatus: this.action ? 2 : 3
			}
			this.$api.updateMemberAuditRecord(params).then((res) => {
				if (res.code === 200) {
					this.$message({
						type: 'success',
						message: '操作成功!'
					})
					this.$router.go(-1)
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
			this.$router.go(-1)
		},
		getInfo() {
			const params = {
				id: this.$route.query.id
			}
			this.$api.memberAuditDetail(params).then((res) => {
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
