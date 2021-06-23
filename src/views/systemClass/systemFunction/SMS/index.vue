<template>
	<div class="game-container">
		<!-- 标题 -->
		<div class="flex-h flex-bc">
			<h2 class="h2-line">{{ $t('route.changePassword') }}</h2>
		</div>

		<!-- 内容部分 -->
		<div class="content">
			<el-form ref="form" :model="form" :rules="rules" label-width="auto">
				<el-form-item :label="$t('label.userName')">
					<el-input v-model="username" :disabled="true" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item :label="$t('label.originalPassword')" prop="oriPwd">
					<el-input
						v-model="form.oriPwd"
						:type="oriPwdType"
						name="password"
						autocomplete="off"
						readonly
						onfocus="this.removeAttribute('readonly');"
						onblur="this.setAttribute('readonly',true);"
						:placeholder="$t('placeholder.enterOriginalPassword')"
						maxlength="12"
						style="width:300px"
					></el-input>
					<span class="show-pwd" @click="showPwd('oriPwdType')">
						<svg-icon :icon-class="oriPwdType === 'password' ? 'eye' : 'eye-open'" />
					</span>
				</el-form-item>
				<el-form-item :label="$t('label.newPassword')" prop="pwd">
					<el-input
						v-model="form.pwd"
						:type="pwdType"
						name="password"
						autocomplete="off"
						readonly
						onfocus="this.removeAttribute('readonly');"
						onblur="this.setAttribute('readonly',true);"
						:placeholder="$t('placeholder.enterNewPassword')"
						maxlength="12"
						style="width:300px"
					></el-input>
					<span class="show-pwd" @click="showPwd('pwdType')">
						<svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
					</span>
				</el-form-item>
				<el-form-item :label="$t('label.comfirmPassword')" prop="rePwd">
					<el-input
						v-model="form.rePwd"
						:type="rePwdType"
						name="password"
						autocomplete="off"
						readonly
						onfocus="this.removeAttribute('readonly');"
						onblur="this.setAttribute('readonly',true);"
						:placeholder="$t('placeholder.enterComfirmPassword')"
						maxlength="12"
						style="width:300px"
					></el-input>
					<span class="show-pwd" @click="showPwd('rePwdType')">
						<svg-icon :icon-class="rePwdType === 'password' ? 'eye' : 'eye-open'" />
					</span>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native="handleSure">{{ $t('btn.confirm') }}</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import { getUsername, getId } from '@/utils/auth'
import md5 from 'js-md5'

export default {
	name: 'ChangePassword',
	data() {
		return {
			username: '',
			form: {
				userId: '',
				oriPwd: '',
				pwd: '',
				rePwd: ''
			},
			oriPwdType: 'password',
			pwdType: 'password',
			rePwdType: 'password'
		}
	},
	computed: {
		rules() {
			const validNumberEn12 = (rule, value, callback) => {
				if (/^([A-Za-z0-9_]{6,12})$/.test(value)) {
					callback()
				} else {
					callback(new Error(this.$t('message.validNumberEn12')))
				}
			}
			const validatorPassword = (rule, value, callback) => {
				if (!value || value === '') {
					callback(new Error(this.$t('message.enterAgainPassword')))
				} else if (value !== this.form.pwd) {
					callback(new Error(this.$t('message.inconsistentTwice')))
				} else {
					callback()
				}
			}
			return {
				oriPwd: [
					{
						required: true,
						message: this.$t('placeholder.enterOriginalPassword'),
						validator: validNumberEn12,
						trigger: 'blur'
					}
				],
				pwd: [
					{
						required: true,
						message: this.$t('placeholder.enterNewPassword'),
						validator: validNumberEn12,
						trigger: 'blur'
					}
				],
				rePwd: [
					{ required: true, validator: validatorPassword, trigger: 'blur' }
				]
			}
		}
	},
	mounted() {
		this.username = getUsername()
		this.form.userId = getId()
	},
	methods: {
		handleSure() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					const username = this.username
					const params = {
						username,
						pwd: md5(username.trim() + this.form.pwd.trim()),
						rePwd: md5(username.trim() + this.form.rePwd.trim()),
						oriPwd: md5(username.trim() + this.form.oriPwd.trim())
					}
					this.$confirm(
						this.$t('message.isModifyPassword'),
						this.$t('message.tip'),
						{
							confirmButtonText: this.$t('btn.confirm'),
							cancelButtonText: this.$t('btn.cancel'),
							type: 'warning'
						}
					)
						.then(() => {
							this.$api.modifyPwd(params).then(
								(res) => {
									// console.log(res.data)
									this.$confirm(
										this.$t('message.modifyPasswordSuccessfully'),
										'',
										{
											confirmButtonText: this.$t('btn.confirm'),
											type: 'success'
										}
									)
										.then(() => {
											setTimeout(() => {
												this.$router.push({ name: 'login' })
												location.reload(true)
											}, 0)
										})
										.catch(() => {
											setTimeout(() => {
												this.$router.push({ name: 'login' })
												location.reload(true)
											}, 0)
										})
								},
								() => {
									this.form = { oriPwd: '', pwd: '', rePwd: '' }
								}
							)
						})
						.catch(() => {
							this.$message({
								type: 'info',
								message: this.$t('message.modifyPasswordCancel')
							})
						})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		// 密码的明密切换
		showPwd(type) {
			this[type] === 'password' ? (this[type] = '') : (this[type] = 'password')
		},
		closeDialog() {
			this.drawer = false
			this.secretdata = {}
		}
	}
}
</script>

<style lang="scss" scoped>
.el-form-item__content {
	position: relative;
	.show-pwd {
		position: absolute;
		left: 265px;
		top: 2px;
		font-size: 16px;
		color: #889aa4;
		cursor: pointer;
		user-select: none;
	}
}
</style>
