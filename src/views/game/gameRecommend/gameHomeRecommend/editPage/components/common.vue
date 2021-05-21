<template>
	<div class="review-content">
		<div class="head">
			<span class="title">体育模块</span>
			<div class="right-btn">
				<el-button plain @click="back">取消</el-button>
				<el-button type="success" @click="confirm(true)">保存</el-button>
			</div>
		</div>
		<div class="main-content">
			<div class="review-content">
				<el-form ref="form" :model="formData" label-width="auto" :rules="rules">
					<el-form-item label="主标题信息:" prop="gameName">
						<el-input
							v-model="formData.mainTitleInfo"
							size="medium"
							maxlength="20"
							clearable
							style="width: 365px"
						></el-input>
					</el-form-item>
					<el-row>
						<el-col :span="12">
							<el-form-item label="主标题信息:" prop="gameName">
								<el-input
									v-model="formData.mainTitleInfo"
									size="medium"
									maxlength="20"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="副标题信息:" prop="gameName">
								<el-input
									v-model="formData.subTitleInfo"
									size="medium"
									maxlength="20"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="滚屏数量限制:" prop="gameName">
								<el-input
									v-model="formData.scrollingNum"
									size="medium"
									maxlength="20"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="全部游戏数量:" prop="gameName">
								<el-input
									v-model="formData.gameName"
									size="medium"
									maxlength="20"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="模块描述:">
								<el-input
									v-model="formData.description"
									size="medium"
									maxlength="20"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<!-- 棋牌 -->
				<template v-if="true">
					<el-divider></el-divider>
					<div class="img-title">客户端图片上传</div>
					<img v-for="item in 40" :key="item" :src="imageUrl" class="avatar" />
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
export default {
	mixins: [list],
	props: { recommendDetails: { type: Object, default: () => {} } },
	data() {
		return {
			formData: {
				// mainTitleInfo: "",
				// subTitleInfo: "",
				// scrollingNum: 0,
				// description: "",
			},
			imageUrl: ''
		}
	},
	computed: {
		rules() {
			return {
				icon: [{ required: true, message: '请选择支持终端', trigger: 'blur' }],
				image: [
					{
						required: true,
						message: '请选择图片上传',
						trigger: ['blur', 'change']
					}
				],
				gameName: [
					{
						required: true,
						message: '请输入游戏名称',
						trigger: 'blur'
					}
				]
			}
		}
		// addGameDetails() {
		//   console.log(2222222, this.recommendDetails)
		//   this.formData = this.recommendDetails
		//   return this.recommendDetails
		// }
	},
	watch: {
		// addGameDetails: {
		//   handler(newV, old) {
		//     console.log(66666, newV)
		//     this.formData = { ...newV }
		//     console.log('formData', this.formData)
		//   },
		//   deep: true
		// }
	},
	created() {},
	mounted() {},
	methods: {
		back() {
			this.$emit('back')
		},
		confirm(action) {
			this.remark = ''
			this.action = action
			this.visible = true
		}
	}
}
</script>

<style lang="scss" scoped>
.review-content {
	width: 100%;
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
			border-top: 0px;
			padding: 30px;
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
