<template>
	<div id="treeWrapper" class="root">
		<el-form-item :label="label" @click.stop.prevent.native="onShowThree">
			<el-input
				:value="agentName"
				:disabled="userInfo.agentType === 2"
				placeholder
				style="width: 318px"
			></el-input>
		</el-form-item>
		<div v-if="showTree" class="down-wrapper">
			<el-input ref="input" v-model="filterText" placeholder>
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
import store from '@/store'
import { mapGetters } from 'vuex'
import { searchOrganization } from '@/api/user'

// 最终生成的树结构
let storeDatas = []

export default {
	name: 'SelectAgentTree',
	props: {
		label: {
			type: String,
			default: function () {
				return '统计商户'
			}
		},
		value: {
			type: [String, Number],
			default: function () {
				return ''
			}
		},
		node: {
			type: Object,
			default: function () {
				return {
					agentName: store.state.user.name,
					agentCode: store.state.user.agentCode
				}
			}
		},
		// 获取当前点击的节点
		getNode: {
			type: Function,
			default: function () {}
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
			isFirstEnter: true
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
					this.agentName = this.data[0] && this.data[0].agentName
				}
				// 添加必定浏览器崩溃
				// if (this.getNode) this.$emit('getNode', this.data[index] || {})
			}
		}
	},
	created() {
		if (this.isFirstEnter) {
			console.log('缓存组件初始化')
			this.initData()
		}
	},
	mounted() {
		document.addEventListener('click', this.closeTree)
	},
	destroyed() {
		storeDatas = []
		document.removeEventListener('click', this.closeTree)
	},
	activated() {
		if (!this.isFirstEnter) {
			console.log('缓存组件进行了更新')
			this.initData()
		}
	},
	methods: {
		initData() {
			storeDatas = []
			searchOrganization().then((res) => {
				this.isFirstEnter = false
				if (res.code === 200) {
					const organizations = res.data || []
					this.data = organizations
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
					this.generateTree(this.data)
					this.tree = storeDatas
				}
			})
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
		filterNode(value, data) {
			if (!value) return true
			const value2 = value.toUpperCase()
			return data.label.indexOf(value) !== -1 || data.label.indexOf(value2) !== -1
		},
		// 生成树形结构
		generateTree(data) {
			const datas = [...data]
			// 先找出父节点
			datas.forEach((element, i) => {
				const index = data.findIndex((val) => val.id === element.parentId)
				if (index < 0) {
					storeDatas.push({
						id: element.id,
						label: `${element.agentName} ${element.agentCode}`,
						children: [],
						...element
					})
					datas.splice(i, 1)
				}
			})
			this.recursionData(datas, storeDatas)
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
