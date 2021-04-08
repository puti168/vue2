<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App',
	mounted() {
		window.addEventListener('storage', function(e) {
			if (e.key === 'zr-user-key' && e.oldValue !== e.newValue) {
				location.reload()
			}
		})
	}
}
</script>
