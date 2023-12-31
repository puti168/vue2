<template>
	<div id="tags-view-container" class="tags-view-container">
		<scroll-pane ref="scrollPane" class="tags-view-wrapper">
			<router-link
				v-for="tag in visitedViews"
				ref="tag"
				:key="tag.path"
				:class="isActive(tag) ? 'active' : ''"
				:to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
				tag="span"
				class="tags-view-item"
				@click.middle.native="closeSelectedTag(tag)"
				@contextmenu.prevent.native="openMenu(tag, $event)"
			>
				{{ tag.title }}
				<span
					v-if="!tag.meta.affix"
					class="el-icon-close"
					@click.prevent.stop="closeSelectedTag(tag)"
				/>
                <el-badge
                    :value="showNumber(tag.title)"
                    class="pop-star"
                ></el-badge>
			</router-link>
		</scroll-pane>
		<!-- <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
			<li @click="refreshSelectedTag(selectedTag)">Refresh</li>
			<li
				v-if="!(selectedTag.meta&&selectedTag.meta.affix)"
				@click="closeSelectedTag(selectedTag)"
			>Close</li>
			<li @click="closeOthersTags">Close Others</li>
			<li @click="closeAllTags(selectedTag)">Close All</li>
		</ul>-->
	</div>
</template>

<script>
import ScrollPane from './ScrollPane'
import path from 'path'

export default {
	components: { ScrollPane },
	data() {
		return {
			visible: false,
			top: 0,
			left: 0,
			selectedTag: {},
			affixTags: []
		}
	},
	computed: {
		visitedViews() {
			return this.$store.state.tagsView.visitedViews
		},
		routes() {
			return this.$store.state.permission.routes
		}
	},
	watch: {
		$route() {
			this.addTags()
			this.moveToCurrentTag()
		},
		visible(value) {
			if (value) {
				document.body.addEventListener('click', this.closeMenu)
			} else {
				document.body.removeEventListener('click', this.closeMenu)
			}
		}
	},
	mounted() {
		this.initTags()
		this.addTags()
	},
	methods: {
		showNumber(name) {
			const ValueList = new Map([
				['会员账户修改审核', this.$store.state.user.auditUpdateInfoUser],
				['新增会员审核', this.$store.state.user.auditNewUser],
				['代理账户修改审核', this.$store.state.user.auditUpdateInfoAgent],
				['会员溢出审核', this.$store.state.user.auditPatchAgent],
				['新增代理审核', this.$store.state.user.auditNewAgent],
				['会员转代审核', this.$store.state.user.auditChangeAgent],
				['会员提款审核', this.$store.state.user.auditMemberWithdrawUser],
				['代理提款审核', this.$store.state.user.auditProxyWithdrawAgent],
				[
					'会员人工加额审核',
					this.$store.state.user.auditMemberArtificialAddUser
				],
				[
					'代理人工加额审核',
					this.$store.state.user.auditProxyArtificialAddAgent
				],
				['佣金审核', this.$store.state.user.auditProxyCommissionAgent]
			])
			return ValueList.get(name) || undefined
		},
		isActive(route) {
			return route.path === this.$route.path
		},
		filterAffixTags(routes, basePath = '/') {
			let tags = []
			routes.forEach((route) => {
				if (route.meta && route.meta.affix) {
					const tagPath = path.resolve(basePath, route.path)
					tags.push({
						fullPath: tagPath,
						path: tagPath,
						name: route.name,
						meta: { ...route.meta }
					})
				}
				if (route.children) {
					const tempTags = this.filterAffixTags(route.children, route.path)
					if (tempTags.length >= 1) {
						tags = [...tags, ...tempTags]
					}
				}
			})
			return tags
		},
		initTags() {
			const affixTags = (this.affixTags = this.filterAffixTags(this.routes))
			for (const tag of affixTags) {
				// Must have tag name
				if (tag.name) {
					this.$store.dispatch('tagsView/addVisitedView', tag)
				}
			}
		},
		addTags() {
			const { name } = this.$route
			if (name) {
				this.$store.dispatch('tagsView/addView', this.$route)
			}
			return false
		},
		moveToCurrentTag() {
			const tags = this.$refs.tag
			this.$nextTick(() => {
				for (const tag of tags) {
					if (tag.to.path === this.$route.path) {
						this.$refs.scrollPane.moveToTarget(tag)
						// when query is different then update
						if (tag.to.fullPath !== this.$route.fullPath) {
							this.$store.dispatch('tagsView/updateVisitedView', this.$route)
						}
						break
					}
				}
			})
		},
		refreshSelectedTag(view) {
			this.$store.dispatch('tagsView/delCachedView', view).then(() => {
				const { fullPath } = view
				this.$nextTick(() => {
					this.$router.replace({
						path: '/redirect' + fullPath
					})
				})
			})
		},
		closeSelectedTag(view) {
			this.$store
				.dispatch('tagsView/delView', view)
				.then(({ visitedViews }) => {
					if (this.isActive(view)) {
						this.toLastView(visitedViews, view)
					}
				})
		},
		closeOthersTags() {
			this.$router.push(this.selectedTag)
			this.$store
				.dispatch('tagsView/delOthersViews', this.selectedTag)
				.then(() => {
					this.moveToCurrentTag()
				})
		},
		closeAllTags(view) {
			this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
				if (this.affixTags.some((tag) => tag.path === view.path)) {
					return
				}
				this.toLastView(visitedViews, view)
			})
		},
		toLastView(visitedViews, view) {
			const latestView = visitedViews.slice(-1)[0]
			if (latestView) {
				this.$router.push(latestView)
			} else {
				// now the default is to redirect to the home page if there is no tags-view,
				// you can adjust it according to your needs.
				this.$router.push('/')
			}
		},
		openMenu(tag, e) {
			const menuMinWidth = 105
			const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
			const offsetWidth = this.$el.offsetWidth // container width
			const maxLeft = offsetWidth - menuMinWidth // left boundary
			const left = e.clientX - offsetLeft + 15 // 15: margin right

			if (left > maxLeft) {
				this.left = maxLeft
			} else {
				this.left = left
			}

			this.top = e.clientY
			this.visible = true
			this.selectedTag = tag
		},
		closeMenu() {
			this.visible = false
		}
	}
}
</script>

<style lang="scss" scoped>
.tags-view-container {
	height: 40px;
	width: 100%;
	margin-left: 200px;
	background: #fff;
	border-bottom: 1px solid #d8dce5;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
	.tags-view-wrapper {
		padding-right: 60px;
		.tags-view-item {
			display: inline-block;
			position: relative;
			cursor: pointer;
			height: 30px;
			line-height: 30px;
			border: 1px solid #d8dce5;
			color: #495060;
			background: #fff;
			padding: 0 8px;
			font-size: 12px;
			margin-left: 5px;
			margin-top: 4px;
			&:first-of-type {
				margin-left: 15px;
			}
			&:last-of-type {
				margin-right: 15px;
			}
			&.active {
				background-color: #58a3f7;
				color: #fff;
				border-color: #58a3f7;
				&::before {
					content: '';
					background: #fff;
					display: inline-block;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					position: relative;
					margin-right: 2px;
				}
			}
		}
	}
	.contextmenu {
		margin: 0;
		background: #fff;
		z-index: 3000;
		position: absolute;
		list-style-type: none;
		padding: 5px 0;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 400;
		color: #333;
		box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
		li {
			margin: 0;
			padding: 7px 16px;
			cursor: pointer;
			&:hover {
				background: #eee;
			}
		}
	}
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
	.tags-view-item {
		.el-icon-close {
			width: 16px;
			height: 16px;
			vertical-align: 2px;
			border-radius: 50%;
			text-align: center;
			transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
			transform-origin: 100% 50%;
			&:before {
				transform: scale(0.6);
				display: inline-block;
				vertical-align: -3px;
			}
			&:hover {
				background-color: #b4bccc;
				color: #fff;
			}
		}
	}
}
</style>
