<template>
	<div class="edit-dealer">
		<el-dialog
			class="edit-drawer edit-dealer-drawder"
			:title="
				isEditing
					? $t('system_component_component_editaccount_405')
					: $t('system_component_component_editaccount_406')
			"
			:visible.sync="elDrawer"
			:direction="direction"
			:before-close="handleClose"
			:close-on-click-modal="false"
			width="750px"
			:destroy-on-close="true"
			@close="handleClose"
		>
			<el-card class="card">
				<el-form
					ref="form"
					:inline="true"
					:model="form"
					:rules="rules"
					label-width="auto"
				>
					<el-row>
						<el-col>
							<el-row>
								<el-form-item
									:required="!isEditing"
									label="用户名称："
									prop="userName"
								>
									<el-input
										v-model="form.userName"
										:disabled="!isCreated"
										maxlength="10"
										style="width:300px;"
										placeholder="请输入"
									></el-input>
								</el-form-item>
							</el-row>
							<el-row>
								<el-form-item label="姓名：" prop="nickName">
									<el-input
										v-model="form.nickName"
										maxlength="10"
										style="width:300px;"
										placeholder="请输入"
									></el-input>
								</el-form-item>
							</el-row>
							<template v-if="!isEditing">
								<el-row>
									<PasswordWithEye
										label="登录密码："
										prop="pwd"
										:form="form"
										placeholder="请输入"
										@handleInput="form.pwd = $event"
									></PasswordWithEye>
								</el-row>
								<el-row>
									<PasswordWithEye
										label="确认登录密码："
										prop="rePwd"
										:form="form"
										placeholder="请输入"
										@handleInput="form.rePwd = $event"
									></PasswordWithEye>
								</el-row>
							</template>
							<el-row>
								<el-form-item
									label="谷歌验证秘钥"
									prop="googleAuthCodeHide"
								>
									<el-input
										v-model="form.googleAuthCode"
										disabled
										style="width:300px;"
										:placeholder="$t('login_index_258')"
									></el-input>
									</el-form-item>
							</el-row>
						</el-col>
					</el-row>
						<el-form-item
									label="分配角色："
								>
					<el-transfer
						ref="transfer"
						v-model="tranferVal"
						class="transfer"
						:titles="[
							'可选角色',
							'已选角色'
						]"
						:data="ps"
						:props="{ key: 'id', label: 'roleName' }"
					></el-transfer>
					<div class="handles center" chenter>
						<el-button
							round
							type="default"
							class="item"
							style="padding: 0"
							@click.native="handleClose"
						>
							{{ $t('system_component_component_editaccount_417') }}
						</el-button>
						<el-button
							round
							type="primary"
							class="item"
							style="padding: 0"
							@click.native="handleSure"
						>
							{{ $t('system_component_component_editaccount_418') }}
						</el-button>
					</div>
						</el-form-item>
				</el-form>
			</el-card>
		</el-dialog>
	</div>
</template>

<script>
import { editUser, addUser } from '@/api/user'
// import { googleAuth } from '@/api/system'
import { isEmptyObj } from '@/utils'
import { message } from '@/utils/message'
import PasswordWithEye from '@/components/PasswordWithEye'
import validate from '@/mixins/validate'
import md5 from 'js-md5'

export default {
	name: 'EditAccout',
	components: {
		PasswordWithEye
	},
	mixins: [validate],
	props: {
		isCreated: Boolean,
		drawer: Boolean,
		dealData: {
			type: Object,
			default: function() {
				return {}
			}
		}
	},
	data() {
		return {
			ps: [],
			tranferVal: [],
			checkedKeys: [],
			showPassword: true,
			isEditing: true,
			time: '',
			elDrawer: false,
			loading: false,
			roleOptions: [],
			form: {
				userName: '',
				nickName: '',
				pwd: '',
				rePwd: '',
				roleIds: [],
				googleAuthCode: ''
			},
			direction: 'ttb',
			innerVisible: false,
			dialogTableVisible: false,
			multipleSelection: [],
			previewUrl: ''
		}
	},
	computed: {
		rules() {
			const validateAuth = (rule, value, callback) => {
				const err = new Error(this.$t('login_index_258'))
				if (!value) {
					callback(err)
				} else {
					this.$refs.form.validateField('rePwd')
					callback()
				}
			}
			return {
				pwd: [
					{ required: true, validator: this.validatePass, trigger: 'blur' }
				],
				rePwd: [
					{ required: true, validator: this.validateRePass, trigger: 'blur' }
				],
				userName: [
					{
						required: true,
						trigger: 'change',
						validator: this.validateAcount
					},
					{
						required: true,
						trigger: 'blur',
						validator: this.validateAcount
					}
				],
				nickName: [
					{ required: true, trigger: 'blur', validator: this.validateNickName },
					{
						required: true,
						trigger: 'change',
						validator: this.validateNickName
					}
				],
				googleAuthCode: [
					{
						required: true,
						trigger: 'blur',
						message: this.$t('login_index_258'),
						validateAuth
					}
				]
			}
		}
	},
	watch: {
		drawer(val) {
			this.elDrawer = val
			val && (this.ps = this.accountRoles)

			if (val && this.isCreated) {
				this.$api
					.getRoleList({
						pageNum: 1,
						pageSize: 99999
					})
					.then((res) => {
						this.listLoading = false
						this.ps = res.data.records || []
						this.accountRoles = res.data.records || []
						if (!res.data.records) {
							this.$parent.notHasRoles = true
						}
					})
			}
		},
		isCreated(val) {
			this.isEditing = !val
		},
		dealData: {
			handler(val) {
				this.form.roleIds = val.roleIds
				this.form.id = val.id
				this.form.userName = val.userName
				this.form.nickName = val.nickName
				this.form.googleAuthCode = val.googleAuthCode
				if (this.isEditing && !isEmptyObj(val)) {
					this.$api
						.getUserRoles({
							id: val.id
						})
						.then((res) => {
							this.form = {
								...val,
								...this.form
							}

							this.tranferVal =
								(res.data.allowUserRole &&
									res.data.allowUserRole
										.filter((element) => {
											return element.isExist === '1'
										})
										.map((item) => item.id)) ||
								[]

							this.ps = res.data.allowUserRole || []
						})
				}
			},
			deep: true
		}
	},
	mounted() {
		this.listLoading = true
	},
	methods: {
		handleChoose() {
			this.dialogTableVisible = true
			this.$refs['form'].resetFields()
		},
		handleSure() {
			if (this.timeout) clearTimeout(this.timeout)

			this.timeout = setTimeout(() => {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						if (this.tranferVal.length === 0) {
							message({
								message: this.$t('system_component_component_editaccount_421'),
								type: 'error'
							})
							return
						}
						const handle = this.isCreated ? addUser : editUser
						const params = this.isCreated
							? {
									...this.form,
									roleIds: this.tranferVal,
									googleAuthCode: this.form.googleAuthCode,
									pwd: md5(this.form.pwd + this.form.userName),
									rePwd: md5(this.form.rePwd + this.form.userName)
									// eslint-disable-next-line
							  }
							: {
									nickName: this.form.nickName,
									id: this.form.id,
									userName: `${this.form.userName}`,
									roleIds: this.tranferVal,
									googleAuthCode: this.form.googleAuthCode
									// eslint-disable-next-line
							  }
						handle(params).then((res) => {
							if (res.code === 200) {
								this.$emit('update:drawer', false)
								message({
									message: this.$t(
										'system_component_component_editaccount_422'
									),
									type: 'success'
								})
								this.$parent.loadData()
							}
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			}, 300)
		},
		handleClose() {
			this.$emit('update:drawer', false)
			this.$emit('update:dealData', {})
			this.tranferVal = []
			this.$refs['form'].resetFields()
			this.ps = []
		},
		handleSelectionChange(val) {
			this.multipleSelection = val
		},
		handleCheck(row) {
			this.innerVisible = true
		}
		// createGoogleAuth() {
		// 	this.loading = true
		// 	return googleAuth().then((res) => {
		// 		if (res && res.code === 200) {
		// 			this.form.googleAuthCode = res.data
		// 			this.loading = false
		// 		}
		// 	})
		// }
	}
}
</script>

<style lang="scss" scoped>
.edit-drawer {
	.card {
		margin: 0 15px;
	}
	.item {
		margin-right: 30px;
	}

	.round {
		padding: 0 50px;
	}

	.handles {
		padding-left: 50px;
		margin-top: 30px;
		text-align: center;
		.item {
			margin-bottom: 15px;
		}
	}

	.transfer {
		margin-left: 50px;
	}
}
@media (max-width: 800px) {
	.edit-exp-drawer {
		.round {
			padding: 0;
		}
	}
}
</style>
