<template>
	<el-upload
		class="avatar-uploader"
		action="#"
		:show-file-list="false"
		:auto-upload="false"
		accept="image/*"
		:on-success="
			(response, file, fileList) =>
				handleAvatarSuccess(response, file, fileList, image)
		"
		:before-upload="(file) => beforeAvatarUpload(file, image)"
		:on-change="handleChange"
	>
		<img v-if="image" :src="image" class="avatar" />
		<i v-else class="el-icon-plus avatar-uploader-icon"></i>
	</el-upload>
</template>

<script>
export default {
	name: 'Upload',
	components: {},
	props: {
		nowImage: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			curFile: null, // 当前上传的文件,
			image: ''
		}
	},
	computed: {},
	watch: {},
	mounted() {
		this.image = this.nowImage
	},
	methods: {
		handleChange(file) {
			this.curFile = file.raw
			this.handleAvatarSuccess()
		},
		uploadFile() {
			const formData = new FormData()
			formData.append('file', this.curFile)
			this.$api
				.imageUpload(formData)
				.then((response) => {
					this.$message({
						message: '上传成功!',
						type: 'success'
					})
					this.image = response.data
					this.$emit('uploadSuccess', response.data)
				})
				.catch(() => {
					this.handleAvatarDefeat()
				})
		},
		handleAvatarDefeat() {
			this.curFile = ''
		},
		beforeAvatarUpload(file, row) {
			// const isPNG = file.type === 'image/png'
			// if (!isPNG) {
			// 	this.$message.error('您选择的图片不符合要求，请重新选择！')
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
			// 			message: '您选择的图片不符合要求，请重新选择！',
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
			return true
		},
		handleAvatarSuccess() {
			this.uploadFile()
		}
	}
}
</script>

<style lang="scss" scoped></style>
