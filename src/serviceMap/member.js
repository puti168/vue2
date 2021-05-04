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
		icon: 'bb_accountInfo',
		title: '会员管理'
	},
	{
		id: '11',
		parentId: '2',
		icon: 'bb_accounttransaction',
		title: '会员审核'
	},
	// 第三级菜单
	{
		id: '4',
		parentId: '3',
		path: '/member/memberManage/memberList',
		title: '会员列表',
		name: 'memberList'
	},
	{
		id: '5',
		parentId: '3',
		path: '/member/memberManage/memberDetails',
		title: '会员详情',
		name: 'memberDetails'
	},
	{
		id: '6',
		parentId: '3',
		path: '/member/memberManage/addMember',
		title: '新增会员',
		name: 'addMember'
	},
	{
		id: '7',
		parentId: '3',
		path: '/member/memberManage/registerInfo',
		title: '会员注册信息',
		name: 'registerInfo'
	},
	{
		id: '8',
		parentId: '3',
		path: '/member/memberManage/bankRecord',
		title: '会员银行卡记录',
		name: 'bankRecord'
	},
	{
		id: '9',
		parentId: '3',
		path: '/member/memberManage/virtualRecord',
		title: '会员虚拟币账号记录',
		name: 'virtualRecord'
	},
	{
		id: '10',
		parentId: '3',
		path: '/member/memberManage/memberLogin',
		title: '会员登录日志',
		name: 'memberLogin'
	},
	{
		id: '12',
		parentId: '11',
		path: '/member/memberReview/memberChange',
		title: '会员账户修改审核',
		name: 'memberChange'
	},
	{
		id: '13',
		parentId: '11',
		path: '/member/memberReview/addMemberCheck',
		title: '新增会员审核',
		name: 'addMemberCheck'
	}
]
export default member
