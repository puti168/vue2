<template>
	<div class="game-container report-container addMember-container">
		<div class="line-member"></div>
		<div class="addMember-content">
			<div class="form-header">
				<span>新增会员资料</span>
				<span>
					<code style="color:#FF3B30;">*</code>
					为必填项
				</span>
			</div>
			<el-form ref="form" :model="form" :rules="rules" label-width="100px">
				<el-form-item label="账号类型:" prop="accountType">
					<el-select
						v-model="form.accountType"
						size="medium"
						placeholder="全部"
						clearable
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
				<el-form-item label="会员账号:" prop="username">
					<el-input
						v-model="form.username"
						size="medium"
						maxlength="11"
						oninput="value=value.replace(/[\u4E00-\u9FA5]/g ,'')"
						placeholder="4-11位，最少2个字母+数字组合，首位字母"
						clearable
						autocomplete="off"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="登录密码:" prop="password">
					<el-input
						v-model="form.password"
						size="medium"
						placeholder="8-12位，字母+数字组合"
						clearable
						autocomplete="off"
						oninput="value=value.replace(/[\u4E00-\u9FA5]/g ,'')"
						maxlength="12"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="手机号码:">
					<el-input
						v-model.number="form.mobile"
						size="medium"
						onkeyup="value=value.replace(/^(0+)|[^\d]+/g, '')"
						placeholder="请输入"
						clearable
						maxlength="11"
						style="width: 365px"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="上级代理:">
					<el-input
						v-model="form.parentProxyName"
						size="medium"
						placeholder="请输入"
						clearable
						maxlength="11"
						oninput="value=value.replace(/[\u4E00-\u9FA5]/g ,'')"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="性别:">
					<el-select
						v-model="form.gender"
						size="medium"
						placeholder="全部"
						style="width: 365px"
					>
						<el-option
							v-for="item in genderType"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="VIP等级:">
					<el-select
						v-model="form.vipId"
						size="medium"
						placeholder="请选择vip等级"
						style="width: 365px"
					>
						<el-option
							v-for="item in vipRiskList"
							:key="item.code"
							:label="'vip' + item.gradeNum"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="邮箱:" prop="email">
					<el-input
						v-model="form.email"
						size="medium"
						placeholder="请输入"
						clearable
						maxlength="32"
						oninput="value=value.replace(/[\u4E00-\u9FA5]/g ,'')"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="姓名:">
					<el-input
						v-model="form.realName"
						size="medium"
						placeholder="请输入"
						clearable
						maxlength="15"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="审核信息:">
					<el-input
						v-model="form.applyInfo"
						size="medium"
						type="textarea"
						placeholder="请输入"
						show-word-limit
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
import { EMAIL_PATTERN } from '@/utils/pattern'
import Finger from '@/utils/fingerprintjs2'
import md5 from 'js-md5'

export default {
	name: routerNames.addMember,
	mixins: [list],
	data() {
		return {
			loading: false,
			form: {
				accountType: '4',
				username: undefined,
				password: undefined,
				mobile: undefined,
				parentProxyName: undefined,
				gender: '1',
				vipId: undefined,
				email: undefined,
				realName: undefined,
				applyInfo: undefined,
				deviceNo: Finger.get()
			},
			vipRiskList: []
		}
	},
	computed: {
		accountTypeArr() {
			return this.globalDics.accountType || []
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
			const reg1 = /^[A-Za-z]{1}(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){1,})[0-9A-Za-z]{3,10}$/
			const reg2 = /^([a-zA-Z0-9]*[a-zA-Z]+[0-9]+[a-zA-Z0-9]*|[a-zA-Z0-9]*[0-9]+[a-zA-Z]+[a-zA-Z0-9]*)$/

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
				username: [
					{
						required: true,
						validator: testUserName,
						trigger: 'blur'
					}
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
	async created() {
		this.getVipRisk()
	},
	mounted() {},
	methods: {
		getVipRisk() {
			this.$api.getMemberRiskAPI().then((res) => {
				const { code, data } = res
				if (code === 200) {
					this.vipRiskList = data || []
				}
			})
		},
		add() {
			this.loading = true
			const item = this.vipRiskList.find((item) => item.id === this.form.vipId)
			const params = {
				...this.form,
				vipSerialNum: item && item.gradeNum
			}
			let lock = true
			this.$refs['form'].validate((valid) => {
				if (valid && lock) {
					lock = false
					params.password = md5(params.password).toUpperCase()
					this.$api
						.addMemberAPI(params)
						.then((res) => {
							this.loading = false
							lock = true
							const { code, data, msg } = res
							if (code === 200) {
								this.$confirm(`会员${data}资料提交成功`, {
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
				accountType: '4',
				username: undefined,
				password: undefined,
				mobile: undefined,
				parentProxyName: undefined,
				gender: '1',
				vipId: undefined,
				email: undefined,
				realName: undefined,
				applyInfo: undefined,
				deviceNo: Finger.get()
			}
		},
		checkValue(val) {}
	}
}
</script>

<style lang="scss" scoped>
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
