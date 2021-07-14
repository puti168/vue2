<template>
	<div class="game-container report-container">
		<component
			:is="content"
			:gameDetails="recommendDetails"
			@back="back"
		></component>
	</div>
</template>

<script>
import list from '@/mixins/list'
import mix from './components/mix'
import common from './components/common'
import live from './components/live'
import game from './components/game'

export default {
	components: {
		mix,
		common,
		live,
		game
	},
	mixins: [list],
	props: {
		recommendDetails: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			gameDetails: {},
			form: {
				icon: '',
				gameName: ''
			},
			searchData: {
				moduleId: this.recommendDetails.id
			},
			type: true,
			component: mix
		}
	},
	computed: {
		moduleId() {
			return this.recommendDetails.id
		},
		content() {
			const obj = ['mix', 'common', 'live', 'game']
			const { id } = this.recommendDetails
			const ModuleUI = new Map([
				['1', obj[0]],
				['2', obj[0]],
				['3', obj[0]],
				['4', obj[2]],
				['5', obj[0]],
				['6', obj[1]],
				['7', obj[1]],
				['9', obj[1]],
				['10', obj[3]]
			])
			return id && ModuleUI.get(id)
		}
	},
	watch: {
		recommendDetails: {
			handler(newV) {
				console.log(888888, newV)
			},
			deep: true
		}
	},
	created() {},
	mounted() {
		// this.initShowDetailsModule();
		// this.getDetailsInfo()
	},
	updated() {},
	methods: {
		back() {
			this.$emit('back')
		}
		// 获取详情信息
		// getDetailsInfo() {
		//     console.log('recommendDetails', this.recommendDetails)
		// 	const params = {
		//         ...this.recommendDetails
		// 	}
		// 	this.$api.gameHomeRecommendDetailsEditAPI(params).then((res) => {
		// 		const { code, data, msg } = res
		// 		if (code === 200) {
		// 			this.loading = false
		// 			console.log('请求到值了', data)
		// 			this.gameDetails = data
		// 		} else {
		// 			this.loading = false
		// 			this.$message({
		// 				message: msg,
		// 				type: 'error'
		// 			})
		// 		}
		// 	})
		// }
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
