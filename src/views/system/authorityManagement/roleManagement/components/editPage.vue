<template>
	<div class="game-container report-container editPicturePage-container">
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
							maxlength="50"
							show-word-limit
							style="width: 365px"
						></el-input>
					</el-form-item>
				</el-form>
			</div>
            <div class="content-part3">
                <p class="part-title">角色权限</p>
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
			}
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
		editData: {
			handler(newData) {
				if (Object.keys(newData).length) {
					delete newData.createdAt
					delete newData.createdBy
					delete newData.updatedAt
					delete newData.updatedBy
					newData.imageType = newData.imageType + ''
					this.queryData = {
						...newData
					}
					if (this.queryData.imageAddress) {
						this.$nextTick(() => {
							this.$refs.imgUpload.state = 'image'
							this.$refs.imgUpload.fileUrl = newData.imageAddress
						})
					}
					this.updateStatus = true
				} else {
					this.updateStatus = false
					this.queryData = {
                        roleName: undefined,
                        remark: undefined,
                        id: undefined
					}
				}
			},
			deep: true,
			immediate: true
		}
	},
	mounted() {
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
		add() {
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
	background-color: #fff;
	color: rgba(0, 0, 0, 0.64);
}
/deep/ .el-button--info:hover {
	background-color: #eeeded;
}
.editPicturePage-container {
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
        }
	}

    .part-title {
        color: rgba(0, 0, 0, 0.847058823529412);
        font-size: 14px;
        font-weight: 650;
        height: 45px;
    }
}
</style>
