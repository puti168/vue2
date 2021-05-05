const game = [
	// 第一级菜单
	{
		id: '14',
		title: '游戏'
	},
	// 第二级菜单
	{
		id: '15',
		parentId: '14',
		icon: 'bb_report',
		title: '游戏功能'
	},
	{
		id: '18',
		parentId: '14',
		icon: 'bb_report',
		title: '游戏配置'
	},
	// 第三级菜单
	{
		id: '16',
		parentId: '15',
		path: '/game/gameConfig/gamePlatform',
		title: '游戏菜单'
	},
	{
		id: '17',
		parentId: '15',
		path: '/game/gameConfig/gameStatus',
		title: '游戏loading配置'
	},
	{
		id: '19',
		parentId: '18',
		path: '/game/gameConfig/gameClassify',
		title: '游戏平台维护配置'
	},
	{
		id: '20',
		parentId: '18',
		path: '/game/gameConfig/gameType',
		title: '游戏状态配置'
	},
	{
		id: '21',
		parentId: '18',
		path: '/game/gameConfig/venueGameList',
		title: '游戏归类配置'
	},
	{
		id: '22',
		parentId: '18',
		path: '/game/gameConfig/gameReminder',
		title: '游戏类型配置'
	},
	{
		id: '23',
		parentId: '18',
		path: '/game/gameFunction/gameBets',
		title: '场馆游戏列表'
	},
	{
		id: '24',
		parentId: '18',
		path: '/game/gameFunction/gameLoading',
		title: '游戏提醒配置'
	}
]
export default game
