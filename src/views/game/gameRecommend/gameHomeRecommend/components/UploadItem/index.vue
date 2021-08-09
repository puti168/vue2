<template>
	<div :id="getRandomId()" class="upload-container">
		<el-upload
			class="avatar-uploader avatar-uploader-icon"
			:class="curSizeClass"
			action="#"
			:show-file-list="false"
			:auto-upload="false"
			:on-success="handleAvatarSuccess"
			:before-upload="beforeAvatarUpload"
			:on-progress="handleProgress"
			:on-change="handleChange"
		>
			<el-progress
				v-if="state === 'progress'"
				type="circle"
				:percentage="percent"
				class="common-align-center"
				:width="progressBarWidth"
			></el-progress>
			<div
				v-else-if="
					state === 'image' || state === 'image/gif' || state === 'image/jpeg'
				"
			>
				<img v-if="isImage" :src="fileUrl" class="avatar imgSize" alt />
				<video
					v-else
					:src="fileUrl"
					class="avatar imgSize"
					@click.stop="handleClick"
				/>
				<svg-icon
					icon-class="bb_icon_delete"
					class="delete-icon"
					@click.stop="handleDeleteImgUrl"
				/>
			</div>
			<svg-icon
				v-else
				icon-class="icon_addimgcam"
				class="common-align-center"
			/>
		</el-upload>
		<el-dialog v-if="isImage" :visible.sync="dialogVisible" size="tiny">
			<img width="100%" :src="dialogUrl" alt />
		</el-dialog>
		<Video
			v-else
			:src="dialogUrl"
			:value="dialogVisible"
			@input="handleClose"
		/>
	</div>
</template>

<script>
import Video from '@/components/Video'
const FileTypeConst = {
	ImageJpeg: 'image/jpeg',
	ImagePng: 'image/png',
	ImageGif: 'image/gif',
	VideoMp4: 'video/mp4',
	VideoAvi: 'video/avi',
	VideoWmv: 'video/wmv'
}
const UploadFileTypeConst = {
	Image: 'image',
	Video: 'video',
	Audio: 'audio',
	jpeg: 'image/jpeg',
	png: 'image/png',
	Gif: 'image/gif',
	All: 'all'
}
const UploadStateConst = {
	showAdd: 'add',
	showProgress: 'progress',
	showImage: 'image'
}
export default {
	name: 'UploadItem',
	components: {
		Video
	},
	props: {
		size: {
			type: String,
			default: 'medium'
		},
		uploadFileType: {
			type: String,
			default: UploadFileTypeConst.Image
		},
		// platform: {
		// 	type: String,
		// 	default: () => true
		// },
		boundflag: {
			type: Boolean,
			default: false
		},
		bounds: {
			type: Object,
			default: function() {
				return {
					width: 0,
					height: 0
				}
			}
		},
		fileSize: {
			type: [Number, String],
			default: 10
		}
	},
	data() {
		return {
			dialogUrl: '',
			dialogVisible: false,
			curFile: null, // 当前上传的文件
			fileUrl: '', // 当前上传的文件URl
			randomId: '',
			percent: 0,
			showProgress: false,
			state: UploadStateConst.showAdd,
			progressMargin: 15,
			curType: '', // 当前上传的文件类型
			isUploading: false
		}
	},
	computed: {
		curSizeClass() {
			let className = 'avatar-uploader-medium'
			switch (this.size) {
				case 'medium':
					className = 'avatar-uploader-medium'
					break
				case 'small':
					className = 'avatar-uploader-small'
					break
				case 'mini':
					className = 'avatar-uploader-mini'
					break
			}
			return className
		},
		progressBarWidth() {
			const width =
				this.size === 'medium' ? 178 : this.size === 'small' ? 140 : 100
			return width - this.progressMargin
		},
		isImage() {
			// if (
			// 	this.uploadFileType === UploadFileTypeConst.Image ||
			// 	this.uploadFileType === UploadFileTypeConst.Gif ||
			// 	this.uploadFileType === UploadFileTypeConst.png ||
			// 	this.uploadFileType === UploadFileTypeConst.jpeg
			// ) {
			// 	return true
			// } else {
			// 	return (
			// 		this.curType === FileTypeConst.ImageJpeg ||
			// 		this.curType === FileTypeConst.ImagePng
			// 	)
			// }

			return true
		}
	},
	watch: {
		showProgress(newValue, oldValue) {
			if (newValue) {
				this.state = UploadStateConst.showProgress
			} else if (this.fileUrl) {
				this.state = UploadStateConst.showImage
			} else {
				this.state = UploadStateConst.showAdd
			}
		},
		state(value) {}
	},
	mounted() {
		console.log(this.boundflag, 'boundflag')
	},
	methods: {
		getRandomId() {
			this.randomId = 'id' + new Date().getTime()
			return this.randomId
		},
		beforeAvatarUpload(file, successCB) {
			const isRight = this.checkFileType(file.type)
			const isLtSize = this.checkFileSize(file)
			if (
				!isRight ||
				!isLtSize ||
				(this.uploadFileType === 'image/gif' &&
					this.uploadFileType !== file.type)
			) {
				this.$message.error('格式错误，上传失败!')
				return
			}
			if (
				this.uploadFileType === UploadFileTypeConst.Image ||
				file.type === FileTypeConst.ImageJpeg ||
				file.type === FileTypeConst.ImagePng ||
				file.type === FileTypeConst.ImageGif
			) {
				this.checkImageBounds(successCB)
			} else {
				successCB()
			}
		},
		handleAvatarSuccess(url) {
			this.isUploading = false
			console.log('this.curFile', url)
			this.curFile.imgUrl = url
			this.showProgress = false
			this.curType = this.curFile.type
			this.fileUrl = url // URL.createObjectURL(this.curFile)
			const index = this.getIndex()
			this.$emit('upoladItemSucess', {
				index: index,
				file: this.curFile,
				id: this.randomId
			})
		},
		handleAvatarDefeat() {
			this.curFile = ''
			this.isUploading = false
			this.showProgress = false
			const index = this.getIndex()
			this.$emit('upoladItemDefeat', {
				index: index,
				file: this.curFile,
				id: this.randomId
			})
		},
		handleChange(file) {
			console.log('触发了change事件')
			this.curFile = file.raw
			this.uploadFile()
		},
		handleProgress(progress) {
			if (!this.showProgress) {
				this.showProgress = true
			}
			this.percent = progress
		},
		handleDeleteImgUrl() {
			this.fileUrl = ''
			this.state = UploadStateConst.showAdd
			this.$emit('deleteUpoladItem', {
				index: this.getIndex(),
				file: this.curFile,
				id: this.randomId
			})
		},
		handleClick(e) {
			this.curType = this.curFile.type
			this.dialogUrl = this.curFile.imgUrl
			this.dialogVisible = true
		},
		handleClose() {
			this.dialogVisible = false
		},
		checkFileType(type) {
			switch (this.uploadFileType) {
				case UploadFileTypeConst.Gif:
					return true
				case UploadFileTypeConst.png:
					return type === FileTypeConst.ImagePng
				case UploadFileTypeConst.Image:
					return (
						type === FileTypeConst.ImageJpeg || type === FileTypeConst.ImagePng
					)
				case UploadFileTypeConst.jpeg:
					return type === FileTypeConst.ImageJpeg
				case UploadFileTypeConst.Video:
					return (
						type === FileTypeConst.VideoMp4 || type === FileTypeConst.VideoWmv
					)
				case UploadFileTypeConst.All:
					return (
						type === FileTypeConst.ImageJpeg ||
						type === FileTypeConst.ImagePng ||
						type === FileTypeConst.VideoMp4 ||
						type === FileTypeConst.VideoWmv
					)
			}
			return false
		},
		checkFileSize({ type, size }) {
			// console.log('this.fileSize :>> ', this.fileSize)
			// if (type.indexOf(UploadFileTypeConst.Image) > -1) {
			// 	return size / 1024 / 1024 < this.fileSize
			// } else if (type.indexOf(UploadFileTypeConst.Video) > -1) {
			// 	return size / 1024 / 1024 < 200
			// } else {
			// 	return false
			// }
			return true
		},
		checkImageBounds(successCB) {
			if (this.curFile) {
				const img = new Image()
				// const that = this
				console.log(this.boundflag, 'boundflag')
				if (this.boundflag) {
					img.onload = function() {
						// const width = img.width
						// const height = img.height
						// if (width > that.bounds.width || height > that.bounds.height) {
						// 	that.$message.error('图片尺寸不符合，请重新上传....')
						// } else {
						// 	successCB()
						// }
						successCB()
					}
					img.οnerrοr = function() {
						console.error('error!')
					}
					img.src = window.URL.createObjectURL(this.curFile.raw || this.curFile)
				} else {
					img.onload = function() {
						// const width = img.width
						// const height = img.height
						// if (width !== that.bounds.width || height !== that.bounds.height) {
						// 	that.$message.error('图片尺寸不符合，请重新上传....')
						// } else {
						// 	successCB()
						// }
						successCB()
					}
					img.οnerrοr = function() {
						console.error('error!')
					}
					img.src = window.URL.createObjectURL(this.curFile.raw || this.curFile)
				}
			}
		},
		clearFile() {
			this.curFile = ''
			this.isUploading = false
			this.fileUrl = ''
			this.curType = ''
			this.state = UploadStateConst.showAdd
		},
		setFile(file, type) {
			let url = ''
			if (typeof file === 'string') {
				url = file
			} else {
				url = file.imgUrl
			}

			this.curFile = {
				imgUrl: url,
				type: this.findFileType(url)
			}
			this.fileUrl = url
			this.state = UploadStateConst.showImage
		},
		findFileType(url) {
			if (url.endsWith('.png')) {
				this.curType = FileTypeConst.ImagePng
			} else if (url.endsWith('.jpg')) {
				this.curType = FileTypeConst.ImageJpeg
			} else if (url.endsWith('.mp4')) {
				this.curType = FileTypeConst.VideoMp4
			} else if (url.endsWith('.wmv')) {
				this.curType = FileTypeConst.VideoWmv
			}
			return this.curType
		},
		getIndex() {
			// 根据参数id取得该节点
			var obj = document.getElementById(this.randomId)
			// 获取该节点的父节点
			var p = obj.parentNode
			// 取得父节点下的所有节点
			var tags = p.children
			// 在父节点的所有子节点中查找自己所在的位置
			for (var i = 0, len = tags.length; i < len; i++) {
				// 找到节点，返回下标
				if (tags[i] === obj) {
					return i
				}
			}
			// 不在父节点中，返回-1
			return -1
		},
		uploadFile() {
			this.beforeAvatarUpload(this.curFile, () => {
				this.isUploading = true
				this.$emit('startUpoladItem', {
					index: this.getIndex(),
					file: this.curFile,
					id: this.randomId
				})
				const formData = new FormData()
				formData.append('file', this.curFile)
				// const activiType =
				// 	this.platform === 'PC' || this.platform === 'MB'
				// 		? 'ACTIVITY'
				// 		: this.platform
				// formData.append('activiType', activiType)
				this.$api
					.imageUploadAPI(formData, this.handleProgress)
					.then((res) => {
						const { code, data } = res || {}
						if (this.isUploading && code && code === 200) {
							this.$message({
								message: '上传成功!',
								type: 'success'
							})
							data ? this.handleAvatarSuccess(data) : this.handleAvatarSuccess()
						} else {
							this.handleAvatarDefeat()
						}
					})
					.catch(() => {
						this.handleAvatarDefeat()
					})
			})
		}
	}
}
</script>

<style lang="scss" scoped>
$medium-size: 178px;
$small-size: 140px;
$mini-size: 100px;
.avatar-uploader /deep/ .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100%;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	text-align: center;
}
// todo 这里可以简写 有时间记得改一下
.avatar-uploader-medium {
	width: $medium-size;
	height: $medium-size;
	.imgSize {
		width: $medium-size;
		height: $medium-size;
	}
}
.avatar-uploader-small {
	width: $small-size;
	height: $small-size;
	.imgSize {
		width: $small-size;
		height: $small-size;
	}
}
.avatar-uploader-mini {
	width: $mini-size;
	height: $mini-size;
	.imgSize {
		width: $mini-size;
		height: $mini-size;
	}
}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
.common-align-center {
	position: absolute !important;
	transform: translate(-50%, -50%);
	left: 50%;
	top: 50%;
}
.delete-icon {
	position: absolute;
	right: 0;
	top: 0px;
}
.el-progress-circle {
	width: 100px !important;
	height: 100px;
}
</style>
