const operation = [
	// 第一级菜单
	{
		id: '65',
		title: '运营'
	},
	// 第二级菜单
	{
		id: '66',
		parentId: '65',
		icon: 'bb_report',
		title: '广告位管理'
	},
	{
		id: '70',
		parentId: '65',
		icon: 'bb_report',
		title: '消息管理'
	},
	{
		id: '74',
		parentId: '65',
		icon: 'bb_report',
		title: '活动管理'
	},
	{
		id: '78',
		parentId: '65',
		icon: 'bb_report',
		title: '客户端配置'
	},
	{
		id: '82',
		parentId: '65',
		icon: 'bb_report',
		title: '会员体系管理'
	},
	{
		id: '85',
		parentId: '65',
		icon: 'bb_report',
		title: '客服管理'
	},
	// 第三级菜单
	{
		id: '89',
		parentId: '85',
		path: '/operation/customerService/ticketQuery',
		title: '工单查询'
	},
	{
		id: '88',
		parentId: '85',
		path: '/operation/customerService/ticketRate',
		title: '工单评分查看'
	},
	{
		id: '87',
		parentId: '85',
		path: '/operation/customerService/defaultProblem',
		title: '工单默认问题配置'
	},
	{
		id: '86',
		parentId: '85',
		path: '/operation/customerService/customerServiceConfig',
		title: '客服配置'
	},
	{
		id: '84',
		parentId: '82',
		path: '/operation/memberSystem/memberTag',
		title: '会员标签管理'
	},
	{
		id: '83',
		parentId: '82',
		path: '/operation/memberSystem/vipConfig',
		title: 'VIP配置'
	},
	{
		id: '81',
		parentId: '78',
		path: '/operation/clientConfig/startConfig',
		title: '启动页配置'
	},
	{
		id: '80',
		parentId: '78',
		path: '/operation/clientConfig/loginloading',
		title: '登录loading配置'
	},
	{
		id: '79',
		parentId: '78',
		path: '/operation/clientConfig/loginCartoon',
		title: '登录动画配置'
	},
	{
		id: '77',
		parentId: '74',
		path: '/operation/activity/bannerConfig',
		title: 'banner配置'
	},
	{
		id: '76',
		parentId: '74',
		path: '/operation/activity/activityConfig',
		title: '活动配置'
	},
	{
		id: '75',
		parentId: '74',
		path: '/operation/activity/centerConfig',
		title: '优惠中心配置'
	},
	{
		id: '72',
		parentId: '70',
		path: '/operation/messageManagement/push',
		title: '极光推送'
	},
	{
		id: '73',
		parentId: '70',
		path: '/operation/messageManagement/messageCenter',
		title: '消息中心'
	},
	{
		id: '71',
		parentId: '70',
		path: '/operation/messageManagement/systemNotification',
		title: '系统公告'
	},
	{
		id: '69',
		parentId: '66',
		path: '/operation/advertisingSpace/floatManagement',
		title: '浮窗管理'
	},
	{
		id: '68',
		parentId: '66',
		path: '/operation/advertisingSpace/popupManagement',
		title: '弹窗管理'
	},
	{
		id: '67',
		parentId: '66',
		path: '/operation/advertisingSpace/banner',
		title: 'banner管理'
	}
]
export default operation
