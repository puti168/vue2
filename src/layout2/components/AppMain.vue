<template>
	<keep-alive :include="cachedViews">
		<router-view :key="key" />
	</keep-alive>
</template>

<script>
export default {
	name: 'AppMain2',
	components: {},
	computed: {
		editVisible() {
			return this.$store.state.app.modifyVisible
		},
		cachedViews() {
			return this.$store.state.tagsView.cachedViews
		},
		key() {
			return this.$route.path
		}
	}
}
</script>

<style scoped>
.app-main {
	/*50 = navbar  */
	min-height: calc(100vh - 105px);
	width: 100%;
	position: relative;
	overflow: hidden;
}
.fixed-header + .app-main {
	padding-top: 105px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
// .el-popup-parent--hidden {
//   .fixed-header {
//     padding-right: 15px;
//   }
// }
</style>
