const serviceMap = [
	{
		id: '5400',
		path: '/authority',
		icon: 'bb_rolemanage',
		title: '权限管理'
	},
	{
		id: '5410',
		parentId: '5400',
		path: '/authority/management',
		icon: 'bb_defaultrole',
		title: '权限配置'
	},
	{
		id: '5100',
		path: '/securityAudit',
		icon: 'audits',
		title: '审计管理'
	},
	{
		id: '5110',
		parentId: '5100',
		path: '/securityAudit/dataAudit',
		icon: 'audit',
		title: '数据脱敏'
	},
	{
		id: '5112',
		parentId: '5100',
		path: '/securityAudit/monitorAudit',
		icon: 'audit',
		title: '监控审计'
	},
	{
		id: '5200',
		path: '/secretManage',
		icon: 'form',
		title: '密钥管理'
	},
	{
		id: '5210',
		parentId: '5200',
		path: '/secretManage/list',
		icon: 'secret-list',
		title: '密钥维护'
	},
	{
		id: '5300',
		path: '/system',
		icon: 'bb_management_system',
		title: '系统管理'
	},
	{
		id: '5310',
		parentId: '5300',
		path: '/system/changePassword',
		icon: 'bb_blacklist',
		title: '修改密码'
	},
	{
		id: '5320',
		parentId: '5300',
		path: '/system/account',
		icon: 'bb_management_user',
		title: '账号管理'
	},
	{
		id: '5330',
		parentId: '5300',
		path: '/system/role',
		icon: 'bb_management_role',
		title: '角色管理'
	}
]
export default serviceMap
