const funds = [
	// 第一级菜单
	{
		id: '150',
		title: '资金'
	},
	// 第二级菜单
	{
		id: '151',
		parentId: '150',
		icon: 'bb_report',
		title: '提款设置'
	},
	{
		id: '152',
		parentId: '150',
		icon: 'bb_report',
		title: '会员资金记录'
	},
	{
		id: '153',
		parentId: '150',
		icon: 'bb_report',
		title: '代理资金记录'
	},
	{
		id: '154',
		parentId: '150',
		icon: 'bb_report',
		title: '资金调整'
	},
	{
		id: '155',
		parentId: '150',
		icon: 'bb_report',
		title: '资金审核'
	},
	{
		id: '156',
		parentId: '150',
		icon: 'bb_report',
		title: '资金审核记录'
	},
	// 第三级菜单
	{
		id: '157',
		parentId: '151',
		path: '/funds/withdrawalSettings/memberWithdrawalSettings',
		title: '会员提款设置'
	},
	{
		id: '158',
		parentId: '151',
		path: '/funds/withdrawalSettings/proxyWithdrawalSettings',
		title: '代理提款设置'
	},
	{
		id: '159',
		parentId: '152',
		path: '/funds/memberFundsRecord/accountChangeRecord',
		title: '会员账变记录'
	},
	{
		id: '160',
		parentId: '152',
		path: '/funds/memberFundsRecord/depositRecord',
		title: '会员存款记录'
	},
	{
		id: '161',
		parentId: '152',
		path: '/funds/memberFundsRecord/withdrawalRecord',
		title: '会员提款记录'
	},
	{
		id: '162',
		parentId: '152',
		path: '/funds/memberFundsRecord/transferRecord',
		title: '会员转账记录'
	},
	{
		id: '163',
		parentId: '152',
		path: '/funds/memberFundsRecord/topupRecord',
		title: '会员人工加额申请记录'
	},
	{
		id: '164',
		parentId: '152',
		path: '/funds/memberFundsRecord/deductionRecord',
		title: '会员人工扣除金额记录'
	},
	{
		id: '165',
		parentId: '152',
		path: '/funds/memberFundsRecord/rebateRecord',
		title: '返水记录'
	},
	{
		id: '166',
		parentId: '152',
		path: '/funds/memberFundsRecord/JackpotRecord',
		title: '会员活动彩金记录'
	},
	{
		id: '167',
		parentId: '152',
		path: '/funds/memberFundsRecord/IssueRecord',
		title: 'VIP奖励发放记录'
	},
	{
		id: '168',
		parentId: '153',
		path: '/funds/proxyFundsRecord/accountChangeRecord',
		title: '代理账变记录'
	},
	{
		id: '169',
		parentId: '153',
		path: '/funds/proxyFundsRecord/depositRecord',
		title: '代理存款记录'
	},
	{
		id: '170',
		parentId: '153',
		path: '/funds/proxyFundsRecord/withdrawalRecord',
		title: '代理提款记录'
	},
	{
		id: '171',
		parentId: '153',
		path: '/funds/proxyFundsRecord/transferRecord',
		title: '代理转账记录'
	},
	{
		id: '172',
		parentId: '153',
		path: '/funds/proxyFundsRecord/substitutionRecord',
		title: '代理代存记录'
	},
	{
		id: '173',
		parentId: '153',
		path: '/funds/proxyFundsRecord/topupRecord',
		title: '代理人工加额申请记录'
	},
	{
		id: '174',
		parentId: '153',
		path: '/funds/proxyFundsRecord/deductionRecord',
		title: '代理人工扣除额度记录'
	},
	{
		id: '175',
		parentId: '153',
		path: '/funds/proxyFundsRecord/commissionRecord',
		title: '佣金记录'
	},
	{
		id: '176',
		parentId: '154',
		path: '/funds/capitalAdjustment/membershipIncrease',
		title: '会员人工增加额度'
	},
	{
		id: '177',
		parentId: '154',
		path: '/funds/capitalAdjustment/memberDeduction',
		title: '会员人工扣除额度'
	},
	{
		id: '178',
		parentId: '154',
		path: '/funds/capitalAdjustment/agencyIncrease',
		title: '代理人工增加额度'
	},
	{
		id: '179',
		parentId: '154',
		path: '/funds/capitalAdjustment/agencyDeduction',
		title: '代理人工扣除额度'
	},
	{
		id: '180',
		parentId: '155',
		path: '/funds/fundReview/memberWithdrawalReview',
		title: '会员提款审核'
	},
	{
		id: '181',
		parentId: '155',
		path: '/funds/fundReview/memberTopupReview',
		title: '会员人工加额审核'
	},
	{
		id: '182',
		parentId: '155',
		path: '/funds/fundReview/agentWithdrawalReview',
		title: '代理提款审核'
	},
	{
		id: '183',
		parentId: '155',
		path: '/funds/fundReview/agentTopupReview',
		title: '代理人工加额审核'
	},
	{
		id: '184',
		parentId: '155',
		path: '/funds/fundReview/commissionReview',
		title: '佣金审核'
	},
	{
		id: '185',
		parentId: '156',
		path: '/funds/fundAuditRecord/memberWithdrawalReviewRecord',
		title: '会员提款审核记录'
	},
	{
		id: '186',
		parentId: '156',
		path: '/funds/fundAuditRecord/memberTopupReviewRecord',
		title: '会员人工加额审核记录'
	},
	{
		id: '187',
		parentId: '156',
		path: '/funds/fundAuditRecord/agentWithdrawalReviewRecord',
		title: '代理提款审核记录'
	},
	{
		id: '188',
		parentId: '156',
		path: '/funds/fundAuditRecord/agentTopupReviewRecord',
		title: '代理人工加额审核记录'
	},
	{
		id: '189',
		parentId: '156',
		path: '/funds/fundAuditRecord/commissionReviewRecord',
		title: '佣金审核记录'
	}
]
export default funds
