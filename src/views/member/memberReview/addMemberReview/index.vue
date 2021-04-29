<template>
	<div class="game-container report-container">
		<div class="review-content">
			<div class="head">
				<span class="title">新增会员审核详情</span>
				<div class="right-btn">
					<el-button plain>返回</el-button>
				</div>
			</div>
			<div class="main-content">
				<div class="review-content">
					<p class="name">新增会员信息</p>
					<div class="review-flex">
						<div>账号类型: aaaa</div>
						<div>会员账号: mico</div>
						<div>登录密码: 12344444</div>
						<div>上级代理: 李磊</div>
					</div>
					<div class="review-flex">
						<div>性别: 男</div>
						<div>VIP经验: 50000</div>
						<div>邮箱: 4444@qq.com</div>
						<div>姓名: 50000</div>
					</div>
					<div class="review-flex">
						<div>手机号码: 1333333333333</div>
					</div>
				</div>
				<div class="review-content">
					<p class="name">申请信息</p>
					<div class="review-flex">
						<div>申请人: XXXXXXXXXX</div>
						<div>申请时间: BBBBBBB</div>
						<div>申请信息: 5555</div>
					</div>
				</div>
				<div class="review-content">
					<p class="name">审核信息信息</p>
					<div class="review-flex">
						<div>一审人: mico</div>
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
