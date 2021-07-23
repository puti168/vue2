<template>
	<div class="game-container report-container addAgent-container">
		<div class="line-member"></div>
		<div class="addPlatformRate-content">
			<div class="form-header">
				<span>编辑</span>
				<span>
					<code style="color:#FF3B30;">*</code>
					为必填项
				</span>
			</div>
			<el-form ref="form" :model="queryData" :rules="rules" label-width="145px">
				<el-form-item label="场馆:" prop="gameName">
					<el-select
						v-model="queryData.gameName"
						size="medium"
						placeholder="请选择"
						style="width: 365px"
						@change="changeType($event)"
					>
						<el-option
							v-for="item in gameVenueList"
							:key="item.id"
							:label="item.gameName"
							:value="item"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="feeRate">
					<label slot="label">费率:&nbsp;&nbsp;&nbsp;&nbsp;</label>
					<el-popover
						placement="top-start"
						title="提示"
						width="280"
						trigger="hover"
					>
						<div>
							<p>根据负盈利额计算给场馆的金额</p>
						</div>
						<div slot="reference" class="el-icon-question">
							<span class="other-class"></span>
						</div>
					</el-popover>
					<el-input-number
						v-model="queryData.feeRate"
						size="medium"
						:max="100"
						:precision="2"
						placeholder="请输入"
						clearable
						style="width: 365px"
					></el-input-number>
					%
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
		<div v-if="showInfoData" class="info-show">
			<div class="info-header">
				<span>基本信息</span>
			</div>
			<div class="info-content">
				<el-row class="info-content-row">
					<p>
						<span>场馆：</span>
						<span>
							{{
								showInfoData && showInfoData.gameName
									? showInfoData.gameName
									: '-'
							}}
						</span>
					</p>
					<p>
						<span>费率：</span>
						<span>
							{{ getFeeRate }}
						</span>
					</p>
					<p>
						<span>备注：</span>
						<span>
							{{
								showInfoData && showInfoData.remark ? showInfoData.remark : '-'
							}}
						</span>
					</p>
					<p>
						<span>最近操作人：</span>
						<span>
							{{
								showInfoData && showInfoData.updateBy
									? showInfoData.updateBy
									: '-'
							}}
						</span>
					</p>
				</el-row>
				<el-row class="info-content-row">
					<el-col :span="8">
						最近操作时间：{{
							showInfoData && showInfoData.updateAt
								? showInfoData.updateAt
								: '-'
						}}
					</el-col>
					<el-col :span="5" />
					<el-col :span="5" />
					<el-col :span="6" />
				</el-row>
			</div>
		</div>
		<div v-else class="info-show"></div>
	</div>
</template>

<script>
import { routerNames } from '@/utils/consts'
import list from '@/mixins/list'
import { Decimal } from 'decimal.js'
// import { notSpecial2, isHaveEmoji } from '@/utils/validate'

export default {
	name: routerNames.platformRate,
	mixins: [list],
	data() {
		return {
			loadingT: false,
			queryData: {
				gameName: undefined,
				feeRate: undefined,
				remark: undefined,
				id: undefined,
				merchantId: undefined
			},
			showInfoData: undefined,
			gameVenueList: []
		}
	},
	computed: {
		rules() {
			const gameName = [
				{ required: true, message: '请选择场馆', trigger: 'change' }
			]
			const feeRate = [
				{ required: true, message: '请输入费率', trigger: 'blur' }
			]
			const remark = [
				{ required: true, message: '请输入备注', trigger: 'blur' },
				{
					min: 2,
					max: 50,
					message: '长度在 2 到 50 个字符',
					trigger: 'blur'
				}
			]
			return {
				gameName,
				feeRate,
				remark
			}
		},
		getFeeRate() {
			return this.showInfoData && this.showInfoData.feeRate
				? new Decimal(this.showInfoData.feeRate).mul(100) + '%'
				: '-'
		}
	},
	created() {
		this.getMemberVipMerchantGame()
	},
	mounted() {},
	methods: {
		// 查询详情
		queryDetails(id) {
			this.$api.platformSelectAPI(Number(id)).then((res) => {
				const { code, data } = res
				console.log('res', res)
				if (code === 200) {
					this.showInfoData = data
					const { id, merchantId, gameCode } = data
					this.queryData.id = id
					this.queryData.merchantId = merchantId
					this.queryData.gameCode = gameCode
				} else {
					this.showInfoData = undefined
				}
			})
		},
		add() {
			this.loadingT = true
			const params = {
				...this.queryData
			}
			let lock = true
			params.feeRate = params.feeRate / 100 + ''
			this.$refs['form'].validate((valid) => {
				if (valid && lock) {
					lock = false
					this.$api
						.platformUpdateAPI(params)
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
				gameName: undefined,
				feeRate: undefined,
				remark: undefined,
				id: undefined,
				merchantId: undefined
			}
			this.showInfoData = undefined
		},
		changeType(evt) {
			this.$refs['form'] && this.$refs['form'].resetFields()
			this.showInfoData = undefined
			this.queryData = {
				gameName: evt.gameName,
				feeRate: undefined,
				remark: undefined,
				id: undefined,
				merchantId: undefined
			}
			this.queryDetails(evt.id)
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

/deep/.el-input-number__decrease,
/deep/.el-input-number__increase {
	display: none;
}

/deep/.el-input-number .el-input__inner {
	padding: 0 15px;
	text-align: left;
}
.addAgent-container {
	background-color: #f5f5f5;
	margin: 0;
	min-height: calc(100vh - 105px);
	.line-member {
		height: 50px;
	}
	.addPlatformRate-content {
		width: 1100px;
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
	.addPlatformRate-content::after {
		position: absolute;
		top: 45px;
		content: '';
		width: 100%;
		background-color: rgba(233, 233, 233, 1);
		height: 1px;
	}
	.info-show {
		width: 1100px;
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
				> p {
					display: inline-block;
                    min-width: 165px;
                    margin-right: 15px;
				}
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
.el-icon-question {
	position: absolute;
	z-index: 10;
	left: -30px;
}
</style>
