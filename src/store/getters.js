const getters = {
	sidebar: (state) => state.app.sidebar,
	device: (state) => state.app.device,
	token: (state) => state.user.token,
	username: (state) => state.user.username,
	nickName: (state) => state.user.nickName,
	id: (state) => state.user.id,
	avatar: (state) => state.user.avatar,
	roles: (state) => state.user.roles,
	rolesIds: (state) => state.user.rolesIds,
	addRoutes: (state) => state.permission.addRoutes,
	name: (state) => state.user.name,
	pageSizes: (state) => [10, 20, 50],
	countryType: (state) => state.user.datas.countryType,
	gametype: (state) => state.user.datas.gametype,
	userTypes: (state) => state.user.datas.userType,
	cardColourType: (state) => state.user.datas.cardColourType,
	warehouseType: (state) => state.user.datas.warehouseType,
	userInfo: (state) => state.user.userInfo,
	routes: (state) => state.permission.routes
}
export default getters
