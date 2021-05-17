<template>
	<div class="review-content">
		<div class="head">
			<span class="title">{{ editType === 'edit' ? '编辑' : '创建' }}</span>
			<div class="right-btn">
				<el-button plain @click="goBack">取消</el-button>
				<el-button type="success" @click="confirm()">保存</el-button>
			</div>
		</div>
		<div class="main-content">
			<div class="review-content">
				<el-form ref="form" :model="form" label-width="auto" :rules="rules">
					<el-row>
						<el-col :span="12">
							<el-form-item label="游戏名称:" prop="gameName">
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
							<el-form-item label="图标状态:">
								<el-select
									v-model="form.gameIcon"
									size="medium"
									placeholder="全部"
									clearable
									style="width: 365px"
								>
									<el-option
										v-for="item in gameIconType"
										:key="item.code"
										:label="item.description"
										:value="item.code"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="支持终端:" prop="supportTerminal">
								<el-select
									v-model="supportTerminal"
									size="medium"
									placeholder="全部"
									multiple
									clearable
									style="width: 365px"
								>
									<el-option
										v-for="item in terminalnType"
										:key="item.code"
										:label="item.description"
										:value="item.code"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="备注信息:">
								<el-input
									v-model="form.remark"
									size="medium"
									maxlength="50"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="接入参数:" prop="accessInfo">
								<el-input
									v-model="form.accessInfo"
									size="medium"
									maxlength="100"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="游戏描述:">
								<el-input
									v-model="form.description"
									size="medium"
									maxlength="100"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="关联推荐游戏:" prop="relationOtherGameId">
								<el-select
									v-model="relationOtherGameId"
									size="medium"
									placeholder="全部"
									multiple
									clearable
									style="width: 365px"
								>
									<el-option
										v-for="item in gameModuleNameList"
										:key="item.moduleId"
										:label="item.moduleName"
										:value="item.moduleId"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="关联游戏模块:" prop="relationGameModuleName">
								<el-select
									v-model="relationGameModuleName"
									size="medium"
									placeholder="全部"
									multiple
									clearable
									style="width: 365px"
								>
									<el-option
										v-for="item in gameModuleNameList"
										:key="item.moduleId"
										:label="item.moduleName"
										:value="item.moduleId"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="游戏返奖率:">
								<el-input
									v-model="form.gameRebateRate"
									size="medium"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="游戏平台:">
								<el-select
									v-model="form.gamePlatform"
									size="medium"
									placeholder="全部"
									clearable
									style="width: 365px"
								>
									<el-option
										v-for="item in gamePlantList"
										:key="item.gameCode"
										:label="item.gameName"
										:value="item.gameCode"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="1级标签:">
								<el-select
									v-model="form.gameLabelParam1"
									size="medium"
									placeholder="全部"
									clearable
									style="width: 365px"
								>
									<el-option
										v-for="item in labelList"
										:key="item.gameLabelId"
										:label="item.gameLabelName"
										:value="item.gameLabelId"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="2级标签:">
								<el-select
									v-model="form.gameLabelParam2"
									size="medium"
									placeholder="全部"
									clearable
									style="width: 365px"
								>
									<el-option
										v-for="item in labelList"
										:key="item.gameLabelId"
										:label="item.gameLabelName"
										:value="item.gameLabelId"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="3级标签:">
								<el-select
									v-model="form.gameLabelParam3"
									size="medium"
									placeholder="全部"
									clearable
									style="width: 365px"
								>
									<el-option
										v-for="item in labelList"
										:key="item.gameLabelId"
										:label="item.gameLabelName"
										:value="item.gameLabelId"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-divider></el-divider>
					<span class="img-title">客户端图片上传</span>
					<el-form-item label="图片上传">
						<!-- :upload-file-type="'image/jpeg'"
							:bounds="imageSize" -->
						<upload
							ref="imgUpload"
							:img-urls="form.imageAddress"
							@upoladItemSucess="handleUploadSucess"
							@startUpoladItem="handleStartUpload"
							@deleteUpoladItem="handleDeleteUpload"
							@upoladItemDefeat="handleUploadDefeat"
						></upload>
						<p v-if="imgTip" class="imgTip">
							请上传图片！图片格式仅支持png,图片尺寸： ？？ 图片大小不超过？？
						</p>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'
import Upload from '@/components/UploadBox'
export default {
	name: routerNames.gameManagementEdit,
	components: { Upload },
	mixins: [list],
	props: {
		rowData: {
			type: Object,
			default: () => {}
		},
		editType: {
			type: String,
			default: 'add'
		},
		labelList: {
			type: Array,
			default: () => []
		},
		gameModuleNameList: {
			type: Array,
			default: () => []
		},
		gamePlantList: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			form: {
				id: '',
				gameIcon: '',
				gamePlatform: '',
				gameName: '',
				imageAddress: '',
				gameLabelParam1: '',
				gameLabelParam2: '',
				gameLabelParam3: '',
				accessInfo: '',
				description: '',
				remark: ''
			},
			supportTerminal: [],
			relationOtherGameId: [],
			relationGameModuleName: []
		}
	},
	computed: {
		imgTip() {
			return this.form.imageAddress ? '' : '请上传图片！'
		},
		imageSize() {
			return {
				width: 1920,
				height: 400
			}
		},
		gameIconType() {
			return this.globalDics.gameIconType
		},
		terminalnType() {
			return this.globalDics.terminalnType
		},
		rules() {
			return {
				supportTerminal: [
					{
						required: true,
						message: '请选择支持终端',
						trigger: 'blur',
						type: 'array'
					}
				],
				accessInfo: [
					{ required: true, message: '请输入接入参数', trigger: 'blur' }
				],
				relationOtherGameId: [
					{
						required: true,
						message: '请输入关联推荐游戏',
						trigger: 'blur',
						type: 'array'
					}
				],
				relationGameModuleName: [
					{
						required: true,
						message: '请输入关联游戏模块',
						trigger: 'blur',
						type: 'array'
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
		rowData: {
			handler(val) {
				this.form = val
			},
			immediate: true,
			deep: true
		}
	},
	created() {},
	mounted() {},
	methods: {
		confirm() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					const loading = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					})
					const params = {
						...this.form,
						supportTerminal: this.supportTerminal.join(','),
						relationOtherGameId: this.relationOtherGameId.join(','),
						relationGameModuleName: this.relationGameModuleName.join(',')
					}
					const url = this.editType === 'add' ? 'addGame' : 'editGame'
					this.$api[url](params)
						.then((res) => {
							loading.close()
							if (res.code === 200) {
								this.$message({
									type: 'success',
									message: '操作成功!'
								})
								this.goBack()
							} else {
								this.$message({
									message: res.msg,
									type: 'error'
								})
							}
						})
						.catch(() => {
							loading.close()
						})
				}
			})
		},
		handleStartUpload() {
			this.$message.info('图片开始上传')
		},
		handleUploadSucess({ index, file, id }) {
			this.form.imageAddress = file.imgUrl
		},
		handleUploadDefeat() {
			this.form.imageAddress = ''
			this.$message.error('图片上传失败')
		},
		handleDeleteUpload() {
			this.form.imageAddress = ''
			this.$message.warning('图片已被移除')
		},
		goBack() {
			this.form = {
				id: '',
				gameIcon: '',
				gamePlatform: '',
				gameName: '',
				imageAddress: '',
				gameLabelParam1: '',
				gameLabelParam2: '',
				gameLabelParam3: '',
				accessInfo: '',
				description: '',
				remark: ''
			}
			this.supportTerminal = []
			this.relationOtherGameId = []
			this.relationGameModuleName = []
			this.$emit('closeEdit')
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
		color: rgba(0, 0, 0, 0.847058823529412);
	}
}
</style>
