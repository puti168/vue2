<template>
  <div class="review-content">
			<div class="head">
				<span class="title">最新游戏模块</span>
				<div class="right-btn">
					<el-button plain @click="goBack">取消</el-button>
					<el-button type="success" @click="confirm(true)">保存</el-button>
				</div>
			</div>
			<div class="main-content">
				<div class="review-content">
					<el-form ref="form" :model="form" label-width="auto" :rules="rules">
						<el-row>
							<el-col :span="12">
								<el-form-item label="主标题信息:" prop="gameName">
									<el-input
										v-model="form.gameName"
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
										v-model="form.gameName"
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
										v-model="form.gameName"
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
										v-model="form.gameName"
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
										v-model="form.gameName"
										size="medium"
										maxlength="20"
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
							<!-- <el-upload
								:action="uploadUrl"
								:headers="{
									'X-Request-Sys': '0',
									'x-request-token': token
								}"
								:data="dataList"
								:show-file-list="false"
								accept="image/png"
								:on-success="
									(response, file, fileList) =>
										handleAvatarSuccess(response, file, fileList)
								"
								:before-upload="(file) => beforeAvatarUpload(file)"
							>
								<img v-if="imageUrl" :src="imageUrl" class="avatar" />
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload> -->
							<el-upload
								class="avatar-uploader"
								action="https://jsonplaceholder.typicode.com/posts/"
								:show-file-list="false"
								:on-success="handleAvatarSuccess"
								:before-upload="beforeAvatarUpload"
							>
								<img v-if="imageUrl" :src="imageUrl" class="avatar" />
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item
							label="图片上传2"
							prop="image"
							style="display:inline-block"
						>
							<!-- <el-upload
								:action="uploadUrl"
								:headers="{
									'X-Request-Sys': '0',
									'x-request-token': token
								}"
								:data="dataList"
								:show-file-list="false"
								accept="image/png"
								:on-success="
									(response, file, fileList) =>
										handleAvatarSuccess(response, file, fileList)
								"
								:before-upload="(file) => beforeAvatarUpload(file)"
							>
								<img v-if="imageUrl" :src="imageUrl" class="avatar" />
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload> -->
							<el-upload
								class="avatar-uploader"
								action="https://jsonplaceholder.typicode.com/posts/"
								:show-file-list="false"
								:on-success="handleAvatarSuccess"
								:before-upload="beforeAvatarUpload"
							>
								<img v-if="imageUrl" :src="imageUrl" class="avatar" />
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item
							label="图片上传3"
							prop="image"
							style="display:inline-block"
						>
							<!-- <el-upload
								:action="uploadUrl"
								:headers="{
									'X-Request-Sys': '0',
									'x-request-token': token
								}"
								:data="dataList"
								:show-file-list="false"
								accept="image/png"
								:on-success="
									(response, file, fileList) =>
										handleAvatarSuccess(response, file, fileList)
								"
								:before-upload="(file) => beforeAvatarUpload(file)"
							>
								<img v-if="imageUrl" :src="imageUrl" class="avatar" />
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload> -->
							<el-upload
								class="avatar-uploader"
								action="https://jsonplaceholder.typicode.com/posts/"
								:show-file-list="false"
								:on-success="handleAvatarSuccess"
								:before-upload="beforeAvatarUpload"
							>
								<img v-if="imageUrl" :src="imageUrl" class="avatar" />
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-divider></el-divider>
						<div class="img-title">模块游戏文本信息</div>
						<el-row>
							<el-col :span="24">
								<el-form-item label="正文标题:" prop="gameName">
									<el-input
										v-model="form.gameName"
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
										v-model="form.gameName"
										clearable
										type="textarea"
										:max="50"
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
  components: {},
  mixins: [list],
  props: { editFormData: { type: Object, default: () => ({}) } },
  data() {
    return {
      editData: {},
      form: {
				icon: '',
				gameName: ''
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
  },
  watch: {
    editFormData(val) {
      this.editData = { ...val }
    }
  },
  created() {},
  mounted() {},
  methods: {
    confirm(action) {
			this.remark = ''
			this.action = action
			this.visible = true
		},
    goBack() {
			this.$router.go(-1)
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
}</style>
