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
				<el-form-item label="风控类型:" prop="windLevelType">
					<el-select
						v-model="queryData.windLevelType"
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
					:label="riskType[queryData.windLevelType].label"
					:prop="riskType[queryData.windLevelType].prop"
				>
					<el-input
						v-if="['1', '2'].includes(queryData.windLevelType)"
						v-model="queryData.userName"
						size="medium"
						maxlength="11"
						placeholder="请输入"
						clearable
						onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
						style="width: 365px"
					></el-input>
					<el-input
						v-else-if="['3'].includes(queryData.windLevelType)"
						v-model="queryData.userName"
						size="medium"
						maxlength="25"
						onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
						placeholder="请输入"
						clearable
						style="width: 365px"
					></el-input>
					<el-input
						v-else-if="['4'].includes(queryData.windLevelType)"
						v-model="queryData.userName"
						size="medium"
						maxlength="50"
						placeholder="请输入"
						clearable
						style="width: 365px"
					></el-input>
					<el-input
						v-else-if="['5'].includes(queryData.windLevelType)"
						v-model="queryData.userName"
						size="medium"
						maxlength="15"
						placeholder="请输入"
						clearable
						onkeyup="value=value.replace(/[^\d.]/g,'')"
						style="width: 365px"
					></el-input>
					<el-input
						v-else
						v-model="queryData.userName"
						size="medium"
						maxlength="50"
						placeholder="请输入"
						clearable
						style="width: 365px"
					></el-input>
					<el-button type="primary" style="margin-left: 20px">
						<i v-show="loading" class="el-icon-loading"></i>
						查询
					</el-button>
				</el-form-item>
				<el-form-item label="风控层级:" prop="windControlId">
					<el-select
						v-model="queryData.windControlId"
						size="medium"
						placeholder="全部"
						clearable
						style="width: 365px"
					>
						<el-option
							v-for="item in vipDict"
							:key="item.windControlId"
							:label="item.windControlName"
							:value="item.windControlId"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核信息:" prop="applyInfo">
					<el-input
						v-model="queryData.applyInfo"
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
						:disabled="loading"
						size="medium"
						@click="add"
					>
						提交
					</el-button>
					<el-button
						icon="el-icon-refresh-left"
						:disabled="loading"
						size="medium"
						@click="reset"
					>
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
import { notSpecial2, isHaveEmoji } from '@/utils/validate'

export default {
	name: routerNames.addAgent,
	mixins: [list],
	data() {
		return {
			loading: false,
			queryData: {
				windLevelType: '1',
				windControlId: undefined,
				userName: undefined,
				applyInfo: undefined
			},
			vipDict: [],
			userLabel: []
		}
	},
	computed: {
		windLevelTypeArr() {
			return this.globalDics.windLevelType
		},
		riskType() {
			const typeObj = {
				'1': {
					label: '会员账号',
					prop: 'userName'
				},
				'2': {
					label: '代理账号',
					prop: 'agentName'
				},
				'3': {
					label: '银行卡号',
					prop: 'cardNumber'
				},
				'4': {
					label: '虚拟币地址',
					prop: 'virtualAddress'
				},
				'5': {
					label: 'IP地址',
					prop: 'IP'
				},
				'6': {
					label: '终端设备号',
					prop: 'deviceNo'
				}
			}
			return typeObj
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

			return {
				windLevelType: [
					{ required: true, message: '请选择风控类型', trigger: 'change' }
				],
				windControlId: [
					{ required: true, message: '请选择风控类型', trigger: 'change' }
				],
				userName: [
					{
						required: true,
						validator: testUserName,
						trigger: 'blur'
					}
				],
				agentName: [
					{
						required: true,
						validator: testUserName,
						trigger: 'blur'
					}
				],
				cardNumber: [
					{
						required: true,
						message: '请输入银行卡号',
						trigger: 'blur'
					}
				],
				virtualAddress: [
					{
						required: true,
						message: '请输入虚拟币地址',
						trigger: 'blur'
					}
				],
				IP: [
					{
						required: true,
						message: '请输入IP',
						trigger: 'blur'
					}
				],
				deviceNo: [
					{
						required: true,
						message: '请输入终端设备号',
						trigger: 'blur'
					}
				],
				applyInfo: [
					{
						required: true,
						message: '请输入审核信息',
						trigger: 'blur'
					}
				]
			}
		}
	},
	mounted() {},
	methods: {
		add() {
			this.loading = true
			const params = {
				...this.form
			}
			let lock = true
			this.$refs['form'].validate((valid) => {
				if (valid && lock) {
					lock = false
					this.$api
						.addAgentAPI(params)
						.then((res) => {
							this.loading = false
							lock = true
							const { code, data, msg } = res
							if (code === 200) {
								this.$confirm(`代理${data}资料提交成功`, {
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
							this.loading = false
							lock = true
						})
				}
			})

			setTimeout(() => {
				this.loading = false
				lock = true
			}, 1000)
		},
		reset() {
			this.$refs['form'].resetFields()
			this.queryData = {
                windLevelType: '1',
                windControlId: undefined,
                userName: undefined,
                applyInfo: undefined
			}
		},
		checkValue(val) {},
		changeRiskType(evt) {
            this.$refs['form'].resetFields()
            this.queryData = {
                windControlId: undefined,
                userName: undefined,
                applyInfo: undefined
            }
			console.log('evt', evt)
			// this.queryData.windLevelType = evt.code
		},
		// 获取风控层级
		getMerchantDict() {
			this.$api.riskDictAPI().then((res) => {
				const {
					code,
					data: { windControl, userLabel },
					msg
				} = res
				if (code === 200) {
					this.vipDict = windControl || []
					this.userLabel = userLabel || []
				} else {
					this.$message({
						message: msg,
						type: 'error'
					})
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
}
</style>
