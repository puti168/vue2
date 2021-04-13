const getters = {
	routes: (state) => state.permission.routes,
	language: (state) => state.app.language,
	sidebar: (state) => state.app.sidebar,
	device: (state) => state.app.device,
	visitedViews: (state) => state.tagsView.visitedViews,
	cachedViews: (state) => state.tagsView.cachedViews,
	lookUpData: (state) => state.app.lookUpData,
	token: (state) => state.user.token,
	avatar: (state) => state.user.avatar,
	name: (state) => state.user.nickName,
	username: (state) => state.user.username,
	userId: (state) => state.user.id,
	userInfo: (state) => state.user.userInfo,
	// 按钮权限
	buttonPermissions: (state) => state.permission.userBtns
}
export default getters
