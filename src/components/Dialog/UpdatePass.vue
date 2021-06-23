<template>
	<el-dialog
		:before-close="handleClose"
		:close-on-click-modal="false"
		:title="$t('dealer_component_updatepass_193')"
		:visible.sync="elDialog"
		center
		width="500px"
		class="update-pass"
		:destroy-on-close="true"
		@close="handleClose"
	>
		<el-form
			ref="passDialogForm"
			:model="passDialogForm"
			:rules="passDialogFormRules"
			label-width="auto"
		>
			<PasswordWithEye
				:label="$t('dealer_component_updatepass_194')"
				prop="password"
				:form="passDialogForm"
				:placeholder="$t('message.validNumberEn310')"
				@handleInput="passDialogForm.password = $event"
			></PasswordWithEye>

			<PasswordWithEye
				:label="$t('dealer_component_updatepass_195')"
				prop="passwordAgain"
				:form="passDialogForm"
				:placeholder="$t('message.validNumberEn310')"
				@handleInput="passDialogForm.passwordAgain = $event"
			></PasswordWithEye>
		</el-form>
		<span slot="footer" class="elDialog-footer">
			<el-button @click="handleClose">{{ $t('dealer_component_updatepass_197') }}</el-button>
			<el-button type="primary" @click="commitPassDialog">{{ $t('dealer_component_updatepass_198') }}</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { testStringLength, testSpecial, testPassword310 } from '@/utils/test'
import PasswordWithEye from '@/components/PasswordWithEye'
import md5 from 'js-md5'
export default {
	name: 'UpdatePass',
	components: {
		PasswordWithEye
	},
	props: {
		dialog: Boolean,
		userName: {
			type: String,
			default: ''
		},
		agentid: {
			type: [Number, String],
			default: 0
		},
		isNum: Boolean
	},
	data() {
		return {
			elDialog: false,
			passDialogForm: { password: '', passwordAgain: '' }
		}
	},
	computed: {
		passDialogFormRules() {
			const validatePass = (rule, value, callback) => {
				const err = new Error(this.$t('message.validNumberEn310'))
				if (value === '') {
					callback(err)
				} else if (!testStringLength(value, { min: 3, max: 10 })) {
					callback(err)
				} else if (!testPassword310(value)) {
					callback(err)
				} else if (!testSpecial(value)) {
					callback(err)
				} else {
					if (this.passDialogForm.passwordAgain !== '') {
						this.$refs.passDialogForm.validateField('passwordAgain')
					}
					callback()
				}
			}
			const validateRePass = (rule, value, callback) => {
				const err = new Error(this.$t('message.validNumberEn310'))
				if (value === '') {
					callback(err)
				} else if (!testStringLength(value, { min: 3, max: 10 })) {
					callback(err)
				} else if (!testPassword310(value)) {
					callback(err)
				} else if (!testSpecial(value)) {
					callback(err)
				} else if (value !== this.passDialogForm.password) {
					callback(new Error(this.$t('dealer_component_updatepass_200')))
				} else {
					callback()
				}
			}

			return {
				password: [{ required: true, validator: validatePass, trigger: 'blur' }],
				passwordAgain: [
					{ required: true, validator: validateRePass, trigger: 'blur' }
				]
			}
		}
	},
	watch: {
		dialog(val) {
			this.elDialog = val
		}
	},
	methods: {
		handleClose(done) {
			this.$refs.passDialogForm.resetFields()
			this.$emit('update:dialog', false)
		},
		commitPassDialog() {
			console.log(this.userName)
			this.$refs.passDialogForm.validate((valid) => {
				if (valid) {
					this.$parent
						.updatePassword({
							id: this.agentid,
							pwd: md5(this.userName.trim() + this.passDialogForm.password.trim()),
							rePwd: md5(this.userName.trim() + this.passDialogForm.passwordAgain.trim())
						})
						.then((_) => {
							this.handleClose()
						})
				}
			})
		}
	}
}
</script>
