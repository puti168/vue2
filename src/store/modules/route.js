const serviceMap = [
	// 第一级菜单
	{
		id: '2',
		title: '会员'
	},
	// 第二级菜单
	{
		id: '3',
		parentId: '2',
		icon: 'bb_management_system',
		title: '会员功能'
	},
	{
		id: '9',
		parentId: '2',
		icon: 'bb_management_system',
		title: '会员审核'
	},
	{
		id: '17',
		parentId: '2',
		icon: 'bb_management_system',
		title: '会员记录'
	},
	// 第三级菜单
	{
		id: '4',
		parentId: '3',
		path: '/system/systemFunctions/changePassword',
		title: '会员管理'
	},
	{
		id: '5',
		parentId: '3',
		path: '/system/systemFunctions/account',
		title: '新增会员配置'
	},
	{
		id: '6',
		parentId: '3',
		path: '/system/systemFunctions/role',
		title: '银行卡管理'
	},
	{
		id: '7',
		parentId: '3',
		path: '/system/systemFunctions/role',
		title: '虚拟币账户管理'
	},
	{
		id: '8',
		parentId: '3',
		path: '/system/systemFunctions/role',
		title: '会员反馈记录'
	},
	{
		id: '10',
		parentId: '9',
		path: '/system/systemFunctions/role',
		title: '会员提款审核'
	},
	{
		id: '11',
		parentId: '9',
		path: '/system/systemFunctions/role',
		title: '充值补单审核'
	},
	{
		id: '12',
		parentId: '9',
		path: '/system/systemFunctions/role',
		title: '银行卡审核'
	},
	{
		id: '13',
		parentId: '9',
		path: '/system/systemFunctions/role',
		title: '虚拟币账号审核'
	},
	{
		id: '14',
		parentId: '9',
		path: '/system/systemFunctions/role',
		title: '金额调整审核'
	},
	{
		id: '15',
		parentId: '9',
		path: '/system/systemFunctions/role',
		title: '新增会员审核'
	},
	{
		id: '16',
		parentId: '9',
		path: '/system/systemFunctions/role',
		title: '资料操作审核'
	},
	{
		id: '18',
		parentId: '17',
		path: '/system/systemFunctions/role',
		title: '会员交易记录'
	},
	{
		id: '19',
		parentId: '17',
		path: '/system/systemFunctions/role',
		title: '会员输赢记录'
	},
	{
		id: '20',
		parentId: '17',
		path: '/system/systemFunctions/role',
		title: '会员金流账变记录'
	}
]
export default serviceMap
