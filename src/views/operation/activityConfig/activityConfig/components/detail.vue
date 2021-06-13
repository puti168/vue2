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
									placeholder="请输入"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="活动页签:" class="tagheight" prop="supportTerminalList">
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
									placeholder="请输入"
									clearable
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="活动支持终端:" class="tagheight" prop="supportTerminalList2">
								<el-select
									v-model="form.supportTerminalList2"
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
							<el-form-item label="活动生效的账户类型:" class="tagheight" prop="supportTerminalList3">
								<el-select
									v-model="form.supportTerminalList3"
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
							<el-form-item label="活动时效:" prop="gameIcon">
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
							<el-form-item label="活动图上架时间:" prop="time1">
								<el-date-picker
									v-model="form.time1"
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
							<el-form-item label="活动图下架时间:" prop="time2">
								<el-date-picker
									v-model="form.time2"
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
							<el-form-item label="活动开始时间:" prop="time3">
								<el-date-picker
									v-model="form.time3"
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
							<el-form-item label="活动结束时间:" prop="time4">
								<el-date-picker
									v-model="form.time4"
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
							<el-form-item label="活动详情跳转地址:" prop="description">
								<el-input
									v-model="form.description"
									size="medium"
									:maxlength="2038"
									clearable
									placeholder="请输入"
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="分享链接:" prop="description2">
								<el-input
									v-model="form.description2"
									size="medium"
									:maxlength="2038"
									clearable
									placeholder="请输入"
									style="width: 365px"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="活动洗码倍率:" prop="gameRebateRate">
								<el-input-number
									v-model.number="form.gameRebateRate"
									size="medium"
									maxlength="4"
									clearable
									style="width: 365px"
									placeholder="请输入"
									:precision="2"
									autocomplete="off"
								></el-input-number>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="入口图片上传" prop="image">
								<Upload
									:nowImage="nowImage"
									:imageType="jpgpng"
									:size="2"
									@uploadSuccess="uploadSuccess()"
								></Upload>
								<p class="imgTip">
									请上传图片！图片格式仅支持png,jpg
									图片大小不超过2MB
								</p>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="分享图片上传" prop="image">
								<Upload
									:nowImage="nowImage2"
									:imageType="jpgpng"
									:size="2"
									@uploadSuccess="uploadSuccess2"
								></Upload>
								<p class="imgTip">
									请上传图片！图片格式仅支持png,jpg
									图片大小不超过2MB
								</p>
							</el-form-item>
						</el-col>
						<el-col :span="24">
						<el-divider></el-divider>
						</el-col>
						<el-col :span="12">
							<el-form-item label="场馆名称:" prop="gameIcon2">
								<el-select
									v-model="form.gameIcon2"
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
							<el-form-item label="充值金额大于等于:" prop="gameRebateRate2">
								<el-input-number
									v-model.number="form.gameRebateRate2"
									size="medium"
									maxlength="10"
									clearable
									style="width: 365px"
									placeholder="请输入"
									autocomplete="off"
								></el-input-number>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="优惠方式:" prop="gameIcon3">
								<el-select
									v-model="form.gameIcon3"
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
							<el-form-item label="优惠百分比:" prop="gameRebateRate3">
								<el-input-number
									v-model.number="form.gameRebateRate3"
									size="medium"
									clearable
									style="width: 365px"
									placeholder="请输入"
									:precision="2"
									autocomplete="off"
								></el-input-number>
							</el-form-item>
							<el-form-item label="赠送金额:" prop="gameRebateRate4">
									<el-input-number
									v-model.number="form.gameRebateRate4"
									size="medium"
									maxlength="10"
									clearable
									style="width: 365px"
									placeholder="请输入"
									autocomplete="off"
								></el-input-number>
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
				gameName: '',
				accessInfo: '',
				gameIcon: '',
				gameIcon2: '',
				gameIcon3: '',
				description: '',
				description2: '',
				gameRebateRate: '',
				gameRebateRate2: '',
				gameRebateRate3: '',
				gameRebateRate4: '',
				imageAddress: '',
				imageAddress2: '',
				time1: [start, end],
				time2: [start, end],
				time3: [start, end],
				time4: [start, end],
				supportTerminalList: [],
				supportTerminalList2: [],
				supportTerminalList3: []
			},
			datalist: {},
			nowImage: '',
			nowImage2: '',
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

				supportTerminal: [
					{
						required: true,
						message: '请选择活动页签',
						trigger: 'blur',
						type: 'array'
					}
				],
				supportTerminal2: [
					{
						required: true,
						message: '请选择活动支持终端',
						trigger: 'blur',
						type: 'array'
					}
				],
				supportTerminalList3: [
					{
						required: true,
						message: '请选择活动生效的账户类型',
						trigger: 'blur',
						type: 'array'
					}
				],
				gameIcon: [
					{
						required: true,
						message: '请选择活动时效',
						trigger: 'blur',
						type: 'array'
					}
				],
				gameIcon2: [
					{
						required: true,
						message: '请选择场馆名称',
						trigger: 'blur',
						type: 'array'
					}
				],
				gameIcon3: [
					{
						required: true,
						message: '请选择优惠方式',
						trigger: 'blur',
						type: 'array'
					}
				],

				accessInfo: [
					{ required: true, message: '请输入活动主标题', trigger: 'blur' }
				],
				gameName: [
					{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}
				],
				description: [
					{
						required: true,
						message: '请输入活动详情跳转地址',
						trigger: 'blur'
					}
				],
				description2: [
					{
						required: true,
						message: '请输入分享链接',
						trigger: 'blur'
					}
				],
				time1: [
					{
						required: true,
						message: '请输入活动图上架时间',
						trigger: 'blur'
					}
				],
				time2: [
					{
						required: true,
						message: '请输入活动图下架时间',
						trigger: 'blur'
					}
				],
				gameRebateRate: [
					{
						required: false,
						type: 'number',
						message: '请输入数字',
						trigger: ['blur']
					}
				],
				gameRebateRate2: [
					{
						required: false,
						type: 'number',
						message: '请输入数字',
						trigger: ['blur']
					}
				],
				gameRebateRate3: [
					{
						required: false,
						type: 'number',
						message: '请输入数字',
						trigger: ['blur']
					}
				],
				gameRebateRate4: [
					{
						required: false,
						type: 'number',
						message: '请输入数字',
						trigger: ['blur']
					}
				],
				image: [
					{
						required: true,
						validator: valiIMG,
						message: '请选择图片上传',
						trigger: ['blur', 'change']
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
		uploadSuccess2(data) {
			this.$set(this.form, 'imageAddress2', data)
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
