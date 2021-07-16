<template>
	<div class="review-content">
		<div class="head">
			<span class="title">最新游戏模块</span>
			<div class="right-btn">
				<el-button plain @click="back">取消</el-button>
				<el-button type="success" @click="confirm(true)">保存</el-button>
			</div>
		</div>
		<div class="main-content">
			<div class="review-content">
				<el-form ref="form" :model="form" label-width="auto" :rules="rules">
					<el-row>
						<el-col :span="12">
							<el-form-item label="主标题信息:" prop="mainTitleInfo">
								<el-input
									v-model="form.mainTitleInfo"
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
									v-model="form.subTitleInfo"
									size="medium"
									maxlength="20"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="模块说明:" prop="moduleCaption">
								<el-input
									v-model="form.moduleCaption"
									size="medium"
									maxlength="20"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="游戏选择:" prop="gameId">
								<el-input
									v-model="form.gameId"
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
									v-model="form.moduleDesc"
                                    show-word-limit
                                    type="textarea"
									size="medium"
									maxlength="100"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider></el-divider>
					<div class="img-title">模块游戏截图</div>

					<el-form-item
						label="图片上传1"
						prop="image"
						style="display:inline-block"
					>
						<el-upload
							class="avatar-uploader"
							action="https://jsonplaceholder.typicode.com/posts/"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload"
						>
							<img
								v-if="form.pictureOne"
								:src="form.pictureOne"
								class="avatar"
							/>
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item
						label="图片上传2"
						prop="image"
						style="display:inline-block"
					>
						<el-upload
							class="avatar-uploader"
							action="https://jsonplaceholder.typicode.com/posts/"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload"
						>
							<img
								v-if="form.pictureTwo"
								:src="form.pictureTwo"
								class="avatar"
							/>
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item
						label="图片上传3"
						prop="image"
						style="display:inline-block"
					>
						<el-upload
							class="avatar-uploader"
							action="https://jsonplaceholder.typicode.com/posts/"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload"
						>
							<img
								v-if="form.pictureThree"
								:src="form.pictureThree"
								class="avatar"
							/>
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-divider></el-divider>
					<div class="img-title">模块游戏文本信息</div>
					<el-row>
						<el-col :span="24">
							<el-form-item label="正文标题:" prop="gameName">
								<el-input
									v-model="form.bodyTitle"
									size="medium"
									maxlength="20"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="内容信息:" prop="gameName">
								<el-input
									v-model="form.contentInfor"
									clearable
									type="textarea"
									show-word-limit
									:maxlength="50"
									:autosize="{ minRows: 4, maxRows: 4 }"
									style="width: 90%"
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
	props: {
		gameDetails: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			loading: false,
			form: {
				mainTitleInfo: undefined,
				subTitleInfo: undefined,
                moduleCaption: undefined,
                gameId: undefined,
				moduleDesc: undefined,
				pictureOne: '',
				pictureTwo: '',
				pictureThree: '',
				bodyTitle: '',
				contentInfor: ''
			},
			editData: undefined,
			imageUrl: ''
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
                moduleCaption: [
					{
						required: true,
						message: '请输入模块说明',
						trigger: 'blur'
					},
                    {
                        min: 2,
                        max: 100,
                        message: '长度在 2 到 100 个字符',
                        trigger: 'blur'
                    }
				],
                gameId: [
					{
						required: true,
						message: '请选择游戏',
						trigger: 'change'
					}
				],
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
	},
	watch: {
		editFormData(val) {
			this.editData = { ...val }
		}
	},
	created() {},
	mounted() {
		this.getGameDetails()
	},
	methods: {
		back() {
			this.$emit('back')
		},
		confirm(action) {
			this.remark = ''
			this.action = action
			this.visible = true
		},
		getGameDetails() {
			this.loading = true
			this.$api
				.gameLatestModuleDetailAPI()
				.then((res) => {
					this.loading = false
					console.log('最新游戏', res)
					const { code, data } = res
					if (code === 200) {
						this.form = {...data}
					} else {
						// this.editData = undefined
					}
				})
				.catch(() => (this.loading = false))

			setTimeout(() => {
				this.loading = false
			}, 1500)
		},
		beforeAvatarUpload() {
			// const isPNG = file.type === 'image/png'
			// if (!isPNG) {
			// 	this.$message.error(this.$t('new_2771'))
			// }
			// const isSize = new Promise(function(resolve, reject) {
			// 	const _URL = window.URL || window.webkitURL
			// 	const image = new Image()
			// 	// image.src = file.url
			// 	image.onload = () => {
			// 		const valid = image.width === 240 && image.height === 72
			// 		valid ? resolve() : reject()
			// 	}
			// 	image.src = _URL.createObjectURL(file)
			// }).then(
			// 	() => {
			// 		return file
			// 	},
			// 	() => {
			// 		this.$message({
			// 			message: this.$t('new_2771'),
			// 			type: 'error'
			// 		})
			// 		return Promise.reject()
			// 	}
			// )
			// this.dataList = {
			// 	textType: 4,
			// 	agentId: row.agentId.split('_')[1]
			// }
			// return isPNG && isSize
		},
		handleAvatarSuccess() {
			// if (response.code !== 200) {
			// 	this.$message({
			// 		message: this.$i18n.t(`backstage_${response.code}`),
			// 		type: 'error'
			// 	})
			// } else {
			// 	row.blogo = response.data
			// 	this.$message({
			// 		message: this.$t(`new_1111`),
			// 		type: 'success'
			// 	})
			// }
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
