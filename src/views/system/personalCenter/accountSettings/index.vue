<template>
	<div class="game-container report-container addMember-container">
		<div class="line-member"></div>
		<div class="addMember-content">
			<div class="form-header">
				<span>账户设置</span>
			</div>
			<el-form ref="form" :model="form" :rules="rules" label-width="124px">
				<div class="ctbox">
					<el-avatar
						shape="square"
						:size="150"
						class="fit"
						:src="url"
					></el-avatar>
				</div>

				<el-form-item label="角色名称：">
					<el-input
						v-model="form.realName"
						readonly
						unselectable="on"
						size="medium"
						clearable
						maxlength="6"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="用户名称：">
					<el-input
						v-model="form.realName"
            readonly
						unselectable="on"
						size="medium"
						placeholder="请输入"
						clearable
						maxlength="6"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="联系电话：">
					<el-input
						v-model="form.realName"
						size="medium"
						placeholder="请输入联系电话"
						clearable
						maxlength="6"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="旧登录密码：">
					<el-input
						v-model="form.realpassword"
						:type="passwordType"
						name="password"
						size="medium"
						placeholder="请输入原登录密码"
						clearable
						maxlength="6"
						style="width: 365px"
					></el-input>
					<span class="show-pwd" @click="showPwd">
						<svg-icon
							:icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
						/>
					</span>
				</el-form-item>
				<el-form-item label="新登录密码：">
					<el-input
						v-model="form.realName"
						:type="passwordType"
						name="password"
						size="medium"
						placeholder="请输入原登录密码"
						clearable
						maxlength="6"
						style="width: 365px"
					></el-input>
          <span class="show-pwd" @click="showPwd">
						<svg-icon
							:icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
						/>
					</span>
				</el-form-item>
				<el-form-item label="确认新登录密码：">
					<el-input
						v-model="form.realName"
						:type="passwordType"
						name="password"
						size="medium"
						placeholder="请确认新登录密码"
						clearable
						maxlength="6"
						style="width: 365px"
					></el-input>
          <span class="show-pwd" @click="showPwd">
						<svg-icon
							:icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
						/>
					</span>
				</el-form-item>

				<el-form-item>
					<el-button
						type="primary"
            class="dut"
						:disabled="loading"
						size="medium"
						@click="onUpdateUser"
					>
						确认修改
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
import { EMAIL_PATTERN } from '@/utils/pattern'

export default {
	name: routerNames.addMember,
	mixins: [list],
	data() {
		return {
			passwordType: 'password',
			loading: false,
			form: {
				accountType: '4',
				username: '',
				password: '',
				mobile: '',
				parentProxyName: '',
				gender: '1',
				vipExperenceValue: '',
				email: '',
				realName: '',
				applyInfo: ''
			}
		}
	},
	computed: {
		accountTypeArr() {
			return this.globalDics.accountType
		},
		genderType() {
			const arr = []
			if (this.globalDics.genderType && this.globalDics.genderType.length) {
				this.globalDics.genderType.forEach((item) => {
					arr.unshift(item)
				})
			}
			return arr
		},
		rules() {
			const reg2 = /^([a-zA-Z0-9]*[a-zA-Z]+[0-9]+[a-zA-Z0-9]*|[a-zA-Z0-9]*[0-9]+[a-zA-Z]+[a-zA-Z0-9]*)$/

			const testPassword = (rule, value, callback) => {
				const isSpecial = !notSpecial2(String(value))
				const isRmoji = isHaveEmoji(String(value))
				if (isSpecial) {
					callback(new Error('不支持空格及特殊字符'))
				} else if (isRmoji) {
					callback(new Error('不支持表情'))
				} else if (!reg2.test(value)) {
					callback(new Error('请输入8-12位，字母+数字组合'))
				} else {
					callback()
				}
			}

			// const testMobile = (rule, value, callback) => {
			// 	if (!!value && !MOBILE_PATTERN.test(value)) {
			// 		callback(new Error('请输入有效的手机号码'))
			// 	} else {
			// 		callback()
			// 	}
			// }

			const testEmail = (rule, value, callback) => {
				if (!!value && !EMAIL_PATTERN.test(value)) {
					callback(new Error('请输入正确的邮箱'))
				} else {
					callback()
				}
			}

			return {
				accountType: [
					{ required: true, message: '请选择账号类型', trigger: 'change' }
				],
				password: [
					{
						required: true,
						validator: testPassword,
						trigger: 'blur'
					},
					{
						min: 8,
						max: 12,
						message: '请输入8-12位，字母+数字组合',
						trigger: 'blur'
					}
				],
				// mobile: [
				// 	{
				// 		required: false,
				// 		validator: testMobile,
				// 		trigger: 'blur'
				// 	}
				// ],
				email: [
					{
						required: false,
						validator: testEmail,
						trigger: 'blur'
					}
				]
			}
		}
	},
	mounted() {},
	methods: {
	showPwd() {
			if (this.passwordType === 'password') {
				this.passwordType = ''
			} else {
				this.passwordType = 'password'
			}
			this.$nextTick(() => {
				this.fixInput(this.$refs.password)
			})
      },
		onUpdateUser() {
		console.log('submit!')
		},
		reset() {
			this.$refs['form'].resetFields()
			this.form = {
				accountType: '4',
				username: '',
				password: '',
				mobile: '',
				parentProxyName: '',
				gender: '1',
				vipExperenceValue: '',
				email: '',
				realName: '',
				applyInfo: ''
			}
		},
		checkValue(val) {}
	}
}
</script>

<style lang="scss" scoped>
$dark_gray: #889aa4;
.dut{
  margin-left: 165px;
}
.show-pwd {
		position: absolute;
		right: 10px;
		top: 4px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}
.ctbox {
	width: 300px;
	margin: 0 auto;
}
.fit {
	margin-left: 110px;
}
/deep/.el-dialog__header {
	text-align: center;
	color: #909399;
	font-weight: 700;
}
.addMember-container {
	background-color: #f5f5f5;
	margin: 0;
	min-height: calc(100vh - 105px);
	.line-member {
		height: 50px;
	}
	.addMember-content {
		width: 1000px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		position: relative;
		padding-top: 65px;
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
	}
	.addMember-content::after {
		position: absolute;
		top: 45px;
		content: '';
		width: 100%;
		background-color: rgba(233, 233, 233, 1);
		height: 1px;
	}

	///deep/ input::-webkit-outer-spin-button,
	///deep/ input::-webkit-inner-spin-button {
	//	display: none;
	//}
}
</style>
