<template>
	<div class="dealer-container">
		<div class="betslip">
			<strong class="strong">注单信息</strong>
			<div>
				<el-row class="paddingLR paddingB">
					<el-col :span="9">注单号： {{ dataList.id || '-' }}</el-col>
					<el-col :span="9">
						三方注单号： {{ dataList.thirdOrderId || '-' }}
					</el-col>
					<el-col :span="6">
						游戏平台：
						<span v-for="item in gameTypeList" :key="item.gameCode">
							{{ dataList.gameCode === item.gameCode ? item.gameName : '' }}
						</span>
					</el-col>
					<el-col :span="9">彩种名称： {{ dataList.seriesName || '-' }}</el-col>
					<el-col :span="9">注单归类： {{ dataList.betStatus || '-' }}</el-col>
					<el-col :span="6">期号： {{ dataList.ticketPlanNo || '-' }}</el-col>
					<el-col :span="9">模式： {{ dataList.betModel || '-' }}</el-col>
					<el-col :span="9">赔率： {{ dataList.oddsValue || '-' }}</el-col>
					<el-col :span="6" class="tipsBox">
						<div class="tipsH">投注内容：</div>
						<div class="tipsC">
							<el-tooltip :content="dataList.betNum" placement="left-start">
								<span>
									{{ dataList.betNum || '-' }}
								</span>
							</el-tooltip>
						</div>
					</el-col>
					<el-col :span="9" class="tipsBox">
						<div class="tipsH">判奖内容：</div>
						<div class="tipsC">
							<el-tooltip
								:content="dataList.judgeResultCn"
								placement="left-start"
							>
								<span>
									{{ dataList.judgeResultCn || '-' }}
								</span>
							</el-tooltip>
						</div>
					</el-col>
					<el-col :span="9">输赢金额： {{ dataList.netAmount || '-' }}</el-col>
					<el-col :span="6">
						终端：
						{{
							dataList.deviceType === '其他'
								? dataList.deviceType
								: typeFilter(dataList.deviceType, 'betDeviceType')
						}}
					</el-col>
					<el-col :span="9">投注IP： {{ dataList.loginIp || '-' }}</el-col>
					<el-col :span="9">投注时间： {{ dataList.createAt || '-' }}</el-col>
					<el-col :span="6">结算时间： {{ dataList.netAt || '-' }}</el-col>
					<el-col :span="9">
						同步时间： {{ dataList.synchronizationTime || '-' }}
					</el-col>
				</el-row>
			</div>
			<el-table
				border
				size="mini"
				class="small-size-table"
				:data="tableData"
				style="width: 100%"
				:header-row-style="{
					height: '24px',
					lineHeight: '24px',
					background: '#000'
				}"
			>
				<el-table-column
					prop="playName"
					label="玩法名称"
					align="center"
				></el-table-column>
				<el-table-column
					prop="betCount"
					label="注数"
					align="center"
				></el-table-column>
				<el-table-column
					prop="betMultiple"
					label="倍数"
					align="center"
				></el-table-column>
				<el-table-column
					prop="betAmount"
					label="投注金额"
					align="center"
				></el-table-column>
				<el-table-column
					prop="betStatus"
					label="状态"
					align="center"
				></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
export default {
	name: 'CpDetails',
	components: {},
	mixins: [list],
	props: {
		dataList: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			gameTypeList: {},
			tableData: []
		}
	},
	computed: {},
	watch: {},
	created() {
		this.getGameTypeList()
	},
	mounted() {
		const res = {}
		res.playName = this.dataList.playName
		res.betCount = this.dataList.betCount
		res.betMultiple = this.dataList.betMultiple
		res.betAmount = this.dataList.betAmount
		res.betStatus = this.dataList.betStatus
		this.tableData.push(res)
	},
	methods: {
		getGameTypeList() {
			this.$api.getMerchantGameGamePlant().then((res) => {
				if (res && res.code === 200) {
					this.gameTypeList = res.data || []
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.paddingLR {
	padding: 0 30px;
}
/deep/.betslip {
	line-height: 30px;
	padding: 30px;
	.strong {
		line-height: 70px;
	}
	.paddingB {
		padding-bottom: 30px;
	}
	th {
		color: #ffff;
		background: #000;
		border: 1px solid #000;
	}
}
.tipsBox {
	height: 30px;
	line-height: 30px;
	.tipsH {
		max-width: 100px;
		overflow: hidden;
		display: inline-block;
	}
	.tipsC {
		max-width: 140px;
		overflow: hidden;
		display: inline-block;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>
