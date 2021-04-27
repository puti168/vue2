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
		path: '/member/memberFunction/memberManagement',
		title: '会员列表'
	},
	{
		id: '5',
		parentId: '3',
		path: '/member/memberFunction/newMember',
		title: '会员详情'
	},
	{
		id: '6',
		parentId: '3',
		path: '/member/memberFunction/bankCard',
		title: '新增会员'
	},
	{
		id: '7',
		parentId: '3',
		path: '/member/memberFunction/virtualCurrency',
		title: '会员注册信息'
	},
	{
		id: '8',
		parentId: '3',
		path: '/member/memberFunction/memberFeedback',
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
		path: '/member/memberReview/recharge',
		title: '会员等级记录'
	},
	{
		id: '12',
		parentId: '11',
		path: '/member/memberReview/bankCardReview',
		title: '会员账户修改审核'
	},
	{
		id: '13',
		parentId: '11',
		path: '/member/memberReview/virtualAccount',
		title: '新增会员审核'
	}
	// {
	// 	id: '14',
	// 	parentId: '9',
	// 	path: '/member/memberReview/amountAdjustment',
	// 	title: '金额调整审核'
	// },
	// {
	// 	id: '15',
	// 	parentId: '9',
	// 	path: '/member/memberReview/addMember',
	// 	title: '新增会员审核'
	// },
	// {
	// 	id: '16',
	// 	parentId: '9',
	// 	path: '/member/memberReview/dataOpration',
	// 	title: '资料操作审核'
	// },
	// {
	// 	id: '18',
	// 	parentId: '17',
	// 	path: '/member/memberRecord/transactionRecord',
	// 	title: '会员交易记录'
	// },
	// {
	// 	id: '19',
	// 	parentId: '17',
	// 	path: '/member/memberRecord/winlossRecord',
	// 	title: '会员输赢记录'
	// },
	// {
	// 	id: '20',
	// 	parentId: '17',
	// 	path: '/member/memberRecord`/accountChangeRecord',
	// 	title: '会员金流账变记录'
	// }
]
export default member
