<template>
	<div id="treeWrapper" class="root">
		<el-form-item label="商户名称/编码" @click.stop.prevent.native="onShowThree">
			<el-input
				:value="agentName"
				:disabled="userInfo.agentType === 2"
				placeholder="请选择商户名称或者商户编码"
				:style="`width: ${width}px`"
			></el-input>
		</el-form-item>
		<div
			v-if="showTree"
			class="down-wrapper"
		>
			<el-input ref="input" v-model="filterText" placeholder="请输入商户名称或者商户编码">
				<em slot="suffix" class="el-input__icon el-icon-search"></em>
			</el-input>
			<span style="height:500px; display:block;" class="mytree">
				<el-tree
					ref="tree"
					class="filter-tree"
					:data="tree"
					:props="defaultProps"
					node-key="id"
					:default-expanded-keys="['1']"
					:filter-node-method="filterNode"
					:expand-on-click-node="false"
					@node-click="nodeClick"
				></el-tree>
			</span>
		</div>
	</div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'

export default {
	name: 'SelectAgentTree',
	props: {
		value: {
			type: [String, Number],
			default: function() {
				return ''
			}
		},
		node: {
			type: Object,
			default: function() {
				return {
					agentName: store.state.user.name,
					agentCode: store.state.user.agentCode
				}
			}
		},
		// 获取当前点击的节点
		getNode: {
			type: Function,
			default: function() {}
		},
		showForm: {
			type: Boolean,
			default: true
		},
		width: {
			type: [String, Number],
			default: 218
		}
	},
	data() {
		return {
			showTree: false,
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
			agentCode: '',
			isFirstEnter: true,
			// 最终生成的树结构
			storeDatas: []
		}
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	watch: {
		filterText(val) {
			this.$refs.tree && this.$refs.tree.filter(val)
		},
		node: {
			handler(val) {
				// this.agentName = val.agentName
				this.agentCode = val.agentCode
			},
			immediate: true,
			deep: true
		},
		value: {
			handler(val) {
				let index = 0
				if (val) {
					index = this.data.findIndex((v) => v.id === Number(val))
					if (index > -1) {
						this.agentName = this.data[index].agentName
					}
				} else {
					this.$emit('input', this.tree[0].id)
					this.agentName = this.tree[0] && this.tree[0].agentName
				}
				// 添加必定浏览器崩溃
				// if (this.getNode) this.$emit('getNode', this.data[index] || {})
			}
		}
	},
	created() {
		// if (this.isFirstEnter) {
		// 	console.log('缓存组件初始化')
		// 	this.initData()
		// }
		if (this.$store.state.tree.data.length === 0 && this.isFirstEnter) {
			this.initData()
		} else {
			this.data = this.$store.state.tree.data
			this.tree = this.$store.state.tree.tree
			let index
			if (!this.value) {
				// 找到初始agentId
				index = this.data.findIndex((val) => val.agentCode === this.agentCode)
				if (index > -1) {
					this.$emit('input', this.data[index].id)
					this.agentName = this.data[index].agentName
				}
			} else {
				index = this.data.findIndex((v) => Number(v.id) === Number(this.value))
				if (index > -1) {
					this.agentName = this.data[index].agentName
				}
			}
		}
	},
	mounted() {
		document.addEventListener('click', this.closeTree)
	},
	destroyed() {
		this.storeDatas = []
		document.removeEventListener('click', this.closeTree)
	},
	activated() {
		if (this.$store.state.tree.data.length === 0) {
			this.initData()
		} else {
			this.data = this.$store.state.tree.data
			this.tree = this.$store.state.tree.tree
			let index
			if (!this.value) {
				// 找到初始agentId
				index = this.data.findIndex((val) => val.agentCode === this.agentCode)
				if (index > -1) {
					this.$emit('input', this.data[index].id)
					this.agentName = this.data[index].agentName
				}
			} else {
				index = this.data.findIndex((v) => Number(v.id) === Number(this.value))
				if (index > -1) {
					this.agentName = this.data[index].agentName
				}
			}
		}
	},
	methods: {
		selectParent() {
			let index = ''
			index = this.data.findIndex((v) => Number(v.id) === Number(this.value))
			if (index > -1) {
				this.agentName = this.data[index].agentName
			}
		},
		initData() {
			this.storeDatas = []
			this.isFirstEnter = false
			// this.$api.searchOrganization().then((res) => {
			// 	if (res.code === 200) {
			// 		if (this.tree.length > 0) return
			// 		const organizations = res.data || []
			// 		this.data = organizations
			// 		let index
			// 		if (!this.value) {
			// 			// 找到初始agentId
			// 			index = this.data.findIndex((val) => val.agentCode === this.agentCode)
			// 			if (index > -1) {
			// 				this.$emit('input', this.data[index].id)
			// 				this.agentName = this.data[index].agentName
			// 			}
			// 		} else {
			// 			index = this.data.findIndex((v) => Number(v.id) === Number(this.value))
			// 			if (index > -1) {
			// 				this.agentName = this.data[index].agentName
			// 			}
			// 		}
			// 		this.generateTree(this.data)
			// 		this.tree = this.storeDatas
			// 		this.$store.dispatch('tree/setTree', this.storeDatas)
			// 		this.$store.dispatch('tree/setTreeData', this.data)
			// 	}
			// })
		},
		closeTree(e) {
			const wrapper = document.getElementById('treeWrapper')
			if (wrapper && !wrapper.contains(e.target)) {
				this.showTree = false
			}
		},
		onShowThree() {
			if (this.userInfo.agentType !== 2) {
				this.filterText = ''
				this.showTree = true

				this.$nextTick(() => {
					this.$refs.input.focus()
				})
			}
		},
		filterNode(value, data, node) {
			if (!value) return true
			const value2 = value.toUpperCase()
			if (node.parent && !node.parent.parent) {
				return data.label.indexOf(value) !== -1 || data.label.indexOf(value2) !== -1
			}
			setTimeout(() => {
				const value3 = this.filterText.toUpperCase()
				if (data.label.indexOf(this.filterText) !== -1 || data.label.indexOf(value3) !== -1) {
					node.expanded = false
				}
			}, 1000)
			return (
				data.label.indexOf(value) !== -1 ||
				data.label.indexOf(value2) !== -1 ||
				node.parent.visible
			)
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
						label: `${element.agentName} ${element.agentCode}`,
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
						label: `${element.agentName} ${element.agentCode}`,
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
			this.agentName = node.agentName
			this.$emit('input', node.id)
			if (this.getNode) {
				this.$emit('getNode', node)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.root {
	position: relative;
	display: inline-block;
	.topAgent {
		top: 40px !important;
		left: 82px !important;
	}
	.down-wrapper {
		max-height: 466px;
		overflow: auto;
		padding: 20px;
		min-width: 218px;
		position: absolute;
		top: 30px;
		left: 100px;
		border: 1px solid #ddd;
		background: #fff;
		z-index: 999;
	}
}
.mytree /deep/ {
	.el-tree > .el-tree-node:after {
		border-top: none;
	}
	.el-tree-node {
		position: relative;
		padding-left: 16px;
	}
	//节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
	.el-tree-node__expand-icon.is-leaf {
		display: none;
	}
	.el-tree-node__children {
		padding-left: 16px;
	}

	.el-tree-node :last-child:before {
		height: 38px;
	}

	.el-tree > .el-tree-node:before {
		border-left: none;
	}

	.el-tree > .el-tree-node:after {
		border-top: none;
	}

	.el-tree-node:before {
		content: '';
		left: -4px;
		position: absolute;
		right: auto;
		border-width: 1px;
	}

	.el-tree-node:after {
		content: '';
		left: -4px;
		position: absolute;
		right: auto;
		border-width: 1px;
	}

	.el-tree-node:before {
		border-left: 1px solid #c0c4cc;
		bottom: 0px;
		height: 100%;
		top: -26px;
		width: 1px;
	}

	.el-tree-node:after {
		border-top: 1px solid #c0c4cc;
		height: 20px;
		top: 12px;
		width: 24px;
	}
}
</style>
