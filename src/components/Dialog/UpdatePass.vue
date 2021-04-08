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
				:placeholder="$t('placeholder.userName')"
				@handleInput="passDialogForm.password = $event"
			></PasswordWithEye>

			<PasswordWithEye
				:label="$t('dealer_component_updatepass_195')"
				prop="passwordAgain"
				:form="passDialogForm"
				:placeholder="$t('placeholder.userName')"
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
import { testStringLength, testName, testSpecial } from '@/utils/test'
import PasswordWithEye from '@/components/PasswordWithEye'

export default {
	name: 'UpdatePass',
	components: {
		PasswordWithEye
	},
	props: {
		dialog: Boolean,
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
				const err = new Error(this.$t('placeholder.userName'))
				if (value === '') {
					callback(err)
				} else if (!testStringLength(value, { min: 6, max: 12 })) {
					callback(err)
				} else if (!testName(value)) {
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
				const err = new Error(this.$t('placeholder.userName'))
				if (value === '') {
					callback(err)
				} else if (!testStringLength(value, { min: 6, max: 12 })) {
					callback(err)
				} else if (!testName(value)) {
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
			this.$refs.passDialogForm.validate((valid) => {
				if (valid) {
					this.$parent
						.updatePassword({
							id: this.agentid,
							...this.passDialogForm
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
