<template>
	<!-- 修改用户密码 -->
	<el-dialog
		:close-on-click-modal="false"
		:visible.sync="visible"
		width="450px"
		center
		@closed="cancel"
	>
		<span slot="title">
			<span>{{ $t("other_007") }}</span>
		</span>
		<el-form ref="form" :model="passDialogForm" :rules="rules" label-width="auto">
			<el-form-item :label="$t('authoritymanagement_usermanage_components_edituser_285')">
<!--				<span>{{ userInfo.agentCode || '' }}</span>-->
			</el-form-item>
			<el-form-item :label="$t('authoritymanagement_usermanage_index_322')">
<!--				<span>{{ userInfo.username || '' }}</span>-->
			</el-form-item>
			<el-form-item
				:label="$t('authoritymanagement_usermanage_components_edituser_289')"
				prop="oldPassword"
			>
				<el-input
					v-model="passDialogForm.oldPassword"
					type="password"
					:placeholder="$t('login_index_473')"
				></el-input>
			</el-form-item>
			<el-form-item
				:label="$t('authoritymanagement_usermanage_components_edituser_288')"
				prop="password"
			>
				<el-input
					v-model="passDialogForm.password"
					type="password"
					::placeholder="$t('login_index_473')"
				></el-input>
			</el-form-item>
			<el-form-item
				:label="$t('authoritymanagement_usermanage_components_edituser_291')"
				prop="passwordAgain"
			>
				<el-input
					v-model="passDialogForm.passwordAgain"
					type="password"
					:placeholder="$t('login_index_473')"
				></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="cancel">{{ $t('systemmanagement_ipwhite_index_1455') }}</el-button>
			<el-button type="primary" @click="handleSure">{{ $t('systemmanagement_domain_index_1371') }}</el-button>
		</span>
	</el-dialog>
</template>

<script>
import router from '@/router'
import { validPassword } from '@/utils/validate'
import { mapGetters } from 'vuex'
// import md5 from 'js-md5'
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
					callback(
						new Error(
							this.$t('authoritymanagement_usermanage_components_edituser_309')
						)
					)
				} else if (value && value.length > 12) {
					callback(
						new Error(
							this.$t('authoritymanagement_usermanage_components_edituser_310')
						)
					)
				} else if (value === '' || !validPassword(value)) {
					callback(
						new Error(
							this.$t('authoritymanagement_usermanage_components_edituser_311')
						)
					)
				} else {
					callback()
				}
			}
			const validateRepwd = (rule, value, callback) => {
				if (value !== this.passDialogForm.password) {
					callback(
						new Error(
							this.$t('authoritymanagement_usermanage_components_edituser_312')
						)
					)
				} else {
					callback()
				}
			}
			return {
				oldPassword: [
					{
						required: true,
						message: this.$t('other_008'),
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
						agentCode: this.userInfo.agentCode || '',
						loginName: this.userInfo.username || '',
						// oldPassword: md5(this.passDialogForm.oldPassword + this.userInfo.username.trim()),
						// password: md5(this.passDialogForm.password + this.userInfo.username.trim()),
						// passwordAgain: md5(this.passDialogForm.passwordAgain + this.userInfo.username.trim())
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
								message: this.$t('other_009')
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
