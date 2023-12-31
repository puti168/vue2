const operation = [
	// 第一级菜单
	{
		id: '58',
		title: '运营'
	},
	// 第二级菜单
	{
		id: '59',
		parentId: '58',
		icon: 'bb_handlelog',
		title: '客户端配置管理'
	},
	{
		id: '60',
		parentId: '58',
		icon: 'bb_reportDaily',
		title: '场馆配置管理'
	},
	{
		id: '61',
		parentId: '58',
		icon: 'bb_limitManage',
		title: '信息配置管理'
	},
	{
		id: '62',
		parentId: '58',
		icon: 'bb_report',
		title: '活动配置管理'
	},
	{
		id: '444',
		parentId: '58',
		icon: 'bb_report',
		title: '教程配置管理'
	},
	// 第三级菜单
	{
		id: '63',
		parentId: '59',
		path: '/operation/clientConfig/clientBanner',
		title: '首页banner配置'
	},
	{
		id: '64',
		parentId: '59',
		path: '/operation/clientConfig/clientCommon',
		title: '公共资源配置'
	},
	{
		id: '65',
		parentId: '59',
		path: '/operation/clientConfig/clientStart',
		title: '启动页配置'
	},
	{
		id: '66',
		parentId: '59',
		path: '/operation/clientConfig/clientLoading',
		title: 'loading配置'
	},
	{
		id: '67',
		parentId: '59',
		path: '/operation/clientConfig/clientLog',
		title: '操作记录'
	},
	{
		id: '68',
		parentId: '60',
		path: '/operation/platform/platformRate',
		title: '代理场馆费率配置'
	},
	{
		id: '69',
		parentId: '60',
		path: '/operation/platform/platformLog',
		title: '操作记录'
	},
	{
		id: '70',
		parentId: '61',
		path: '/operation/infoConfig/announcement',
		title: '公告配置'
	},
	{
		id: '71',
		parentId: '61',
		path: '/operation/infoConfig/activity',
		title: '活动消息配置'
	},
	{
		id: '72',
		parentId: '61',
		path: '/operation/infoConfig/notice',
		title: '通知配置'
	},
	{
		id: '73',
		parentId: '61',
		path: '/operation/infoConfig/feedBack',
		title: '会员意见反馈'
	},
	{
		id: '74',
		parentId: '61',
		path: '/operation/infoConfig/infoLog',
		title: '操作记录'
	},
	{
		id: '195',
		parentId: '62',
		path: '/operation/activityConfig/activityType',
		title: '活动类型名称'
	},
	{
		id: '196',
		parentId: '62',
		path: '/operation/activityConfig/createPage',
		title: '创建优惠类型页签'
	},
	{
		id: '197',
		parentId: '62',
		path: '/operation/activityConfig/activityConfig',
		title: '优惠活动配置'
	},
	{
		id: '198',
		parentId: '62',
		path: '/operation/activityConfig/vipConfig',
		title: '赞助/vip活动配置'
	},
	{
		id: '199',
		parentId: '62',
		path: '/operation/activityConfig/activityConfigLog',
		title: '操作记录'
	},
	{
		id: '445',
		parentId: '444',
		path: '/operation/course/courseNameConfig',
		title: '教程名称配置'
	},
	{
		id: '446',
		parentId: '444',
		path: '/operation/course/courseLabelConfig',
		title: '教程页签配置'
	},
	{
		id: '447',
		parentId: '444',
		path: '/operation/course/courseContentConfig',
		title: '教程内容配置'
	},
	{
		id: '448',
		parentId: '444',
		path: '/operation/course/courseConfigChange',
		title: '教程变更记录'
	}
]
export default operation
