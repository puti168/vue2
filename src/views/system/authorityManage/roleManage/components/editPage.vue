<template>
	<div class="game-container report-container editRolePage-container">
		<div class="roleEdit-content">
			<div class="form-header">
				<span>创建/编辑</span>
				<span>
					<el-button type="success" @click="back">返回</el-button>
				</span>
			</div>
			<div class="content-part2">
				<p class="part-title">基础信息</p>
				<el-form
					ref="form"
					:model="queryData"
					:rules="rules"
					label-width="100px"
					class="picture-form"
				>
					<el-form-item label="角色名称:" prop="roleName">
						<el-input
							v-model="queryData.roleName"
							size="medium"
							maxlength="20"
							placeholder="请输入"
							clearable
							style="width: 365px"
						></el-input>
					</el-form-item>
					<el-form-item label="备注:" prop="remark">
						<el-input
							v-model="queryData.remark"
							size="medium"
							type="textarea"
							placeholder="请输入"
							clearable
							maxlength="300"
							show-word-limit
							style="width: 365px"
						></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="content-part3">
				<p class="part-title">角色权限</p>
				<div class="role-container">
					<div class="tree-content">
						<el-tree
							ref="tree"
							:data="rolePermissions"
							:default-checked-keys="checkedKeys"
							default-expand-all
							node-key="id"
							show-checkbox
							:props="defaultProps"
							:check-on-click-node="true"
							@check="handleCheck"
							@check-change="handleCheckChange"
						></el-tree>
					</div>
				</div>
				<el-checkbox
					v-model="chooseAll"
					class="chooseAll"
					:indeterminate="isIndeterminate"
					@change="handleAllChoose"
				>
					选择全部
				</el-checkbox>
			</div>
			<div class="save-container">
				<div class="save-btn" @click.prevent="save">
					<i v-show="loading" class="el-icon-loading"></i>
					保存
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { isHaveEmoji, notSpecial2 } from '@/utils/validate'
const storeDatas = []

export default {
	name: 'EditPage',
	mixins: [list],
	props: {
		editData: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			loading: false,
			queryData: {
				roleName: undefined,
				remark: undefined,
				id: undefined
			},
			chooseAll: false,
			dataList: [],
			rolePermissions: [],
			permissions: [],
			checkedKeys: [],
			chooseIds: [],
			allChooseLen: 0,
			isIndeterminate: false,
            updateStatus: false
		}
	},
	computed: {
		rules() {
			const testPicName = (rule, value, callback) => {
				const isSpecial = !notSpecial2(String(value))
				const isRmoji = isHaveEmoji(String(value))
				if (isSpecial) {
					callback(new Error('不支持空格及特殊字符'))
				} else if (isRmoji) {
					callback(new Error('不支持表情'))
				} else if (!value) {
					callback(new Error('请输入图片名称'))
				} else {
					callback()
				}
			}
			const roleName = [
				{
					required: true,
					validator: testPicName,
					trigger: 'blur'
				}
			]
			const remark = [
				{
					required: true,
					message: '请填入备注',
					trigger: 'blur'
				},
				{ min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
			]
			return {
				roleName,
				remark
			}
		},
		defaultProps() {
			return {
				label: (data) => {
					return data.permissionName
				},
				children: 'children'
			}
		}
	},
	watch: {
		// editData: {
		// 	handler(newData) {
		// 		if (Object.keys(newData).length) {
		// 			this.queryData = {
		// 				...newData
		// 			}
		// 			if (this.queryData.imageAddress) {
		// 				this.$nextTick(() => {
		// 					this.$refs.imgUpload.state = 'image'
		// 					this.$refs.imgUpload.fileUrl = newData.imageAddress
		// 				})
		// 			}
		// 		} else {
		// 			this.queryData = {
		// 				roleName: undefined,
		// 				remark: undefined,
		// 				id: undefined
		// 			}
		// 		}
		// 	},
		// 	deep: true,
		// 	immediate: true
		// }
	},
	created() {
		this.rolePermissions = storeDatas
	},
	mounted() {
		this.getRoleList()
	},
	updated() {},
	methods: {
		back() {
			this.$emit('back')
		},
		async getRoleList() {
			const { code, data } = await this.$api.getRolePermissionsAPI()
			if (code === 200) {
				this.permissions = JSON.parse(JSON.stringify(data))
				this.allChooseLen = data.length
				this.filterData(data)
			}
		},

		filterData(data) {
			const _data = [...data]
			_data.forEach((ele, i) => {
				const index = data.findIndex((val) => val.id === ele.parentId)
				if (index < 0) {
					storeDatas.push({
						id: ele.id,
						label: ele.permissionName,
						children: [],
						...ele
					})
					_data.splice(i, 1)
				}
			})
			this.generateData(_data, storeDatas)
		},
		generateData(data, tree) {
			const data_s = [...data]
			const pickIndex = []
			const leftData = []
			data_s.forEach((ele) => {
				const index = tree.findIndex((val) => val.id === ele.parentId)
				if (index > -1) {
					tree[index].children.push({
						id: ele.id,
						label: ele.permissionName,
						children: [],
						...ele
					})
					!pickIndex.includes(index) && pickIndex.push(index)
				} else {
					leftData.push(ele)
				}
			})
			if (pickIndex.length > 0) {
				pickIndex.forEach((ele) => {
					this.generateData(leftData, tree[ele].children)
				})
			}
		},
		handleCheck(checkedNodes, checkedKeys) {
			this.chooseIds = checkedKeys.checkedKeys.concat(
				checkedKeys.halfCheckedKeys
			)
			!!this.chooseIds.length && this.chooseIds.length < this.allChooseLen
				? ((this.chooseAll = false), (this.isIndeterminate = true))
				: this.allChooseLen === this.chooseIds.length
				? ((this.chooseAll = true), (this.isIndeterminate = false))
				: ((this.chooseAll = false), (this.isIndeterminate = false))
		},
		handleAllChoose(val) {
			const ids = this.getAllIds(this.permissions, [])
			this.$nextTick(() => {
				this.$refs.tree.setCheckedKeys(val ? ids : [])
				val ? (this.chooseIds = ids) : (this.chooseIds = [])
			})
			this.isIndeterminate = false
		},
		getAllIds(permissions, arr) {
			permissions.forEach((item) => {
				arr.push(item.id)
				item.children && this.getAllIds(item.children, arr)
			})
			return arr
		},
		handleCheckChange(data) {
			// if (this.$refs.tree) {
			//     const selected = this.$refs.tree.getCheckedKeys()
			//     const ids = this.getAllIds(this.permissions, [])
			//     this.checkAll = selected.length === ids.length
			// }
		},
		save() {
			this.loading = true
			const params = {
				...this.queryData
			}
			const handle = this.updateStatus
				? this.$api.agentPictureListUpdateAPI
				: this.$api.agentPictureListCreateAPI
			this.$refs['form'].validate((valid) => {
				if (valid && this.loading) {
					handle(params)
						.then((res) => {
							this.loading = false
							const { code, msg } = res
							if (code === 200) {
								this.$message({
									message: `${this.updateStatus ? '更新' : '新增'}成功`,
									type: 'success'
								})
								this.reset()
								this.$refs.imgUpload.clearFile()
								setTimeout(() => {
									this.back()
								}, 1500)
							} else {
								this.$message({
									message: msg,
									type: 'error'
								})
							}
						})
						.catch(() => {
							this.loading = false
						})
				}
			})

			setTimeout(() => {
				this.loading = false
			}, 1000)
		},
		reset() {
			this.$refs['form'].resetFields()
			this.queryData = {
				roleName: undefined,
				remark: undefined,
				id: undefined
			}
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
	text-align: center;
	color: #909399;
	font-weight: 700;
}
/deep/ .el-button--info {
	background-color: rgba(26, 188, 156, 1);
	color: #fff;
	border-color: rgb(28, 195, 162);
}
/deep/ .el-button--info:hover {
	background-color: #1b9f89;
}
/deep/ .el-button + .el-button {
	margin-left: 0;
	margin-right: 15px;
	margin-bottom: 15px;
}

/deep/ .el-tree-node__content > label.el-checkbox {
	margin-right: 8px;
}

.editRolePage-container {
	background-color: #f5f5f5;
	margin: 0;
	min-height: calc(100vh - 105px);
	.roleEdit-content {
		width: 65%;
		margin: 0 auto;
		background-color: #fff;
		position: relative;
		padding-bottom: 30px;
		.form-header {
			height: 55px;
			line-height: 55px;
			width: 100%;
			background-color: rgba(0, 0, 0, 1);
			span:nth-child(1) {
				position: absolute;
				left: 30px;
				top: 0;
				color: rgba(255, 255, 255, 0.847058823529412);
				font-size: 16px;
				font-weight: 700;
			}
			span:nth-child(2) {
				position: absolute;
				right: 30px;
				top: 0;
				color: #999;
				font-weight: 400;
				font-size: 14px;
			}
		}
		.form-header:after {
			content: '.';
			height: 0;
			display: table;
			clear: both;
		}
		.content-part2 {
			width: 100%;
			padding: 25px 35px 20px;
			position: relative;
			margin: 0 auto;
			.picture-form {
				position: relative;
				width: 600px;
				max-width: 100%;
				padding: 35px 35px 0;
				margin: 0 auto;
				overflow: hidden;
			}
		}
		.content-part3 {
			width: 100%;
			padding: 25px 35px 20px;
			margin-top: 45px;
			.role-container {
				padding-left: 15px;
				padding-right: 15px;
				border: 1px solid #eee;
				overflow-y: scroll;
				.tree-content {
					height: 800px;
				}
				.btn-style-role {
					width: 120px;
					height: 30px;
					color: #fff;
					border-radius: 0;
				}
				.btn-style-role:nth-child(1) {
					margin-right: 15px;
				}
			}
			.btn-control {
			}
			.role-content {
				border: 1px solid #8a90a5;
				margin-top: 10px;
				.name {
					height: 65px;
					line-height: 65px;
					text-align: center;
					color: #666666;
				}
				.el-col:nth-child(2) {
					border-left: 1px solid #8a90a5;
				}
				.btn-group {
					border-top: 1px solid #8a90a5;
					.div-cell {
						line-height: 48px;
						border-bottom: 1px solid #8a90a5;
					}
					.div-cell:last-child {
						border-bottom: 0;
					}
				}
				.btn-group.first {
					margin: 0 auto;
					text-align: center;
					padding-top: 50%;
				}
			}
		}
	}

	.part-title {
		color: rgba(0, 0, 0, 0.847058823529412);
		font-size: 14px;
		font-weight: 650;
		height: 45px;
		line-height: 45px;
		//background-color: #F3F3F3;
	}
	.cell-group {
		//position: absolute;
		//display: flex;
		//width: 200px;
		//height: 1000px;
	}
	.child-cell {
		//margin: 5px 0 0 20px;
	}
	.chooseAll {
		width: 100%;
		text-align: center;
		margin-top: 15px;
	}
	.save-container {
		.save-btn {
			text-align: center;
			margin: 0 auto 50px;
			background-color: rgba(26, 188, 156, 1);
			height: 40px;
			line-height: 40px;
			cursor: pointer;
			width: 245px;
			border-radius: 5px;
			font-size: 16px;
			color: #fff;
		}
	}
}
</style>
