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
				<el-form-item :label="$t('new_7')" prop="sysName">
					<p>{{ form.sysName }}</p>
				</el-form-item>
				<el-form-item :label="$t('new_2')" prop="id">
					<p>{{ form.id }}</p>
				</el-form-item>
				<el-form-item :label="$t('new_8')" prop="parentName">
					<p>{{ form.parentName }}</p>
				</el-form-item>
				<el-form-item :label="$t('new_3')" prop="permissionName">
					<p>{{ form.permissionName }}</p>
				</el-form-item>
				<el-form-item :label="$t('new_9')" prop="path">
					<p>{{ form.path }}</p>
				</el-form-item>
				<el-form-item :label="$t('new_6')" prop="idPath">
					<p>{{ form.idPath }}</p>
				</el-form-item>
				<el-form-item :label="$t('new_10')" prop="component">
					<p>{{ form.component }}</p>
				</el-form-item>
				<el-form-item :label="$t('new_11')" prop="icon">
					<p>{{ form.icon }}</p>
				</el-form-item>
				<el-form-item :label="$t('new_12')" prop="orderNum">
					<p>{{ form.orderNum }}</p>
				</el-form-item>
				<el-form-item :label="$t('new_13')" prop="type">
					<p>{{ typeList[form.type] }}</p>
				</el-form-item>
				<el-form-item :label="$t('new_14')" prop="remark">
					<p>{{ form.remark }}</p>
				</el-form-item>
				<el-form-item :label="$t('new_15')" prop="remarkEnglish">
					<p>{{ form.remarkEnglish }}</p>
				</el-form-item>
				<el-form-item :label="$t('new_16')" prop="createAt">
					<p>{{ form.createdAt | dateformat('{y}-{m}-{d} {h}:{i}:{s}') }}</p>
				</el-form-item>
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
			typeList: ['菜单', '按钮', '', '放行', '数据'],
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
