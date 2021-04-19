const serviceMap = [
	// 第一级菜单
	{
		id: '1001',
		title: '系统'
	},
	// 第二级菜单
	{
		id: '1300',
		parentId: '1001',
		icon: 'bb_management_system',
		title: '系统管理'
	},
	// 第三级菜单
	{
		id: '1310',
		parentId: '1300',
		path: '/system/systemFunctions/changePassword',
		title: '修改密码'
	},
	{
		id: '1320',
		parentId: '1300',
		path: '/system/systemFunctions/account',
		title: '账号管理'
	},
	{
		id: '1330',
		parentId: '1300',
		path: '/system/systemFunctions/role',
		title: '角色管理'
	}
]
export default serviceMap
