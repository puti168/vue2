<template>
	<div class="review-content">
		<div class="head">
			<span class="title">新增/编辑</span>
			<div class="right-btn">
				<el-button plain @click="goBack">返回</el-button>
				<el-button type="success" @click="confirm()">保存</el-button>
			</div>
		</div>
		<div class="main-content">
			<div class="review-content">
				<el-form ref="form" :model="form" label-width="auto" :rules="rules">
					<el-row>
						<el-col :span="12">
							<el-form-item label="活动名称:" prop="gameName">
								<el-input
									v-model="form.gameName"
									size="medium"
									:maxlength="20"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="活动页签:" class="tagheight">
								<el-select
									v-model="form.supportTerminalList"
									style="width: 300px"
									multiple
									placeholder="默认选择全部"
									:popper-append-to-body="false"
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
							<el-form-item label="活动主标题:" prop="accessInfo">
								<el-input
									v-model="form.accessInfo"
									size="medium"
									:maxlength="20"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="活动支持终端:" class="tagheight">
								<el-select
									v-model="form.supportTerminalList"
									style="width: 300px"
									multiple
									placeholder="默认选择全部"
									:popper-append-to-body="false"
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
							<el-form-item label="活动生效的账户类型:" class="tagheight">
								<el-select
									v-model="form.supportTerminalList"
									style="width: 300px"
									multiple
									placeholder="默认选择全部"
									:popper-append-to-body="false"
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
							<el-form-item label="活动时效:">
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
							<el-form-item label="活动图上架时间:">
								<el-date-picker
									v-model="time"
									size="medium"
									:picker-options="pickerOptions"
									format="yyyy-MM-dd HH:mm:ss"
									type="datetimerange"
									range-separator="-"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
									align="right"
									:default-time="defaultTime"
								></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="活动图下架时间:">
								<el-date-picker
									v-model="time"
									size="medium"
									:picker-options="pickerOptions"
									format="yyyy-MM-dd HH:mm:ss"
									type="datetimerange"
									range-separator="-"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
									align="right"
									:default-time="defaultTime"
								></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="活动开始时间:">
								<el-date-picker
									v-model="time"
									size="medium"
									:picker-options="pickerOptions"
									format="yyyy-MM-dd HH:mm:ss"
									type="datetimerange"
									range-separator="-"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
									align="right"
									:default-time="defaultTime"
								></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="活动结束时间:">
								<el-date-picker
									v-model="time"
									size="medium"
									:picker-options="pickerOptions"
									format="yyyy-MM-dd HH:mm:ss"
									type="datetimerange"
									range-separator="-"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
									align="right"
									:default-time="defaultTime"
								></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="活动详情跳转地址:">
								<el-input
									v-model="form.description"
									size="medium"
									:maxlength="2038"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="分享链接:">
								<el-input
									v-model="form.description"
									size="medium"
									:maxlength="2038"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="活动洗码倍率:">
								<el-input
									v-model="form.description"
									size="medium"
									:maxlength="4"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="入口图片上传" prop="image">
								<Upload
									:nowImage="nowImage"
									@uploadSuccess="uploadSuccess"
								></Upload>
								<p class="imgTip">
									请上传图片！图片格式仅支持png,图片尺寸： ？？
									图片大小不超过？？
								</p>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="分享图片上传" prop="image">
								<Upload
									:nowImage="nowImage"
									@uploadSuccess="uploadSuccess"
								></Upload>
								<p class="imgTip">
									请上传图片！图片格式仅支持png,图片尺寸： ？？
									图片大小不超过？？
								</p>
							</el-form-item>
						</el-col>
						<el-col :span="24">
						<el-divider></el-divider>
						</el-col>
						<el-col :span="12">
							<el-form-item label="场馆名称:">
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
							<el-form-item label="充值金额大于等于:" prop="accessInfo">
								<el-input
									v-model="form.accessInfo"
									size="medium"
									:maxlength="10"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="优惠方式:">
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
							<el-form-item label="优惠百分比:" prop="accessInfo">
								<el-input
									v-model="form.accessInfo"
									size="medium"
									:maxlength="10"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
							<el-form-item label="赠送金额:" prop="accessInfo">
								<el-input
									v-model="form.accessInfo"
									size="medium"
									:maxlength="10"
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
import { routerNames } from '@/utils/consts'
import dayjs from 'dayjs'
import Upload from '@/components/Upload'
import { getToken } from '@/utils/auth'
const end = dayjs()
	.endOf('day')
	.valueOf()
const start = dayjs()
	.startOf('day')
	.valueOf()
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
			time: [start, end],
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
			if (
				this.form.relationGameModuleId.length !== 2 &&
				this.form.relationGameModuleId.length !== 1
			) {
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
					this.form.label1 = {}
					this.form.label2 = {}
					this.form.label3 = {}
					this.labelList.forEach((item) => {
						if (item.gameLabelId === Number(this.gameLabelParam1)) {
							this.form.label1 = {
								gameLabelId: item.gameLabelId,
								gameLabelName: item.gameLabelName,
								id: item.id
							}
						}
						if (item.gameLabelId === Number(this.gameLabelParam2)) {
							this.form.label2 = {
								gameLabelId: item.gameLabelId,
								gameLabelName: item.gameLabelName,
								id: item.id
							}
						}
						if (item.gameLabelId === Number(this.gameLabelParam3)) {
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
