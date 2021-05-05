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
		icon: 'bb_noticeList',
		title: '系统功能'
	},
	{
		id: '110',
		parentId: '106',
		icon: 'bb_list',
		title: '权限配置'
	},
	// 第三级菜单
	{
		id: '108',
		parentId: '107',
		path: '/system/permission/operationLog',
		title: '参数字典'
	},
	{
		id: '109',
		parentId: '107',
		path: '/system/permission/accountManagement',
		title: '短信配置'
	},
	{
		id: '111',
		parentId: '110',
		path: '/system/permission/positionAuthority',
		title: '系统权限'
	},
	{
		id: '112',
		parentId: '110',
		path: '/system/permission/systemPermission',
		title: '岗位权限'
	},
	{
		id: '113',
		parentId: '110',
		path: '/system/systemFunction/SMS',
		title: '账号管理'
	},
	{
		id: '114',
		parentId: '110',
		path: '/system/systemFunction/parameter',
		title: '操作日志'
	}
]
export default system
