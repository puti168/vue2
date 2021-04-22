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
		path: '/member/memberFunction/memberManagement',
		title: '会员管理'
	},
	{
		id: '5',
		parentId: '3',
		path: '/member/memberFunction/newMember',
		title: '新增会员配置'
	},
	{
		id: '6',
		parentId: '3',
		path: '/member/memberFunction/bankCard',
		title: '银行卡管理'
	},
	{
		id: '7',
		parentId: '3',
		path: '/member/memberFunction/virtualCurrency',
		title: '虚拟币账户管理'
	},
	{
		id: '8',
		parentId: '3',
		path: '/member/memberFunction/memberFeedback',
		title: '会员反馈记录'
	},
	{
		id: '10',
		parentId: '9',
		path: '/member/memberFunction/withdraw',
		title: '会员提款审核'
	},
	{
		id: '11',
		parentId: '9',
		path: '/member/memberFunction/recharge',
		title: '充值补单审核'
	},
	{
		id: '12',
		parentId: '9',
		path: '/member/memberFunction/bankCardReview',
		title: '银行卡审核'
	},
	{
		id: '13',
		parentId: '9',
		path: '/member/memberFunction/virtualAccount',
		title: '虚拟币账号审核'
	},
	{
		id: '14',
		parentId: '9',
		path: '/member/memberFunction/amountAdjustment',
		title: '金额调整审核'
	},
	{
		id: '15',
		parentId: '9',
		path: '/member/memberFunction/addMember',
		title: '新增会员审核'
	},
	{
		id: '16',
		parentId: '9',
		path: '/member/memberFunction/dataOpration',
		title: '资料操作审核'
	},
	{
		id: '18',
		parentId: '17',
		path: '/member/memberFunction/transactionRecord',
		title: '会员交易记录'
	},
	{
		id: '19',
		parentId: '17',
		path: '/member/memberFunction/winlossRecord',
		title: '会员输赢记录'
	},
	{
		id: '20',
		parentId: '17',
		path: '/member/memberFunction/accountChangeRecord',
		title: '会员金流账变记录'
	}
]
export default serviceMap
