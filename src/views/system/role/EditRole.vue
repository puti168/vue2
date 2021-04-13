<template>
	<div class="edit-dealer">
		<el-dialog
			class="edit-drawer edit-dealer-drawder"
			:title="
				isEditing
					? $t('system_component_component_editrole_442')
					: $t('system_component_component_editrole_443')
			"
			:visible.sync="elDrawer"
			:direction="direction"
			:before-close="handleClose"
			:close-on-click-modal="false"
			top="1vh"
			width="800px"
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
						<el-form-item
							required
							:label="$t('system_component_component_editrole_444')"
							prop="roleName"
						>
							<el-input
								v-model="form.roleName"
								maxlength="10"
								:placeholder="$t('system_component_component_editrole_445')"
							></el-input>
						</el-form-item>
					</el-row>
					<el-row>
						<el-form-item
							:label="$t('system_component_component_editrole_446')"
							prop="remark"
						>
							<el-input
								v-model="form.remark"
								type="textarea"
								maxlength="300"
								:placeholder="$t('system_component_component_editrole_447')"
							></el-input>
						</el-form-item>
					</el-row>
					<el-form-item
						:label="$t('system_component_component_editrole_448')"
						required
						class="l-h-a"
					></el-form-item>
					<div class="ps">
						<!--  form.options: all configrable roles of the current user; permissionIds: the roles of the selected user-->
						<div class="choices flex-h-vc">
							<el-checkbox
								v-model="checkAll"
								:indeterminate="isIndeterminate"
								@change="handleCheckAllChange"
							>
								{{ $t('system_component_component_editrole_449') }}
							</el-checkbox>
						</div>

						<el-tree
							ref="tree"
							:default-checked-keys="checkedKeys"
							:data="rolePermissions"
							default-expand-all
							node-key="id"
							show-checkbox
							:check-on-click-node="true"
							:props="defaultProps"
							@check-change="handleCheckChange"
							@check="check"
						></el-tree>
					</div>

					<div class="handles center">
						<el-button round type="default" class="item" @click.native="handleClose">
							{{ $t('system_component_component_editrole_450') }}
						</el-button>
						<el-button round type="success" class="item" @click.native="handleSure">
							{{ $t('system_component_component_editrole_451') }}
						</el-button>
					</div>
				</el-form>
			</el-card>
		</el-dialog>
	</div>
</template>

<script>
import {
	addRole,
	getPermissionsByRole,
	getAllPermissions,
	editRole
} from '@/api/role'
import { isEmptyObj } from '@/utils'
import { message } from '@/utils/message'
import validate from '@/mixins/validate'
export default {
	name: 'EditRole',
	mixins: [validate],
	props: {
		isCreated: {
			type: Number,
			default: -1
		},
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
			checkedKeys: [],
			isEditing: true,
			time: '',
			elDrawer: false,
			roleOptions: [],
			form: {
				permissionIds: [],
				id: '',
				remark: '',
				roleName: ''
			},
			direction: 'ttb',
			innerVisible: false,
			dialogTableVisible: false,
			multipleSelection: [],
			previewUrl: '',
			checkAll: false,
			isIndeterminate: false,
			rules: {
				roleName: [
					{
						required: true,
						message: this.$t('system_component_component_editrole_452'),
						trigger: 'blur'
					},
					{
						required: true,
						message: this.$t('system_component_component_editrole_452'),
						trigger: 'change'
					},
					{
						required: true,
						validator: this.notSupportSpecial,
						trigger: 'blur'
					}
				],
				remark: [
					{
						validator: this.notSupportSpecial,
						trigger: 'blur'
					}
				]
			},
			permissions: [],
			rolePermissions: []
		}
	},
	computed: {
		defaultProps() {
			return {
				label: (data) => {
					return data.permissionName
				},
				children: 'children'
			}
		}
	},
	watch: {
		drawer(val) {
			this.elDrawer = val
		},
		isCreated(val) {
			this.isEditing = val === 0
		},
		async dealData(val) {
			const result = await getAllPermissions().then((res) => {
				return this.handleAllPermissions(res)
			})

			// get permissions of the selected user
			if (result && result.length > 0 && this.isEditing && !isEmptyObj(val)) {
				getPermissionsByRole({
					id: val.id
				}).then((res) => {
					this.form = {
						...this.form,
						...val
					}

					this.handleCurrentPermissions(res)
				})
			}
		}
	},
	methods: {
		handleAllPermissions(res) {
			if (res && res.code === 200) {
				this.permissions = JSON.parse(JSON.stringify(res.data))
				this.i18nPermission(this.permissions)

				this.rolePermissions = this.permissions.map((element) => {
					if (element.id === '2000') {
						element.children.unshift({
							children: null,
							id: 'list' + element.id,
							isExist: '1',
							parentId: element.id,
							path: element,
							permissionName: this.$t('system_component_component_editrole_453'),
							type: 1
						})
					} else if (
						element.id !== '2000' &&
						element.children &&
						element.children.length !== 0
					) {
						element.children.forEach((childElement) => {
							childElement.children = childElement.children || []
							childElement.children.unshift({
								children: null,
								id: 'list' + childElement.id,
								isExist: '1',
								parentId: childElement.id,
								path: childElement,
								permissionName: this.$t('system_component_component_editrole_453'),
								type: 1
							})
						})
					}
					return element
				})
				this.$nextTick(() => {
					// 叶子节点平铺
					const doms =
						document.querySelectorAll('.el-tree-node__content > .is-leaf') || []
					doms.length !== 0 &&
						doms.forEach((node) => {
							node.parentNode.classList.add('tile')
						})

					this.handleCheckChange()
				})

				return res.data
			}
		},
		i18nPermission(arr) {
			if (!arr || arr.length === 0) return []
			arr.forEach((item) => {
				// item.permissionName = this.$t(`route.${item.permissionName.trim()}`)
				if (item && item.children && item.children.length > 0) {
					this.i18nPermission(item.children)
				}
			})
		},
		handleCurrentPermissions(res) {
			const { assignedPermissions } = res.data
			const currentPermissions = []

			if (assignedPermissions) {
				this.leastChildren = this.getLeastIds(this.permissions, [])
				assignedPermissions.forEach((element) => {
					if (element.isExist === '1' && this.leastChildren.includes(element.id)) {
						currentPermissions.push(element.id)
					} else if (element.isExist === '1' && element.type === '0') {
						currentPermissions.push(`list${element.id}`)
					}
				})
			}

			if (currentPermissions.length && currentPermissions.length > 0) {
				this.$refs.tree.setCheckedKeys(currentPermissions)
			}
		},
		getLeastIds(permissions, arr) {
			permissions.map((item) => {
				item.children ? this.getLeastIds(item.children, arr) : arr.push(item.id)
			})
			return arr
		},
		getAllIds(permissions, arr) {
			permissions.forEach((item) => {
				arr.push(item.id)
				item.children && this.getAllIds(item.children, arr)
			})
			return arr
		},
		handleSure() {
			if (this.timeout) clearTimeout(this.timeout)

			this.timeout = setTimeout(() => {
				let permissionKeys = []
				const keys = this.$refs.tree.getCheckedKeys() || []
				const halfKeys = this.$refs.tree.getHalfCheckedKeys() || []
				permissionKeys = keys.concat(halfKeys)
				// 过滤掉id为'list'的值
				permissionKeys = permissionKeys.filter(
					(element) => !element.includes('list')
				)
				this.$refs.form.validate((valid) => {
					if (valid) {
						if (permissionKeys.length === 0) {
							message({
								message: this.$t('system_component_component_editrole_454'),
								type: 'error'
							})
							return
						}
						const handler = this.isCreated ? addRole : editRole
						handler({
							...this.form,
							permissionIds: permissionKeys
						}).then((res) => {
							if (res.code === 200) {
								message({
									message: this.$t('system_component_component_editrole_455'),
									type: 'success'
								})
								this.$emit('update:drawer', false)
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
			this.$emit('update:isCreated', -1)
			this.$refs.tree.setCheckedKeys([])
			this.$refs['form'].resetFields()
		},
		handleCheckAllChange(val) {
			const ids = this.getAllIds(this.permissions, [])
			this.$refs.tree.setCheckedKeys(val ? ids : [])
			this.isIndeterminate = false
		},
		handleCheckChange(data) {
			if (this.$refs.tree) {
				const selected = this.$refs.tree.getCheckedKeys()
				const ids = this.getAllIds(this.rolePermissions, [])
				this.checkAll = selected.length === ids.length
			}
		},
		check(data, obj) {
			if (!obj.checkedKeys.includes(data.id) && data.id.includes('list')) {
				this.$refs.tree.setChecked(data.parentId, false, true)
			}

			if (obj.checkedKeys.includes(data.id)) {
				this.$refs.tree.setChecked(`list${data.parentId}`, true)
			}
		}
	}
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
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

	.ps {
		border: 1px solid #eee;
		.choices {
			height: 48px;
			margin-left: 24px;
			border-bottom: 1px solid #eee;
		}
	}

	.handles {
		margin-top: 30px;
		.item {
			margin-bottom: 15px;
		}
	}
	.tile {
		float: left;
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
