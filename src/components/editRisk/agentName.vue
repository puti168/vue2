<template>
	<div>
		<div class="info-content">
			<el-row class="info-content-row">
				<el-col :span="6">
					<span>代理账号：</span>
					<span>
						{{ showInfoData.proxyName ? showInfoData.proxyName : '-' }}
					</span>
				</el-col>
				<el-col :span="4">
					<span>账户类型：</span>
					<span v-if="showInfoData.accountType">
						{{ typeFilter(showInfoData.accountType, 'accountType') }}
					</span>
					<span v-else>-</span>
				</el-col>
				<el-col :span="10">
					<span>被风控会员个数：</span>
					<span
						v-if="
							showInfoData.windControllerProxyCount ||
								showInfoData.windControllerProxyCount * 1 === 0
						"
					>
						{{ showInfoData.windControllerProxyCount }}
						<span
							class="blueColor decoration"
							@click="lookAgent(showInfoData.levelList)"
						>
							点击查看会员风控层级分布
						</span>
					</span>
					<span v-else>-</span>
				</el-col>
				<el-col :span="4">
					<span>风控层级：</span>
					<span>
						{{
							showInfoData.windControlName ? showInfoData.windControlName : '无'
						}}
					</span>
				</el-col>
			</el-row>
			<el-row class="info-content-row">
				<el-col :span="6">
					<span>风控原因：</span>
					<span>
						{{ showInfoData.windReason ? showInfoData.windReason : '无' }}
					</span>
				</el-col>
				<el-col :span="6"></el-col>
				<el-col :span="6"></el-col>
				<el-col :span="6"></el-col>
			</el-row>
		</div>
		<el-dialog
			title="查看"
			:visible.sync="dialogVisible"
			:destroy-on-close="true"
			width="480px"
			class="rempadding"
		>
			<div v-if="levelList.length" class="bodyBox">
				<div v-for="(item, idx) in levelList" :key="'idx' + idx">
					<p class="windItem">风控层级{{ item.windControlLevelName }}: {{ item.count }}</p>
				</div>
			</div>
			<div v-else class="bodyBox">
				<p>暂无数据</p>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import list from '@/mixins/list'
export default {
	name: 'AgentName',
	mixins: [list],
	props: {
		showInfoData: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			dialogVisible: false,
			levelList: []
		}
	},
	methods: {
		lookAgent(val) {
			this.dialogVisible = true
			this.levelList = val
		}
	}
}
</script>

<style lang="scss" scoped>
.info-header {
	border-top: 1px rgba(233, 233, 233, 1) solid;
	span {
		margin-top: 45px;
		display: inline-block;
		width: 188px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background: #000;
		color: rgb(255, 255, 255);
	}
}
.info-content {
	margin-top: 30px;
	font-size: 14px;
	.info-content-row {
		padding-top: 20px;
		padding-bottom: 20px;
	}
}
.blueColor {
	cursor: pointer;
}
.windItem {
    padding-top: 5px;
    padding-bottom: 5px;
}
</style>
