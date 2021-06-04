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
									:maxlength="6"
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
									placeholder="请选择"
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
									v-model="form.supportTerminal"
									size="medium"
									placeholder="请选择"
									multiple
									clearable
									style="width: 300px"
								>
									<el-option
										v-for="item in betDeviceType"
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
									:maxlength="50"
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
									:maxlength="100"
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
									:maxlength="100"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="关联推荐游戏:" prop="relationOtherGameId">
								<el-select
									v-model="form.relationOtherGameId"
									size="medium"
									placeholder="默认选择全部"
									multiple
									clearable
									style="width: 300px"
								>
									<el-option
										v-for="item in gameManageList"
										:key="item.gameId"
										:label="item.gameName"
										:value="change(item.gameId)"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="关联游戏模块:" prop="relationGameModuleId">
								<el-select
									v-model="form.relationGameModuleId"
									size="medium"
									placeholder="请选择"
									multiple
									clearable
									style="width: 300px"
								>
									<el-option
										v-for="item in gameModuleNameList"
										:key="item.moduleId"
										:label="item.moduleName"
										:value="change(item.moduleId)"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="游戏返奖率:" prop="gameRebateRate">
								<el-input-number
									v-model.number="form.gameRebateRate"
									size="medium"
									maxlength="5"
									clearable
									style="width: 365px"
									placeholder="支持小数点后1位，最大为99.9，最小为1"
									:precision="1"
									autocomplete="off"
								></el-input-number>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="游戏平台:" prop="gamePlatform">
								<el-select
									v-model="form.gamePlatform"
									size="medium"
									placeholder="请选择"
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
									v-model="gameLabelParam1"
									size="medium"
									placeholder="请选择"
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
									v-model="gameLabelParam2"
									size="medium"
									placeholder="请选择"
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
									v-model="gameLabelParam3"
									size="medium"
									placeholder="请选择"
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
					<el-form-item label="图片上传" prop="image">
						<Upload
							:nowImage="nowImage"
							@uploadSuccess="uploadSuccess"
						></Upload>
						<p class="imgTip">
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
import Upload from '@/components/Upload'
import { getToken } from '@/utils/auth'
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
		gameManageList: {
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
				supportTerminal: [],
				relationOtherGameId: [],
				relationGameModuleId: [],
				imageAddress: '',
				gameLabelParam1: {},
				gameLabelParam2: {},
				gameLabelParam3: {},
				accessInfo: '',
				description: '',
				remark: ''
			},
			datalist: {},
			nowImage: '',
			uploadUrl: process.env.VUE_APP_BASE_API + '/gameManager/imageUpload',
			gameLabelParam1: '',
			gameLabelParam2: '',
			gameLabelParam3: ''
		}
	},
	computed: {
		token() {
			return getToken()
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
		betDeviceType() {
			return this.globalDics.betDeviceType
		},
		rules() {
			const valiIMG = (rule, value, callback) => {
				// 图片验证
				callback()
			}
			return {
				gameRebateRate: [
					{
						required: false,
						min: 1,
						max: 99.9,
						type: 'number',
						message: '请输入1-99.9的数字',
						trigger: ['blur']
					}
				],
				supportTerminal: [
					{
						required: true,
						message: '请选择支持终端',
						trigger: 'blur',
						type: 'array'
					}
				],
				gamePlatform: [
					{
						required: true,
						message: '请选择游戏平台',
						trigger: 'blur'
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
				relationGameModuleId: [
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
						validator: valiIMG,
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
				let arr = {}
				arr = JSON.parse(JSON.stringify(val))
				if (arr.supportTerminal) {
					arr.supportTerminal = arr.supportTerminal.split(',')
					arr.relationOtherGameId = arr.relationOtherGameId.split(',')
					arr.relationGameModuleId = arr.relationGameModuleId.split(',')
					if (arr.label1) {
						this.gameLabelParam1 = arr.label1.gameLabelId
					}
					if (arr.label2) {
						this.gameLabelParam2 = arr.label2.gameLabelId
					}
					if (arr.label3) {
						this.gameLabelParam3 = arr.label3.gameLabelId
					}
					if (arr.gameIcon) {
						arr.gameIcon = arr.gameIcon + ''
					}
				}
				this.nowImage = arr.imageAddress
				if (!arr.gameRebateRate) {
					delete arr.gameRebateRate
				}
				this.form = JSON.parse(JSON.stringify(arr))
				console.log(this.form)
				console.log(arr)
			},
			immediate: true,
			deep: true
		}
	},
	created() {},
	mounted() {},
	methods: {
		uploadSuccess(data) {
			this.$set(this.form, 'imageAddress', data)
		},
		confirm() {
			if (this.form.relationOtherGameId.length !== 5) {
				this.$message({
					type: 'error',
					message: '关联推荐游戏只能选择5个!'
				})
				return
			}
			if (this.form.relationGameModuleId.length !== 2 && this.form.relationGameModuleId.length !== 1) {
				this.$message({
					type: 'error',
					message: '关联游戏模块只能选择1-2个!'
				})
				return
			}
			this.$refs.form.validate((valid) => {
				if (valid) {
					const loading = this.$loading({
						lock: true,
						text: 'Loading',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					})
					const relationGameModuleName = []
					this.gameModuleNameList.forEach((item) => {
						this.form.relationGameModuleId.forEach((data) => {
							if (item.moduleId === data) {
								relationGameModuleName.push(item.moduleName)
							}
						})
					})
					this.labelList.forEach((item) => {
						if (item.gameLabelId === this.gameLabelParam1) {
							this.form.label1 = {
								gameLabelId: item.gameLabelId,
								gameLabelName: item.gameLabelName,
								id: item.id
							}
						}
						if (item.gameLabelId === this.gameLabelParam2) {
							this.form.label2 = {
								gameLabelId: item.gameLabelId,
								gameLabelName: item.gameLabelName,
								id: item.id
							}
						}
						if (item.gameLabelId === this.gameLabelParam3) {
							this.form.label3 = {
								gameLabelId: item.gameLabelId,
								gameLabelName: item.gameLabelName,
								id: item.id
							}
						}
					})
					const params = {
						...this.form,
						supportTerminal: this.form.supportTerminal.join(','),
						relationOtherGameId: this.form.relationOtherGameId.join(','),
						relationGameModuleName: relationGameModuleName.join(','),
						relationGameModuleId: this.form.relationGameModuleId.join(',')
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
		change(value) {
			return value + ''
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
			this.relationGameModuleId = []
			this.$emit('closeEdit')
			this.$emit('refresh')
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
