const report = [
	// 第一级菜单
	{
		id: '94',
		title: '报表'
	},
	// 第二级菜单
	{
		id: '95',
		parentId: '94',
		icon: 'bb_handlelog',
		title: '盈亏报表'
	},
	{
		id: '96',
		parentId: '94',
		icon: 'bb_limitManage',
		title: '业务报表'
	},
	// 第三级菜单
	{
		id: '97',
		parentId: '95',
		path: '/report/profitAndLossReport/memberProfitAndLoss',
		title: '会员盈亏'
	},
	{
		id: '98',
		parentId: '95',
		path: '/report/profitAndLossReport/venueProfitAndLoss',
		title: '场馆盈亏'
	},
	{
		id: '99',
		parentId: '95',
		path: '/report/profitAndLossReport/gameProfitAndLoss',
		title: '游戏盈亏'
	},
	{
		id: '100',
		parentId: '95',
		path: '/report/profitAndLossReport/clientProfitAndLoss',
		title: '客户端盈亏'
	},
	{
		id: '101',
		parentId: '95',
		path: '/report/profitAndLossReport/dailyProfitAndLoss',
		title: '每日盈亏'
	},
	{
		id: '102',
		parentId: '96',
		path: '/report/businessReport/memberReport',
		title: '会员报表'
	},
	{
		id: '103',
		parentId: '96',
		path: '/report/businessReport/proxyReport',
		title: '代理报表'
	},
	{
		id: '104',
		parentId: '96',
		path: '/report/businessReport/depositWithdrawalReport',
		title: '存取报表'
	},
	{
		id: '105',
		parentId: '96',
		path: '/report/businessReport/comprehensiveReport',
		title: '综合报表'
	},
	{
		id: '190',
		parentId: '96',
		path: '/report/businessReport/commissionReport',
		title: '佣金报表'
	},
	{
		id: '191',
		parentId: '96',
		path: '/report/businessReport/activityOffersReport',
		title: '活动优惠报表'
	},
	{
		id: '192',
		parentId: '96',
		path: '/report/businessReport/rebateReport',
		title: '返水报表'
	},
	{
		id: '193',
		parentId: '96',
		path: '/report/businessReport/transferReport',
		title: '转账报表'
	},
	{
		id: '194',
		parentId: '96',
		path: '/report/businessReport/newMemberReport',
		title: '新增会员留存报表'
	}
]
export default report
