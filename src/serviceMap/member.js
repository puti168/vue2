const member = [
	// 第一级菜单
	{
		id: '2',
		title: '会员'
	},
	// 第二级菜单
	{
		id: '3',
		parentId: '2',
		icon: 'bb_report',
		title: '会员管理'
	},
	{
		id: '11',
		parentId: '2',
		icon: 'bb_report',
		title: '会员审核'
	},
	// 第三级菜单
	{
		id: '4',
		parentId: '3',
		path: '/member/memberManage/memberList',
		title: '会员列表'
	},
	{
		id: '5',
		parentId: '3',
		path: '/member/memberManage/newMember',
		title: '会员详情'
	},
	{
		id: '6',
		parentId: '3',
		path: '/member/memberManage/bankCard',
		title: '新增会员'
	},
	{
		id: '7',
		parentId: '3',
		path: '/member/memberManage/virtualCurrency',
		title: '会员注册信息'
	},
	{
		id: '8',
		parentId: '3',
		path: '/member/memberManage/memberFeedback',
		title: '会员银行卡记录'
	},
	{
		id: '9',
		parentId: '3',
		path: '/member/memberReview/withdraw',
		title: '会员虚拟币账号记录'
	},
	{
		id: '10',
		parentId: '3',
		path: '/member/memberReview/memberCheck',
		title: '会员等级记录'
	},
	{
		id: '12',
		parentId: '11',
		path: '/member/memberReview/memberChange',
		title: '会员账户修改审核'
	},
	{
		id: '13',
		parentId: '11',
		path: '/member/memberReview/memberCheck',
		title: '新增会员审核'
	}
]
export default member
