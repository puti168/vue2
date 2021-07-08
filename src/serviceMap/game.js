const game = [
	// 第一级菜单
	{
		id: '1020000',
		title: '游戏'
	},
	// 第二级菜单
	{
		id: '1020100',
		parentId: '1020000',
		icon: 'bb_apilog',
		title: '游戏配置'
	},
	{
		id: '1020200',
		parentId: '1020000',
		icon: 'bb_betlimit',
		title: '游戏推荐'
	},
	{
		id: '1020300',
		parentId: '1020000',
		icon: 'bb_businessadress',
		title: '游戏注单'
	},
	{
		id: '1020400',
		parentId: '1020000',
		icon: 'bb_domain',
		title: '游戏搜索'
	},
	// 第三级菜单
	{
		id: '1020101',
		parentId: '1020100',
		path: '/game/gameConfig/gameManagement',
		title: '游戏管理'
	},
	{
		id: '1020102',
		parentId: '1020100',
		path: '/game/gameConfig/gameClassification',
		title: '游戏分类管理'
	},
	{
		id: '1020103',
		parentId: '1020100',
		path: '/game/gameConfig/gameLabel',
		title: '游戏标签管理'
	},
	{
		id: '1020104',
		parentId: '1020100',
		path: '/game/gameConfig/operationRecord',
		title: '操作记录'
	},
	{
		id: '1020201',
		parentId: '1020200',
		path: '/game/gameRecommend/gameHomeRecommend',
		title: '首页推荐位管理'
	},
	{
		id: '1020202',
		parentId: '1020200',
		path: '/game/gameRecommend/operationRecord',
		title: '操作记录'
	},
	{
		id: '1020301',
		parentId: '1020300',
		path: '/game/gameBetslip/gameBetslipTable',
		title: '游戏注单'
	},
	{
		id: '1020401',
		parentId: '1020400',
		path: '/game/gameSearch/gameSearchLog',
		title: '游戏搜索日志'
	},
	{
		id: '1020402',
		parentId: '1020400',
		path: '/game/gameSearch/gameSearchManage',
		title: '游戏搜索管理'
	},
	{
		id: '1020403',
		parentId: '1020400',
		path: '/game/gameSearch/operationRecord',
		title: '操作记录'
	}
]
export default game
