const game = [
	// 第一级菜单
	{
		id: '21',
		title: '游戏'
	},
	// 第二级菜单
	{
		id: '22',
		parentId: '21',
		icon: 'bb_report',
		title: '游戏功能'
	},
	{
		id: '25',
		parentId: '21',
		icon: 'bb_report',
		title: '游戏配置'
	},
	// 第三级菜单
	{
		id: '26',
		parentId: '25',
		path: '/game/gameConfig/gamePlatform',
		title: '游戏平台维护配置'
	},
	{
		id: '27',
		parentId: '25',
		path: '/game/gameConfig/gameStatus',
		title: '游戏状态配置'
	},
	{
		id: '28',
		parentId: '25',
		path: '/game/gameConfig/gameClassify',
		title: '游戏归类配置'
	},
	{
		id: '29',
		parentId: '25',
		path: '/game/gameConfig/gameType',
		title: '游戏类型配置'
	},
	{
		id: '30',
		parentId: '25',
		path: '/game/gameConfig/venueGameList',
		title: '场馆游戏列表'
	},
	{
		id: '31',
		parentId: '25',
		path: '/game/gameConfig/gameReminder',
		title: '游戏提醒配置'
	},
	{
		id: '23',
		parentId: '22',
		path: '/game/gameFunction/gameBets',
		title: '游戏注单'
	},
	{
		id: '24',
		parentId: '22',
		path: '/game/gameFunction/gameLoading',
		title: '游戏loading配置'
	}
]
export default game
