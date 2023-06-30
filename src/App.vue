<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App'
	// created() {
	// 	console.log('window roles', window.localStorage.getItem('role'))
	// 	console.log('store roles', JSON.stringify(this.$store.state.user.roles))
	// 	window.addEventListener('beforeunload', () => {
	// 		window.localStorage.setItem(
	// 			'role',
	// 			JSON.stringify(this.$store.state.user.roles)
	// 		)
	// 	})
	// 	window.localStorage.getItem('role') &&
	// 		this.$store.replaceState(
	// 			Object.assign(
	// 				this.$store.state,v
	// 				JSON.parse(window.localStorage.getItem('role'))
	// 			)
	// 		)
	// 	// this.$store.state.user.roles = JSON.parse(window.localStorage.getItem('role'))
	// },
	// destroyed() {
	// 	window.removeEventListener('beforeunload', () => {
	// 		window.localStorage.setItem(
	// 			'role',
	// 			JSON.stringify(this.$store.state.user.roles)
	// 		)
	// 	})
	// }
}
</script>
