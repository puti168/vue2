<template>
	<el-form
		ref="editData"
		:model="editData"
		label-width="80px"
		:rules="editDataRules"
	>
		<el-form-item label="银行卡号">
			<el-input
				v-model="editData.cardNo"
				clearable
				size="medium"
				style="width: 280px"
				placeholder="请输入银行卡号"
				:disabled="loading"
			></el-input>
		</el-form-item>
		<el-form-item label="创建人">
			<el-input
				v-model="editData.createBy"
				clearable
				size="medium"
				style="width: 280px"
				placeholder="请输入创建人"
				:disabled="loading"
			></el-input>
		</el-form-item>
		<el-form-item label="更新人">
			<el-input
				v-model="editData.modifyBy"
				clearable
				size="medium"
				style="width: 280px"
				placeholder="请输入更新人"
				:disabled="loading"
			></el-input>
		</el-form-item>
		<el-form-item label="备注">
			<el-input
				v-model="editData.remark"
				clearable
				size="medium"
				style="width: 280px"
				placeholder="请输入备注"
				:disabled="loading"
			></el-input>
		</el-form-item>
		<el-form-item label="更新时间">
			<el-date-picker
				v-model="formTime.time"
				size="medium"
				format="yyyy-MM-dd HH:mm:ss"
				type="datetime"
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
	mixins: [],
	props: {
		editFormData: { type: Object, default: () => ({}) },
		type: {
			type: String,
			default: '新增'
		}
	},
	data() {
		return {
			editData: {},
			formTime: {
				time: []
			}
		}
	},
	computed: {
		editDataRules() {
			return {
				cardNo: [
					{
						required: true,
						trigger: 'blur',
						message: '请输入银行卡号'
					}
				]
			}
		}
	},
	watch: {
		editFormData(val) {
			this.editData = { ...val }
		}
	},
	created() {},
	mounted() {},
	methods: {
		submit() {
			this.$refs.editData.validate((valid) => {
				if (valid) {
					const loading = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					})
					if (this.type === '新增') {
						const loading = this.$loading({
							lock: true,
							text: 'Loading',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)'
						})
						this.$api
							.addBlackList(this.editData)
							.then(() => {
								this.$message({
									type: 'success',
									message: '新增成功!'
								})
								this.$emit('refresh')
								loading.close()
							})
							.catch(() => {
								loading.close()
							})
					} else {
						this.$api
							.editBlackList(this.editData)
							.then(() => {
								this.$message({
									type: 'success',
									message: '新增成功!'
								})
								this.$emit('refresh')
								loading.close()
							})
							.catch(() => {
								loading.close()
							})
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped></style>
