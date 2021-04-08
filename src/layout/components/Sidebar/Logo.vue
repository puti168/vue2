<template>
	<div class="sidebar-logo-container" :class="{'collapse':collapse}">
		<transition name="sidebarLogoFade">
			<router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
				<svg-icon icon-class="bb_logo2" class="sidebar-logo" />
				<div class="divide-line divide-line-collapse"></div>
			</router-link>
			<router-link v-else key="expand" class="sidebar-logo-link" to="/">
				<svg-icon icon-class="bb_logo2" class="sidebar-logo" />
				<div class="divide-line"></div>
			</router-link>
		</transition>
	</div>
</template>

<script>
import bb_logo from '../../../assets/img/bb_logo.png'
export default {
	name: 'SidebarLogo',
	props: {
		collapse: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			title: '真人娱乐管理后台',
			logo: bb_logo
		}
	}
}
</script>

<style lang="scss" scoped>
.divide-line {
	margin: 0 auto;
	width: 140px;
	height: 2px;
	background: #013a82;
}
.divide-line-collapse {
	width: 60px;
}
.sidebarLogoFade-enter-active {
	transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
	opacity: 0;
}

.sidebar-logo-container {
	position: relative;
	width: 100%;
	height: 97px;
	line-height: 95px;
	text-align: center;
	overflow: hidden;

	& .sidebar-logo-link {
		height: 100%;
		width: 100%;
		& .sidebar-logo {
			width: 80px;
			height: 80px;
			vertical-align: middle;
			margin-right: 12px;
		}

		& .sidebar-title {
			display: inline-block;
			margin: 0;
			color: #fff;
			font-weight: 600;
			line-height: 50px;
			font-size: 14px;
			font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
			vertical-align: middle;
		}
	}

	&.collapse {
		.sidebar-logo {
			margin-right: 0px;
		}
	}
}
</style>
