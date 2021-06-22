<template>
	<div class="game-container report-container addAgent-container">
		<div class="line-member"></div>
		<div class="addAgent-content">
			<div class="form-header">
				<span>编辑</span>
				<span>
					<code style="color:#FF3B30;">*</code>
					为必填项
				</span>
			</div>
			<el-form ref="form" :model="queryData" :rules="rules" label-width="120px">
				<el-form-item label="类型:" prop="operateType">
					<el-select
						v-model="queryData.operateType"
						size="medium"
						placeholder="全部"
						clearable
						style="width: 365px"
						@change="changeRiskType($event)"
					>
						<el-option
							v-for="item in windLevelTypeArr"
							:key="item.type"
							:label="item.value"
							:value="item.type"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					v-if="['0'].includes(queryData.operateType)"
					label="会员客服地址"
					prop="userAddress"
				>
					<!--                    会员客服地址-->
					<el-input
						v-model="queryData.userAddress"
						size="medium"
						maxlength="70"
						placeholder="请输入"
						clearable
						oninput="value=value.replace(/[\u4E00-\u9FA5]/g ,'')"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item
					v-else-if="['1'].includes(queryData.operateType)"
					label="代理客服地址"
					prop="agentAddress"
				>
					<!--                    代理客服地址-->
					<el-input
						v-model="queryData.agentAddress"
						size="medium"
						maxlength="70"
						placeholder="请输入"
						clearable
						oninput="value=value.replace(/[\u4E00-\u9FA5]/g ,'')"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item
					v-else-if="['2'].includes(queryData.operateType)"
					label="IOS下载地址"
					prop="iosAddress"
				>
					<!--  IOS下载地址 -->
					<el-input
						v-model="queryData.iosAddress"
						size="medium"
						maxlength="70"
						oninput="value=value.replace(/^(0+)|[^\d]+/g,'')"
						placeholder="请输入"
						clearable
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item
					v-else-if="['3'].includes(queryData.operateType)"
					label="安卓下载地址"
					prop="androidAddress"
				>
					<!--             安卓下载地址      -->
					<el-input
						v-model="queryData.androidAddress"
						size="medium"
						maxlength="70"
						placeholder="请输入"
						clearable
						oninput="value=value.replace(/[\u4E00-\u9FA5]/g ,'')"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item
					v-else-if="['4'].includes(queryData.operateType)"
					label="桌面端下载地址"
					prop="pcAddress"
				>
					<!--    桌面端下载地址       -->
					<el-input
						v-model="queryData.pcAddress"
						size="medium"
						maxlength="70"
						placeholder="请输入"
						clearable
						oninput="value=value.replace(/[\u4E00-\u9FA5]/g ,'')"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item
					v-else-if="['5'].includes(queryData.operateType)"
					label="投诉建议邮箱"
					prop="complainAddress"
				>
					<!--              投诉建议邮箱-->
					<el-input
						v-model="queryData.complainAddress"
						size="medium"
						maxlength="70"
						placeholder="请输入"
						clearable
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item
					v-else-if="['6'].includes(queryData.operateType)"
					label="客户邮箱"
					prop="serviceAddress"
				>
					<!--       客户邮箱 -->
					<el-input
						v-model="queryData.serviceAddress"
						size="medium"
						maxlength="70"
						placeholder="请输入"
						clearable
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item
					v-else-if="['7'].includes(queryData.operateType)"
					label="合营部ID"
					prop="IdAddress"
				>
					<!--                    合营部ID-->
					<el-input
						v-model="queryData.IdAddress"
						size="medium"
						maxlength="70"
						placeholder="请输入"
						clearable
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="备注:" prop="remark">
					<el-input
						v-model="queryData.remark"
						size="medium"
						type="textarea"
						placeholder="请输入"
						clearable
						maxlength="50"
						style="width: 365px"
						show-word-limit
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
				<span>基本信息</span>
			</div>
			<div class="info-content">
				<el-row class="info-content-row">
					<el-col :span="6">
						<p v-if="['1'].includes(queryData.operateType)">
							<span>会员客服地址：</span>
							<span>
								{{ showInfoData.deviceNo ? showInfoData.deviceNo : '-' }}
							</span>
						</p>
						<p v-else-if="['2'].includes(queryData.operateType)">
							<span>代理客服地址：</span>
							<span>
								{{ showInfoData.deviceNo ? showInfoData.deviceNo : '-' }}
							</span>
						</p>
						<p v-else-if="['3'].includes(queryData.operateType)">
							<span>ios下载地址：</span>
							<span>
								{{ showInfoData.deviceNo ? showInfoData.deviceNo : '-' }}
							</span>
						</p>
						<p v-else-if="['4'].includes(queryData.operateType)">
							<span>安卓下载地址：</span>
							<span>
								{{ showInfoData.deviceNo ? showInfoData.deviceNo : '-' }}
							</span>
						</p>
						<p v-else-if="['5'].includes(queryData.operateType)">
							<span>桌面端下载地址：</span>
							<span>
								{{ showInfoData.deviceNo ? showInfoData.deviceNo : '-' }}
							</span>
						</p>
						<p v-else-if="['6'].includes(queryData.operateType)">
							<span>投诉建议邮箱：</span>
							<span>
								{{ showInfoData.deviceNo ? showInfoData.deviceNo : '-' }}
							</span>
						</p>
						<p v-else-if="['7'].includes(queryData.operateType)">
							<span>客服邮箱：</span>
							<span>
								{{ showInfoData.deviceNo ? showInfoData.deviceNo : '-' }}
							</span>
						</p>
						<p v-else-if="['8'].includes(queryData.operateType)">
							<span>合营ID：</span>
							<span>
								{{ showInfoData.deviceNo ? showInfoData.deviceNo : '-' }}
							</span>
						</p>
					</el-col>
					<el-col :span="6">
						<span>备注：</span>
						<span>
							{{ showInfoData.remark ? showInfoData.remark : '-' }}
						</span>
					</el-col>
					<el-col :span="6">
						<span>最近操作人：</span>
						<span>
							{{ showInfoData.updateBy ? showInfoData.updateBy : '-' }}
						</span>
					</el-col>
					<el-col :span="6">
						<span>最近操作时间：</span>
						<span>
							{{ showInfoData.updateAt ? showInfoData.updateAt : '-' }}
						</span>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
import { routerNames } from '@/utils/consts'
import list from '@/mixins/list'
// import { notSpecial2, isHaveEmoji } from '@/utils/validate'

export default {
	name: routerNames.clientCommon,
	mixins: [list],
	data() {
		return {
			loading: false,
			loadingT: false,
			queryData: {
				operateType: '',
				userAddress: undefined,
				agentAddress: undefined,
				iosAddress: undefined,
				androidAddress: undefined,
				pcAddress: undefined,
				complainAddress: undefined,
				serviceAddress: undefined,
				IdAddress: undefined,
				remark: undefined
			},
			showInfoData: {},
			current: '',
			tipsShow: null,
			windLevelTypeArr: []
		}
	},
	computed: {
		rules() {
			const operateType = [
				{ required: true, message: '请选择类型', trigger: 'change' }
			]
			const userAddress = [
				{ required: true, message: '请输入会员客服地址', trigger: 'blur' }
			]
			const agentAddress = [
				{ required: true, message: '请输入代理客服地址', trigger: 'blur' }
			]
			const iosAddress = [
				{ required: true, message: '请输入ios下载地址', trigger: 'blur' }
			]
			const androidAddress = [
				{ required: true, message: '请输入安卓下载地址', trigger: 'blur' }
			]
			const pcAddress = [
				{ required: true, message: '请输入桌面端下载地址', trigger: 'blur' }
			]
			const complainAddress = [
				{ required: true, message: '请输入投诉建议邮箱', trigger: 'blur' }
			]
			const serviceAddress = [
				{ required: true, message: '请输入投诉建议邮箱', trigger: 'blur' }
			]
			const IdAddress = [
				{ required: true, message: '请输入客服邮箱', trigger: 'blur' }
			]
			const remark = [
				{ required: true, message: '请输入合营ID', trigger: 'blur' }
			]
			return {
				operateType,
				userAddress,
				agentAddress,
				iosAddress,
				androidAddress,
				pcAddress,
				complainAddress,
				serviceAddress,
				IdAddress,
				remark
			}
		}
	},
	mounted() {
		this.queryPublicResources()
	},
	methods: {
		// 查询类型
		queryPublicResources() {
			this.$api.clientCommonQueryPublicResourcesAPI().then((res) => {
				const { code, data } = res
				if (code === 200) {
					this.windLevelTypeArr = data || []
				} else {
					this.windLevelTypeArr = []
				}
			})
		},
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
			this.$refs['form'] && this.$refs['form'].resetFields()
			this.queryData = {
				operateType: '1',
				userAddress: undefined,
				agentAddress: undefined,
				iosAddress: undefined,
				androidAddress: undefined,
				pcAddress: undefined,
				complainAddress: undefined,
				serviceAddress: undefined,
				IdAddress: undefined,
				remark: undefined
			}
		},
		changeRiskType(evt) {
			this.showInfoData = {}
            evt = evt + ''
			this.queryData = {
				userAddress: undefined,
				agentAddress: undefined,
				iosAddress: undefined,
				androidAddress: undefined,
				pcAddress: undefined,
				complainAddress: undefined,
				serviceAddress: undefined,
				IdAddress: undefined,
				remark: undefined,
				operateType: evt
			}
			this.$refs['form'] && this.$refs['form'].resetFields()
		},
		checkRiskValue(val) {
			// console.log('val', val)
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
