<template>
	<div class="game-container report-container">
		<div class="header flex-h flex-bc">
			<h2 class="h2-line">21点重置任务（状态机为2的）</h2>
			<div class="head flex-h-end">
				<el-button
					type="primary"
					icon="el-icon-search"
					size="medium"
					@click="loadPage"
				>
					提交
				</el-button>
			</div>
		</div>
		<div class="view-container dealer-container">
			<div class="params flex-h flex-bc">
				<el-form ref="form" :inline="true" :model="query">
					<el-form-item label="局号">
						<el-input
							v-model="query.roundNo"
							clearable
							size="medium"
							style="width:280px;"
							placeholder="请输入局号"
						></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="content">
				<span v-if="list.length >0">
					{{ list }}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { doSettleTablesStatusReset21 } from '@/api/waterSign'

export default {
	name: '',
	components: {},
	mixins: [list],
	data() {
		return {
			query: {
				roundNo: ''
			}
		}
	},
	computed: {},
	methods: {
		loadPage() {
			if (!this.query.roundNo) {
				this.$message({
					message: '请输入局号！',
					type: 'error'
				})
				return
			}
			this.loading = true
			doSettleTablesStatusReset21(this.query)
				.then((res) => {
					this.loading = false
					this.list = res.data
				})
				.catch((err) => {
					this.loading = false
					this.list = err.msg
				})
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
