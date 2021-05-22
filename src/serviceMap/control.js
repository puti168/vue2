const control = [
	// 第一级菜单
	{
		id: '83',
		title: '风控'
	},
	// 第二级菜单
	{
		id: '84',
		parentId: '83',
		icon: 'bb_report',
		title: '风控管理'
	},
	{
		id: '87',
		parentId: '83',
		icon: 'bb_report',
		title: '风控信息变更记录'
	},
	// 第三级菜单
	{
		id: '85',
		parentId: '84',
		path: '/control/riskManagement/createRiskControl',
		title: '创建风控层级'
	},
	{
		id: '86',
		parentId: '84',
		path: '/control/riskManagement/editRiskControl',
		title: '编辑风控层级'
	},
	{
		id: '97',
		parentId: '94',
		path: '/control/riskControlMsgChange/memberRiskControlChange',
		title: '会员风控信息变更'
	},
	{
		id: '96',
		parentId: '94',
		path: '/control/riskControlMsgChange/proxyRiskControlChange',
		title: '代理风控信息变更'
	},
	{
		id: '95',
		parentId: '94',
		path: '/control/riskControlMsgChange/bankRiskControlChange',
		title: '银行卡风控信息变更'
	},
	{
		id: '92',
		parentId: '91',
		path: '/control/riskControlMsgChange/virtualRiskControlChange',
		title: '虚拟币风控信息变更'
	},
	{
		id: '93',
		parentId: '91',
		path: '/control/riskControlMsgChange/ipRiskControlChange',
		title: 'IP风控信息变更'
	},
	{
		id: '94',
		parentId: '91',
		path: '/control/riskControlMsgChange/terminalRiskControlChange',
		title: '终端设备风控信息变更'
	}
]
export default control
