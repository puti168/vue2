const finance = [
	// 第一级菜单
	{
		id: '32',
		title: '财务'
	},
	// 第二级菜单
	{
		id: '33',
		parentId: '32',
		icon: 'bb_report',
		title: '财务功能'
	},
	{
		id: '36',
		parentId: '32',
		icon: 'bb_report',
		title: '提现配置'
	},
	{
		id: '41',
		parentId: '32',
		icon: 'bb_report',
		title: '用户资金调整'
	},
	{
		id: '44',
		parentId: '32',
		icon: 'bb_report',
		title: '订单记录'
	},
	// 第三级菜单
	{
		id: '46',
		parentId: '44',
		path: '/finance/orderRecord/memberWithdrawRecord',
		title: '会员提款订单记录'
	},
	{
		id: '47',
		parentId: '44',
		path: '/finance/orderRecord/agentWithdrawRecord',
		title: '代理提款订单记录'
	},
	{
		id: '48',
		parentId: '44',
		path: '/finance/orderRecord/surrogateRecord',
		title: '代充代存记录'
	},
	{
		id: '49',
		parentId: '44',
		path: '/finance/orderRecord/merchantRate',
		title: '商户成功率'
	},
	{
		id: '50',
		parentId: '44',
		path: '/finance/orderRecord/amountAdjustmentRecord',
		title: '金额调整记录'
	},
	{
		id: '45',
		parentId: '44',
		path: '/finance/orderRecord/rechargeRecord',
		title: '充值订单记录'
	},
	{
		id: '42',
		parentId: '41',
		path: '/finance/userFundsAdjustment/agentAmount',
		title: '代理佣金调整'
	},
	{
		id: '43',
		parentId: '41',
		path: '/finance/userFundsAdjustment/memberAmount',
		title: '会员金额调整'
	},
	{
		id: '38',
		parentId: '36',
		path: '/finance/withdrawConfig/normalWithdraw',
		title: '普通提现'
	},
	{
		id: '39',
		parentId: '36',
		path: '/finance/withdrawConfig/bigWithdraw',
		title: '大额提现'
	},
	{
		id: '40',
		parentId: '36',
		path: '/finance/withdrawConfig/agentWithdraw',
		title: '代理提现'
	},
	{
		id: '37',
		parentId: '36',
		path: '/finance/withdrawConfig/generalSettings',
		title: '通用设置'
	},
	{
		id: '34',
		parentId: '33',
		path: '/finance/financeFunction/rechargeConfig',
		title: '充值配置'
	},
	{
		id: '35',
		parentId: '33',
		path: '/finance/financeFunction/warningConfig',
		title: '资管预警配置'
	}
]
export default finance
