<template>
	<section class="app-main">
		<transition name="fade-transform" mode="out-in">
			<keep-alive :exclude="noAliveList">
				<router-view :key="key" />
			</keep-alive>
		</transition>
	</section>
</template>

<script>
export default {
	name: 'AppMain',
	components: {},
	data() {
		return {
			noAliveList: ['memberChangeReview', 'addMemberReview', 'addMemberCheck', 'memberChange']
		}
	},
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
