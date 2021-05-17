<template>
	<div class="game-container report-container editPicturePage-container">
		<div class="editPicturePage-content">
			<div class="form-header">
				<span>创建/编辑</span>
				<span>
					<el-button type="info" @click="back">取消</el-button>
					<el-button type="success">保存</el-button>
				</span>
			</div>
			<div class="content-part2">
				<el-form
					ref="form"
					:model="queryData"
					:rules="rules"
					label-width="100px"
					class="picture-form"
				>
					<el-form-item label="图片名称:" prop="picName">
						<el-input
							v-model="queryData.picName"
							size="medium"
							maxlength="50"
							placeholder="请输入"
							clearable
							style="width: 365px"
						></el-input>
					</el-form-item>
					<el-form-item label="图片尺寸:" prop="picType">
						<el-select
							v-model="queryData.picType"
							size="medium"
							placeholder="全部"
							clearable
							style="width: 365px"
						>
							<el-option
								v-for="item in terminalTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="图片类型:" prop="picSize">
						<el-select
							v-model="queryData.picSize"
							size="medium"
							placeholder="全部"
							clearable
							style="width: 365px"
						>
							<el-option
								v-for="item in gameDisplayArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="排序:" prop="sort">
						<el-input
							v-model="queryData.sort"
							size="medium"
							placeholder="请输入"
							clearable
							oninput="value=value.replace(/[^\d]/g,'')"
							maxlength="12"
							style="width: 365px"
						></el-input>
					</el-form-item>
					<el-form-item label="图片上传" prop="imgUrl">
						<upload
							ref="imgUpload"
							:upload-file-type="'image/jpeg'"
							:platform="'PC'"
							:bounds="imageSize"
							:img-urls="queryData.imgUrl"
							@upoladItemSucess="handleUploadSucess"
							@startUpoladItem="handleStartUpload"
							@deleteUpoladItem="handleDeleteUpload"
							@upoladItemDefeat="handleUploadDefeat"
						></upload>
						<p v-if="imgTip" class="imgTip">
                            请上传图片！图片格式仅支持png,图片尺寸： ？？ 图片大小不超过？？
						</p>
					</el-form-item>
					<el-form-item label="审核信息:">
						<el-input
							v-model="queryData.applyInfo"
							size="medium"
							type="textarea"
							placeholder="请输入"
							clearable
							maxlength="50"
							style="width: 365px"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							icon="el-icon-search"
							:disabled="loading"
							size="medium"
							@click="add"
						>
							提交
						</el-button>
						<el-button
							icon="el-icon-refresh-left"
							:disabled="loading"
							size="medium"
							@click="reset"
						>
							重置
						</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { isHaveEmoji, notSpecial2 } from '@/utils/validate'
import Upload from '@/components/UploadBox'
// import Sortable from 'sortablejs'
// import Transfer from '@/components/transfer'

export default {
	name: 'EditPage',
	components: { Upload },
	mixins: [list],
	data() {
		return {
			loading: false,
			queryData: {
				picName: undefined,
				picType: undefined,
				picSize: undefined,
				sort: undefined,
				applyInfo: undefined,
                imgUrl: undefined
			},
			dataList: []
		}
	},
	computed: {
		terminalTypeArr() {
			return [...this.globalDics.terminalnType]
		},
		gameDisplayArr() {
			return [...this.globalDics.gameDisplayType]
		},
		imageSize() {
			return {
				width: 1920,
				height: 400
			}
		},
        imgTip() {
            return this.queryData.imgUrl ? '' : '请上传图片！'
        },
		rules() {
			const reg1 = /^[A-Za-z]{1}(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){1,})[0-9A-Za-z]{3,10}$/
			const reg2 = /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,12}/

			const testPicName = (rule, value, callback) => {
				const isSpecial = !notSpecial2(String(value))
				const isRmoji = isHaveEmoji(String(value))
				if (isSpecial) {
					callback(new Error('不支持空格及特殊字符'))
				} else if (isRmoji) {
					callback(new Error('不支持表情'))
				} else if (!reg1.test(value)) {
					callback(new Error('请填入图片标题'))
				} else {
					callback()
				}
			}

			const testPassword = (rule, value, callback) => {
				const isSpecial = !notSpecial2(String(value))
				const isRmoji = isHaveEmoji(String(value))
				if (isSpecial) {
					callback(new Error('不支持空格及特殊字符'))
				} else if (isRmoji) {
					callback(new Error('不支持表情'))
				} else if (!reg2.test(value)) {
					callback(new Error('请输入8-12位，字母+数字组合'))
				} else {
					callback()
				}
			}

			return {
				picType: [
					{ required: true, message: '请选择图片类型', trigger: 'change' }
				],
				picSize: [
					{ required: true, message: '请选择图片尺寸', trigger: 'change' }
				],
                imgUrl: [
                    { required: true, message: '请上传图片', trigger: 'change' }
                ],
				picName: [
					{
						required: true,
						validator: testPicName,
						trigger: 'blur'
					}
				],
				sort: [
					{
						required: true,
						message: '请输入排序',
						trigger: 'blur'
					}
				],
				password: [
					{
						required: true,
						validator: testPassword,
						trigger: 'blur'
					}
				]
			}
		}
	},
	mounted() {
		document.body.ondrop = function(event) {
			event.preventDefault()
			event.stopPropagation()
		}

		window.addEventListener('keydown', (e) => {
			if (e.keyCode === 16 && e.shiftKey) {
				this.shiftKey = true
			}
		})
		window.addEventListener('keyup', (e) => {
			this.shiftKey = false
		})
	},
	updated() {},
	methods: {
		back() {
			this.$emit('back')
		},
		add() {
			this.loading = true
			const params = {
				...this.form
			}
			this.$refs['form'].validate((valid) => {
				console.log('valid', valid)
				if (valid) {
					this.$api
						.addMemberAPI(params)
						.then((res) => {
							this.loading = false
							const { code, data, msg } = res
							if (code === 200) {
								this.$confirm(`会员${data}资料提交成功`, {
									confirmButtonText: '确定',
									type: 'success',
									showCancelButton: false
								})
								this.reset()
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
		reset() {
			this.$refs['form'].resetFields()
			this.form = {
				historyGameLimit: undefined,
				hotSearch: undefined
			}
		},
		checkValue(val) {},
		addRow() {
			const lastRow = this.dataList[this.dataList.length - 1]
			const new_row = lastRow.id + 1
			this.dataList.push({ id: new_row })
		},
		deleteRow(val) {
			this.$confirm('确定删除此游戏吗?', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					// const loading = this.$loading({
					// 	lock: true,
					// 	text: 'Loading',
					// 	spinner: 'el-icon-loading',
					// 	background: 'rgba(0, 0, 0, 0.7)'
					// })
					// this.$api
					// 	.setDeleteRole('', val.id)
					// 	.then((res) => {
					// 		loading.close()
					// 		this.$message({
					// 			type: 'success',
					// 			message: '删除成功!'
					// 		})
					// 		this.loadData()
					// 	})
					// 	.catch(() => {
					// 		loading.close()
					// 	})
				})
				.catch(() => {})
		},
		handleStartUpload() {
			this.$message.info('图片开始上传')
		},
		handleUploadSucess({ index, file, id }) {
			this.form.imgUrl = file.imgUrl
		},
		handleUploadDefeat() {
			this.form.imgUrl = ''
			this.$message.error('图片上传失败')
		},
		handleDeleteUpload() {
			this.form.imgUrl = ''
			this.$message.warning('图片已被移除')
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
	text-align: center;
	color: #909399;
	font-weight: 700;
}
/deep/ .el-button--info {
	background-color: #fff;
	color: rgba(0, 0, 0, 0.64);
}
/deep/ .el-button--info:hover {
	background-color: #eeeded;
}
.editPicturePage-container {
	background-color: #f5f5f5;
	margin: 0;
	min-height: calc(100vh - 105px);
	.editPicturePage-content {
		width: 50%;
		margin: 0 auto;
		background-color: #fff;
		position: relative;
		padding-bottom: 30px;
		.form-header {
			height: 55px;
			line-height: 55px;
			width: 100%;
			background-color: rgba(0, 0, 0, 1);
			span:nth-child(1) {
				position: absolute;
				left: 30px;
				top: 0;
				color: rgba(255, 255, 255, 0.847058823529412);
				font-size: 16px;
				font-weight: 700;
			}
			span:nth-child(2) {
				position: absolute;
				right: 30px;
				top: 0;
				color: #999;
				font-weight: 400;
				font-size: 14px;
			}
		}
		.form-header:after {
			content: '.';
			height: 0;
			display: table;
			clear: both;
		}
		.content-part2 {
			width: 100%;
			padding: 25px 35px 20px;
			position: relative;
			margin: 0 auto;
			.picture-form {
				position: relative;
				width: 600px;
				max-width: 100%;
				padding: 35px 35px 0;
				margin: 0 auto;
				overflow: hidden;
			}
		}
	}
}
</style>
