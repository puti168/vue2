const agent = [
	// 第一级菜单
	{
		id: '51',
		title: '代理'
	},
	// 第二级菜单
	{
		id: '52',
		parentId: '51',
		icon: 'bb_report',
		title: '代理功能'
	},
	{
		id: '56',
		parentId: '51',
		icon: 'bb_report',
		title: '代理审核'
	},
	{
		id: '61',
		parentId: '51',
		icon: 'bb_report',
		title: '代理记录'
	},
	// 第三级菜单
	{
		id: '64',
		parentId: '61',
		path: '/agent/agentRecord/withdrawRecord',
		title: '提款记录'
	},
	{
		id: '63',
		parentId: '61',
		path: '/agent/agentRecord/surrogateRecord',
		title: '代存记录'
	},
	{
		id: '62',
		parentId: '61',
		path: '/agent/agentRecord/commissionRecord',
		title: '佣金记录'
	},
	{
		id: '60',
		parentId: '56',
		path: '/agent/agentReview/agentDeposit',
		title: '代理代存审核'
	},
	{
		id: '59',
		parentId: '56',
		path: '/agent/agentReview/agentAmount',
		title: '代理佣金审核'
	},
	{
		id: '58',
		parentId: '56',
		path: '/agent/agentReview/agentJumperAudit',
		title: '代理跳线审核'
	},
	{
		id: '57',
		parentId: '56',
		path: '/agent/agentReview/levelApplicationReview',
		title: '层级申请审核'
	},
	{
		id: '53',
		parentId: '52',
		path: '/agent/agentFunction/agentManagement',
		title: '代理管理'
	},
	{
		id: '54',
		parentId: '52',
		path: '/agent/agentFunction/materialManagement',
		title: '推广素材管理'
	},
	{
		id: '55',
		parentId: '52',
		path: '/agent/agentFunction/agentDomainName',
		title: '代理域名管理'
	}
]
export default agent
