<template>
	<div class="menu-wrapper">
		<template
			v-if="
				hasOneShowingChild(item.children, item) &&
					(!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
					!item.alwaysShow &&
					!item.hidden
			"
		>
			<app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
				<el-badge :value="showNumber(item.meta.title)" class="pop-star">
					<el-menu-item
						:index="resolvePath(onlyOneChild.path)"
						:class="{ 'submenu-title-noDropdown': !isNest }"
						style="text-align: left"
					>
						<item
							:active-path="activePath"
							:path="item.path"
							:icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
							:title="generateTitle(onlyOneChild.meta.title)"
						/>
					</el-menu-item>
				</el-badge>
			</app-link>
		</template>
		<el-submenu
			v-else-if="!item.hidden"
			ref="subMenu"
			:index="resolvePath(item.path)"
			popper-append-to-body
		>
			<template slot="title">
				<item
					v-if="item.meta"
					:active-path="activePath"
					:path="item.path"
					:icon="item.meta && item.meta.icon"
					:title="generateTitle(item.meta.title)"
				/>
			</template>

			<sidebar-item
				v-for="child in item.children"
				:key="child.path"
				:is-nest="true"
				:item="child"
				:base-path="resolvePath(child.path)"
				:active-path="activePath"
				class="nest-menu"
			/>
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
		hasOneShowingChild(children, parent) {
			let showingChildren = []
			if (children) {
				showingChildren = children.filter((item) => {
					if (item.hidden) {
						return false
					} else {
						// Temp set(will be used if only has one showing child)
						this.onlyOneChild = item
						return true
					}
				})
			}

			// When there is only one child router, the child router is displayed by default
			// if (showingChildren.length === 1) {
			// 	return true
			// }

			// Show parent if there are no child router to display
			if (showingChildren.length === 0) {
				this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
				return true
			}

			return false
		},
		showNumber(name) {
			switch (name) {
				case '会员账户修改审核':
					return this.$store.state.user.auditUpdateInfoUser || undefined
				case '新增会员审核':
					return this.$store.state.user.auditNewUser || undefined
				case '代理账户修改审核':
					return this.$store.state.user.auditUpdateInfoAgent || undefined
				case '会员溢出审核':
					return this.$store.state.user.auditPatchAgent || undefined
				case '新增代理审核':
					return this.$store.state.user.auditNewAgent || undefined
				case '会员转代审核':
					return this.$store.state.user.auditChangeAgent || undefined
				case '会员提款审核':
					return this.$store.state.user.auditMemberWithdrawUser || undefined
				case '代理提款审核':
					return this.$store.state.user.auditProxyWithdrawAgent || undefined
				case '会员人工加额审核':
					return this.$store.state.user.auditMemberArtificialAddUser || undefined
				case '代理人工加额审核':
					return this.$store.state.user.auditProxyArtificialAddAgent || undefined
				case '佣金审核':
					return this.$store.state.user.auditProxyCommissionAgent || undefined
			}
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
<style lang="scss" scoped>
/deep/ .pop-star {
	vertical-align: middle;
	.el-badge__content {
		border-radius: 12px;
		top: 18px;
		right: 32px;
	}
}
</style>
