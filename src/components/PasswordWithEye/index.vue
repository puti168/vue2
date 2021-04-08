<template>
	<el-form-item :label="label" :prop="prop">
		<slot name="icon"></slot>
		<el-input
			:key="passwordType"
			ref="password"
			v-model="newForm[prop]"
			:type="passwordType"
			maxlength="12"
			minlength="6"
			autocomplete="off"
			:placeholder="placeholder"
			@change="$emit('handleInput',newForm[prop])"
		>
			<div slot="suffix">
				<span class="show-pwd" @click="showPwd">
					<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
				</span>
			</div>
		</el-input>
	</el-form-item>
</template>

<script>
export default {
	props: {
		placeholder: {
			type: String,
			default: ''
		},
		label: {
			type: String,
			default: ''
		},
		prop: {
			type: String,
			default: ''
		},
		value: {
			type: String,
			default: ''
		},
		form: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			passwordType: 'password',
			newForm: {}
		}
	},
	watch: {
		form: {
			handler(val) {
				this.newForm = val
			},
			deep: true
		}
	},
	methods: {
		showPwd() {
			if (this.passwordType === 'password') {
				this.passwordType = 'text'
			} else {
				this.passwordType = 'password'
			}
			this.$nextTick(() => {
				this.$refs[`password`].focus()
			})
		}
	}
}
</script>
