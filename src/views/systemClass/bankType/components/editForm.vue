<template>
	<el-form ref="form" :model="editFormData" label-width="80px">
		<el-form-item label="银行卡号">
			<el-input
				v-model="editFormData.bankCode"
				clearable
				size="medium"
				style="width: 280px"
				placeholder="请输入银行卡号"
			></el-input>
		</el-form-item>
		<el-form-item label="银行名称">
			<el-input
				v-model="editFormData.bankName"
				clearable
				size="medium"
				style="width: 280px"
				placeholder="请输入银行名称"
			></el-input>
		</el-form-item>
		<el-form-item label="时间">
			<el-date-picker
				v-model="formTime.time"
				size="medium"
				format="yyyy-MM-dd HH:mm:ss"
				type="datetimerange"
				range-separator="-"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				align="right"
				value-format="yyyy-MM-dd HH:mm:ss"
				clearable
				style="width: 280px"
			></el-date-picker>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	components: {},
	props: { editFormData: { type: Object, default: () => ({}) } },
	data() {
		return {
			queryData: {},
			formTime: {
				time: []
			}
		}
	},
	computed: {},
	watch: {
		editFormData(newQuestion, oldQuestion) {
			console.log('newQuestion:', newQuestion)
			this.queryData = newQuestion
		}
	},
	created() {},
	mounted() {},
	methods: {}
}
</script>

<style lang="scss" scoped></style>
