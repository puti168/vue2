<template>
	<div class="mix-container">
		<div class="head">
			<span class="title">{{ gameDetails.moduleName }}模块</span>
			<div class="right-btn">
				<el-button plain @click="back">取消</el-button>
				<el-button type="success" @click="confirm(true)">保存</el-button>
			</div>
		</div>
		<div class="main-content">
			<div class="review-content">
				<el-form ref="form" :model="formData" label-width="auto" :rules="rules">
					<el-row>
						<el-col :span="12">
							<el-form-item label="主标题信息:" prop="mainTitleInfo">
								<el-input
									v-model="formData.mainTitleInfo"
									size="medium"
									maxlength="10"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="副标题信息:" prop="subTitleInfo">
								<el-input
									v-model="formData.subTitleInfo"
									size="medium"
									maxlength="10"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="模块描述:">
								<el-input
									v-model="formData.moduleDesc"
									type="textarea"
									size="medium"
									maxlength="100"
									clearable
									show-word-limit
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
export default {
	mixins: [list],
	props: { gameDetails: { type: Object, default: () => {} } },
	data() {
		return {
			formData: {
				mainTitleInfo: undefined,
				subTitleInfo: undefined,
				scrollingNum: undefined,
				allGameNum: undefined,
				moduleDesc: undefined
			}
		}
	},
	computed: {
		moduleId() {
			return this.gameDetails.id
		},
		rules() {
			return {
				mainTitleInfo: [
					{
						required: true,
						message: '请输入主标题信息',
						trigger: 'blur'
					},
					{
						min: 2,
						max: 10,
						message: '长度在 2 到 10 个字符',
						trigger: 'blur'
					}
				],
				subTitleInfo: [
					{
						required: true,
						message: '请输入副标题信息',
						trigger: 'blur'
					},
					{
						min: 2,
						max: 10,
						message: '长度在 2 到 10 个字符',
						trigger: 'blur'
					}
				],
				scrollingNum: [
					{
						required: true,
						message: '请输入数字',
						trigger: 'blur'
					}
				],
				allGameNum: [
					{
						required: true,
						message: '请输入数字',
						trigger: 'blur'
					}
				],
				moduleDesc: [
					{
						min: 2,
						max: 100,
						message: '长度在 2 到 100 个字符',
						trigger: 'blur'
					}
				]
			}
		}
	},
	watch: {
		gameDetails: {
			handler(newVal, oldVal) {
				console.log(66666, newVal)
				if (newVal) {
					this.formData = { ...newVal }
				} else {
					this.formData = {
						mainTitleInfo: undefined,
						subTitleInfo: undefined,
						moduleDesc: undefined
					}
				}
				console.log('formData', this.formData)
			},
			deep: true,
			immediate: true
		}
	},
	created() {},
	mounted() {},
	methods: {
		back() {
			this.$emit('back')
		},
		checkValue(e) {
			// const { value } = e.target
			// console.log(e.target.value)
			e.target.value = e.target.value.replace(/[^\d]/g, '')
		},
		confirm(action) {
			const { moduleId } = this.gameDetails
			const params = {
				...this.formData,
				moduleId
			}
			delete params.updatedAt
			delete params.updatedBy
			this.$api.gameHomeRecommendDetailsEditAPI(params).then((res) => {
				this.loading = false
				const { code, msg } = res
				if (code === 200) {
					this.$message({
						message: '保存成功',
						type: 'success'
					})
					this.$parent.back()
				} else {
					this.$message({
						message: msg,
						type: 'error'
					})
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.mix-container {
	width: 100%;
	margin: 30px auto;
	padding-left: 25px;
	padding-right: 25px;
	.head {
		height: 70px;
		line-height: 70px;
		width: 100%;
		background: #000;
		border-radius: 2px;
		padding: 0 30px;
		.title {
			font-weight: 600;
			color: rgb(192, 190, 190);
		}
		.right-btn {
			float: right;
		}
	}
	.main-content {
		.review-content {
			border: 1px solid rgba(192, 190, 190, 0.5);
			border-top: 0;
			padding: 30px;
			width: 100%;
			.name {
				font-weight: 600;
			}
			.review-flex {
				position: relative;
				width: 100%;
				margin-top: 10px;
				div {
					display: inline-block;
					width: 24%;
				}
			}
		}
		.more-height {
			height: 200px;
		}
	}
	.img-title {
		margin-top: 10px;
		font-size: 14px;
		font-weight: 600;
		margin-bottom: 10px;
		color: rgba(0, 0, 0, 0.847058823529412);
	}
	.avatar {
		width: 70px;
		height: 70px;
		display: inline-block;
		margin-left: 20px;
		margin-bottom: 20px;
	}
}
</style>
