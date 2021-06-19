<template>
	<div class="game-container report-container addAgent-container">
		<div class="line-member"></div>
		<div class="addAgent-content">
			<div class="form-header">
				<span>编辑风控层级</span>
				<span>
					<code style="color:#FF3B30;">*</code>
					为必填项
				</span>
			</div>
			<el-form ref="form" :model="queryData" :rules="rules" label-width="100px">
				<el-form-item label="风控类型:" prop="windControlType">
					<el-select
						v-model="queryData.windControlType"
						size="medium"
						placeholder="全部"
						clearable
						style="width: 365px"
						@change="changeRiskType($event)"
					>
						<el-option
							v-for="item in windLevelTypeArr"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					v-if="['1'].includes(queryData.windControlType)"
					label="会员账号"
					prop="userName"
				>
					<!--                    会员-->
					<el-input
						v-if="['1'].includes(queryData.windControlType)"
						v-model="queryData.userName"
						size="medium"
						maxlength="11"
						placeholder="请输入"
						clearable
						oninput="value=value.replace(/[\u4E00-\u9FA5]/g ,'')"
						style="width: 365px"
						@blur="checkValue"
					></el-input>
					<!--                    <span v-show="tipsShow" class="tips">{{ tipsShow }}</span>-->
					<el-button
						type="primary"
						style="margin-left: 20px"
						@click="searchInfo('userName')"
					>
						<i v-show="loading" class="el-icon-loading"></i>
						查询
					</el-button>
				</el-form-item>
				<el-form-item
					v-else-if="['2'].includes(queryData.windControlType)"
					label="代理账号"
					prop="proxyUserName"
				>
					<!--                    代理-->
					<el-input
						v-model="queryData.proxyUserName"
						size="medium"
						maxlength="11"
						placeholder="请输入"
						clearable
						oninput="value=value.replace(/[\u4E00-\u9FA5]/g ,'')"
						style="width: 365px"
						@blur="checkValue"
					></el-input>
					<!--                    <span v-show="tipsShow" class="tips">{{ tipsShow }}</span>-->
					<el-button
						type="primary"
						style="margin-left: 20px"
						@click="searchInfo('proxyUserName')"
					>
						<i v-show="loading" class="el-icon-loading"></i>
						查询
					</el-button>
				</el-form-item>
				<el-form-item
					v-else-if="['3'].includes(queryData.windControlType)"
					label="银行卡号"
					prop="cardNumber"
				>
					<!--                    银行卡-->
					<el-input
						v-model="queryData.cardNumber"
						size="medium"
						maxlength="25"
						oninput="value=value.replace(/^(0+)|[^\d]+/g,'')"
						placeholder="请输入"
						clearable
						style="width: 365px"
						@blur="checkValue"
					></el-input>
					<!--                    <span v-show="tipsShow" class="tips">{{ tipsShow }}</span>-->
					<el-button
						type="primary"
						style="margin-left: 20px"
						@click="searchInfo('cardNumber')"
					>
						<i v-show="loading" class="el-icon-loading"></i>
						查询
					</el-button>
				</el-form-item>
				<el-form-item
					v-else-if="['4'].includes(queryData.windControlType)"
					label="虚拟币地址"
					prop="virtualAddress"
				>
					<!--             虚拟币      -->
					<el-input
						v-model="queryData.virtualAddress"
						size="medium"
						maxlength="50"
						placeholder="请输入"
						clearable
						oninput="value=value.replace(/[\u4E00-\u9FA5]/g ,'')"
						style="width: 365px"
						@blur="checkValue"
					></el-input>
					<!--                    <span v-show="tipsShow" class="tips">{{ tipsShow }}</span>-->
					<el-button
						type="primary"
						style="margin-left: 20px"
						@click="searchInfo('virtualAddress')"
					>
						<i v-show="loading" class="el-icon-loading"></i>
						查询
					</el-button>
				</el-form-item>
				<el-form-item
					v-else-if="['5'].includes(queryData.windControlType)"
					label="IP地址"
					prop="registerIp"
				>
					<!--                    IP-->
					<el-input
						v-model="queryData.registerIp"
						size="medium"
						maxlength="15"
						placeholder="请输入"
						clearable
						oninput="value=value.replace(/[^\d.]/g,'')"
						style="width: 365px"
						@blur="checkValue"
					></el-input>
					<!--                    <span v-show="tipsShow" class="tips">{{ tipsShow }}</span>-->
					<el-button
						type="primary"
						style="margin-left: 20px"
						@click="searchInfo('registerIp')"
					>
						<i v-show="loading" class="el-icon-loading"></i>
						查询
					</el-button>
				</el-form-item>
				<el-form-item
					v-else-if="['6'].includes(queryData.windControlType)"
					label="终端设备号"
					prop="deviceNo"
				>
					<!--                    终端号-->
					<el-input
						v-model="queryData.deviceNo"
						size="medium"
						maxlength="50"
						placeholder="请输入"
						clearable
						style="width: 365px"
						@blur="checkValue"
					></el-input>
					<!--                    <span v-show="tipsShow" class="tips">{{ tipsShow }}</span>-->
					<el-button
						type="primary"
						style="margin-left: 20px"
						@click="searchInfo('deviceNo')"
					>
						<i v-show="loading" class="el-icon-loading"></i>
						查询
					</el-button>
				</el-form-item>
				<el-form-item label="风控层级:" prop="windControlName">
					<el-select
						v-model="queryData.windControlName"
						size="medium"
						placeholder="默认选择全部"
						clearable
						:maxlength="10"
						style="width: 365px"
						@change="checkRiskValue($event)"
					>
						<el-option
							v-for="item in vipDict"
							:key="item.id"
							:label="item.windControlLevelName"
							:value="item"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="风控原因:" prop="windReason">
					<el-input
						v-model="queryData.windReason"
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
		<div class="info-show">
			<div class="info-header">
				<span v-if="!!showInfoData">基本信息</span>
			</div>
			<component
				:is="content"
				v-if="!!showInfoData"
				:showInfoData="showInfoData"
			></component>
		</div>
	</div>
</template>

<script>
import { routerNames } from '@/utils/consts'
import list from '@/mixins/list'
// import { notSpecial2, isHaveEmoji } from '@/utils/validate'
import UserName from '@/components/editRisk/userName'
import AgentName from '@/components/editRisk/agentName'
import BankCard from '@/components/editRisk/bankCard'
import Virtual from '@/components/editRisk/virtual'
import Ip from '@/components/editRisk/ip'
import Device from '@/components/editRisk/device'

export default {
	name: routerNames.editRisk,
	components: { UserName, AgentName, BankCard, Virtual, Ip, Device },
	mixins: [list],
	data() {
		return {
			loading: false,
			loadingT: false,
			queryData: {
				windControlType: '1',
				windControlName: undefined,
				userName: undefined,
				proxyUserName: undefined,
				cardNumber: undefined,
				virtualAddress: undefined,
				registerIp: undefined,
				deviceNo: undefined,
				windReason: undefined
			},
			vipDict: [],
			showInfoData: undefined,
			current: '',
			tipsShow: null
		}
	},
	computed: {
		windLevelTypeArr() {
			return this.globalDics.windLevelType
		},
		content() {
			const obj = [
				'UserName',
				'AgentName',
				'BankCard',
				'Virtual',
				'Ip',
				'Device'
			]
			return obj[this.current]
		},
		rules() {
			const windControlType = [
				{ required: true, message: '请选择风控类型', trigger: 'change' }
			]
			const windControlName = [
				{ required: true, message: '请选择风控层级', trigger: 'change' }
			]
			const userName = [
				{ required: true, message: '请输入会员账号', trigger: 'blur' }
			]
			const proxyUserName = [
				{ required: true, message: '请输入代理账号', trigger: 'blur' }
			]
			const cardNumber = [
				{ required: true, message: '请输入银行卡号', trigger: 'blur' }
			]
			const virtualAddress = [
				{ required: true, message: '请输入虚拟币地址', trigger: 'blur' }
			]
			const registerIp = [
				{ required: true, message: '请输入IP', trigger: 'blur' }
			]
			const deviceNo = [
				{ required: true, message: '请输入终端设备号', trigger: 'blur' }
			]
			const windReason = [
				{ required: true, message: '请输入审核信息', trigger: 'blur' }
			]
			return {
				windControlType,
				windControlName,
				userName,
				proxyUserName,
				cardNumber,
				virtualAddress,
				registerIp,
				deviceNo,
				windReason
			}
		}
	},
	mounted() {
		this.getMerchantDict('1')
	},
	methods: {
		add() {
			this.loadingT = true
			const params = {
				...this.queryData
			}
			let lock = true
			params.windControlType = params.windControlType * 1
            params.userName ? (params.objectInfo = params.userName) : null
			params.proxyUserName ? (params.objectInfo = params.proxyUserName) : null
            params.cardNumber ? (params.objectInfo = params.cardNumber) : null
            params.virtualAddress ? (params.objectInfo = params.virtualAddress) : null
            params.registerIp ? (params.objectInfo = params.registerIp) : null
            params.deviceNo ? (params.objectInfo = params.deviceNo) : null
            delete params.userName
            delete params.proxyUserName
            delete params.cardNumber
            delete params.virtualAddress
            delete params.registerIp
            delete params.deviceNo
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
				windControlType: '1',
				windControlName: undefined,
				userName: undefined,
				proxyUserName: undefined,
				cardNumber: undefined,
				virtualAddress: undefined,
				registerIp: undefined,
				deviceNo: undefined,
				windReason: undefined
			}
		},
		changeRiskType(evt) {
			this.$refs['form'].resetFields()
			this.showInfoData = undefined
			this.queryData = {
				windControlName: undefined,
				userName: undefined,
				proxyUserName: undefined,
				cardNumber: undefined,
				virtualAddress: undefined,
				registerIp: undefined,
				deviceNo: undefined,
				windReason: undefined,
				windControlType: evt
			}
			this.getMerchantDict(evt)
		},
		// 获取风控层级
		getMerchantDict(val) {
			this.queryData.windControlName = undefined
			this.$api
				.getSelectWindControlLevel({ windControlType: val * 1 })
				.then((res) => {
					const { code, data, msg } = res
					if (code === 200) {
						this.vipDict = data || []
					} else {
						this.$message({
							message: msg,
							type: 'error'
						})
					}
				})
		},
		searchInfo(type) {
			const { windControlType } = this.queryData
			// console.log('this.queryData', this.queryData)
			switch (type) {
				case 'userName': {
					const { userName } = this.queryData
					this.$refs.form.validateField('userName')
					if (userName) {
						this.$refs.form.clearValidate('windControlName')
						this.$refs.form.clearValidate('windReason')
						this.queryInfoData({ objectInfo: userName }, windControlType).then(
							(res) => {
								const { id } = res
								if (id || id + '' === '0') {
                                    this.tipsShow = null
                                    this.current = 0
								} else {
                                    this.tipsShow = '查询的风险会员不存在'
                                    return this.$message({
                                        message: '查询的风险会员不存在',
                                        type: 'error'
                                    })
								}
							}
						)
					}
					break
				}
				case 'proxyUserName': {
					const { proxyUserName } = this.queryData
					this.$refs.form.validateField('proxyUserName')
					if (proxyUserName) {
						this.$refs.form.clearValidate('windControlName')
						this.$refs.form.clearValidate('windReason')
						this.queryInfoData(
							{ objectInfo: proxyUserName },
							windControlType
						).then((res) => {
							const { id } = res
							if (id || id + '' === '0') {
								this.tipsShow = null
								this.current = 1
							} else {
								this.tipsShow = '查询的风险代理不存在'
								return this.$message({
									message: '查询的风险代理不存在',
									type: 'error'
								})
							}
						})
					}
					break
				}
				case 'cardNumber': {
					const { cardNumber } = this.queryData
					this.$refs.form.validateField('cardNumber')
					if (cardNumber) {
						this.$refs.form.clearValidate('windControlName')
						this.$refs.form.clearValidate('windReason')
						this.queryInfoData({ objectInfo: cardNumber }, windControlType).then((res) => {
							const { id } = res
							if (id || id + '' === '0') {
								this.tipsShow = null
								this.current = 2
							} else {
								this.tipsShow = '查询的银行卡信息不存在'
								return this.$message({
									message: '查询的银行卡信息不存在',
									type: 'error'
								})
							}
						})
					}
					break
				}
				case 'virtualAddress': {
					const { virtualAddress } = this.queryData
					this.$refs.form.validateField('virtualAddress')
					if (virtualAddress) {
						this.$refs.form.clearValidate('windControlName')
						this.$refs.form.clearValidate('windReason')
						this.queryInfoData({ objectInfo: virtualAddress }, windControlType).then(
							(res) => {
								const { id } = res
								if (id || id + '' === '0') {
									this.tipsShow = null
									this.current = 3
								} else {
									this.tipsShow = '查询的虚拟币账号不存在'
									return this.$message({
										message: '查询的虚拟币账号不存在',
										type: 'error'
									})
								}
							}
						)
					}
					break
				}
				case 'registerIp': {
					const { registerIp } = this.queryData
					this.$refs.form.validateField('registerIp')
					if (registerIp) {
						this.$refs.form.clearValidate('windControlName')
						this.$refs.form.clearValidate('windReason')
						this.queryInfoData({ objectInfo: registerIp }, windControlType).then((res) => {
							const { id } = res
                            this.tipsShow = null
							if (id || id + '' === '0') {
								this.current = 4
							} else {
								return this.$message({
									message: '查询的风险IP不存在',
									type: 'error'
								})
							}
						})
					}
					break
				}
				case 'deviceNo': {
					const { deviceNo } = this.queryData
					this.$refs.form.validateField('deviceNo')
					if (deviceNo) {
						this.$refs.form.clearValidate('windControlName')
						this.$refs.form.clearValidate('windReason')
						this.queryInfoData({ objectInfo: deviceNo }, windControlType).then((res) => {
							const { id } = res
                            this.tipsShow = null
							if (id || id + '' === '0') {
								this.current = 5
							} else {
								return this.$message({
									message: '查询的风险终端号不存在',
									type: 'error'
								})
							}
						})
					}
					break
				}
			}
		},
		queryInfoData(value, windControlType) {
			// let lock = true
            this.loading = true
			this.showInfoData = undefined
			if (this.loading) {
				return new Promise((resolve) => {
					this.$api
						.riskEditInfoAPI({ ...value, windControlType })
						.then((res) => {
							// lock = false
							this.loading = false
							const { code, data } = res
							if (code === 200) {
								if (data) {
									this.showInfoData =
										!!data.id || data.id + '' === '0' ? data : undefined
									resolve(data)
								} else {
									this.showInfoData = undefined
								}
							} else {
								this.showInfoData = undefined
							}
						})
						.catch(() => {
							this.loading = false
							// lock = false
						})
				})
			}
			setTimeout(() => {
				this.loading = false
				// lock = true
			}, 1500)
		},
		checkRiskValue(val) {
			// console.log('val', val)
			this.queryData.windControlName = val.windControlLevelName
			this.queryData.windControlLevelId = val.id
		},
		checkValue() {
			// this.tipsShow = null
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
	.info-show {
		width: 1000px;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		margin: 0 auto;
		position: relative;
		min-height: 300px;
		padding-left: 40px;
		padding-right: 40px;
		.info-header {
			border-top: 1px rgba(233, 233, 233, 1) solid;
			span {
				margin-top: 45px;
				display: inline-block;
				width: 188px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				background: #000;
				color: rgb(255, 255, 255);
			}
		}
		.info-content {
			margin-top: 30px;
			font-size: 14px;
			.info-content-row {
				padding-top: 20px;
				padding-bottom: 20px;
			}
		}
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
