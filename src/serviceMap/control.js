const control = [
	// 第一级菜单
	{
		id: '129',
		title: '风控'
	},
	// 第二级菜单
	{
		id: '130',
		parentId: '129',
		icon: 'bb_apilog',
		title: '风控管理'
	},
	{
		id: '131',
		parentId: '129',
		icon: 'bb_list',
		title: '风控信息变更记录'
	},
	// 第三级菜单
	{
		id: '132',
		parentId: '130',
		path: '/control/riskManagement/createRiskRank',
		title: '创建风控层级'
	},
	{
		id: '133',
		parentId: '130',
		path: '/control/riskManagement/editRiskControl',
		title: '编辑风控层级'
	},
	{
		id: '134',
		parentId: '131',
		path: '/control/riskControlMsgChange/memberRiskChangeInfo',
		title: '会员风控信息变更'
	},
	{
		id: '135',
		parentId: '131',
		path: '/control/riskControlMsgChange/proxyRiskChangeInfo',
		title: '代理风控信息变更'
	},
	{
		id: '136',
		parentId: '131',
		path: '/control/riskControlMsgChange/bankRiskChangeInfo',
		title: '银行卡风控信息变更'
	},
	{
		id: '137',
		parentId: '131',
		path: '/control/riskControlMsgChange/virtualRiskChangeInfo',
		title: '虚拟币风控信息变更'
	},
	{
		id: '138',
		parentId: '131',
		path: '/control/riskControlMsgChange/ipRiskControlChange',
		title: 'IP风控信息变更'
	},
	{
		id: '139',
		parentId: '131',
		path: '/control/riskControlMsgChange/terminalRiskChangeInfo',
		title: '终端设备风控信息变更'
	}
]
export default control
