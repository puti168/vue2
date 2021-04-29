<template>
	<div class="game-container report-container">
		<div class="review-content">
			<div class="head">
				<span class="title">会员账户修改审核详情</span>
				<div class="right-btn">
					<el-button plain>取消</el-button>
					<el-button type="success">一审通过</el-button>
					<el-button type="danger">一审拒绝</el-button>
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
						<div>账号: XXXXXXXXXX</div>
						<div>账号状态: BBBBBBB</div>
						<div>VIP等级: 5555</div>
						<div>银行卡数量: 3</div>
					</div>
					<div class="review-flex">
						<div>虚拟币账号数量: 3</div>
						<div>风控层级: 风控一级</div>
						<div>会员标签: 标签1</div>
						<div>备注信息: -</div>
					</div>
				</div>
				<div class="review-content more-height">
					<p class="name">申请信息</p>
					<div class="review-flex">
						<div>申请人: XXXXXXXXXX</div>
						<div>申请时间: BBBBBBB</div>
						<div>审核申请类型: 5555</div>
						<div>申请原因: 3</div>
					</div>
					<div class="review-flex">
						<el-table
							border
							size="mini"
							:data="dataList"
							style="width: 100%"
							:header-cell-style="getRowClass"
						>
							<el-table-column
								prop="createDt"
								align="center"
								label="修改前"
							></el-table-column>
							<el-table-column
								prop="modifyBy"
								align="center"
								label="修改后"
							></el-table-column>
						</el-table>
					</div>
				</div>
				<div class="review-content">
					<p class="name">会员账号信息</p>
					<div class="review-flex">
						<div>一审人: XXXXXXXXXX</div>
						<div>一审时间: BBBBBBB</div>
						<div>一审备注: 5555</div>
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
		}
	},
	computed: {},
	mounted() {},
	methods: {
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
