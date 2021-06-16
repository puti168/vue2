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
					<el-row class="btn-control">
						<el-button
							v-for="item in dataList"
							:key="item.id"
							type="info"
							class="btn-style-role"
						>
							{{ item.permissionName }}
						</el-button>
					</el-row>
					<el-row class="role-content">
						<el-col :span="4">
							<div class="name">模块</div>
							<div class="btn-group first">
								<el-checkbox v-model="checkAllModule">
									{{ defaultList.permissionName }}
								</el-checkbox>
							</div>
						</el-col>
						<el-col :span="5">
							<div class="name">页面</div>
							<div class="btn-group">
								<div
									v-for="(item, idx) in defaultList.children"
									:key="item.id"
									class="div-cell"
								>
									<el-checkbox
										v-model="checkedList[idx]"
										:indeterminate="isIndeterminate"
									>
										<span style="font-weight: bold;">
											{{ item.permissionName }}
										</span>
									</el-checkbox>
									<el-checkbox-group
										v-model="checkedList[idx]"
										class="cell-group"
										@change="handleCheckedCitiesChange11(idx, checkedList[idx])"
									>
										<el-checkbox
											v-for="item in item.children"
											:key="item.id"
											class="child-cell"
											:label="item.permissionName"
										>
											{{ item.permissionName }}
										</el-checkbox>
									</el-checkbox-group>
								</div>
							</div>
						</el-col>
						<el-col :span="15">
							<div class="name">权限配置规则</div>
							<div class="btn-group"></div>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { isHaveEmoji, notSpecial2 } from '@/utils/validate'

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
			dataList: [],
			otherArr: [],
			id: '',
			defaultList: [],
			systemOptions1: [],
			checkedList: [], // 选中的列表
			checkedAll: [], // 列表类全选
			systemOptionsList: [], // 所有可选项
			checkAllModule: false, // 全选
			isIndeterminate: false // 全选
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
	mounted() {
		this.getRoleList()
		// this.$nextTick(() => {
		// 	!this.updateStatus
		// 		? (this.queryData.displayOrder = this.lastSortId + 1)
		// 		: ''
		// })
	},
	updated() {},
	methods: {
		back() {
			this.$emit('back')
		},
		async getRoleList() {
			// const obj = {}
			const { code, data } = await this.$api.getRolePermissions()
			console.log('data', data)
			if (code === 200) {
				// data &&
				// 	data.length &&
				// 	data.forEach((item) => {
				// 		data &&
				// 			data.length &&
				// 			data.forEach((item) => {
				// 				obj[item.permissionName] = item
				// 			})
				// 	})
				this.filterData(data)
			}
			// console.log('obj', obj)
		},

		filterData(data) {
			const arr = []
			let copyItem = {}
			const copyData = JSON.parse(JSON.stringify(data))
			copyData.forEach((route) => {
				copyItem = JSON.parse(JSON.stringify(route))
				route.level === 1 ? (copyItem.children = []) : null
				arr.push(copyItem)
				if (route.children && route.children.length) {
					route.children.forEach((item) => {
						if (item.level === 2) {
							arr.forEach((val) => {
								if (val.id === item.parentId) {
									val.children = [...item.children, ...val.children]
								}
							})
						}
					})
				}
			})
            this.dataList = arr
            this.defaultList = arr[0]
            this.systemOptions1 = arr[0]
            for (const item in arr) {
                const strArr = []
                this.checkedList.push(strArr) // 创建选中数据数组
                this.systemOptionsList.push(arr[item].children) // 创建所有可选项数组
                this.checkedAll.push(false) // 所有列表类初始为false
            }
            console.log('t', arr)
            console.log('otherArr', this.otherArr)
            console.log('defaultList', this.defaultList)
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
								// this.$confirm(`${this.updateStatus ? '更新' : '新增'}成功`, {
								// 	confirmButtonText: '确定',
								// 	type: 'success',
								// 	showCancelButton: false
								// })
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
					border-right: 1px solid #8a90a5;
					border-left: 1px solid #8a90a5;
				}
				.btn-group {
					border-top: 1px solid #8a90a5;
					.div-cell {
						height: 48px;
						line-height: 48px;
						padding-left: 15px;
						border-bottom: 1px solid #8a90a5;
					}
					.div-cell:last-child {
						border-bottom: 0;
					}
				}
				.btn-group.first {
					margin: 0 auto;
					text-align: center;
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
		position: absolute;
		display: flex;
		width: 200px;
		height: 1000px;
	}
	.child-cell {
		margin: 5px 0 0 20px;
	}
}
</style>
