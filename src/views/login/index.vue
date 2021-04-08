<template>
	<div class="login-container">
		<el-form
			ref="loginForm"
			:model="loginForm"
			:rules="loginRules"
			class="login-form"
			auto-complete="on"
			label-position="left"
		>
			<div class="login-content">
				<h3>
					<span>
						<svg-icon icon-class="bb_logo" class="login-logo" />商户管理监控后台
					</span>
				</h3>
				<el-row>
					<el-form-item prop="username">
						<span class="svg-container">
							<svg-icon icon-class="user" class="svg-active" />
						</span>
						<el-input
							ref="username"
							v-model="loginForm.username"
							:placeholder="$t('login.username')"
							name="username"
							type="text"
							tabindex="1"
							auto-complete="off"
							maxlength="12"
							:readonly="firstLogin"
						/>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item prop="password">
						<span class="svg-container">
							<svg-icon icon-class="password" class="svg-active" />
						</span>
						<el-input
							:key="password"
							ref="password"
							v-model="loginForm.password"
							:type="password"
							:placeholder="$t('login.password')"
							name="password"
							tabindex="2"
							auto-complete="on"
							@keyup.enter.native="handleLogin"
						/>
						<span class="show-pwd" @click="showPwd('password')">
							<svg-icon :icon-class="password === 'password' ? 'eye' : 'eye-open'" />
						</span>
					</el-form-item>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="16">
						<el-form-item prop="vaildCode">
							<span class="svg-container">
								<svg-icon icon-class="user" class="svg-active" fill="currentColor" />
							</span>
							<el-input
								ref="vaildCode"
								v-model="loginForm.vaildCode"
								placeholder="验证码"
								name="security"
								type="text"
								tabindex="3"
								auto-complete="on"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<img
							:src="`${baseUrl}/user/captcha?h=50&w=145`"
							class="kaptcha"
							alt
							@click="timestamp=+new Date()"
						/>
					</el-col>
				</el-row>
				<div class="login-btn" @keyup.enter="handleLogin" @click.prevent="handleLogin">登录</div>
			</div>
		</el-form>
		<div class="version">version: {{ version }}</div>
	</div>
</template>

<script>
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import Finger from '@/utils/fingerprintjs2'
Finger.load()

export default {
	name: 'Login',
	data() {
		console.log('Cookies.get> ', Cookies.get('firstLogin') === 'true')
		return {
			timestamp: +new Date(),
			loginForm: {
				username: '',
				password: '',
				vaildCode: ''
			},
			loading: false,
			password: 'password', // 登录密码眼睛
			modifyPassword: 'modifyPassword',
			rePassword: 'rePassword',
			redirect: undefined,
			baseUrl: process.env.VUE_APP_BASE_API,
			rememberPassword: Cookies.get('rememberPassword'),
			version: '',
			firstLogin:
				Cookies.get('firstLogin') && Cookies.get('firstLogin') === 'true',
			btnText: Cookies.get('firstLogin') === 'true' ? '修改密码' : '登录',
			userInfo: this.$store.state.user.userInfo,
			browerFinger: Finger.get(),
			submitTime: 0 // 记录提交时间，防止多次提交
		}
	},
	computed: {
		loginRules() {
			const validateUsername = (rule, value, callback) => {
				if (!this.validUsername(value)) {
					callback(new Error('请输入正确的用户名'))
				} else {
					callback()
				}
			}

			const validatePassword = (rule, value, callback) => {
				if (value.length < 6) {
					callback(new Error('请输入正确的密码'))
				} else {
					callback()
				}
			}

			return {
				username: [
					{ required: true, trigger: 'blur', validator: validateUsername }
				],
				password: [
					{ required: true, trigger: 'blur', validator: validatePassword }
				],
				vaildCode: [
					{
						required: true,
						trigger: 'blur',
						message: '请输入验证码'
					}
				]
			}
		}
	},
	watch: {
		$route: {
			handler: function(route) {
				this.redirect = route.query && route.query.redirect
			},
			immediate: true
		}
	},
	mounted() {
		Cookies.remove('firstLogin')
		this.firstLogin = false
		const VERSION = Cookies.get('version') || ''
		this.version = VERSION
	},

	methods: {
		validUsername(str) {
			const valid_map = str || ['admin', 'editor']
			return valid_map.indexOf(str.trim()) >= 0
		},
		handleSetLanguage(value) {
			Message.closeAll()
			let actMessage
			switch (value) {
				case 'zh':
					actMessage = '切换语言成功'
					break
				case 'tw':
					actMessage = '切換語言成功'
					break
				default:
					actMessage = 'Switch Language Success'
			}
			this.$i18n.locale = value
			this.$store.dispatch('app/setLanguage', value)
			this.$message({
				message: actMessage,
				type: 'success'
			})
		},
		showPwd(type) {
			if (this[type] === type) {
				this[type] = ''
			} else {
				this[type] = type
			}
			this.$nextTick(() => {
				this.$refs[type].focus()
			})
		},
		onChangeRemember(value) {
			if (value) {
				this.rememberPassword = true
				Cookies.set('rememberPassword', true)
			} else {
				this.rememberPassword = false
				Cookies.set('rememberPassword', '')
			}
		},
		handleLogin() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
					this.loading = true
					this.$store
						.dispatch('user/login', this.loginForm)
						.then((res) => {
							console.log('登录成功')
							this.$router.push({ path: '/' })
							this.loading = false
						})
						.catch((error) => {
							console.log('error :', error)
							this.timestamp = +new Date()
							this.loading = false
						})
				} else {
					this.timestamp = +new Date()
					return false
				}
			})
		}
	}
}
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
$bgc: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
	.login-container .el-input input {
		color: $cursor;
	}
}

/* reset element-ui css */
.login-container {
	min-height: 100%;
	width: 100%;
	background-color: $bgc;
	overflow: hidden;
	background: url('../../assets/login_imgs/login_bg.jpg') no-repeat center center;
	background-size: cover;
	// background-position: fixed; /* Internet Explorer 7/8 */
	.login-logo {
		width: 40px !important;
		height: 40px !important;
		vertical-align: -10px !important;
	}
	.login-form {
		position: relative;
		width: 600px;
		max-width: 100%;
		padding: 160px 35px 0;
		margin: 0 auto;
		overflow: hidden;
	}
	.logo {
		text-align: center;
		margin-bottom: 19px;
	}
	.login-content {
		padding: 8% 12%;
		min-height: 300px;
		background: url('../../assets/login_imgs/form_bg.png') no-repeat;
		background-size: cover;

		.svg-icon {
			vertical-align: -0.15em;
		}
	}
	h3 {
		margin: 0;
		margin-bottom: 16px;
		text-align: center;
		font-family: MicrosoftYaHei;
		font-size: 30px;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0px;
		color: #ffffff;
		line-height: 50px;

		img {
			float: left;
			position: relative;
			left: -10px;
		}
		span {
			display: inline-block;
		}
	}
	.el-input {
		display: inline-block;
		height: 47px;
		width: 75%;
		input {
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 15px;
			color: $light_gray;
			height: 47px;
			line-height: 1.5;
			caret-color: $cursor;

			&:-webkit-autofill {
				box-shadow: 0 0 0px 1000px $bg inset !important;
				-webkit-text-fill-color: $cursor !important;
			}
		}
	}
	.el-form-item {
		box-sizing: border-box;
		width: auto;
		height: 52px;
		margin: 0 auto;
		margin-bottom: 25px;
		background-color: #2e3949;
		color: #454545;
		border-radius: 10px;
		border: 2px solid transparent;
	}
	.el-form-item:focus-within .svg-active {
		color: #0b7dfa;
	}
	.el-form-item:focus-within .el-form-item__error {
		display: none;
	}
	.el-form-item:focus-within {
		background-color: #101221;
		border: 2px solid #0b7dfa;
		border-radius: 10px;
	}
	.login-btn {
		background: url('../../assets/login_imgs/submit_bg.png') no-repeat;
		background-size: cover;
		height: 51px;
		cursor: pointer;
		border-radius: 10px;
		text-align: center;
		font-family: MicrosoftYaHei;
		font-size: 20px;
		color: #ffffff;
		line-height: 51px;
	}
	.aActive {
		color: #fff !important;
	}
	.switch-language a {
		margin-top: 46px;
		font-family: MicrosoftYaHei;
		text-decoration: underline;
		font-size: 18px;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0px;
		color: #8a90a5;
	}
	.svg-icon {
		width: 18px;
	}
	.svg-container {
		padding: 1px 5px 6px 15px;
		color: $dark_gray;
		vertical-align: middle;
		width: 30px;
		display: inline-block;
	}

	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}
	.user-agreement {
		color: #fff;
		text-decoration: underline;
	}
	.version {
		position: fixed;
		right: 10px;
		bottom: 10px;
		color: #fff;
	}
}
</style>
