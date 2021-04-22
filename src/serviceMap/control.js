const control = [
	// 第一级菜单
	{
		id: '90',
		title: '风控'
	},
	// 第二级菜单
	{
		id: '91',
		parentId: '90',
		icon: 'bb_management_system',
		title: '风控功能'
	},
	{
		id: '94',
		parentId: '90',
		icon: 'bb_management_system',
		title: '风控配置'
	},
	{
		id: '98',
		parentId: '90',
		icon: 'bb_management_system',
		title: '风控审核'
	},
	// 第三级菜单
	{
		id: '100',
		parentId: '98',
		path: '/control/riskReview/activityAwardReview',
		title: '活动派奖审核'
	},
	{
		id: '99',
		parentId: '98',
		path: '/control/riskReview/riskWithdrawReview',
		title: '风控提款审核'
	},
	{
		id: '97',
		parentId: '94',
		path: '/control/controlConfig/withdrawRiskConfig',
		title: '提现风控设置'
	},
	{
		id: '96',
		parentId: '94',
		path: '/control/controlConfig/levelWithdraw',
		title: '层级提现风控'
	},
	{
		id: '95',
		parentId: '94',
		path: '/control/controlConfig/userLevelConfig',
		title: '用户层级设置'
	},
	{
		id: '92',
		parentId: '91',
		path: '/control/controlFunction/dataMonitor',
		title: '数据监控'
	},
	{
		id: '93',
		parentId: '91',
		path: '/control/controlFunction/loginLimit',
		title: '终端登录限制管理'
	}
]
export default control
