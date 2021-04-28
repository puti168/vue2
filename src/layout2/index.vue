<template>
	<div class="app-wrapper">
		<div ref="container2" class="main-container2">
			<app-main />
		</div>
	</div>
</template>

<script>
import { AppMain } from './components'

export default {
	name: 'Layout',
	components: {
		AppMain
	},
	mixins: [],
	computed: {
	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
	&.mobile.openSidebar {
		position: fixed;
		top: 0;
	}
}
.drawer-bg {
	background: #000;
	opacity: 0.3;
	width: 100%;
	top: 0;
	height: 100%;
	position: absolute;
	z-index: 999;
}

.fixed-header {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 9;
	width: 100%;
	transition: width 0.28s;
}

.mobile .fixed-header {
	width: 100%;
}
</style>
