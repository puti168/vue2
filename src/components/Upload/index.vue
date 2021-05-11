<template>
	<div :id="getRandomId()" class="upload-container"></div>
</template>

<script>
import Sortable from 'sortablejs'
export default {
	name: 'Upload',
	components: {},
	props: {
		// 上传按钮的数量
		maxCount: {
			type: Number,
			default: 0
		},
		// 上传的文件 image/video
		uploadFileType: {
			type: String,
			default: 'image'
		},
		// 上传按钮的size
		size: {
			type: String,
			default: 'medium'
		},
		// 上传列表关联的数据
		fileList: {
			type: Array,
			default: function() {
				return []
			}
		},
		// 上传状态当前组件维护了一套上传列表
		isUpload: {
			type: Boolean,
			default: false
		},
		// 上传的平台
		platform: {
			type: String,
			required: true
		},
		bounds: {
			type: Object,
			default: function() {
				return {
					width: 0,
					height: 0
				}
			}
		}
	},
	data() {
		return {
			randomId: '',
			uploadList: []
		}
	},
	watch: {
		fileList: {
			handler(newList) {
				this.setFileList(newList)
			},
			deep: true
		}
	},
	mounted() {
		// 添加拖动
		this.createSortable(this.randomId)
		this.setFileList(this.fileList)
	},
	methods: {
		createSortable(elementId) {
			const that = this
			const element = document.getElementById(elementId)
			if (element) {
				new Sortable(element, {
					onUpdate: function(event) {
						// 交换数据 为了维护数据在数组内的顺序
						const temp = that.fileList[event.newIndex]
						that.fileList[event.newIndex] = that.fileList[event.oldIndex]
						that.fileList[event.oldIndex] = temp
						console.log(that.fileList)
					},
					animation: 150
				})
			}
		},
		getFileList() {
			this.fileList = []
			for (let i = 0; i < this.maxCount; i++) {
				const item = this.$refs['uploadItem' + i]
				if (!item) {
					console.log('出问题了')
					return
				}
				this.fileList.push(item.getFile())
			}
			return this.fileList
		},
		setFileList(fileList) {
			if (!fileList) {
				return
			}
			const { length } = fileList
			this.fileList = fileList
			for (let i = 0; i < length; i++) {
				const item = this.$refs['uploadItem' + i][0]
				const curFile = fileList[i]
				if (curFile === null) {
					continue
				}
				if (!item) {
					console.log('出问题了')
					return
				}
				item.setFile(curFile, this.uploadFileType)
			}
		},
		clearFileList() {
			for (let i = 0; i < this.maxCount; i++) {
				const item = this.$refs['uploadItem' + i][0]
				if (!item) {
					console.log('出问题了')
					return
				}
				item.clearFile()
			}
		},
		getRandomId() {
			this.randomId = 'uploadList' + new Date().getTime()
			return this.randomId
		},
		handleStartUpload({ index, file, id }) {
			if (!this.uploadList[id]) {
				this.uploadList.push(id)
				this.$emit('update:isUpload', true)
			}
		},
		handleUploadSucess({ index, file, id }) {
			this.fileList[index] = file
			this.deleteItemFormUploadQueue(id)
		},
		handleUploadDefeat({ id }) {
			this.deleteItemFormUploadQueue(id)
		},
		handleDeleteUpload({ index, file, id }) {
			this.fileList[index] = null
			// this.fileList.splice(index, 1)
		},
		deleteItemFormUploadQueue(id) {
			const idIndex = this.uploadList.indexOf(id)
			this.uploadList.splice(idIndex, 1)
			if (this.uploadList.length <= 0) {
				this.$emit('update:isUpload', false)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.upload-container {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
}
</style>
