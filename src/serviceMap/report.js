const report = [
	// 第一级菜单
	{
		id: '101',
		title: '报表'
	},
	// 第二级菜单
	{
		id: '102',
		parentId: '101',
		icon: 'bb_report',
		title: '报表功能'
	},
	{
		id: '107',
		parentId: '101',
		icon: 'bb_report',
		title: '盈亏报表'
	},
	// 第三级菜单
	{
		id: '112',
		parentId: '107',
		path: '/report/winLossReport/VenueReport',
		title: '场馆盈亏报表'
	},
	{
		id: '111',
		parentId: '107',
		path: '/report/winLossReport/clientReport',
		title: '客户端盈亏报表'
	},
	{
		id: '110',
		parentId: '107',
		path: '/report/winLossReport/dailyReport',
		title: '每日盈亏报表'
	},
	{
		id: '109',
		parentId: '107',
		path: '/report/winLossReport/memberReport',
		title: '会员盈亏报表'
	},
	{
		id: '108',
		parentId: '107',
		path: '/report/winLossReport/gameReport',
		title: '游戏盈亏报表'
	},
	{
		id: '106',
		parentId: '102',
		path: '/report/reportFunction/agentReport',
		title: '代理报表'
	},
	{
		id: '105',
		parentId: '102',
		path: '/report/reportFunction/memberReport',
		title: '会员报表'
	},
	{
		id: '104',
		parentId: '102',
		path: '/report/reportFunction/rwReport',
		title: '充提报表'
	},
	{
		id: '103',
		parentId: '102',
		path: '/report/reportFunction/allReport',
		title: '综合报表'
	}
]
export default report
