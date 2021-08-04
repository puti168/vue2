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
		id: '124',
		parentId: '2',
		icon: 'bb_accountInfo',
		title: '银行卡/虚拟币管理'
	},
	{
		id: '11',
		parentId: '2',
		icon: 'bb_accounttransaction',
		title: '会员审核'
	},
	{
		id: '140',
		parentId: '2',
		icon: 'bb_accounttransaction',
		title: '会员VIP管理'
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
		id: '148',
		parentId: '3',
		path: '/member/memberManage/memberLabelConfig',
		title: '会员标签配置',
		name: 'memberLabelConfig'
	},

	{
		id: '10',
		parentId: '3',
		path: '/member/memberManage/memberLogin',
		title: '会员登录记录',
		name: 'memberLogin'
	},
	{
		id: '123',
		parentId: '3',
		path: '/member/memberManage/memberMsgChange',
		title: '会员信息变更记录',
		name: 'memberMsgChange'
	},
	{
		id: '149',
		parentId: '3',
		path: '/member/memberManage/memberLabelRecord',
		title: '会员标签配置记录',
		name: 'memberLabelChangeRecord'
	},
	{
		id: '125',
		parentId: '124',
		path: '/member/bankAndVirtual/memberBankManage',
		title: '会员银行卡管理',
		name: 'memberBankManagement'
	},
	{
		id: '126',
		parentId: '124',
		path: '/member/bankAndVirtual/memberVirtualManage',
		title: '会员虚拟币账号管理',
		name: 'memberVirtualManagement'
	},
	{
		id: '127',
		parentId: '124',
		path: '/member/bankAndVirtual/bankRecord',
		title: '会员银行卡记录',
		name: 'bankRecord'
	},
	{
		id: '128',
		parentId: '124',
		path: '/member/bankAndVirtual/virtualRecord',
		title: '会员虚拟币账号记录',
		name: 'virtualRecord'
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
	},
	{
		id: '141',
		parentId: '140',
		path: '/member/memberVipConfig/vipLevelConfig',
		title: 'VIP等级配置',
		name: 'vipLevelConfig'
	},
	{
		id: '142',
		parentId: '140',
		path: '/member/memberVipConfig/vipRightConfig',
		title: 'VIP权益配置',
		name: 'vipRightConfig'
	},
	{
		id: '143',
		parentId: '140',
		path: '/member/memberVipConfig/vipDiscountConfig',
		title: 'VIP晋级优惠配置',
		name: 'vipDiscountConfig'
	},
	{
		id: '144',
		parentId: '140',
		path: '/member/memberVipConfig/vipRebateConfig',
		title: 'VIP返水配置',
		name: 'vipRebateConfig'
	},
	{
		id: '145',
		parentId: '140',
		path: '/member/memberVipConfig/vipOperationRecord',
		title: 'VIP配置操作记录',
		name: 'vipOperationRecord'
	},
	{
		id: '146',
		parentId: '140',
		path: '/member/memberVipConfig/vipRebateRecord',
		title: 'VIP返水配置记录',
		name: 'vipRebateRecord'
	},
	{
		id: '147',
		parentId: '140',
		path: '/member/memberVipConfig/vipChangeRecord',
		title: '会员VIP变更记录',
		name: 'vipChangeRecord'
	}
]
export default member
