const system = [
	// 第一级菜单
	{
		id: '106',
		title: '系统'
	},
	// 第二级菜单
	{
		id: '107',
		parentId: '106',
		icon: 'bb_rolemanage',
		title: '个人中心'
	},
	{
		id: '108',
		parentId: '106',
		icon: 'bb_betlimit',
		title: '权限管理'
	},
	{
		id: '109',
		parentId: '106',
		icon: 'bb_noticeList',
		title: '日志管理'
	},
	{
		id: '110',
		parentId: '106',
		icon: 'bb_list',
		title: '参数配置'
	},
	{
		id: '396',
		parentId: '106',
		icon: 'bb_list',
		title: '第三方白名单配置'
	},
	// 第三级菜单
	{
		id: '111',
		parentId: '107',
		path: '/system/personalCenter/accountSettings',
		title: '账户设置'
	},
	{
		id: '112',
		parentId: '108',
		path: '/system/authorityManage/roleManage',
		title: '角色管理'
	},
	{
		id: '113',
		parentId: '108',
		path: '/system/authorityManage/staffManage',
		title: '职员管理'
	},
	{
		id: '114',
		parentId: '109',
		path: '/system/logManagement/staffLoginLog',
		title: '职员登录日志'
	},
	{
		id: '200',
		parentId: '109',
		path: '/system/logManagement/backgroundOperationLog',
		title: '后台操作日志'
	},
	{
		id: '201',
		parentId: '110',
		path: '/system/parameterConfiguration/parameterDictionary',
		title: '参数字典'
	},
	{
		id: '203',
		parentId: '110',
		path: '/system/parameterConfiguration/parameterDictionaryRecord',
		title: '参数字典修改记录'
	},
	{
		id: '397',
		parentId: '396',
		path: '/system/thirdWhiteIpConfig/thirdWhiteIpRecord',
		title: '第三方白名单管理'
	}
]
export default system
