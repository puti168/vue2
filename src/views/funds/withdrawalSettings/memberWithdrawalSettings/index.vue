<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<h2 class="h2-line">会员提现设置</h2>
			<div class="head flex-h-end">
				<template>
					<el-button type="primary" @click="open">
						初始化提款设置
					</el-button>

					<el-button type="primary" @click="dialogVisible = true">
						新增会员提款设置
					</el-button>
					<el-dialog
						:visible.sync="dialogVisible"
						width="970px"
						:before-close="handleClose"
					>
						<div class="form-header">
							<span>新增会员资料</span>
							<span>
								<code style="color:#FF3B30;">*</code>
								为必填项
							</span>
						</div>
						<h2>提款配置</h2>
						<el-form
							:rules="rules"
							:inline="true"
							:model="ruleForm"
							class="demo-form-inline"
						>
							<el-form-item
								prop="viplevel"
								label-width="147px"
								label="VIP等级："
								class="configure"
							>
								<el-input
									v-model="queryData.viplevel"
									placeholder=""
								></el-input>
							</el-form-item>

							<el-form-item label="单次提款最低额度：" prop="minimum">
								<el-input
									v-model="queryData.miniamount"
									class="chief"
									placeholder="请输入金额，为0不限制"
								></el-input>
								<span>元</span>
							</el-form-item>

							<el-form-item
								label="单次提款最高额度："
								class="configure"
								prop="maxmum"
							>
								<el-input
									v-model="queryData.maxamount"
									class="chief"
									placeholder="请输入金额，为0不限制"
								></el-input>
								<span>元</span>
							</el-form-item>
							<el-form-item label="单日免费提款次数：" prop="oneFree">
								<el-input
									v-model="queryData.oneFree"
									class="chief"
									placeholder="请输入金额，为0不限制"
								></el-input>
								<span>次</span>
							</el-form-item>
							<el-form-item
								label="大额提款标记金额："
								class="configure"
								prop="signminimum"
							>
								<el-input
									v-model="queryData.minimum"
									class="chief"
									placeholder="请输入金额，为0不限制"
								></el-input>
								<span style="w">元</span>
							</el-form-item>
							<el-form-item label="单日免费提款总额：" prop="onefreetotal">
								<el-input
									v-model="queryData.onefreetotal"
									class="chief"
									placeholder="请输入金额，为0不限制"
								></el-input>
								<span>元</span>
							</el-form-item>
							<h2>提款手续费配置</h2>
							<el-form-item
								label="超出单日免费次数："
								class="configure"
								prop="region"
							>
								<el-select
									v-model="queryData.region"
									class="sun"
									placeholder="请选择"
								>
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
								<el-input
									v-model="queryData.onefreetotal"
									class="sun"
									placeholder="0"
								></el-input>
							</el-form-item>
							<el-form-item label="超出单日免费次数总额：" prop="region">
								<el-select
									v-model="queryData.exregion"
									class="sun"
									placeholder="请选择"
								>
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
								<el-input
									v-model="queryData.exregions"
									class="sun"
									placeholder="0"
								></el-input>
							</el-form-item>
							<h2>提款提示语配置</h2>
							<el-form-item
								class="configure"
								label="超出单日最高次数提示语："
								prop="beyondfrequency"
							>
								<el-input
									v-model="queryData.extips"
									style="width:260px"
									placeholder="游戏前端提示语，限制25字以内"
								></el-input>
							</el-form-item>
							<el-form-item
								class="configure"
								label="超出单日最高提款总额提示语："
								prop="beyondtotal"
							>
								<el-input
									v-model="queryData.extotaltips"
									style="width:260px"
									placeholder="游戏前端提示语，限制25字以内"
								></el-input>
							</el-form-item>
							<el-form-item label="状态" prop="region">
								<el-select v-model="ruleForm.region">
									<el-option label="关闭" value="shanghai"></el-option>
									<el-option label="开启" value="beijing"></el-option>
								</el-select>
							</el-form-item>
						</el-form>

						<span slot="footer" class="dialog-footer">
							<el-button
								type="primary"
								icon="el-icon-search"
								:disabled="loading"
								size="medium"
								@click="add"
							>
								提交
							</el-button>
							<el-button @click="reset">重置</el-button>
						</span>
					</el-dialog>
				</template>
			</div>

			<div class="content">
				<el-table
					v-loading="loading"
					border
					size="mini"
					class="small-size-table"
					:data="dataList"
					style="width: 100%"
					:header-cell-style="getRowClass"
				>
					<el-table-column
						prop="userName"
						align="center"
						label="操作"
						width="100px"
					>
						<template>
							<span>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="realName"
						align="center"
						label="状态"
						width="150px"
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.realName"
								:title="scope.row.realName"
								:copy="copy"
							>
								{{ scope.row.realName }}
							</Copy>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="parentProxyName"
						align="center"
						label="VIP等级"
						width="120px"
					>
						<template></template>
					</el-table-column>
					<el-table-column
						prop="accountType"
						align="center"
						width="150px"
						label="单次提款最低限额"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.accountType">
								{{ typeFilter(scope.row.accountType, 'accountType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="labelName"
						align="center"
						width="150px"
						label="单次提款最高限额"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.labelName">
								{{ scope.row.labelName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						width="150px"
						prop="windControlName"
						align="center"
						label="单日免费提款次数"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.windControlName">
								{{ scope.row.windControlName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="transforNum"
						width="150px"
						align="center"
						label="单日提款总次数"
					>
						<template slot-scope="scope">
							<span
								v-if="
									!!scope.row.transforNum || scope.row.transforNum * 1 === 0
								"
							>
								{{ scope.row.transforNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="accountStatus"
						align="center"
						label="单日免费提款总额限制"
						width="150px"
					>
						<template></template>
					</el-table-column>

					<el-table-column
						prop="userBalance"
						align="center"
						label="单日最高提款总额"
						width="150px"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.userBalance || scope.row.userBalance === 0"
							>
								{{ scope.row.userBalance }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="deviceType"
						width="150px"
						align="center"
						label="大额提款标记金额"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.deviceType">
								{{ typeFilter(scope.row.deviceType, 'deviceType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="deviceType"
						width="160px"
						align="center"
						label="超出单日免费次数手续费"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.deviceType">
								{{ typeFilter(scope.row.deviceType, 'deviceType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="deviceType"
						width="160px"
						align="center"
						label="超出单日提款总额手续费"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.deviceType">
								{{ typeFilter(scope.row.deviceType, 'deviceType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					v-show="!!total"
					class="pageValue"
					:current-page.sync="pageNum"
					background
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageSize"
					:page-sizes="$store.getters.pageSizes"
					:total="total"
					@current-change="handleCurrentChange"
					@size-change="handleSizeChange"
				></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'

// import { UTable } from 'umy-ui'

export default {
	mixins: [list],
	data() {
		return {
			queryData: {},
			dialogVisible: false,
			dataList: [],
			formInline: {
				user: '',
				region: ''
			},
			ruleForm: {
				minimum: ''
			}
		}
	},
	computed: {
		rules() {
			const oneFreeRules = (rule, value, callback) => {
				console.log(value)
				if (!Number.isInteger(value) || value < 1) {
					callback(new Error('输入大于单日最高提款次数，请重新输入'))
				} else if (value <= this.ruleForm.maxmum) {
					callback(new Error('输入大于单日最高提款次数，请重新输入'))
				} else if (value > 9999999999) {
					callback(new Error('输入值最多为9999999999'))
				} else {
					callback()
				}
			}
			const oneFree = [
				{ required: true, validator: oneFreeRules, trigger: 'blur' }
			]

			const minimum = [
				{ required: true, message: '请输入金额', trigger: 'blur' },
				{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			]
			const maxmum = [
				{ required: true, message: '请输入金额', trigger: 'blur' },
				{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			]
			const signminimum = [
				{ required: true, message: '请输入金额', trigger: 'blur' },
				{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			]
			const onefreetotal = [
				{
					required: true,
					message: '输入大于单日最高提款次数，请重新输入',
					trigger: 'blur'
				},
				{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			]
			const region = [
				{ required: true, message: '百分比（%）', trigger: 'change' }
			]
			const beyondfrequency = [
				{ required: true, message: '请输入提示语', trigger: 'blur' },
				{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			]
			const beyondtotal = [
				{ required: true, message: '请输入提示语', trigger: 'blur' },
				{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			]
			return {
				oneFree,
				minimum,
				maxmum,
				signminimum,
				onefreetotal,
				region,
				beyondfrequency,
				beyondtotal
			}
		}
	},
	created() {},
	mounted() {},
	methods: {
		add(done) {
			this.$confirm('您确认要执行新增提款设置的操作？')
				.then((_) => {
					done()
				})
				.catch((_) => {})
		},
		open() {
			this.$confirm('您确定要初始化会员提款设置？请谨慎操作！！！', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$message({
						type: 'success',
						message: '初始化成功!'
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '操作取消'
					})
				})
		},

		reset() {
			this.queryData = {
				viplevel: undefined,
				miniamount: undefined,
				maxamount: undefined,
				oneFree: undefined,
				minimum: undefined,
				onefreetotal: undefined,
				region: undefined,
				exregion: undefined,
				exregions: undefined,
				extips: undefined,
				extotaltips: undefined
			}
			this.$refs['form'].resetFields()
		}
	}
}
</script>

<style lang="scss" scoped>
.configure {
	width: 420px;
}
.form-header {
	width: 930px;
	left: 0px;
	background-color: #d3d7df;
	height: 45px;
	line-height: 45px;
	span:nth-child(1) {
		position: absolute;
		left: 30px;
		top: 65px;
		color: #666;
		font-size: 27px;
		font-weight: 700;
	}
	span:nth-child(2) {
		position: absolute;
		right: 30px;
		color: #999;
		font-weight: 400;
		font-size: 18px;
		top: 60px;
	}
}
.chief {
	width: 180px;
}
.el-form-item {
	line-height: 55px;
}
.dialog-footer {
	text-align: center;
}
.sun {
	width: 95px;
}
.lines {
	width: 148px;
}
.line {
	width: 300px;
	.input {
	}
}
/deep/.el-dialog__header {
	text-align: center;
	color: #909399;
	font-weight: 700;
}
</style>
