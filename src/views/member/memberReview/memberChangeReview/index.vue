<template>
	<div class="game-container report-container">
		<div class="review-content">
			<div class="head">
				<span class="title">会员账户修改审核详情</span>
				<div class="right-btn">
					<el-button plain @click="goBack">取消</el-button>
					<el-button type="success" @click="auditOne(true)">一审通过</el-button>
					<el-button type="danger" @click="auditOne(false)">一审拒绝</el-button>
				</div>
			</div>
			<div class="main-content">
				<div class="review-content">
					<p class="name">会员注册信息</p>
					<div class="review-flex">
						<div>注册时间: 2019-09-16 17:00:55</div>
						<div>上次登录时间: 2019-09-16 17:00:55</div>
						<div>最后下注时间时间: 2019-09-16 17:00:55</div>
						<div>注册端: PC</div>
					</div>
					<div class="review-flex">
						<div>上级代理: MICCCCCCC</div>
						<div>账号类型: 正式</div>
					</div>
				</div>
				<div class="review-content">
					<p class="name">会员账号信息</p>
					<div class="review-flex">
						<div>账号: {{ list.accountInfo.userName }}</div>
						<div>账号状态: {{ list.accountInfo.accountStatus }}</div>
						<div>VIP等级: {{ list.accountInfo.viptualNum }}</div>
						<div>银行卡数量: {{ list.accountInfo.cardNum }}</div>
					</div>
					<div class="review-flex">
						<div>虚拟币账号数量: {{ list.accountInfo.virtualNum }}</div>
						<div>风控层级: {{ list.accountInfo.windControlName }}</div>
						<div>会员标签: {{ list.accountInfo.labelName }}</div>
						<div>备注信息: {{ list.accountInfo.remark }}div></div>
					</div>
					<div class="review-content more-height">
						<p class="name">申请信息</p>
						<div class="review-flex">
							<div>申请人: {{ list.applyInfo.applyName }}</div>
							<div>申请时间: {{ list.applyInfo.applyTime }}</div>
							<div>审核申请类型: {{ list.applyInfo.applyType }}</div>
							<div>申请原因: {{ list.applyInfo.applyInfo }}</div>
						</div>
						<div class="review-flex">
							<el-table
								border
								size="mini"
								:data="list.applyInfo"
								style="width: 100%"
								:header-cell-style="getRowClass"
							>
								<el-table-column
									prop="beforeModify"
									align="center"
									label="修改前"
								></el-table-column>
								<el-table-column
									prop="afterModify"
									align="center"
									label="修改后"
								></el-table-column>
							</el-table>
						</div>
					</div>
					<div class="review-content">
						<p class="name">会员账号信息</p>
						<div class="review-flex">
							<div>一审人: {{ list.auditInfo.auditName }}</div>
							<div>一审时间: {{ list.auditInfo.auditTime }}</div>
							<div>一审备注: {{ list.auditInfo.auditRemark }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import dayjs from 'dayjs'
export default {
	name: '',
	components: {},
	mixins: [],
	data() {
		return {
			list: ''
		}
	},
	computed: {},
	mounted() {},
	methods: {
		auditOne(type) {},
		goBack() {},
		getInfo() {
			const params = {
				userId: '',
				recordId: ''
			}
			this.$api.recordInfo(params).then((res) => {
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
