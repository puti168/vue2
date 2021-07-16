<template>
	<div class="review-content">
		<div class="head">
			<span class="title">最新游戏模块</span>
			<div class="right-btn">
				<el-button plain @click="back">取消</el-button>
				<el-button type="success" @click="save(true)">保存</el-button>
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
                                    placeholder="请输入2-10位字符"
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
                                    placeholder="请输入2-10位字符"
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="游戏选择:" prop="gameId">
								<el-select
									v-model="form.gameId"
									size="medium"
									placeholder="请选择"
									style="width: 365px"
									@change="changeType($event)"
								>
									<el-option
										v-for="item in gameAssortDicList"
										:key="item.id"
										:label="item.assortName"
										:value="item.id"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="模块说明:" prop="moduleCaption">
								<el-input
									v-model="form.moduleCaption"
									size="medium"
									show-word-limit
                                    placeholder="请输入2-100字符"
									type="textarea"
									maxlength="100"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="模块描述:">
								<el-input
									v-model="form.moduleDesc"
                                    placeholder="请输入2-100字符"
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
						label="图片上传1:"
						prop="pictureOne"
						style="display:inline-block"
					>
                        <UploadItem
                            ref="imgUpload1"
                            :upload-file-type="'image'"
                            :platform="'PC'"
                            :img-urls="form.pictureOne"
                            @upoladItemSucess="handleUploadSuccessOne"
                            @startUpoladItem="handleStartUploadOne"
                            @deleteUpoladItem="handleDeleteUploadOne"
                            @upoladItemDefeat="handleUploadDefeatOne"
                        ></UploadItem>
<!--                        <p>请上传图片！仅支持</p>-->
					</el-form-item>
					<el-form-item
						label="图片上传2:"
						prop="pictureTwo"
						style="display:inline-block"
					>
                        <UploadItem
                            ref="imgUpload2"
                            :upload-file-type="'image'"
                            :platform="'PC'"
                            :img-urls="form.pictureTwo"
                            @upoladItemSucess="handleUploadSuccess2"
                            @startUpoladItem="handleStartUpload2"
                            @deleteUpoladItem="handleDeleteUpload2"
                            @upoladItemDefeat="handleUploadDefeat2"
                        ></UploadItem>
<!--                        <p>请上传图片</p>-->
					</el-form-item>
					<el-form-item
						label="首页大图上传:"
						prop="pictureHome"
						style="display:inline-block"
					>
                        <UploadItem
                            ref="imgUpload3"
                            :upload-file-type="'image'"
                            :platform="'PC'"
                            :img-urls="form.pictureHome"
                            @upoladItemSucess="handleUploadSuccess3"
                            @startUpoladItem="handleStartUpload3"
                            @deleteUpoladItem="handleDeleteUpload3"
                            @upoladItemDefeat="handleUploadDefeat3"
                        ></UploadItem>
<!--                        <p>请上传图片</p>-->
					</el-form-item>
					<el-divider></el-divider>
					<div class="img-title">模块游戏文本信息</div>
					<el-row>
						<el-col :span="24">
							<el-form-item label="正文标题:" prop="bodyTitle">
								<el-input
									v-model="form.bodyTitle"
									size="medium"
									maxlength="100"
                                    type="textarea"
                                    show-word-limit
                                    placeholder="请输入2-100字符"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="内容信息:" prop="contentInfor">
								<el-input
									v-model="form.contentInfor"
									clearable
									type="textarea"
									show-word-limit
									:maxlength="300"
									:autosize="{ minRows: 4, maxRows: 4 }"
									style="width: 65%"
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
import UploadItem from '../../components/UploadItem'

export default {
    components: { UploadItem },
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
                pictureHome: undefined,
                pictureOne: undefined,
                pictureTwo: undefined,
                bodyTitle: undefined,
                contentInfor: undefined
			},
			gameAssortDicList: [],
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
                pictureOne: [
					{
						required: true,
						message: '请选择图片上传',
						trigger: ['blur', 'change']
					}
				],
                pictureTwo: [
                    {
                        required: true,
                        message: '请选择图片上传',
                        trigger: ['blur', 'change']
                    }
                ],
                pictureHome: [
                    {
                        required: true,
                        message: '请选择图片上传',
                        trigger: ['blur', 'change']
                    }
                ],
                bodyTitle: [
                    {
                        required: true,
                        message: '请输入正文标题',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 100,
                        message: '长度在 2 到 100 个字符',
                        trigger: 'blur'
                    }
                ],
                contentInfor: [
					{
						required: true,
						message: '请输入内容信息',
						trigger: 'blur'
					},
                    {
                        min: 2,
                        max: 300,
                        message: '长度在 2 到 300 个字符',
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
		this.gameAssortList()
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
        save(action) {
            this.loading = true
            const params = {
                ...this.form
            }
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.$api
                        .editGameLatestModuleAPI(params)
                        .then((res) => {
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
                        .catch(() => {
                            this.loading = false
                        })
                }
            })

            setTimeout(() => {
                this.loading = false
            }, 1000)
        },
		changeType(evt) {},
		gameAssortList() {
			this.$api.gameAssortDicAPI().then((res) => {
				const { code, data } = res
				if (code === 200) {
					this.gameAssortDicList = data || []
				}
			})
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
						this.form = { ...data }
					} else {
						// this.editData = undefined
					}
				})
				.catch(() => (this.loading = false))

			setTimeout(() => {
				this.loading = false
			}, 1500)
		},
        handleStartUploadOne() {
            this.$message.info('图片开始上传')
        },
        handleUploadSuccessOne(data) {
            this.form.pictureOne = data.file.imgUrl
        },
        handleUploadDefeatOne() {
            this.form.pictureOne = ''
            this.$message.error('图片上传失败')
        },
        handleDeleteUploadOne() {
            this.form.pictureOne = ''
        },
        handleStartUpload2() {
            this.$message.info('图片开始上传')
        },
        handleUploadSuccess2(data) {
            this.form.pictureTwo = data.file.imgUrl
        },
        handleUploadDefeat2() {
            this.form.pictureTwo = ''
            this.$message.error('图片上传失败')
        },
        handleDeleteUpload2() {
            this.form.pictureTwo = ''
        },
        handleStartUpload3() {
            this.$message.info('图片开始上传')
        },
        handleUploadSuccess3(data) {
            this.form.pictureHome = data.file.imgUrl
        },
        handleUploadDefeat3() {
            this.form.pictureHome = ''
            this.$message.error('图片上传失败')
        },
        handleDeleteUpload3() {
            this.form.pictureHome = ''
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
			border-top: 0;
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
