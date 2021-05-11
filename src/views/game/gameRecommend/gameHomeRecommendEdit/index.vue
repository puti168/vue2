<template>
	<div class="game-container report-container">
		<!-- 体育,真人荷官模块，电竞，彩票，棋牌，电子，派奖排行 -->
		<mix v-if="false"></mix>
		<!-- 直播模块 -->
		<live v-if="false"></live>
		<!-- 游戏专题模块 -->
		<game v-if="true"></game>
		<!-- 最新游戏 -->
		<newGame v-if="false"></newGame>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
import live from './components/live'
import mix from './components/mix'
import game from './components/game'
import newGame from './components/newGame'
export default {
	name: routerNames.gameHomeRecommendEdit,
	components: {
		live,
		game,
		newGame,
		mix
	},
	mixins: [list],
	data() {
		return {
			list: {},
			form: {
				icon: '',
				gameName: ''
			},
			visible: false,
			type: true
		}
	},
	computed: {
	},
	created() {
	},
	mounted() {},
	updated() {
	},
	methods: {
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
	.img-title {
		margin-top: 10px;
		font-size: 14px;
		font-weight: 600;
		margin-bottom: 10px;
		color: rgba(0, 0, 0, 0.847058823529412);
	}
	.avatar {
		width: 70px;
		height: 70px;
		display: inline-block;
		margin-left: 20px;
		margin-bottom: 20px;
	}
}
</style>
