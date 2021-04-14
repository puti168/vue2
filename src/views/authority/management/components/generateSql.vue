<template>
	<div class="detail">
		<el-dialog
			:key="newOne"
			class="edit-drawer"
			:title="$t('new_17')"
			:visible.sync="elDrawer"
			:close-on-click-modal="false"
			@close="handleClose"
		>
			<el-form ref="form" :model="form" label-width="auto">
				<el-form-item label="系统名称" prop="sysName">
					<p>{{ form.sysName }}</p>
				</el-form-item>
				<el-form-item label="权限ID" prop="id">
					<p>{{ form.id }}</p>
				</el-form-item>
				<el-form-item label="权限名称" prop="permissionName">
					<p>{{ form.permissionName }}</p>
				</el-form-item>
				<el-form-item label="插入SQL" prop="insertSql">
					<el-button
						type="primary"
						size="medium"
						class="button"
						:data-clipboard-text="form.insertSql"
					>
						复制
					</el-button>
				</el-form-item>
				<el-input v-model="form.insertSql" type="textarea" autosize></el-input>
				<el-form-item label="授权SQL" prop="grantSql">
					<el-button
						type="primary"
						size="medium"
						class="button"
						:data-clipboard-text="form.grantSql"
					>
						复制
					</el-button>
				</el-form-item>
				<el-input v-model="form.grantSql" type="textarea" autosize></el-input>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="handleClose">
					{{ $t('btn.confirm') }}
				</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import Clipboard from 'clipboard/dist/clipboard'
export default {
	name: 'Detail',
	props: {
		drawer: Boolean,
		auditData: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			elDrawer: false,
			form: {},
			clipboard: '',
			newOne: new Date().valueOf()
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
	mounted() {
		this.clipboard = new Clipboard('.button')
		console.log(this.clipboard)
		this.clipboard.on('success', function(e) {
			this.$message({
				message: '复制成功',
				type: 'success'
			})
			e.clearSelection()
		})
	},
	destroyed() {
		this.clipboard.destroy()
	},
	methods: {
		/* eslint-disable */
		handleClose() {
			this.$emit('close')
			this.form = {}
			this.newOne = new Date().valueOf()
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
			margin-bottom: 10px;

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
