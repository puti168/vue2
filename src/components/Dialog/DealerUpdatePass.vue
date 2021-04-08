<template>
	<el-dialog
		:before-close="handleClose"
		:close-on-click-modal="false"
		:title="$t('route.changepassword')"
		:visible.sync="elDialog"
		center
		width="500px"
		class="update-pass"
		:destroy-on-close="true"
		@close="handleClose"
	>
		<el-form ref="form" :model="form" :rules="passDialogFormRules" label-width="auto">
			<PasswordWithEye
				:label="$t('system_component_password_370')"
				prop="password"
				:form="form"
				:placeholder="$t('placeholder.simplePass')"
				@handleInput="form.password = $event"
			></PasswordWithEye>

			<PasswordWithEye
				:label="$t('system_component_password_372')"
				prop="checkPassword"
				:form="form"
				:placeholder="$t('placeholder.simplePass')"
				@handleInput="form.checkPassword = $event"
			></PasswordWithEye>
		</el-form>
		<span slot="footer" class="elDialog-footer">
			<el-button @click="handleClose">{{ $t('system_component_ipwhitelist_337') }}</el-button>
			<el-button type="primary" @click="commitPassDialog">{{ $t('system_component_ipwhitelist_338') }}</el-button>
		</span>
	</el-dialog>
</template>

<script>
import PasswordWithEye from '@/components/PasswordWithEye'
import validate from '@/mixins/validate'

export default {
	name: 'DealerUpdatePass',
	components: {
		PasswordWithEye
	},
	mixins: [validate],
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
			form: { password: '', checkPassword: '' }
		}
	},
	computed: {
		passDialogFormRules() {
			const validatePassword = (rule, value, callback) => {
				if (value.length < 6) {
					callback(new Error('The password can not be less than 6 digits'))
				} else {
					callback()
				}
			}
			return {
				password: [
					{ required: true, validator: validatePassword, trigger: 'blur' }
				],
				checkPassword: [
					{
						required: true,
						validator: this.validateSimpleCheckPassword,
						trigger: 'blur'
					}
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
			this.$refs.form.resetFields()
			this.$emit('update:dialog', false)
		},
		commitPassDialog() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.$parent
						.updatePassword({
							id: this.agentid,
							...this.form
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
