import dayjs from 'dayjs'

// 用户权限 key为权限名  value对应后端返回的permissionName 权限变更，改成用id 后续有变动再整理
// export const permissions = {
// 	// 导出CSV
// 	exportCsv: 'exportCsv',
// 	// 修改个人限红
// 	modifyLimitRed: 'modifyLimitRed',
// 	// 修改账户状态
// 	modifyStatus: 'modifyStatus',
// 	// 历史轨迹
// 	historyRoute: 'historyRoute',
// 	// 新建线路商
// 	addLine: 'addLine',
// 	// 新建商户
// 	addAgent: 'addAgent',
// 	// 重置密钥
// 	updateKey: 'updateKey',
// 	// 查看密钥
// 	queryKey: 'queryKey',
// 	// 修改账号状态
// 	updateStatus: 'updateStatus',
// 	// 修改密钥
// 	modifyPwd: 'modifyPwd',
// 	// 账号编辑
// 	agentsEdit: 'agentsEdit',
// 	// 新建线路商 - 商户管理下的
// 	buydotAddLine: 'buydotAddLine',
// 	// 新建商户 - 商户管理下的
// 	buydotAddAgent: 'buydotAddAgent',
// 	// 重置密钥 - 商户管理下的
// 	buydotUpdateKey: 'buydotUpdateKey',
// 	// 查看密钥 - 商户管理下的
// 	buydotQueryKey: 'buydotQueryKey',
// 	// 修改账号状态 - 商户管理下的
// 	buydotUpdateStatus: 'buydotUpdateStatus',
// 	// 修改密钥 - 商户管理下的
// 	buydotModifyPwd: 'buydotModifyPwd',
// 	// 账号编辑 - 商户管理下的
// 	buydotEdit: 'buydotEdit',
// 	// 修改剩余点数
// 	buydotModifyBalance: 'buydotModifyBalance',
// 	// 限红新增
// 	limitRedAdd: 'limitRedAdd',
// 	// 启用/停用自定义限红
// 	betLimitModifyStatus: 'betLimitModifyStatus',
// 	// 查询限红详情
// 	getBetLimitDetail: 'getBetLimitDetail',
// 	// 编辑自定义限红
// 	editBetLimit: 'editBetLimit',
// 	// 公告管理
// 	noticeList: 'noticeList',
// 	// 新增公告
// 	noticeAdd: 'noticeAdd',
// 	// 修改公告状态
// 	noticeUpdateStatus: 'noticeUpdateStatus',
// 	// 编辑公告
// 	noticeEdit: 'noticeEdit',
// 	// 新建用户账号
// 	systemUserAdd: 'systemUserAdd',
// 	// 用户账号编辑
// 	systemUserEdit: 'systemUserEdit',
// 	// 修改用户账号状态
// 	systemUserModifyStatus: 'systemUserModifyStatus',
// 	// 修改用户密码
// 	systemUserModifyPwd: 'systemUserModifyPwd',
// 	// 新建角色
// 	systemRoleAdd: 'systemRoleAdd',
// 	// 角色编辑
// 	systemRoleEdit: 'systemRoleEdit',
// 	// 添加url
// 	systemUrlAddUrl: 'systemUrlAddUrl',
// 	// 编辑url
// 	systemUrlEditUrl: 'systemUrlEditUrl',
// 	// 添加白名单
// 	systemIpAdd: 'systemIpAdd',
// 	// 批量添加白名单
// 	systemIpUpload: 'systemIpUpload',
// 	// 删除白名单
// 	systemIpDelete: 'systemIpDelete',
// 	// 角色删除
// 	systemDeleteRole: 'systemDeleteRole',
// 	// 合作模式编辑
// 	agentsEditModel: 'agentsEditModel'
// }

// 路由的名称  一定要和 组件的name对应，缓存才起作用
export const routerNames = {
	dealerDetail: 'dealerDetail',
	dealer: 'dealer',
	rateServerMonitor: 'rateServerMonitor',
	apiServerMonitor: 'apiServerMonitor'
}
export const routerSwitchNames = {
	dealerDetail: '已完成校对局',
	dealer: '未完成校对局',
	rateServerMonitor: '拉单服务器监控',
	apiServerMonitor: 'API服务器监控'
}
const month = dayjs().month()
const year = dayjs().year()
export const shortcuts = [
	{
		text: '今日',
		onClick(picker) {
			const end = dayjs().endOf('day')
			const start = dayjs().startOf('day')
			picker.$emit('pick', [+start, +end])
		}
	},
	{
		text: '昨日',
		onClick(picker) {
			const end = dayjs()
				.endOf('day')
				.subtract(1, 'd')
			const start = dayjs()
				.startOf('day')
				.subtract(1, 'd')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 当周
	{
		text: '当周',
		onClick(picker) {
			let start, end
			const weekNum = dayjs().day()
			if (weekNum === 0) {
				end = dayjs().endOf('day')
				start = dayjs()
					.subtract(1, 'd')
					.startOf('week')
					.startOf('day')
					.add(1, 'd')
			} else {
				end = dayjs().endOf('day')
				start = dayjs()
					.startOf('day')
					.startOf('week')
					.add(1, 'd')
			}
			picker.$emit('pick', [+start, +end])
		}
	},
	// 当月
	{
		text: '当月',
		onClick(picker) {
			const end = dayjs().endOf('day')
			const start = dayjs().startOf('month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 上月
	{
		text: '上月',
		onClick(picker) {
			const end = dayjs()
				.subtract(1, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(1, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前2月
	{
		text:
			month - 1 > 0
				? year + '年' + (month - 1) + '月'
				: year - 1 + '年' + (month - 1 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(2, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(2, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前3月
	{
		text:
			month - 2 > 0
				? year + '年' + (month - 2) + '月'
				: year - 1 + '年' + (month - 2 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(3, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(3, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前4月
	{
		text:
			month - 3 > 0
				? year + '年' + (month - 3) + '月'
				: year - 1 + '年' + (month - 3 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(4, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(4, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前5月
	{
		text:
			month - 4 > 0
				? year + '年' + (month - 4) + '月'
				: year - 1 + '年' + (month - 4 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(5, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(5, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前6月
	{
		text:
			month - 5 > 0
				? year + '年' + (month - 5) + '月'
				: year - 1 + '年' + (month - 5 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(6, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(6, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前7月
	{
		text:
			month - 6 > 0
				? year + '年' + (month - 6) + '月'
				: year - 1 + '年' + (month - 6 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(7, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(7, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前8月
	{
		text:
			month - 7 > 0
				? year + '年' + (month - 7) + '月'
				: year - 1 + '年' + (month - 7 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(8, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(8, 'month')
			picker.$emit('pick', [+start, +end])
		}
	},
	// 往前9月
	{
		text:
			month - 8 > 0
				? year + '年' + (month - 8) + '月'
				: year - 1 + '年' + (month - 8 + 12) + '月',
		onClick(picker) {
			const end = dayjs()
				.subtract(9, 'month')
				.endOf('month')
			const start = dayjs()
				.startOf('month')
				.subtract(9, 'month')
			picker.$emit('pick', [+start, +end])
		}
	}
]
