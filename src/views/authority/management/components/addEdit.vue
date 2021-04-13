<template>
	<div class="detail">
		<el-dialog
			:key="newOne"
			class="edit-drawer"
			:title="addEditType === 'edit' ? '权限编辑' : '新增权限'"
			:visible.sync="elDrawer"
			:close-on-click-modal="false"
			@close="handleClose"
		>
			<el-form ref="form" :model="form" label-width="auto" :rules="rules">
				<el-form-item :label="$t('new_7')" prop="sysName">
					<el-select
						v-if="addEditType === 'add'"
						v-model="form.userType"
						size="medium"
						clearable
						style="width:320px;"
						@change="selectChange"
					>
						<el-option
							v-for="item in systemList"
							:key="item.itemName"
							:label="item.itemName"
							:value="item.itemCode"
						></el-option>
					</el-select>
					<p v-else>{{ form.sysName }}</p>
				</el-form-item>
				<el-form-item :label="$t('new_2')" prop="id">
					<template v-if="addEditType === 'add'">
						<el-input v-model="form.id" style="width: 220px"></el-input>
						<el-button type="primary" size="medium" @click="check">
							检查重复
						</el-button>
					</template>
					<p v-else>{{ form.id }}</p>
				</el-form-item>
				<!-- 上级权限 -->
				<parentsTree
					ref="tree"
					v-model="form.permissionName"
					:parentId="form.parentId"
					:userType="form.userType"
					@getNode="getNode"
				></parentsTree>
				<el-form-item :label="$t('new_3')" prop="permissionName">
					<el-input v-model="form.permissionName"></el-input>
				</el-form-item>
				<el-form-item :label="$t('new_13')" prop="type">
					<el-select
						v-model="form.type"
						size="medium"
						clearable
						style="width:320px;"
					>
						<el-option label="菜单" value="0"></el-option>
						<el-option label="按钮" value="1"></el-option>
						<el-option label="放行" value="3"></el-option>
						<el-option label="数据" value="4"></el-option>
					</el-select>
				</el-form-item>
				<!-- 权限路径 -->
				<el-form-item v-if="addEditType === 'edit'" :label="$t('new_9')" prop="path">
					<p>{{ form.path }}</p>
				</el-form-item>
				<el-form-item :label="$t('new_6')" prop="idPath">
					<el-input v-model="form.idPath"></el-input>
				</el-form-item>
				<el-form-item :label="$t('new_10')" prop="component">
					<el-input v-model="form.component"></el-input>
				</el-form-item>
				<el-form-item :label="$t('new_11')" prop="icon">
					<el-input v-model="form.icon"></el-input>
				</el-form-item>
				<el-form-item :label="$t('new_12')" prop="orderNum">
					<el-input v-model="form.orderNum"></el-input>
				</el-form-item>
				<el-form-item :label="$t('new_14')" prop="remark">
					<el-input v-model="form.remark"></el-input>
				</el-form-item>
				<el-form-item :label="$t('new_15')" prop="remarkEnglish">
					<el-input v-model="form.remarkEnglish"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="confirm">
					{{ $t('btn.confirm') }}
				</el-button>
				<el-button type="primary" @click.native="handleClose">
					取消
				</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { addPermission, editPermission, checkExists } from '@/api/audit'
import parentsTree from './parentsTree'
export default {
	name: 'Detail',
	components: { parentsTree },
	props: {
		drawer: Boolean,
		addEditType: {
			type: String,
			default: 'add'
		},
		auditData: {
			type: Object,
			required: true
		},
		systemList: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			elDrawer: false,
			form: {},
			typeList: ['菜单', '按钮', '', '放行', '数据'],
			newOne: new Date().valueOf()
		}
	},
	computed: {
		rules() {
			return {
				id: [
					{
						required: true,
						message: '必填',
						trigger: 'blur'
					}
				],
				idPath: [
					{
						required: true,
						message: '必填',
						trigger: 'blur'
					}
				],
				remark: [
					{
						required: true,
						message: '必填',
						trigger: 'blur'
					}
				],
				permissionName: [
					{
						required: true,
						message: '必填',
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
			}
		},
		auditData: {
			handler(val) {
				this.form = { ...val }
			}
		}
	},
	methods: {
		/* eslint-disable */
		handleClose() {
			this.$emit('close')
			this.form = {}
			this.newOne = new Date().valueOf()
		},
		confirm() {
			const r = /^\+?[1-9][0-9]*$/
			if (!r.test(this.form.orderNum) && this.form.orderNum) {
				this.$message({
					message: '排序只能为正整数',
					type: 'error'
				})
				return
			}
			if (/.*[\u4e00-\u9fa5]+.*/.test(this.form.remarkEnglish)) {
				this.$message({
					message: '请输入英文备注',
					type: 'error'
				})
				return
			}
				if (!r.test(this.form.id)) {
				this.$message({
					message: '权限ID只能为正整数',
					type: 'error'
				})
				return
			}
			if (Number(this.form.id)> 999999999) {
				this.$message({
					message: '权限ID最多只能10位数',
					type: 'error'
				})
				return
			}
			if (this.addEditType === 'edit') {
				editPermission(this.form).then((res) => {
					if (res.code === 200) {
						this.$message({
							message: '编辑成功！',
							type: 'success'
						})
						this.$emit('close')
					} else {
						this.$message({
							message: '操作失败',
							type: 'error'
						})
					}
				})
			} else {
				addPermission(this.form).then((res) => {
					if (res.code === 200) {
						this.$message({
							message: '新增成功！',
							type: 'success'
						})
						this.$emit('close')
					} else {
						this.$message({
							message: '操作失败',
							type: 'error'
						})
					}
				})
			}
		},
		selectChange() {
			this.$refs.tree.close()
			this.$refs.tree.initData(this.form.userType)
		},
		getNode(value) {
			console.log(value)
			this.form.parentId = value
		},
		check() {
			const r = /^\+?[1-9][0-9]*$/
			if (!r.test(this.form.id)) {
				this.$message({
					message: '请输入一个正整数',
					type: 'error'
				})
				return
			}
			const params = {
				id: this.form.id
			}
			checkExists(params).then((res) => {
				if (res.code === 200) {
					if (!res.data) {
						this.$message({
						message: '权限ID可用！',
						type: 'success'
					})
					} else {
						this.$message({
						message: '权限ID重复，请重新输入！',
						type: 'error'
					})
					}
					
				} else {
					this.$message({
						message: '权限ID重复，请重新输入',
						type: 'error',
						duration: 1500
					})
				}
			})
		}
	}
}
</script>
<style lang="scss" scoped>
/deep/.el-dialog {
	width: 35%;
	min-width: 580px;
	.el-dialog__header .el-dialog__title {
		font-weight: 700;
		font-size: 20px;
	}

	.el-dialog__body,
	.el-dialog__footer {
		display: flex;
		justify-content: center;

		.el-form-item {
			margin-bottom: 20px;

			.el-form-item__label {
				font-size: 16px;
				font-weight: normal;
				text-align: justify;
				text-align-last: justify;
				padding: 0 25px 0 0;
				height: 40px;

				&:after {
					content: ' :';
					display: inline-block;
					padding-left: 100%;
					font-weight: 700;
					position: relative;
					top: -40px;
					left: 0px;
				}
			}

			p.playId,
			p.dataType,
			p.method {
				overflow: visible;
				height: 100%;
				max-height: 240px;
				margin: 0;
				line-height: 25px;
				display: block;
			}

			p {
				width: 300px !important;
				margin: 0;
				font-size: 16px;
				overflow: hidden;
				// white-space: nowrap;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2; //（行数）
				-webkit-box-orient: vertical;
			}
		}
	}
}
</style>
