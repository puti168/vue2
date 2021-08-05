import dayjs from 'dayjs'

// 路由的名称  一定要和 组件的name对应，缓存才起作用
export const routerNames = {
	memberChange: 'memberChange',
	addMember: 'addMember',
	memberOverflow: 'memberOverflow',
	bankRecord: 'bankRecord',
	memberDetails: 'memberDetails',
	memberList: 'memberList',
	memberLogin: 'memberLogin',
	registerInfo: 'registerInfo',
	virtualRecord: 'virtualRecord',
	addMemberReview: 'addMemberReview',
	memberChangeReview: 'memberChangeReview',
	memberBankManage: 'memberBankManage',
	gameClassify: 'gameClassify',
	gamePlatform: 'gamePlatform',
	addMemberCheck: 'addMemberCheck',
	gameHomeRecommendEdit: 'gameHomeRecommendEdit',
	gameManagement: 'gameManagement',
	gameHomeRecommend: 'gameHomeRecommend',
	gameClassification: 'GameClassification',
	addReview: 'addReview',
	agencyEdit: 'agencyEdit',
	transformationReview: 'transformationReview',
	gameSearchManage: 'gameSearchManage',
	gameBetslipDetails: 'gameBetslipDetails',
	agentList: 'agentList',
	addAgent: 'addAgent',
	agentBankCard: 'agentBankCard',
	agentDetails: 'agentDetails',
	agentVirtualRecord: 'agentVirtualRecord',
	agentTrans: 'agentTrans',
	pictureManagement: 'pictureManagement',
	domainCreateAndEidt: 'domainCreateAndEidt',
	levelWelfareConfig: 'levelWelfareConfig',
	createRiskRank: 'createRiskRank',
	editRisk: 'editRisk',
	memberRiskControlChange: 'memberRiskControlChange',
	proxyRiskControlChange: 'proxyRiskControlChange',
	bankRiskChangeInfo: 'bankRiskChangeInfo',
	virtualRiskChangeInfo: 'virtualRiskChangeInfo',
	ipRiskControlChange: 'ipRiskControlChange',
	terminalRiskControlChange: 'terminalRiskControlChange',
	vipLevelConfig: 'vipLevelConfig',
	vipRightConfig: 'vipRightConfig',
	vipDiscountConfig: 'vipDiscountConfig',
	vipRebateConfig: 'vipRebateConfig',
	vipOperationRecord: 'vipOperationRecord',
	vipRebateRecord: 'vipRebateRecord',
	vipChangeRecord: 'vipChangeRecord',
	memberLabelConfig: 'memberLabelConfig',
	memberLabelChangeRecord: 'memberLabelChangeRecord',
	memberShipIncrease: 'memberShipIncrease',
	memberDeduction: 'memberDeduction',
	agentShipIncrease: 'agentShipIncrease',
	agentDeduction: 'agentDeduction',
	memberWithdrawalReviewRecord: 'MemberWithdrawalReviewRecord',
	memberTopUpReviewRecord: 'memberTopUpReviewRecord',
	agentWithdrawalReviewRecord: 'agentWithdrawalReviewRecord',
	clientCommon: 'clientCommon',
	platformRate: 'platformRate',
	roleManage: 'roleManage',
	memberReport: 'memberReport',
	agentReport: 'agentReport',
	operationRecord: 'operationRecord',
	searchOperationRecord: 'searchOperationRecord'
}
const month = dayjs().month()
const year = dayjs().year()
export const shortcutsM = [
	{
		text: '近15分钟',
		onClick(picker) {
			const start = dayjs().subtract(15, 'minute')
			const end = dayjs()
			picker.$emit('pick', [+start, +end])
		}
	},
	{
		text: '近1小时',
		onClick(picker) {
			const start = dayjs().subtract(1, 'hour')
			const end = dayjs()
			picker.$emit('pick', [+start, +end])
		}
	},
	{
		text: '今日',
		onClick(picker) {
			const end = dayjs().endOf('day')
			const start = dayjs().startOf('day')
			picker.$emit('pick', [+start, +end])
		}
	},
	{
		text: '昨日',
		onClick(picker) {
			const end = dayjs()
				.endOf('day')
				.subtract(1, 'd')
			const start = dayjs()
				.startOf('day')
				.subtract(1, 'd')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 当周
	{
		text: '当周',
		onClick(picker) {
			let start, end
			const weekNum = dayjs().day()
			if (weekNum === 0) {
				end = dayjs().endOf('day')
				start = dayjs()
					.subtract(1, 'd')
					.startOf('week')
					.startOf('day')
					.add(1, 'd')
			} else {
				end = dayjs().endOf('day')
				start = dayjs()
					.startOf('day')
					.startOf('week')
					.add(1, 'd')
			}
			picker.$emit('pick', [+start, +end])
		}
	},
	// 当月
	{
		text: '当月',
		onClick(picker) {
			const end = dayjs().endOf('day')
			const start = dayjs().startOf('month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 上月
	{
		text: '上月',
		onClick(picker) {
			const end = dayjs()
				.subtract(1, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(1, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前2月
	{
		text:
			month - 1 > 0
				? year + '年' + (month - 1) + '月'
				: year - 1 + '年' + (month - 1 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(2, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(2, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前3月
	{
		text:
			month - 2 > 0
				? year + '年' + (month - 2) + '月'
				: year - 1 + '年' + (month - 2 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(3, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(3, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前4月
	{
		text:
			month - 3 > 0
				? year + '年' + (month - 3) + '月'
				: year - 1 + '年' + (month - 3 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(4, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(4, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前5月
	{
		text:
			month - 4 > 0
				? year + '年' + (month - 4) + '月'
				: year - 1 + '年' + (month - 4 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(5, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(5, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前6月
	{
		text:
			month - 5 > 0
				? year + '年' + (month - 5) + '月'
				: year - 1 + '年' + (month - 5 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(6, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(6, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前7月
	{
		text:
			month - 6 > 0
				? year + '年' + (month - 6) + '月'
				: year - 1 + '年' + (month - 6 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(7, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(7, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前8月
	{
		text:
			month - 7 > 0
				? year + '年' + (month - 7) + '月'
				: year - 1 + '年' + (month - 7 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(8, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(8, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前9月
	{
		text:
			month - 8 > 0
				? year + '年' + (month - 8) + '月'
				: year - 1 + '年' + (month - 8 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(9, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(9, 'month')
			picker.$emit('pick', [+start, +end])
		}
	}
]
export const shortcuts = [
	{
		text: '今日',
		onClick(picker) {
			const end = dayjs().endOf('day')
			const start = dayjs().startOf('day')
			picker.$emit('pick', [+start, +end])
		}
	},
	{
		text: '昨日',
		onClick(picker) {
			const end = dayjs()
				.endOf('day')
				.subtract(1, 'd')
			const start = dayjs()
				.startOf('day')
				.subtract(1, 'd')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 当周
	{
		text: '当周',
		onClick(picker) {
			let start, end
			const weekNum = dayjs().day()
			if (weekNum === 0) {
				end = dayjs().endOf('day')
				start = dayjs()
					.subtract(1, 'd')
					.startOf('week')
					.startOf('day')
					.add(1, 'd')
			} else {
				end = dayjs().endOf('day')
				start = dayjs()
					.startOf('day')
					.startOf('week')
					.add(1, 'd')
			}
			picker.$emit('pick', [+start, +end])
		}
	},
	// 当月
	{
		text: '当月',
		onClick(picker) {
			const end = dayjs().endOf('day')
			const start = dayjs().startOf('month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 上月
	{
		text: '上月',
		onClick(picker) {
			const end = dayjs()
				.subtract(1, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(1, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 前3个月
	{
		text: '近三个月',
		onClick(picker) {
			// const end = dayjs()
			// 	.subtract(1, 'month')
			// 	.endOf('month')
			// const start = dayjs()
			// 	.startOf('month')
			// 	.subtract(3, 'month')
			// picker.$emit('pick', [+start, +end])
			const end = new Date()
			const start = new Date()
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
			picker.$emit('pick', [start, end])
		}
	}
	// 往前2月
	// {
	// 	text:
	// 		month - 1 > 0
	// 			? year + '年' + (month - 1) + '月'
	// 			: year - 1 + '年' + (month - 1 + 12) + '月',
	// 	onClick(picker) {
	// 		const end = dayjs()
	// 			.subtract(2, 'month')
	// 			.endOf('month')
	// 		const start = dayjs()
	// 			.startOf('month')
	// 			.subtract(2, 'month')
	// 		picker.$emit('pick', [+start, +end])
	// 	}
	// },
	// 往前3月
	// {
	// 	text:
	// 		month - 2 > 0
	// 			? year + '年' + (month - 2) + '月'
	// 			: year - 1 + '年' + (month - 2 + 12) + '月',
	// 	onClick(picker) {
	// 		const end = dayjs()
	// 			.subtract(3, 'month')
	// 			.endOf('month')
	// 		const start = dayjs()
	// 			.startOf('month')
	// 			.subtract(3, 'month')
	// 		picker.$emit('pick', [+start, +end])
	// 	}
	// },
	// 往前4月
	// {
	// 	text:
	// 		month - 3 > 0
	// 			? year + '年' + (month - 3) + '月'
	// 			: year - 1 + '年' + (month - 3 + 12) + '月',
	// 	onClick(picker) {
	// 		const end = dayjs()
	// 			.subtract(4, 'month')
	// 			.endOf('month')
	// 		const start = dayjs()
	// 			.startOf('month')
	// 			.subtract(4, 'month')
	// 		picker.$emit('pick', [+start, +end])
	// 	}
	// },
	// 往前5月
	// {
	// 	text:
	// 		month - 4 > 0
	// 			? year + '年' + (month - 4) + '月'
	// 			: year - 1 + '年' + (month - 4 + 12) + '月',
	// 	onClick(picker) {
	// 		const end = dayjs()
	// 			.subtract(5, 'month')
	// 			.endOf('month')
	// 		const start = dayjs()
	// 			.startOf('month')
	// 			.subtract(5, 'month')
	// 		picker.$emit('pick', [+start, +end])
	// 	}
	// },
	// 往前6月
	// {
	// 	text:
	// 		month - 5 > 0
	// 			? year + '年' + (month - 5) + '月'
	// 			: year - 1 + '年' + (month - 5 + 12) + '月',
	// 	onClick(picker) {
	// 		const end = dayjs()
	// 			.subtract(6, 'month')
	// 			.endOf('month')
	// 		const start = dayjs()
	// 			.startOf('month')
	// 			.subtract(6, 'month')
	// 		picker.$emit('pick', [+start, +end])
	// 	}
	// },
	// 往前7月
	// {
	// 	text:
	// 		month - 6 > 0
	// 			? year + '年' + (month - 6) + '月'
	// 			: year - 1 + '年' + (month - 6 + 12) + '月',
	// 	onClick(picker) {
	// 		const end = dayjs()
	// 			.subtract(7, 'month')
	// 			.endOf('month')
	// 		const start = dayjs()
	// 			.startOf('month')
	// 			.subtract(7, 'month')
	// 		picker.$emit('pick', [+start, +end])
	// 	}
	// },
	// 往前8月
	// {
	// 	text:
	// 		month - 7 > 0
	// 			? year + '年' + (month - 7) + '月'
	// 			: year - 1 + '年' + (month - 7 + 12) + '月',
	// 	onClick(picker) {
	// 		const end = dayjs()
	// 			.subtract(8, 'month')
	// 			.endOf('month')
	// 		const start = dayjs()
	// 			.startOf('month')
	// 			.subtract(8, 'month')
	// 		picker.$emit('pick', [+start, +end])
	// 	}
	// },
	// 往前9月
	// {
	// 	text:
	// 		month - 8 > 0
	// 			? year + '年' + (month - 8) + '月'
	// 			: year - 1 + '年' + (month - 8 + 12) + '月',
	// 	onClick(picker) {
	// 		const end = dayjs()
	// 			.subtract(9, 'month')
	// 			.endOf('month')
	// 		const start = dayjs()
	// 			.startOf('month')
	// 			.subtract(9, 'month')
	// 		picker.$emit('pick', [+start, +end])
	// 	}
	// }
]
export const shortcutsNoToday = [
	{
		text: '昨日',
		onClick(picker) {
			const end = dayjs()
				.endOf('day')
				.subtract(1, 'd')
			const start = dayjs()
				.startOf('day')
				.subtract(1, 'd')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 当周
	{
		text: '当周',
		onClick(picker) {
			let start, end
			const weekNum = dayjs().day()
			if (weekNum === 0) {
				end = dayjs()
					.endOf('day')
					.subtract(1, 'd')
				start = dayjs()
					.subtract(1, 'd')
					.startOf('week')
					.startOf('day')
					.add(1, 'd')
			} else {
				end = dayjs()
					.endOf('day')
					.subtract(1, 'd')
				start = dayjs()
					.startOf('day')
					.startOf('week')
					.add(1, 'd')
			}
			picker.$emit('pick', [+start, +end])
		}
	},
	// 当月
	{
		text: '当月',
		onClick(picker) {
			const end = dayjs()
				.endOf('day')
				.subtract(1, 'd')
			const start = dayjs().startOf('month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 上月
	{
		text: '上月',
		onClick(picker) {
			const end = dayjs()
				.subtract(1, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(1, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前2月
	{
		text:
			month - 1 > 0
				? year + '年' + (month - 1) + '月'
				: year - 1 + '年' + (month - 1 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(2, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(2, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前3月
	{
		text:
			month - 2 > 0
				? year + '年' + (month - 2) + '月'
				: year - 1 + '年' + (month - 2 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(3, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(3, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前4月
	{
		text:
			month - 3 > 0
				? year + '年' + (month - 3) + '月'
				: year - 1 + '年' + (month - 3 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(4, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(4, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前5月
	{
		text:
			month - 4 > 0
				? year + '年' + (month - 4) + '月'
				: year - 1 + '年' + (month - 4 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(5, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(5, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前6月
	{
		text:
			month - 5 > 0
				? year + '年' + (month - 5) + '月'
				: year - 1 + '年' + (month - 5 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(6, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(6, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前7月
	{
		text:
			month - 6 > 0
				? year + '年' + (month - 6) + '月'
				: year - 1 + '年' + (month - 6 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(7, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(7, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前8月
	{
		text:
			month - 7 > 0
				? year + '年' + (month - 7) + '月'
				: year - 1 + '年' + (month - 7 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(8, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(8, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前9月
	{
		text:
			month - 8 > 0
				? year + '年' + (month - 8) + '月'
				: year - 1 + '年' + (month - 8 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(9, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(9, 'month')
			picker.$emit('pick', [+start, +end])
		}
	}
]
