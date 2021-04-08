import store from '@/store'

export function hasPermission(id) {
	return store.state.permission.userBtns.includes(id)
} // the method judges the authority id
