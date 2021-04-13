<template>
	<div id="treeWrapper" class="root">
		<el-form-item label="上级权限" @click.stop.prevent.native="onShowThree">
			<el-input
				:value="agentName"
				placeholder="请输入菜单名称"
				:style="`width: ${width}px`"
			></el-input>
		</el-form-item>
		<div v-if="showTree" class="down-wrapper">
			<el-input ref="input" v-model="filterText" placeholder="请输入菜单名称">
				<em slot="suffix" class="el-input__icon el-icon-search"></em>
			</el-input>
			<el-tree
				ref="tree"
				class="filter-tree"
				:data="tree"
				:props="defaultProps"
				default-expand-all
				:filter-node-method="filterNode"
				:expand-on-click-node="false"
				@node-click="nodeClick"
			></el-tree>
		</div>
	</div>
</template>

<script>
import { loadBySystem } from '@/api/audit'

export default {
	name: 'SelectAgentTree',
	props: {
		label: {
			type: String,
			default: function() {
				return '菜单名称'
			}
		},
		value: {
			type: [String, Number],
			default: function() {
				return ''
			}
		},
		parentId: {
			type: [String, Number],
			default: function() {
				return ''
			}
		},
		userType: {
			type: [String, Number],
			default: function() {
				return ''
			}
		},
		// 获取当前点击的节点
		getNode: {
			type: Function,
			default: function() {}
		},
		width: {
			type: [String, Number],
			default: 318
		}
	},
	data() {
		return {
			showTree: false,
			first: true,
			filterText: '',
			// 全部数据
			data: [],
			// 树数据
			tree: [],
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			agentName: '',
			// 最终生成的树结构
			storeDatas: []
		}
	},
	computed: {},
	watch: {
		filterText(val) {
			this.$refs.tree && this.$refs.tree.filter(val)
		},
		value: {
			handler(val) {
				let index = 0
				if (val) {
					index = this.data.findIndex((v) => v.id === Number(val))
					if (index > -1) {
						this.agentName = this.data[index].remark
					}
				} else {
					this.agentName = this.data[0] && this.data[0].remark
				}
				// 添加必定浏览器崩溃
				// if (this.getNode) this.$emit('getNode', this.data[index] || {})
			}
		}
	},
	created() {},
	mounted() {
		document.addEventListener('click', this.closeTree)
		this.initData()
	},
	destroyed() {
		this.storeDatas = []
		document.removeEventListener('click', this.closeTree)
	},
	methods: {
		initData(userType) {
			userType = userType || this.userType
			this.storeDatas = []
			loadBySystem({ userType }).then((res) => {
				if (res.code === 200) {
					if (this.first) {
						res.data.forEach((item) => {
							if (item.id === this.parentId) {
								this.agentName = item.remark
							}
						})
					}
					this.first = false
					const organizations = res.data || []
					this.data = organizations
					let index
					if (!this.value) {
						if (index > -1) {
							this.$emit('input', this.data[index].id)
							this.agentName = this.data[index].remark
						}
					} else {
						index = this.data.findIndex(
							(v) => Number(v.id) === Number(this.value)
						)
						if (index > -1) {
							this.agentName = this.data[index].remark
						}
					}
					this.generateTree(this.data)
					this.tree = this.storeDatas
				}
			})
		},
		closeTree(e) {
			const wrapper = document.getElementById('treeWrapper')
			if (wrapper && !wrapper.contains(e.target)) {
				this.showTree = false
			}
		},
		close() {
			this.showTree = false
		},
		onShowThree() {
			this.filterText = ''
			this.showTree = true

			this.$nextTick(() => {
				this.$refs.input.focus()
			})
		},
		filterNode(value, data) {
			if (!value) return true
			value = value.toUpperCase()
			return data.label.indexOf(value) !== -1
		},
		// 生成树形结构
		generateTree(data) {
			const datas = [...data]
			// 先找出父节点
			datas.forEach((element, i) => {
				const index = data.findIndex((val) => val.id === element.parentId)
				if (index < 0) {
					this.storeDatas.push({
						id: element.id,
						label: `${element.remark}`,
						children: [],
						...element
					})
					datas.splice(i, 1)
				}
			})
			this.recursionData(datas, this.storeDatas)
		},
		// 递归生成
		recursionData(data, tree) {
			const datas = [...data]
			const pickIndex = []
			const leftDatas = []
			datas.forEach((element) => {
				const index = tree.findIndex((val) => val.id === element.parentId)
				if (index > -1) {
					tree[index].children.push({
						id: element.id,
						label: `${element.remark}`,
						children: [],
						...element
					})
					!pickIndex.includes(index) && pickIndex.push(index)
				} else {
					leftDatas.push(element)
				}
			})
			if (pickIndex.length > 0) {
				pickIndex.forEach((element) => {
					this.recursionData(leftDatas, tree[element].children)
				})
			}
		},
		nodeClick(node) {
			this.showTree = false
			this.agentName = node.remark
			this.$emit('getNode', node.id)
		}
	}
}
</script>

<style lang="scss" scoped>
.root {
	position: relative;
	display: inline-block;

	.down-wrapper {
		max-height: 466px;
		overflow: auto;
		padding: 20px;
		width: 318px;
		position: absolute;
		top: 45px;
		right: 10px;
		border: 1px solid #ddd;
		background: #fff;
		z-index: 999;
	}
}
</style>
