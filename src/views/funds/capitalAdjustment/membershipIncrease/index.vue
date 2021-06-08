<template>
	<div class="game-container report-container addAgent-container">
		<div class="line-member"></div>
		<div class="addAgent-content">
			<div class="form-header">
				<span>会员人工增加额度申请</span>
				<span>
					<code style="color:#FF3B30;">*</code>
					为必填项
				</span>
			</div>
			<el-form ref="form" :model="queryData" :rules="rules" label-width="120px">
				<el-form-item label="会员账号:" prop="userName">
					<el-input
						v-model="queryData.userName"
						size="medium"
						maxlength="11"
						oninput="value=value.replace(/[\u4E00-\u9FA5]/g ,'')"
						placeholder="请输入会员账号"
						clearable
						autocomplete="off"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="会员姓名:" prop="realName">
					<el-input
						v-model="queryData.realName"
						size="medium"
						maxlength="6"
						oninput="value=value.replace(/[\u4E00-\u9FA5]/g ,'')"
						placeholder="请输入会员姓名"
						clearable
						autocomplete="off"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="账户余额:" prop="balance">
					<el-input
						v-model="queryData.balance"
						size="medium"
						maxlength="11"
						placeholder="请输入"
						clearable
						onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
						autocomplete="off"
						style="width: 365px"
						disabled
					></el-input>
					<span>元</span>
					<el-button
						type="primary"
						style="margin-left: 20px"
						@click="searchBalance"
					>
						<i v-show="loadingT" class="el-icon-loading"></i>
						查询
					</el-button>
				</el-form-item>
				<el-form-item label="操作类型:" prop="operationType">
					<el-select
						v-model="queryData.operationType"
						size="medium"
						placeholder="请选择"
						clearable
						:maxlength="10"
						style="width: 365px"
						@change="checkRiskValue($event)"
					>
						<el-option
							v-for="item in []"
							:key="item.id"
							:label="item.windControlLevelName"
							:value="item"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="活动ID" prop="activeId">
					<el-input
						v-model="queryData.activeId"
						size="medium"
						maxlength="11"
						placeholder="请输入"
						clearable
						onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
						style="width: 365px"
						@blur="checkValue"
					></el-input>
				</el-form-item>
				<el-form-item label="需求流水倍数" prop="water" label-width="120px">
					<el-input
						v-model="queryData.water"
						size="medium"
						maxlength="6"
						placeholder="请输入"
						clearable
						onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
						style="width: 365px"
						@blur="checkValue"
					></el-input>
				</el-form-item>
				<el-form-item label="操作金额:" prop="operationMoney">
					<el-input
						v-model="queryData.operationMoney"
						size="medium"
						placeholder="请输入"
						clearable
						onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
						maxlength="11"
						style="width: 365px"
					></el-input>
					<span>元</span>
				</el-form-item>
				<el-form-item label="审核原因:" prop="reason">
					<el-input
						v-model="queryData.reason"
						size="medium"
						type="textarea"
						placeholder="请输入"
						clearable
						show-word-limit
						maxlength="50"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="上传附件:">
					<UploadItem
						ref="imgUpload"
						:upload-file-type="'image'"
						:platform="'PC'"
						:img-urls="queryData.imageAddress"
						@upoladItemSucess="handleUploadSucess"
						@startUpoladItem="handleStartUpload"
						@deleteUpoladItem="handleDeleteUpload"
						@upoladItemDefeat="handleUploadDefeat"
					></UploadItem>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						icon="el-icon-search"
						:disabled="loadingT"
						size="medium"
						@click="add"
					>
						提交
					</el-button>
					<el-button icon="el-icon-refresh-left" size="medium" @click="reset">
						重置
					</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import { routerNames } from '@/utils/consts'
import list from '@/mixins/list'
import UploadItem from '@/components/UploadItem'
// import { notSpecial2, isHaveEmoji } from '@/utils/validate'

export default {
	name: routerNames.memberShipIncrease,
	components: { UploadItem },
	mixins: [list],
	data() {
		return {
			loading: false,
			loadingT: false,
			queryData: {
				userName: undefined,
				realName: undefined,
				balance: undefined,
				operationType: undefined,
				operationMoney: undefined,
				reason: undefined,
				imageAddress: undefined,
				activeId: undefined,
				water: undefined
			},
			tipsShow: null
		}
	},
	computed: {
		// windLevelTypeArr() {
		// 	return this.globalDics.windLevelType
		// },
		rules() {
			// const reg1 = /^[A-Za-z]{1}(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){1,})[0-9A-Za-z]{3,10}$/
			// const testUserName = (rule, value, callback) => {
			// 	const isSpecial = !notSpecial2(String(value))
			// 	const isRmoji = isHaveEmoji(String(value))
			// 	if (isSpecial) {
			// 		callback(new Error('不支持空格及特殊字符'))
			// 	} else if (isRmoji) {
			// 		callback(new Error('不支持表情'))
			// 	} else if (!reg1.test(value)) {
			// 		callback(new Error('请输入4-11位，最少2个字母+数字组合，首位字母'))
			// 	} else {
			// 		callback()
			// 	}
			// }

			const userName = [
				{ required: true, message: '请输入会员账号', trigger: 'blur' }
			]

			const realName = [
				{ required: true, message: '请输入会员姓名', trigger: 'blur' }
			]

			const operationType = [
				{ required: true, message: '请选择操作类型', trigger: 'change' }
			]

			const activeId = [
				{ required: true, message: '请输入活动ID', trigger: 'blur' }
			]

			const operationMoney = [
				{ required: true, message: '请输入操作金额', trigger: 'blur' }
			]

			const water = [
				{ required: true, message: '请输入提款流水倍数', trigger: 'blur' }
			]

			const reason = [
				{ required: true, message: '请输入申请原因', trigger: 'blur' }
			]

			return {
				userName,
				realName,
				operationType,
				operationMoney,
				activeId,
				water,
				reason
			}
		}
	},
	mounted() {},
	methods: {
		add() {
			this.loadingT = true
			const params = {
				...this.queryData
			}
			let lock = true
			params.windControlType = params.windControlType * 1
			params.proxyUserName ? (params.userName = params.proxyUserName) : null
			this.$refs['form'].validate((valid) => {
				if (valid && lock && !this.tipsShow) {
					lock = false
					this.$api
						.riskEditAddAPI(params)
						.then((res) => {
							this.loadingT = false
							lock = true
							const { code, msg } = res
							if (code === 200) {
								this.$confirm(`提交成功`, {
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
							this.loadingT = false
							lock = true
						})
				}
			})

			setTimeout(() => {
				this.loadingT = false
				lock = true
			}, 1000)
		},
		reset() {
			this.$refs['form'].resetFields()
			this.queryData = {
				userName: undefined,
				realName: undefined,
				balance: undefined,
				operationType: undefined,
				operationMoney: undefined,
				reason: undefined,
				imageAddress: undefined,
				activeId: undefined,
				water: undefined
			}
		},
		changeRiskType(evt) {
			this.$refs['form'].resetFields()
			this.showInfoData = {}
			this.queryData = {}
			// this.getMerchantDict(evt)
		},
		// 获取风控层级
		getMerchantDict(val) {},
		searchInfo() {
			const { windControlType } = this.queryData
			// console.log('this.queryData', this.queryData)
			switch (windControlType) {
				case '1': {
					const { userName } = this.queryData
					this.$refs.form.validateField('userName')
					if (userName) {
						this.$refs.form.clearValidate('windControlName')
						this.$refs.form.clearValidate('windReason')
						this.queryInfoData({ userName }, windControlType).then((res) => {
							const { id } = res
							if (!id) {
								this.tipsShow = '查询的风险会员不存在'
								return this.$message({
									message: '查询的风险会员不存在',
									type: 'error'
								})
							} else {
								this.tipsShow = null
								this.current = 0
							}
						})
					}
					break
				}
				case '2': {
					const { proxyUserName } = this.queryData
					this.$refs.form.validateField('proxyUserName')
					if (proxyUserName) {
						this.$refs.form.clearValidate('windControlName')
						this.$refs.form.clearValidate('windReason')
						this.queryInfoData(
							{ userName: proxyUserName },
							windControlType
						).then((res) => {
							const { id } = res
							this.tipsShow = '查询的风险代理不存在'
							if (!id) {
								return this.$message({
									message: '查询的风险代理不存在',
									type: 'error'
								})
							} else {
								this.tipsShow = null
								this.current = 1
							}
						})
					}
					break
				}
				case '3': {
					const { cardNumber } = this.queryData
					this.$refs.form.validateField('cardNumber')
					if (cardNumber) {
						this.$refs.form.clearValidate('windControlName')
						this.$refs.form.clearValidate('windReason')
						this.queryInfoData({ cardNumber }, windControlType).then((res) => {
							const { id } = res
							this.tipsShow = '查询的银行卡信息不存在'
							if (!id) {
								return this.$message({
									message: '查询的银行卡信息不存在',
									type: 'error'
								})
							} else {
								this.tipsShow = null
								this.current = 2
							}
						})
					}
					break
				}
				case '4': {
					const { virtualAddress } = this.queryData
					if (virtualAddress) {
						this.$refs.form.clearValidate('windControlName')
						this.$refs.form.clearValidate('windReason')
						this.queryInfoData({ virtualAddress }, windControlType).then(
							(res) => {
								const { id } = res
								this.tipsShow = '查询的虚拟币账号不存在'
								if (!id) {
									return this.$message({
										message: '查询的虚拟币账号不存在',
										type: 'error'
									})
								} else {
									this.tipsShow = null
									this.current = 3
								}
							}
						)
					}
					break
				}
				case '5': {
					const { registerIp } = this.queryData
					if (registerIp) {
						this.$refs.form.clearValidate('windControlName')
						this.$refs.form.clearValidate('windReason')
						this.queryInfoData({ registerIp }, windControlType).then((res) => {
							const { id } = res
							this.tipsShow = '查询的风险IP不存在'
							if (!id) {
								return this.$message({
									message: '查询的风险IP不存在',
									type: 'error'
								})
							} else {
								this.tipsShow = null
								this.current = 4
							}
						})
					}
					break
				}
				case '6': {
					const { deviceNo } = this.queryData
					if (deviceNo) {
						this.$refs.form.clearValidate('windControlName')
						this.$refs.form.clearValidate('windReason')
						this.queryInfoData({ deviceNo }, windControlType).then((res) => {
							const { id } = res
							this.tipsShow = '查询的风险终端号不存在'
							if (!id) {
								return this.$message({
									message: '查询的风险终端号不存在',
									type: 'error'
								})
							} else {
								this.tipsShow = null
								this.current = 5
							}
						})
					}
					break
				}
			}
		},
		queryInfoData(value, windControlType) {
			let lock = true
			this.showInfoData = {}
			if (lock) {
				this.loading = true
				return new Promise((resolve) => {
					this.$api
						.riskEditInfoAPI({ ...value, windControlType })
						.then((res) => {
							lock = false
							this.loading = false
							const { code, data } = res
							if (code === 200) {
								if (data) {
									this.showInfoData = data.id ? data : {}
									resolve(data)
								} else {
									this.showInfoData = {}
								}
							} else {
								this.showInfoData = {}
							}
						})
						.catch(() => {
							this.loading = false
							this.tipsShow = '会员账号不存在'
							lock = false
						})
				})
			}
			setTimeout(() => {
				this.loading = false
				lock = true
			}, 1500)
		},
		checkRiskValue(val) {
			// console.log('val', val)
			this.queryData.windControlName = val.windControlLevelName
			this.queryData.windControlLevelId = val.id
		},
		checkValue() {
			// this.tipsShow = null
		},
		searchBalance() {},
		handleStartUpload() {
			this.$message.info('图片开始上传')
		},
		handleUploadSucess({ index, file, id }) {
			this.queryData.imageAddress = file.imgUrl
		},
		handleUploadDefeat() {
			this.queryData.imageAddress = ''
			this.$message.error('图片上传失败')
		},
		handleDeleteUpload() {
			this.queryData.imageAddress = ''
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
.addAgent-container {
	background-color: #f5f5f5;
	margin: 0;
	min-height: calc(100vh - 105px);
	.line-member {
		height: 50px;
	}
	.addAgent-content {
		width: 1000px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		position: relative;
		padding-top: 65px;
		padding-bottom: 65px;
		.form-header {
			height: 45px;
			line-height: 45px;
			span:nth-child(1) {
				position: absolute;
				left: 30px;
				top: 0;
				color: #666;
				font-size: 14px;
				font-weight: 700;
			}
			span:nth-child(2) {
				position: absolute;
				right: 30px;
				color: #999;
				font-weight: 400;
				font-size: 14px;
				top: 0;
			}
		}
	}
	.addAgent-content::after {
		position: absolute;
		top: 45px;
		content: '';
		width: 100%;
		background-color: rgba(233, 233, 233, 1);
		height: 1px;
	}
	.tips {
		color: #f56c6c;
		font-size: 12px;
		line-height: 1;
		padding-top: 4px;
		position: absolute;
		top: 100%;
		left: 0;
	}
}
</style>
