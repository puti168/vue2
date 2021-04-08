<template>
	<!-- 通用modal -->
	<el-dialog
		:visible.sync="visible"
		:title="title"
		width="36%"
		:close-on-click-modal="false"
		:before-close="handleCancle"
	>
		<el-row>
			<el-col :span="6" style="text-align: center">
				<svg-icon class="warning-icon" icon-class="warning" />
			</el-col>
			<el-col :span="18">
				<slot name="content"></slot>
			</el-col>
		</el-row>
		<span slot="footer" class="dialog-footer">
			<el-button @click="handleCancle">{{ $t('merchant.merchant_96') }}</el-button>
			<el-button type="primary" @click="handleSure">
				{{ $t('merchant.merchant_95') }}
			</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	name: 'Modal',
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ''
		}
	},
	data() {
		return {}
	},
	methods: {
		handleCancle() {
			this.$emit('update:visible', false)
		},
		handleSure() {
			this.$emit('handle')
		}
	}
}
</script>

<style lang="scss" scoped>
.warning-icon {
	font-size: 72px;
}
</style>
