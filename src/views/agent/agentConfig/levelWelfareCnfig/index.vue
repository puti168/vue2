<template>
	<div class="game-container report-container">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane
				v-if="hasPermission('220')"
				label="代理等级配置"
				name="agentLevelConfig"
			>
				<agent-level-config />
			</el-tab-pane>
			<el-tab-pane
				v-if="hasPermission('221')"
				label="返佣等级配置"
				name="backCommissionLevelConfig"
			>
				<back-commission-level-config />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
import AgentLevelConfig from './components/agentLevelConfig'
import BackCommissionLevelConfig from './components/backCommissionLevelConfig'
export default {
	name: routerNames.levelWelfareConfig,
	components: { BackCommissionLevelConfig, AgentLevelConfig },
	mixins: [list],
	data() {
		this.handleClick = this.throttle(this.handleClick, 1000)
		return {
			activeName: 'agentLevelConfig',
			agentData: {},
			backCommData: {}
		}
	},
	computed: {},
	// 数据案例
	mounted() {},
	methods: {
		handleClick(tab) {
			this.loading = true
			const params = {
				...this.getParams(params)
			}
			if (tab.name === 'agentLevelConfig') {
				this.getProxyGradesSelect(params)
			} else if (tab.name === 'backCommissionLevelConfig') {
				this.getProxyCommissionSelect(params)
			}
		},
		// loadData() {
		//   this.loading = true;
		//   let params = {
		//     ...this.getParams(params),
		//   };
		//   if (this.activeName === "agentLevelConfig") {
		//     console.log("代理等级");
		//     this.getProxyGradeSselect(params);
		//   } else {
		//     console.log("返佣等级");
		//     this.getProxyGradeSselect(params);
		//   }
		// },
		getProxyGradesSelect(val) {
			this.$api
				.getProxyGradesSelect(val)
				.then((res) => {
					if (res.code === 200) {
						this.loading = false
						this.agentData = res.data
					} else {
						this.loading = false
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		getProxyCommissionSelect(val) {
			this.$api
				.getProxyCommissionSelect(val)
				.then((res) => {
					if (res.code === 200) {
						this.loading = false
						this.backCommData = res.data
					} else {
						this.loading = false
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
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

/deep/.el-tabs__nav-wrap::after {
	display: none;
}
/deep/.el-tabs__item {
	font-weight: 700;
}
/deep/.el-tabs__content {
	padding: 0 10px 20px 10px;
}
</style>
