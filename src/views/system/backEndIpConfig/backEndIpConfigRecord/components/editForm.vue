<template>
	<div class="game-container report-container editPicturePage-container">
		<div class="editPicturePage-content">
			<div class="form-header">
				<span>创建/编辑</span>
				<span>
					<el-button type="info" @click="back">取消</el-button>
					<el-button type="success" @click="add">保存</el-button>
				</span>
			</div>
			<div class="content-part2">
				<el-form
					ref="form"
					:model="queryData"
					:inline="true"
					label-width="150px"
					class="agent-form"
				>
					<el-form-item
						prop="sourceType"
						label="数据来源:"
						class="tagheight"
						:rules="[
							{
								required: true,
								min: 1,
								message: '数据来源不能为空',
								trigger: ['change']
							}
						]"
					>
						<el-select
							v-model="queryData.sourceType"
							style="width: 180px"
							clearable
							placeholder="请选择"
							:popper-append-to-body="false"
						>
							<el-option :value="'0'" label="商户后台"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item
						prop="status"
						label="状态:"
						class="tagheight"
						:rules="[
							{
								required: true,
								min: 1,
								message: '状态不能为空',
								trigger: ['change']
							}
						]"
					>
						<el-select
							v-model="queryData.status"
							style="width: 180px"
							clearable
							placeholder="请选择"
							:popper-append-to-body="false"
						>
							<el-option :value="'0'" label="关闭"></el-option>
							<el-option :value="'1'" label="开启"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item
						prop="type"
						label="类型:"
						class="tagheight"
						:rules="[
							{
								required: true,
								min: 1,
								message: '类型不能为空',
								trigger: ['change']
							}
						]"
					>
						<el-select
							v-model="queryData.type"
							style="width: 180px"
							clearable
							placeholder="请选择"
							:popper-append-to-body="false"
						>
							<el-option :value="'2'" label="商户后台"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item
						label="ip:"
						prop="ip"
						:rules="[
							{
								required: true,
								min: 1,
								message: 'ip不能为空',
								trigger: ['blur']
							}
						]"
					>
						<el-input
							v-model="queryData.ip"
							size="medium"
							maxlength="15"
							placeholder="请输入"
							clearable
							style="width: 205px"
						></el-input>
					</el-form-item>
					<el-form-item label="备注:" prop="remark">
						<el-input
							v-model="queryData.remark"
							size="medium"
							maxlength="8"
							placeholder="请输入"
							clearable
							style="width: 205px"
						></el-input>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
export default {
	name: 'EditPage',
	mixins: [list],
	props: { editRowData: { type: Object, default: () => {} } },
	data() {
		return {
			loading: false,
			queryData: { ...this.editRowData }
		}
	},
	computed: {
		rules() {
			const sourceType = [
				{ required: true, message: '请选择状态', trigger: 'change' }
			]
			const status = [
				{ required: true, message: '请选择状态', trigger: 'change' }
			]
			const type = [
				{ required: true, message: '请选择状态', trigger: 'change' }
			]
			const ip = [
				{ required: true, message: '请输入第三方回调ip', trigger: 'blur' }
			]
			return {
				sourceType,
				status,
				type,
				ip
			}
		}
	},
	methods: {
		back() {
			this.$emit('back')
		},
		setCallbackIpWhiteInsert(val) {
			this.$api
				.addBackEndIpConfig(val)
				.then((res) => {
					this.loading = false
					const { code, msg } = res
					if (code && code === 200) {
						this.$message.success('创建成功')
						this.pageNum = 1
						this.reset()
						setTimeout(() => {
							this.back()
						}, 500)
					} else {
						this.$message({
							message: res && msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		setCallbackIpWhiteUpdate(val) {
			this.$api
				.updateBackEndIpConfig(val)
				.then((res) => {
					this.loading = false
					const { code, msg } = res
					if (code && code === 200) {
						this.$message.success('修改成功')
						setTimeout(() => {
							this.back()
						}, 500)
					} else {
						this.$message({
							message: res && msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		add() {
			this.loading = true
			delete this.queryData.agentCode
			delete this.queryData.createdAt
			delete this.queryData.createdBy
			delete this.queryData.createdCode
			const params = {
				...this.queryData
			}
			this.$refs['form'].validate((valid) => {
				if (valid) {
					if (params.id) {
						this.$confirm(`确定修改吗？`, {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.setCallbackIpWhiteUpdate(params)
						})
					} else {
						this.$confirm(`确定创建吗？`, {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'success'
						}).then(() => {
							this.setCallbackIpWhiteInsert(params)
						})
					}
				}
			})
		},
		reset() {
			this.$refs['form'].resetFields()
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
/deep/.el-input-number__decrease,
/deep/.el-input-number__increase {
	display: none;
}
/deep/.el-input-number .el-input__inner {
	padding: 0 15px;
	text-align: left;
}
/deep/.el-form-item {
	margin-bottom: 25px;
}
.editPicturePage-container {
	background-color: #f5f5f5;
	margin: 0;
	min-height: calc(90vh - 120px);
	.editPicturePage-content {
		width: 50%;
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
			.agent-form {
				position: relative;
				width: 800px;
				max-width: 100%;
				padding: 35px 35px 0;
				margin: 0 auto;
				overflow: hidden;
				.el-form-item {
					.el-form-item_label {
						width: 150px;
					}
				}
			}
		}
	}
}
</style>
