<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<h2 class="h2-line">代理提现设置</h2>
			<div class="head flex-h-end">
				<template>
					<el-button type="primary" @click="dialogVisible = true">
						新增代理提款设置
					</el-button>
					<el-dialog
						title="新增代理提款设置"
						:visible.sync="dialogVisible"
						width="780px"
						:before-close="handleClose"
					>
						<h2>代理信息</h2>
						<el-form :rules="rules" :inline="true" :model="ruleForm">
							<el-form-item label-width="147px" prop="agent" label="代理账号：">
								<el-input v-model="ruleForm.user"></el-input>
							</el-form-item>
							<el-form-item label-width="147px" label="代理姓名：">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label-width="147px" label="代理类型：">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label-width="147px" label="代理状态：">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label-width="147px" label="风控层级：">
								<el-input></el-input>
							</el-form-item>
						</el-form>
						<h2>提款配置</h2>
						<el-form
							:rules="rules"
							:inline="true"
							:model="ruleForm"
							class="demo-form-inline"
						>
							<el-form-item label="单次提款最低额度：" prop="minimum">
								<el-input
									v-model="ruleForm.minimum"
									placeholder="请输入金额，为0不限制"
								></el-input>
								<span></span>
							</el-form-item>

							<el-form-item label="单次提款最高额度：" prop="maxmum">
								<el-input
									v-model="ruleForm.maxmum"
									placeholder="请输入金额，为0不限制"
								></el-input>
							</el-form-item>
							<el-form-item label="单日免费提款次数：" prop="oneFree">
								<el-input
									v-model="ruleForm.oneFree"
									placeholder="请输入金额，为0不限制"
								></el-input>
							</el-form-item>
							<el-form-item label="大额提款标记金额：" prop="signminimum">
								<el-input
									v-model="ruleForm.minimum"
									placeholder="请输入金额，为0不限制"
								></el-input>
							</el-form-item>
							<el-form-item label="单日免费提款总额：" prop="onefreetotal">
								<el-input
									v-model="ruleForm.onefreetotal"
									placeholder="请输入金额，为0不限制"
								></el-input>
							</el-form-item>
							<h2>提款手续费配置</h2>
							<el-form-item label="超出单日免费次数：" prop="region">
								<el-select
									v-model="ruleForm.region"
									class="sun"
									placeholder="请选择"
								>
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
								<el-input
									v-model="ruleForm.onefreetotal"
									class="sun"
									placeholder="0"
								></el-input>
							</el-form-item>
							<el-form-item label="超出单日免费次数：" prop="region">
								<el-select
									v-model="ruleForm.region"
									class="sun"
									placeholder="请选择"
								>
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
								<el-input
									v-model="ruleForm.onefreetotal"
									class="sun"
									placeholder="0"
								></el-input>
							</el-form-item>
							<h2>提款提示语配置</h2>
							<el-form-item
								label-width="200px"
								class="line"
								label="超出单日最高次数提示语："
								prop="minimum"
							>
								<el-input
									v-model="ruleForm.minimum"
									placeholder="游戏前端提示语，限制25字以内"
								></el-input>
							</el-form-item>
							<el-form-item
								label-width="220px"
								class="line"
								label="超出单日最高提款总额提示语："
								prop="minimum"
							>
								<el-input
									v-model="ruleForm.minimum"
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
							<el-button type="primary" @click="dialogVisible = false">
								提交
							</el-button>
							<el-button @click="resetForm('ruleForm')">重置</el-button>
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
						label="序号"
						width="100px"
					>
						<template>
							<span>-</span>
						</template>
					</el-table-column>
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
						label="代理账号"
						width="120px"
					>
						<template></template>
					</el-table-column>
					<el-table-column
						prop="accountType"
						align="center"
						width="150px"
						label="代理姓名"
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
						label="代理类型"
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
						label="代理状态"
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
						label="风控层级"
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
						label="单次提现最低限额"
						width="150px"
					>
						<template></template>
					</el-table-column>

					<el-table-column
						prop="userBalance"
						align="center"
						label="单次提现最高限额"
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
						label="单日免费提现次数"
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
						label="单日最高提款次数"
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
						label="单日免费提款总额限制"
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
						label="大额提现标记金额"
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
				minimum: '',
				agent: ''
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
			const agent = [
				{ required: true, message: '请输入代理账号', trigger: 'blur' },
				{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			]
			const oneFree = [
				{ required: true, validator: oneFreeRules, trigger: 'blur' }
			]

			const minimum = [
				{ required: true, message: '', trigger: 'blur' },
				{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			]
			const maxmum = [
				{ required: true, message: '', trigger: 'blur' },
				{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			]
			const signminimum = [
				{ required: true, message: '', trigger: 'blur' },
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
			return {
				oneFree,
				minimum,
				maxmum,
				signminimum,
				onefreetotal,
				region,
				agent
			}
		}
	},
	created() {},
	mounted() {},
	methods: {
		handleClose(done) {
			this.$confirm('您确认要执行新增提款设置的操作？',)
				.then((_) => {
					done()
				})
				.catch((_) => {})
		},

		reset() {
			this.queryData = {}
		}
	}
}
</script>

<style lang="scss" scoped>
.dialog-footer{
	text-align: center
}
.sun {
	width: 95px;
}
.lines {
	width: 148px;
}
.line {
	width: 300px;

}
/deep/.el-dialog__header {
	text-align: center;
	color: #909399;
	font-weight: 700;
}
</style>
