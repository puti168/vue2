<template>
	<div class="game-container report-container gameSearch-container">
		<div class="gameSearch-content">
			<div class="form-header">
				<span>游戏搜索管理</span>
				<span>
					<el-button type="success">保存</el-button>
				</span>
			</div>
			<div class="content-part2">
				<p class="part-title">配置信息</p>
				<el-form
					ref="form"
					:model="form"
					:inline="true"
					label-width="100px"
					class="form-content"
				>
					<el-form-item label="历史游戏上限:">
						<el-input
							v-model="form.historyGameLimit"
							size="medium"
							minlength="4"
							maxlength="11"
							oninput="value=value.replace(/(^\s*)|(\s*$)/g ,'')"
							placeholder="请输入"
							clearable
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item label="热门搜索上限:">
						<el-input
							v-model="form.hotSearch"
							size="medium"
							minlength="4"
							maxlength="11"
							oninput="value=value.replace(/(^\s*)|(\s*$)/g ,'')"
							placeholder="请输入"
							clearable
							style="width: 180px"
						></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="content-part3">
				<div class="part-title">
					<span class="hotConfig">热门搜索配置</span>
					<el-button type="primary">新增</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { routerNames } from '@/utils/consts'
import list from '@/mixins/list'
export default {
	name: routerNames.gameSearchManage,
	mixins: [list],
	data() {
		return {
			loading: false,
			form: {
                historyGameLimit: undefined,
                hotSearch: undefined
			}
		}
	},
	computed: {},
	mounted() {},
	methods: {
		add() {
			this.loading = true
			const params = {
				...this.form
			}
			console.log(params)
			this.$refs['form'].validate((valid) => {
				console.log('valid', valid)
				if (valid) {
					this.$api
						.addMemberAPI(params)
						.then((res) => {
							this.loading = false
							const { code, data, msg } = res
							if (code === 200) {
								this.$confirm(`会员${data}资料提交成功`, {
									confirmButtonText: '确定',
									type: 'success',
									showCancelButton: false
								})
								this.reset()
							} else {
								this.$message({
									message: msg,
									type: 'error'
								})
							}
						})
						.catch(() => {
							this.loading = false
						})
				}
			})

			setTimeout(() => {
				this.loading = false
			}, 1000)
		},
		reset() {
			this.$refs['form'].resetFields()
			this.form = {
                historyGameLimit: undefined,
                hotSearch: undefined
			}
		},
		checkValue(val) {}
	}
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
	text-align: center;
	color: #909399;
	font-weight: 700;
}
.gameSearch-container {
	background-color: #f5f5f5;
	margin: 0;
	min-height: calc(100vh - 105px);
	.gameSearch-content {
		width: 70%;
		margin: 0 auto;
		background-color: #fff;
		position: relative;
		.form-header {
			height: 55px;
			line-height: 55px;
			width: 100%;
			background-color: rgba(0, 0, 0, 1);
			span:nth-child(1) {
				position: absolute;
				left: 30px;
				top: 0;
				color: rgba(255, 255, 255, 0.847058823529412);
				font-size: 16px;
				font-weight: 700;
			}
			span:nth-child(2) {
				position: absolute;
				right: 30px;
				top: 0;
				color: #999;
				font-weight: 400;
				font-size: 14px;
			}
		}
		.form-header:after {
			content: '.';
			height: 0;
			display: table;
			clear: both;
		}
		.content-part2 {
			width: 100%;
			padding: 25px 35px 20px;
			position: relative;
			.part-title {
				color: rgba(0, 0, 0, 0.847058823529412);
				font-size: 14px;
				font-weight: 650;
			}
			.form-content {
				margin-top: 40px;
			}
		}
		.content-part2::after {
			position: absolute;
			content: '';
			width: 100%;
			background-color: rgba(233, 233, 233, 1);
			height: 1px;
			left: 0;
			bottom: 0;
		}
		.content-part3 {
			width: 100%;
			padding: 25px 35px 20px;
		}
	}
}
</style>
