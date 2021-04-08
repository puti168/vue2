<template>
	<!-- 修改用户密码 -->
	<el-dialog
		title="修改用户密码"
		:close-on-click-modal="false"
		:visible.sync="visible"
		width="450px"
		center
		@closed="cancel"
	>
		<el-form ref="form" :model="passDialogForm" :rules="rules" label-width="auto">
			<el-form-item label="账号归属">
				<span>{{ userInfo.agentCode }}</span>
			</el-form-item>
			<el-form-item label="用户账号">
				<span>{{ userInfo.username }}</span>
			</el-form-item>
			<el-form-item label="用户密码" prop="oldPassword">
				<el-input v-model="passDialogForm.oldPassword" type="password" placeholder="6-12位字母,数字和特殊字符组合"></el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="password">
				<el-input v-model="passDialogForm.password" type="password" placeholder="6-12位字母,数字和特殊字符组合"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="passwordAgain">
				<el-input
					v-model="passDialogForm.passwordAgain"
					type="password"
					placeholder="6-12位字母,数字和特殊字符组合"
				></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="cancel">暂不修改</el-button>
			<el-button type="primary" @click="handleSure">确认修改</el-button>
		</span>
	</el-dialog>
</template>

<script>
import router from '@/router'
import { validPassword } from '@/utils/validate'
import { mapGetters } from 'vuex'

export default {
	name: 'ModifyPassword',
	props: {
		editVisible: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			visible: false,
			passDialogForm: {
				oldPassword: '',
				pwd: '',
				rePwd: ''
			}
		}
	},
	computed: {
		...mapGetters(['userInfo']),
		rules() {
			const validatePwd = (rule, value, callback) => {
				if (value && value.length < 6) {
					callback(new Error('密码长度不够，请重新输入密码'))
				} else if (value && value.length > 12) {
					callback(new Error('密码长度超过12个字符，请重新输入密码'))
				} else if (value === '' || !validPassword(value)) {
					callback(new Error('密码不符合规则，请重新输入密码'))
				} else {
					callback()
				}
			}
			const validateRepwd = (rule, value, callback) => {
				if (value !== this.passDialogForm.password) {
					callback(new Error(this.$t('密码不一致，请重新输入')))
				} else {
					callback()
				}
			}
			return {
				oldPassword: [
					{
						required: true,
						message: '请输入正确的登陆密码',
						trigger: 'blur'
					}
				],
				password: [
					{
						required: true,
						validator: validatePwd,
						trigger: 'blur'
					}
				],
				passwordAgain: [
					{
						required: true,
						validator: validateRepwd,
						trigger: 'blur'
					}
				]
			}
		}
	},
	watch: {
		editVisible(val) {
			this.visible = val
		}
	},
	methods: {
		cancel() {
			this.$store.dispatch('app/setModify', false)
			this.$refs.form.clearValidate()
			this.passDialogForm = {
				oldPassword: '',
				pwd: '',
				rePwd: ''
			}
		},
		handleSure() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					const params = {
						agentCode: this.userInfo.agentCode,
						loginName: this.userInfo.username,
						oldPassword: this.passDialogForm.oldPassword,
						password: this.passDialogForm.password,
						passwordAgain: this.passDialogForm.passwordAgain
					}
					this.$api.changeLoginPwd(params).then(async (res) => {
						if (res.code === 200) {
							await this.$store.dispatch('user/logout')
							await this.$store.dispatch('permission/clearRoutes')
							await this.$store.dispatch('app/setModify', false)
							this.$router.push(`/login?redirect=${router.history.current.fullPath}`)
							return this.$message({
								type: 'success',
								message: '修改密码成功,请重新登录'
							})
						}
					})
				}
			})
		}
	}
}
</script>

<style scoped>
.icon-style {
	float: right;
	margin-top: 16px;
	margin-right: 32px;
}
</style>
