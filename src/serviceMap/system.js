const system = [
	// 第一级菜单
	{
		id: '113',
		title: '系统'
	},
	// 第二级菜单
	{
		id: '114',
		parentId: '113',
		icon: 'bb_report',
		title: '系统功能'
	},
	{
		id: '117',
		parentId: '113',
		icon: 'bb_report',
		title: '权限配置'
	},
	// 第三级菜单
	{
		id: '121',
		parentId: '117',
		path: '/system/permission/operationLog',
		title: '操作日志'
	},
	{
		id: '120',
		parentId: '117',
		path: '/system/permission/accountManagement',
		title: '账号管理'
	},
	{
		id: '119',
		parentId: '117',
		path: '/system/permission/positionAuthority',
		title: '岗位权限'
	},
	{
		id: '118',
		parentId: '117',
		path: '/system/permission/systemPermission',
		title: '系统权限'
	},
	{
		id: '116',
		parentId: '114',
		path: '/system/systemFunction/SMS',
		title: '短信配置'
	},
	{
		id: '115',
		parentId: '114',
		path: '/system/systemFunction/parameter',
		title: '参数字典'
	}
]
export default system
