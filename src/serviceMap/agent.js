const agent = [
	// 第一级菜单
	{
		id: '44',
		title: '代理'
	},
	// 第二级菜单
	{
		id: '45',
		parentId: '44',
		icon: 'bb_merchantInfo',
		title: '代理管理'
	},
	{
		id: '46',
		parentId: '44',
		icon: 'bb_rateaccount',
		title: '代理审核'
	},
	{
		id: '47',
		parentId: '44',
		icon: 'bb_rolemanage',
		title: '推广管理'
	},
	{
		id: '48',
		parentId: '44',
		icon: 'bb_currency',
		title: '代理配置'
	},
	// 第三级菜单
	{
		id: '49',
		parentId: '45',
		path: '/agent/agentManage/agentList',
		title: '代理列表'
	},
	{
		id: '50',
		parentId: '45',
		path: '/agent/agentManage/agentDetails',
		title: '代理详情'
	},
	{
		id: '51',
		parentId: '45',
		path: '/agent/agentManage/addAgent',
		title: '新增代理'
	},
	{
		id: '52',
		parentId: '45',
		path: '/agent/agentManage/memberTransfer',
		title: '会员转代申请'
	},
	{
		id: '53',
		parentId: '45',
		path: '/agent/agentManage/memberOverflow',
		title: '会员溢出申请'
	},
	{
		id: '54',
		parentId: '45',
		path: '/agent/agentManage/agentLogin',
		title: '代理登录信息'
	},
	{
		id: '55',
		parentId: '45',
		path: '/agent/agentManage/agentRegisterInfo',
		title: '代理注册信息'
	},
	{
		id: '56',
		parentId: '45',
		path: '/agent/agentManage/agentBankCard',
		title: '代理银行卡记录'
	},
	{
		id: '121',
		parentId: '45',
		path: '/agent/agentManage/agentVirtualRecord',
		title: '代理虚拟币账号记录'
	},
	{
		id: '122',
		parentId: '45',
		path: '/agent/agentManage/agentInfoChange',
		title: '代理信息变更记录'
	},
	{
		id: '57',
		parentId: '46',
		path: '/agent/agencyReview/agencyEdit',
		title: '代理账户修改审核'
	},
	{
		id: '115',
		parentId: '46',
		path: '/agent/agencyReview/overflowReview',
		title: '会员溢出审核'
	},
	{
		id: '116',
		parentId: '46',
		path: '/agent/agencyReview/addReview',
		title: '新增代理审核'
	},
	{
		id: '117',
		parentId: '46',
		path: '/agent/agencyReview/transformationReview',
		title: '会员转代审核'
	},
	{
		id: '118',
		parentId: '47',
		path: '/agent/promotionManage/domainNameManagement',
		title: '推广域名管理'
	},
	{
		id: '119',
		parentId: '47',
		path: '/agent/promotionManage/pictureManage',
		title: '推广图片管理'
	},
	{
		id: '204',
		parentId: '47',
		path: '/agent/promotionManage/domainChangeRecord',
		title: '推广域名变更记录'
	},
	{
		id: '205',
		parentId: '47',
		path: '/agent/promotionManage/pictureChangeRecord',
		title: '推广图片变更记录'
	},
	{
		id: '120',
		parentId: '48',
		path: '/agent/agentConfig/levelWelfareCnfig',
		title: '等级福利配置'
	},
	{
		id: '206',
		parentId: '48',
		path: '/agent/agentConfig/agentLabelConfig',
		title: '代理标签配置'
	},
	{
		id: '207',
		parentId: '48',
		path: '/agent/agentConfig/agentLabelChangeRecord',
		title: '代理标签配置记录'
	},
	{
		id: '208',
		parentId: '48',
		path: '/agent/agentConfig/agentLevelConfigRecord',
		title: '代理等级变更记录'
	},
	{
		id: '209',
		parentId: '48',
		path: '/agent/agentConfig/rebateLevelRecord',
		title: '返佣等级变更记录'
	}
]
export default agent
