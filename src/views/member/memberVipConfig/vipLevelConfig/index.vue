<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="content">
				<el-form>
					<el-table
						v-loading="loading"
						border
						size="mini"
						class="small-size-table"
						:data="dataList"
						style="width: 100%"
						:header-cell-style="_getRowClass"
					>
						<el-table-column
							align="center"
							label="vip等级"
							prop="vipSerialNum"
							width="120"
						>
							<template slot-scope="scope">
								<span v-if="scope.row.vipSerialNum">
									VIP{{ scope.row.vipSerialNum }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="vipGradeName"
							align="center"
							label="VIP等级名称"
						>
							<template slot-scope="scope">
								<el-input
									v-model="scope.row.vipGradeName"
									size="medium"
									placeholder="请输入"
									maxlength="10"
									clearable
									style="width: auto"
									@input="tableVipGradeNameChange(scope.row)"
								></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="totalDeposit" align="center">
							<template slot="header">
								升级条件1
								<br />
								累计存款(包含代充)≥
							</template>
							<template slot-scope="scope">
								<span v-if="scope.row.vipSerialNum * 1">
									<el-input-number
										v-model.number="scope.row.totalDeposit"
										size="medium"
										:max="9999999999"
										placeholder="请输入"
										:precision="0"
										:min="0"
										style="width: auto"
										@blur="checkTransferValue(scope.row, 'totalDeposit')"
									></el-input-number>
								</span>
								<span v-else>0</span>
							</template>
						</el-table-column>
						<el-table-column prop="tatalValidWater" align="center">
							<template slot="header">
								升级条件2
								<br />
								累计有效流水≥
							</template>
							<template slot-scope="scope">
								<span v-if="scope.row.vipSerialNum * 1">
									<el-input-number
										v-model="scope.row.tatalValidWater"
										size="medium"
										:max="9999999999"
										:precision="0"
										:min="0"
										placeholder="请输入"
										style="width: auto"
										@blur="checkTransferValue(scope.row, 'tatalValidWater')"
									></el-input-number>
								</span>
								<span v-else>0</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="relegationWater"
							align="center"
							label="保级流水≥"
						>
							<template slot-scope="scope">
								<span v-if="scope.row.vipSerialNum * 1">
									<el-input-number
										v-model="scope.row.relegationWater"
										size="medium"
										:max="9999999999"
										:precision="0"
										:min="0"
										placeholder="请输入"
										style="width: auto"
										@blur="checkTransferValue(scope.row, 'relegationWater')"
									></el-input-number>
								</span>
								<span v-else>0</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="relegationValidPeriod"
							align="center"
							label="保级有效期（天）"
						>
							<template slot-scope="scope">
								<span v-if="scope.row.vipSerialNum * 1">
									<el-input-number
										v-model="scope.row.relegationValidPeriod"
										size="medium"
										:max="9999999999"
										:precision="0"
										:min="0"
										placeholder="请输入"
										style="width: auto"
										@blur="
											checkTransferValue(scope.row, 'relegationValidPeriod')
										"
									></el-input-number>
								</span>
								<span v-else>0</span>
							</template>
						</el-table-column>
					</el-table>
				</el-form>
			</div>
			<div class="btn_footer">
				<el-button
					v-if="hasPermission('246')"
					type="primary"
					icon="el-icon-search"
					size="medium"
					style="padding: 0 8px"
					:disabled="loadingT"
					@click="saveData()"
				>
					保存
				</el-button>
				<el-button
					icon="el-icon-refresh-left"
					size="medium"
					style="padding: 0 8px"
					@click="resetData()"
				>
					恢复上次配置
				</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { routerNames } from '@/utils/consts'

export default {
	name: routerNames.vipLevelConfig,
	mixins: [list],
	data() {
		this.saveData = this.throttle(this.saveData, 1000)
		return {
			dataList: [],
			loading: false,
			loadingT: false,
			status: undefined
		}
	},
	computed: {},
	mounted() {},
	methods: {
		_getRowClass({ row, column, rowIndex, columnIndex }) {
			if (rowIndex === 0) {
				return 'background:#EFEFEF; height: 50px; font-size: 14px; font-weight: 650; color: rgba(0, 0, 0, 0.847058823529412)'
			} else {
				return ''
			}
		},
		checkTransferValue(row, type) {
			if (!row[type]) {
				row[type] = 0
			}
		},
		loadData() {
			this.loading = true
			this.$api
				.memberVipGradeSelectAPI()
				.then((res) => {
					this.loading = false
					const { code, data, msg } = res
					if (res && code && code === 200) {
						this.dataList = data || []
						this.dataList.reverse()
					} else {
						this.$message({
							message: res && msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		saveData() {
			this.loadingT = true
			const errorArr = []
			const listUpdateMemberVipGradeReqDto =
				this.dataList.map((item) => {
					item.error && errorArr.push(item.error)
					return {
						id: item.id,
						relegationValidPeriod: item.relegationValidPeriod,
						relegationWater: item.relegationWater,
						totalDeposit: item.totalDeposit,
						vipGradeName: item.vipGradeName,
						vipSerialNum: item.vipSerialNum,
						tatalValidWater: item.tatalValidWater
					}
				}) || []
			if (!errorArr.length) {
				this.$api
					.memberVipGradeUpDateAPI({ listUpdateMemberVipGradeReqDto })
					.then((res) => {
						this.loadingT = false
						const { code, msg } = res
						if (res && code && code === 200) {
							this.$message({
								message: '保存成功',
								type: 'success'
							})
						} else {
							this.$message({
								message: res && msg,
								type: 'error'
							})
						}

						this.loadData()
					})
					.catch(() => {
						this.loadingT = false
					})
			}
			setTimeout(() => {
				this.loadingT = false
			}, 1500)
		},
		resetData() {},
		checkVipName(e, scope) {
			const val = e.target.value
			if (!val) {
				this.$message({
					message: `请输入vip${scope}等级名称`,
					type: 'warning'
				})
				this.status = false
			} else {
				this.status = true
			}
		},
		tableVipGradeNameChange(row) {
			const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
			if (row.vipGradeName) {
				console.log('看一下', reg.test(row.vipGradeName))
				if (!reg.test(row.vipGradeName)) {
					row.error = '不支持空格及特殊字符'
				} else {
					row.error = ''
				}
			} else {
				row.error = '不能为空'
			}
		}
		// checkValue(val) {
		//     const obj = val.target
		//     console.log('value', obj)
		//     obj.value = obj.value.replace(/[^\u4E00-\u9FA5]/g, '')
		// }
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
.btn_footer {
	text-align: center;
	margin-top: 50px;
}
.span-row-style {
	display: inline-block;
	margin-top: 10px;
}
</style>
