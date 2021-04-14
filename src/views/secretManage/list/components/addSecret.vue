<template>
	<div class="add-secret">
		<el-dialog
			:key="newOne"
			class="edit-drawer"
			:title="disable ? $t('title.sceretDetail') : $t('title.addSceret')"
			:visible.sync="elDrawer"
			:close-on-click-modal="false"
			@close="handleClose"
		>
			<el-form ref="form" :model="form" label-width="auto" :rules="rules">
				<el-form-item :label="$t('label.platform')" prop="platformId">
					<el-select
						v-model="form.platformId"
						:placeholder="$t('placeholder.selectPlatform')"
						:disabled="disable"
					>
						<el-option
							v-for="list in platformList"
							:key="list.id"
							:label="list.itemName"
							:value="list.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('label.application')" prop="applicationId">
					<el-select
						v-model="form.applicationId"
						:placeholder="$t('placeholder.selectApplication')"
						:disabled="disable"
					>
						<el-option
							v-for="list in applicationList"
							:key="list.id"
							:label="list.itemName"
							:value="list.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('label.version')" prop="version">
					<el-input v-model="form.version" :disabled="disable"></el-input>
				</el-form-item>
				<el-form-item v-if="form.keyId" :label="$t('label.keyId')" prop="keyId">
					<el-input v-model="form.keyId" :disabled="true"></el-input>
					<el-button
						v-clipboard:copy="form.keyId"
						v-clipboard:success="onCopy"
						v-clipboard:error="onError"
						class="copy"
					>
						{{ $t('btn.copy') }}
					</el-button>
				</el-form-item>
				<el-form-item
					v-if="form.keyId"
					:label="$t('label.keyStr')"
					prop="keyStr"
				>
					<el-input v-model="form.keyStr" :disabled="true"></el-input>
					<el-button
						v-clipboard:copy="form.keyStr"
						v-clipboard:success="onCopy"
						v-clipboard:error="onError"
						class="copy"
					>
						{{ $t('btn.copy') }}
					</el-button>
				</el-form-item>
			</el-form>
			<span v-if="!disable" slot="footer" class="dialog-footer">
				<el-button v-if="form.keyId" type="primary" @click.native="handleClose">
					{{ $t('btn.close') }}
				</el-button>
				<el-button v-else type="primary" @click.native="handleSure">
					{{ $t('btn.confirm') }}
				</el-button>
				<el-button @click.native="handleClose">
					{{ $t('btn.cancel') }}
				</el-button>
			</span>
			<span v-else slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="handleClose">
					{{ $t('btn.close') }}
				</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { Message } from 'element-ui'
export default {
	name: 'AddSecret',
	props: {
		drawer: Boolean,
		secretdata: {
			type: Object,
			default: function() {
				return {}
			}
		}
	},
	data() {
		return {
			elDrawer: false,
			form: {
				platformId: '',
				applicationId: '',
				version: '',
				keyId: '',
				keyStr: ''
			},
			platformList: [],
			applicationList: [],
			newOne: new Date().valueOf()
		}
	},
	computed: {
		disable() {
			return !!this.secretdata.keyId
		},
		rules() {
			// 暂无版本号验证要求，待后期与产品确认
			// const validatorVersion = (rule, value, callback) => {
			// 	if (/^(V|v)(\d{1,4})$/.test(value)) {
			// 		callback()
			// 	} else {
			// 		callback(new Error(this.$t('message.errorVersion')))
			// 	}
			// }
			return {
				platformId: [
					{
						required: true,
						message: this.$t('login.username'),
						trigger: 'change'
					}
				],
				applicationId: [
					{
						required: true,
						message: this.$t('login.username'),
						trigger: 'change'
					}
				],
				version: [
					{
						required: true,
						message: this.$t('login.username'),
						trigger: 'blur'
					}
				]
			}
		}
	},
	watch: {
		drawer: {
			handler(val) {
				this.elDrawer = val
			},
			deep: true,
			immediate: true
		},
		secretdata: {
			handler(val) {
				this.form = { ...val }
			},
			deep: true,
			immediate: true
		}
	},
	created() {
		this.$api
			.getUserSecurityDict()
			.then((res) => {
				this.list = res.data
				this.list.forEach((item) => {
					this[`${item.category}List`] = item.items
				})
			})
			.catch((err) => {
				console.log(err)
			})
	},
	mounted() {},
	methods: {
		handleSure() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					Message.closeAll()
					const { platformId, applicationId, version } = this.form
					const params = { platformId, applicationId, version }
					this.$api
						.addSecurity(params)
						.then((res) => {
							if (res.code === 200) {
								this.form = res.data
								this.$message({
									message: this.$t('message.addSecretSuccessfully'),
									type: 'success'
								})
								this.$parent.loadData()
							}
						})
						.catch(() => {
							// console.log(err)
						})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		/* eslint-disable */
		handleClose() {
			this.$emit('close')
			this.form = {}
			// this.$refs.form.clearValidate()
			this.newOne = new Date().valueOf()
		},
		onCopy() {
			this.$message.success(this.$t('message.copyToClipboardSuccessfully'))
		},
		onError() {
			this.$message.error(this.$t('message.copyToClipboardFailed'))
		}
	}
}
</script>

<style lang="scss" scoped>
.add-secret {
	.copy {
		margin-left: 10px;
	}
}
@media (max-width: 800px) {
	.edit-exp-drawer {
		.round {
			padding: 0;
		}
	}
}
/deep/.el-dialog {
	width: 35%;
	min-width: 580px;
	.el-dialog__body,
	.el-dialog__footer {
		display: flex;
		justify-content: center;
		.el-input {
			width: 300px !important;
		}
	}
}
</style>
