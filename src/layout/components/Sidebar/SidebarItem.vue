<template>
	<div class="menu-wrapper">
		<template
			v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
		>
			<app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
				<el-menu-item
					:index="resolvePath(onlyOneChild.path)"
					:class="{'submenu-title-noDropdown':!isNest}"
				>
					<item
						:active-path="activePath"
						:path="item.path"
						:icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"
						:title="generateTitle(onlyOneChild.meta.title)"
					/>
				</el-menu-item>
			</app-link>
		</template>
		<el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
			<template slot="title">
				<item
					v-if="item.meta"
					:active-path="activePath"
					:path="item.path"
					:icon="item.meta && item.meta.icon"
					:title="generateTitle(item.meta.title)"
				/>
			</template>
			<!-- <sidebar-item
				v-for="child in item.children"
				:key="child.path"
				:is-nest="true"
				:item="child"
				:base-path="resolvePath(child.path)"
				:active-path="activePath"
				class="nest-menu"
			/> -->
		</el-submenu>
	</div>
</template>

<script>
import path from 'path'
import { generateTitle } from '@/utils/i18n'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
	name: 'SidebarItem',
	components: { Item, AppLink },
	mixins: [FixiOSBug],
	props: {
		// route object
		item: {
			type: Object,
			required: true
		},
		isNest: {
			type: Boolean,
			default: false
		},
		basePath: {
			type: String,
			default: ''
		},
		activePath: {
			type: String,
			default: ''
		}
	},
	data() {
		// To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
		// TODO: refactor with render function
		this.onlyOneChild = null
		return {}
	},
	methods: {
		hasOneShowingChild(children = [], parent) {
			const showingChildren = children.filter((item) => {
				if (item.hidden) {
					return false
				} else {
					// Temp set(will be used if only has one showing child)
					this.onlyOneChild = item
					return true
				}
			})

			// When there is only one child router, the child router is displayed by default
			if (showingChildren.length === 1) {
				// 鉴于产品与后台要求，将密钥管理设置成二级菜单
				if (
					showingChildren[0].name === '5210' ||
					showingChildren[0].name === '5110' ||
					showingChildren[0].name === '5410'
				) { return false }
				return true
			}

			// Show parent if there are no child router to display
			if (showingChildren.length === 0) {
				this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
				return true
			}

			return false
		},
		resolvePath(routePath) {
			if (isExternal(routePath)) {
				return routePath
			}
			if (isExternal(this.basePath)) {
				return this.basePath
			}
			return path.resolve(this.basePath, routePath)
		},
		generateTitle
	}
}
</script>
