<template>
	<div class="game-container report-container">
		<div class="header flex-h flex-bc">
			<h2 class="h2-line">MQ通知管理</h2>
		</div>
		<el-button type="primary" size="medium" @click="detailClick(0)">
			通知游戏服玩法配置数据redis有更新
		</el-button>
		<el-button type="primary" size="medium" @click="detailClick(1)">
			动态刷新配置
		</el-button>
		<!-- 详情 -->
		<el-dialog
			title="发起请求"
			center
			:close-on-click-modal="false"
			:destroy-on-close="true"
			:visible.sync="scrapStatus"
		>
			<template v-if="type === 0">
				请输入参数
				<el-input
					ref="input"
					v-model="value"
					placeholder="请输入参数"
					style="width: 300px"
				></el-input>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" size="medium" @click="loadPage">
					确定
				</el-button>
				</div>
			</template>
			<template v-else>
				<p>
					服务名
					<el-input
						ref="input"
						v-model="query.serviceName"
						placeholder="请输入服务名"
						style="width: 300px;margin-left:10px"
					></el-input>
				</p>
				<p>
					端口号
					<el-input
						ref="input"
						v-model="query.port"
						placeholder="请输入端口号"
						style="width: 300px;margin-left:10px"
					></el-input>
				</p>
				<p>
					上下文
					<el-input
						ref="input"
						v-model="query.contextPath"
						placeholder="请输入上下文"
						style="width: 300px;margin-left:10px"
					></el-input>
				</p>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" size="medium" @click="confirm">
					确定
				</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script>
import list from '@/mixins/list'
import {
	noticeBetPointActivityConfigChange,
	refreshConfig
} from '@/api/waterSign'

export default {
	name: '',
	mixins: [list],
	data() {
		return {
			scrapStatus: false,
			query: {
				port: '',
				contextPath: '',
				serviceName: ''
			},
			value: '',
			type: 0
		}
	},
	computed: {},
	methods: {
		loadPage() {
			// if (!this.listQuery.agentId) {
			// 	this.loading = false
			// 	return Message({
			// 		message: '请选择统计商户',
			// 		type: 'error',
			// 	})
			// }

			const params = {
				sn: this.value
			}

			noticeBetPointActivityConfigChange({
				...params
			})
				.then((res) => {
					this.$message({
						message: '操作成功！',
						type: 'success'
					})
					this.scrapStatus = false
					this.value = ''
				})
				.catch(() => {})
		},
		confirm() {
			refreshConfig({
				...this.query
			})
				.then((res) => {
					this.$message({
						message: res.data,
						type: 'success'
					})
					this.scrapStatus = false
					this.query = { port: '', serviceName: '', contextPath: '' }
				})
				.catch(() => {})
		},
		detailClick(type) {
			this.type = type
			this.scrapStatus = true
		}
	}
}
</script>

<style lang="scss" scoped>
.dealer-container {
	.el-icon-zoom-in {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(1.5);
		font-weight: 900;
		// transform: scale(1.5);
	}
	.handle {
		margin-bottom: 22px;
	}
	.profile {
		opacity: 0.3;
	}
}
.small-size-table {
	font-size: 13px !important;
}

.use-dynamic {
	.el-radio__input.is-checked + .el-radio__label {
		color: inherit;
	}
	.blue {
		color: blue;
	}

	.el-divider {
		margin: 0;
	}
	.add-del {
		padding-left: 24px;
	}

	.content {
		padding: 30px;
	}
}

$width: 160px;
$height: 160px;
$bg-list: (0 #ccffcc), (1 #ff6666), (2 rgba(215, 221, 32, 1)),
	(3 rgba(121, 121, 117, 1));

.list {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax($width, 0fr));
	grid-auto-rows: $height;
	grid-row-gap: 20px;
	grid-column-gap: 20px;
}

.list-one {
	width: $width;
	border: 1px solid #f1f1f1;
	text-align: left;
	display: flex;
	flex-direction: column;
	justify-content: center;
	box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
	background: #ccffcc;
	color: #666;

	.list-header {
		width: $width;
		line-height: 26px;
		padding: 0 5px;
	}
}

.list-two {
	width: $width;
	border: 1px solid #f1f1f1;
	text-align: left;
	display: flex;
	flex-direction: column;
	justify-content: center;
	box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
	background: #ff6666;
	color: #666;
	.list-header {
		width: $width;
		line-height: 26px;
		padding: 0 5px;
	}
}

.title {
	font-size: 18px;
	line-height: 60px;
	font-weight: bold;
}

.colors {
	display: flex;
	margin-top: 30px;

	> div {
		flex: 0 0 160px;
		display: flex;
	}

	.color {
		flex: 0 0 50px;
		height: 50px;
	}

	@each $label, $color1 in $bg-list {
		.color-#{$label} {
			background: $color1;
		}
	}

	.text {
		flex: 1;
		line-height: 50px;
		text-align: center;
	}
}

.detail-dialog {
	div {
		line-height: 30px;
	}
	.label {
		float: right;
		padding: 0 3px;
	}
}

.my-chart {
	width: 1300px;
	height: 600px;
}
</style>
