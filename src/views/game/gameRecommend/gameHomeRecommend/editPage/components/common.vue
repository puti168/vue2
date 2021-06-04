<template>
	<div class="mix-container">
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
					<el-row>
						<el-col :span="12">
							<el-form-item label="主标题信息:" prop="mainTitleInfo">
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
							<el-form-item label="副标题信息:" prop="subTitleInfo">
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
							<el-form-item label="模块描述:" prop="description">
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
				description: undefined
			}
		}
	},
	computed: {
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
                description: [
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
            const { moduleId } = this.gameDetails
            const params = {
                ...this.formData,
                moduleId
            }
            this.$api.gameHomeRecommendDetailsEditAPI(params).then((res) => {
                const { code, data, msg } = res
                if (code === 200) {
                    this.loading = false
                    console.log('请求到值了', data)
                } else {
                    this.loading = false
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
