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
				<el-form-item label="活动类型:" prop="activityType">
					<el-select
						v-model="queryData.activityType"
						size="medium"
						placeholder="请选择"
						clearable
						style="width: 365px"
						@change="changeRiskType($event)"
					>
						<el-option
							v-for="item in gameVenueList"
							:key="item.id"
							:label="item.gameName"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="优惠类型名称" prop="activityTypeName">
					<el-input
						v-model="queryData.activityTypeName"
						size="medium"
						maxlength="4"
						placeholder="请输入"
						clearable
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
				<span>基本信息</span>
			</div>
			<div class="info-content">
				<el-row class="info-content-row">
					<el-col :span="6">
						<p>
							<span>优惠活动：</span>
							<span>
								{{ showInfoData.deviceNo ? showInfoData.deviceNo : '-' }}
							</span>
						</p>
					</el-col>
					<el-col :span="6">
						<span>优惠类型名称：</span>
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
	name: routerNames.platformRate,
	mixins: [list],
	data() {
		return {
			loadingT: false,
			queryData: {
				activityType: '',
				activityTypeName: undefined
			},
			showInfoData: {},
			tipsShow: null,
			gameVenueList: []
		}
	},
	computed: {
		rules() {
			const activityType = [
				{ required: true, message: '请选择活动类型', trigger: 'change' }
			]
			const activityTypeName = [
				{ required: true, message: '优惠类型名称', trigger: 'blur' }
			]
			return {
				activityType,
				activityTypeName
			}
		}
	},
	mounted() {
		this.getMemberVipMerchantGame()
	},
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
			this.$refs['form'] && this.$refs['form'].resetFields()
			this.queryData = {
				pateVenue: '',
				rebate: undefined,
				remark: undefined
			}
		},
		changeRiskType(evt) {
			// this.$refs['form'] && this.$refs['form'].resetFields()
		},
		checkRiskValue(val) {
			// console.log('val', val)
		},
		// 获取商户场馆
		getMemberVipMerchantGame() {
			this.$api.memberVipMerchantGameAPI().then((res) => {
				const { code, data } = res
				if (code === 200) {
					this.gameVenueList = data || []
				}
			})
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
