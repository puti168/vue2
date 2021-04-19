<template>
	<div>
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu
				:default-active="activeMenu"
				background-color="#f2f2f2"
				text-color="#999999"
				:unique-opened="false"
				active-text-color="#999999"
				:collapse-transition="false"
				mode="vertical"
			>
				<sidebar-item
					v-for="route in routes"
					:key="route.path"
					:item="route"
					:base-path="route.path"
					:active-path="activeMenu"
				/>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
	components: { SidebarItem },
	computed: {
		...mapGetters(['sidebar', 'routes', 'nowRoute']),
		activeMenu() {
			console.log('routes :>> ', this.routes)
			console.log(this.$route)
			const route = this.$route
			const { meta, path } = route
			// if set path, the sidebar will highlight the path you set
			if (meta.activeMenu) {
				return meta.activeMenu
			}
			return path
		},
		variables() {
			return variables
		}
	}
}
</script>
