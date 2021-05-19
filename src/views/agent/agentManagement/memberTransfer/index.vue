<template>
	<div class="game-container report-container addAgent-container">
		<div class="line-member"></div>
		<div class="addAgent-content">
			<div class="form-header">
				<span>会员转代申请资料</span>
				<span>
					<code style="color:#FF3B30;">*</code>
					为必填项
				</span>
			</div>
			<el-form ref="form" :model="form" :rules="rules" label-width="100px">
				<el-form-item label="转代会员:" prop="userName">
					<el-input
						v-model="form.userName"
						size="medium"
						maxlength="11"
						placeholder="请输入"
						clearable
						style="width: 365px"
					></el-input>
					<span v-show="tipsShow" class="tips">{{ tipsShow }}</span>
					<el-button
						type="primary"
						style="margin-left: 20px"
						@click="getOutlineInfo"
					>
						<i v-show="loading" class="el-icon-loading"></i>
						查询
					</el-button>
				</el-form-item>
				<el-form-item label="账号类型:">
					<el-select
						v-model="form.accountType"
						size="medium"
						placeholder=""
						:disabled="true"
						style="width: 365px"
					>
						<el-option
							v-for="item in accountTypeArr"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="当前上级:">
					<el-input
						v-model="form.currentProxyName"
						size="medium"
						maxlength="11"
						:disabled="true"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="转入代理:" prop="transferProxyName">
					<el-input
						v-model="form.transferProxyName"
						size="medium"
						maxlength="11"
						placeholder="请输入"
						clearable
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="审核信息:">
					<el-input
						v-model="form.applyInfo"
						size="medium"
						type="textarea"
						placeholder="请输入"
						clearable
						maxlength="50"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						icon="el-icon-search"
						:disabled="loading"
						size="medium"
						@click="add"
					>
						提交
					</el-button>
					<el-button
						icon="el-icon-refresh-left"
						:disabled="loading"
						size="medium"
						@click="reset"
					>
						重置
					</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import { routerNames } from '@/utils/consts'
import list from '@/mixins/list'
import { notSpecial2, isHaveEmoji } from '@/utils/validate'
export default {
	name: routerNames.agentTrans,
	mixins: [list],
	data() {
		return {
			loading: false,
			form: {
				userName: '',
				accountType: '',
                transferProxyName: '',
				applyInfo: '',
                userId: undefined,
                transferProxyId: undefined,
                currentProxyId: undefined,
                currentProxyName: undefined
			},
			tipsShow: null
		}
	},
	computed: {
		accountTypeArr() {
			return this.globalDics.accountType
		},
		rules() {
			const reg1 = /^[A-Za-z]{1}(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){1,})[0-9A-Za-z]{3,10}$/

			const testUserName = (rule, value, callback) => {
				const isSpecial = !notSpecial2(String(value))
				const isRmoji = isHaveEmoji(String(value))
				if (isSpecial) {
					callback(new Error('不支持空格及特殊字符'))
				} else if (isRmoji) {
					callback(new Error('不支持表情'))
				} else if (!reg1.test(value)) {
					callback(new Error('请输入4-11位，最少2个字母+数字组合，首位字母'))
				} else {
					callback()
				}
			}

			return {
				accountType: [
					{ required: true, message: '请选择账号类型', trigger: 'change' }
				],
				userName: [
					{
						required: true,
						validator: testUserName,
						trigger: 'blur'
					}
				],
                transferProxyName: [
					{
						required: true,
						validator: testUserName,
						trigger: 'blur'
					}
				]
			}
		}
	},
	mounted() {},
	methods: {
		getOutlineInfo() {
			this.loading = true
			let lock = true
			const reg1 = /^[A-Za-z]{1}(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){1,})[0-9A-Za-z]{3,10}$/
			const { userName } = this.form
			if (lock && reg1.test(userName)) {
				this.$api
					.getOutlineInfo({ userName })
					.then((res) => {
						lock = false
						this.loading = false
						const { code, data, msg } = res
						if (code === 200) {
							if (data) {
                                this.tipsShow = null
								this.form.accountType = data.accountType + ''
								this.form.currentProxyName = data.parentProxyName
                                this.form.userId = data.id
                                this.form.currentProxyId = data.parentProxyId
							} else {
								this.tipsShow = msg
							}
						} else {
							this.tipsShow = msg
						}
					})
					.catch(() => {
						this.loading = false
                        this.tipsShow = '会员账号不存在'
						lock = false
					})

                setTimeout(() => {
                    this.loading = false
                    lock = true
                }, 1000)
			}
		},
		add() {
			this.loading = true
			const params = {
				...this.form
			}
			let lock = true
			this.$refs['form'].validate((valid) => {
				if (valid && lock && !this.tipsShow) {
					lock = false
					this.$api
						.memberTransAgentAPI(params)
						.then((res) => {
							this.loading = false
							lock = true
							const { code, data, msg } = res
							if (code === 200) {
								this.$confirm(`代理${data}资料提交成功`, {
									confirmButtonText: '确定',
									type: 'success',
									showCancelButton: false
								})
								this.reset()
							} else {
								this.$message({
									message: msg,
									type: 'error'
								})
							}
						})
						.catch(() => {
							this.loading = false
							lock = true
						})
				}
			})

			setTimeout(() => {
				this.loading = false
				lock = true
			}, 1000)
		},
		reset() {
			this.$refs['form'].resetFields()
			this.form = {
                userName: '',
                accountType: '',
                parentProxyName: '',
                agentName: '',
                applyInfo: ''
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
.addAgent-container {
	background-color: #f5f5f5;
	margin: 0;
	min-height: calc(100vh - 105px);
	.line-member {
		height: 50px;
	}
	.addAgent-content {
		width: 1000px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		position: relative;
		padding-top: 65px;
		padding-bottom: 65px;
		.form-header {
			height: 45px;
			line-height: 45px;
			span:nth-child(1) {
				position: absolute;
				left: 30px;
				top: 0;
				color: #666;
				font-size: 14px;
				font-weight: 700;
			}
			span:nth-child(2) {
				position: absolute;
				right: 30px;
				color: #999;
				font-weight: 400;
				font-size: 14px;
				top: 0;
			}
		}
		.tips {
			color: #f56c6c;
			font-size: 12px;
			line-height: 1;
			padding-top: 4px;
			position: absolute;
			top: 100%;
			left: 0;
		}
	}
	.addAgent-content::after {
		position: absolute;
		top: 45px;
		content: '';
		width: 100%;
		background-color: rgba(233, 233, 233, 1);
		height: 1px;
	}
}
</style>
