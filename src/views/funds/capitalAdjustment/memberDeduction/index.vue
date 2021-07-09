<template>
	<div class="game-container report-container addAgent-container">
		<div class="line-member"></div>
		<div class="addAgent-content">
			<div class="form-header">
				<span>会员人工扣除额度</span>
				<span>
					<code style="color:#FF3B30;">*</code>
					为必填项
				</span>
			</div>
			<el-form ref="form" :model="queryData" :rules="rules" label-width="100px">
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
						@blur="searchRealName"
					></el-input>
				</el-form-item>
				<el-form-item label="会员姓名:">
					<el-input
						v-model="queryData.realName"
						size="medium"
						maxlength="15"
						placeholder="载入会员姓名"
						clearable
						disabled
						autocomplete="off"
						style="width: 365px"
					></el-input>
				</el-form-item>
				<el-form-item label="账户余额:">
					<el-input
						v-model="queryData.balance"
						size="medium"
						maxlength="11"
						placeholder="请输入"
						clearable
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
						<i v-show="loading" class="el-icon-loading"></i>
						查询
					</el-button>
				</el-form-item>
				<el-form-item label="操作类型:" prop="adjustType">
					<el-select
						v-model="queryData.adjustType"
						size="medium"
						placeholder="请选择"
						clearable
						:maxlength="10"
						style="width: 365px"
						@change="checkRiskValue($event)"
					>
						<el-option
							v-for="item in memberPatchAddAdjustTypeArr"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="调整金额:" prop="lessMoney">
					<el-input
						v-model="queryData.lessMoney"
						size="medium"
						placeholder="请输入金额"
						clearable
						onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
						maxlength="11"
						style="width: 365px"
					></el-input>
					<span>元</span>
				</el-form-item>
				<el-form-item label="申请原因:" prop="remark">
					<el-input
						v-model="queryData.remark"
						size="medium"
						type="textarea"
						placeholder="请输入申请原因，50字以内"
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
// import { routerNames } from '@/utils/consts'
import list from '@/mixins/list'
import UploadItem from '@/components/UploadItem'
import { notSpecial2, isHaveEmoji } from '@/utils/validate'

export default {
	name: 'MemberDeduction',
	components: { UploadItem },
	mixins: [list],
	data() {
		return {
			loading: false,
			loadingT: false,
			queryData: {
				userName: undefined,
				realName: undefined,
				accountType: undefined,
				balance: undefined,
				balanceType: '1',
				adjustType: undefined,
				lessMoney: undefined,
				remark: undefined,
				userType: 1,
				bizType: 1,
				parentProxyId: undefined,
				userId: undefined,
				relationId: undefined,
				imageAddress: undefined
			},
			tipsShow: null
		}
	},
	computed: {
		memberPatchAddAdjustTypeArr() {
			return this.globalDics.memberPatchSubAdjustType
		},
		rules() {
			const reg1 = /^[A-Za-z]{1}(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){1,})[0-9A-Za-z]{3,10}$/
			const testUserName = (rule, value, callback) => {
				const isSpecial = !notSpecial2(String(value))
				const isRmoji = isHaveEmoji(String(value))
				if (isSpecial) {
					callback(new Error('不支持空格及特殊字符'))
				} else if (isRmoji) {
					callback(new Error('不支持表情'))
				} else if (!reg1.test(value)) {
					callback(new Error('请输入4-11位，最少2个字母+数字组合，首位字母'))
				} else {
					callback()
				}
			}

			const userName = [
				{ required: true, validator: testUserName, trigger: 'blur' },
				{
					min: 4,
					max: 11,
					message: '长度在 4 到 11 个字符',
					trigger: 'blur'
				}
			]

			const adjustType = [
				{ required: true, message: '请选择操作类型', trigger: 'change' }
			]

			const lessMoney = [
				{ required: true, message: '请输入操作金额', trigger: 'blur' }
			]

			const remark = [
				{ required: true, message: '请输入申请原因', trigger: 'blur' }
			]

			return {
				userName,
				adjustType,
				lessMoney,
				remark
			}
		}
	},
	mounted() {
		// this.getRelationId()
	},
	methods: {
		getRelationId() {
			this.$api.getImageIdAPI().then((res) => {
				this.queryData.relationId = res.data
			})
		},
		searchRealName() {
			const { userName, balanceType } = this.queryData
			this.$refs.form.validateField('userName', (errMsg) => {
				if (!errMsg) {
					this.$api
						.memberIncreaseSearchAPI({ userName, accountType: balanceType })
						.then((res) => {
							const { code, data } = res
							if (code === 200) {
								const { realName, accountType, userId, parentProxyId } = data
								this.queryData.realName = realName
								this.queryData.accountType = accountType
								this.queryData.userId = userId
								this.queryData.parentProxyId = parentProxyId
							}
						})

					this.getRelationId()
				}
			})
		},
		searchBalance() {
			const { userName, balanceType } = this.queryData
            this.$refs.form.clearValidate('adjustType')
            this.$refs.form.clearValidate('lessMoney')
            this.$refs.form.clearValidate('remark')
			this.$refs.form.validateField('userName', (errMsg) => {
				if (!errMsg) {
					this.loading = true
					this.$api
						.memberIncreaseSearchAPI({ userName, accountType: balanceType })
						.then((res) => {
							this.loading = false
							const { code, data } = res
							if (code === 200) {
								const { balance } = data
								this.queryData.balance = balance
							}
						})
						.catch(() => {
							this.loading = false
						})

					setTimeout(() => {
						this.loading = false
					}, 1000)
				}
			})
		},
		add() {
			this.loadingT = true
			const params = {
				...this.queryData
			}
			let lock = true
			params.adjustType = params.adjustType * 1
			params.lessMoney = params.lessMoney * 1
			delete params.balanceType
			this.$refs['form'].validate((valid) => {
				if (valid && lock) {
					lock = false
					this.$api
						.memberDeductQuotaAPI(params)
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
				accountType: undefined,
				balance: undefined,
				balanceType: '1',
				adjustType: undefined,
				lessMoney: undefined,
				remark: undefined,
				userType: 1,
				bizType: 1,
				userId: undefined,
				relationId: undefined,
				imageAddress: undefined
			}
            this.$nextTick(() => {
                this.$refs.imgUpload && this.$refs.imgUpload.handleDeleteImgUrl()
            })
		},
		checkRiskValue(val) {
			// console.log('val', val)
		},
		checkValue() {
			// this.tipsShow = null
		},
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
