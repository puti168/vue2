<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
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
						align="center"
						label="vip等级"
						prop="vipSerialNum"
						width="120"
					></el-table-column>
					<el-table-column prop="dayWithdrawalNum" align="center" label="日提款次数">
						<template slot-scope="scope">
							<span>
								<el-input-number
									v-model="scope.row.dayWithdrawalNum"
									size="medium"
									maxlength="10"
									placeholder="请输入"
									clearable
									style="width: 180px"
									@blur="
										checkTransferValue(
											$event,
											scope.row.dayWithdrawalNum,
											scope.$index,
											scope
										)
									"
								></el-input-number>
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="dayWithdrawalQuota"
						align="center"
						label="每日累计提款额度"
					>
						<template slot-scope="scope">
							<span>
								<el-input-number
									v-model.number="scope.row.dayWithdrawalQuota"
									size="medium"
									maxlength="10"
									placeholder="请输入"
									clearable
									style="width: 180px"
								></el-input-number>
							</span>
							<span>%</span>
						</template>
					</el-table-column>
					<el-table-column prop="upgradeBonus" align="center" label="升级礼金">
						<template slot-scope="scope">
							<span>
								<el-input-number
									v-model="scope.row.upgradeBonus"
									size="medium"
									maxlength="10"
									placeholder="请输入"
									clearable
									:precision="0"
									style="width: 180px"
								></el-input-number>
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="birthdayBonus" align="center" label="生日礼金">
						<template slot-scope="scope">
							<span>
								<el-input-number
									v-model="scope.row.birthdayBonus"
									size="medium"
									maxlength="10"
									placeholder="请输入"
									clearable
									style="width: 180px"
								></el-input-number>
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="aboveMonthRedEnvelope" align="center" label="上半月红包">
						<template slot-scope="scope">
							<span>
								<el-input-number
									v-model="scope.row.aboveMonthRedEnvelope"
									size="medium"
									maxlength="10"
									placeholder="请输入"
									clearable
									style="width: 180px"
								></el-input-number>
							</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="下半月红包" width="300">
						<template slot-scope="scope">
							<span>
								<el-input-number
									v-model="scope.row.belowMonthRedEnvelope"
									size="medium"
									maxlength="10"
									placeholder="请输入"
									clearable
									style="width: 180px"
								></el-input-number>
							</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="btn_footer">
				<el-button
					type="primary"
					icon="el-icon-search"
					size="medium"
					style="padding: 0 8px"
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
	name: routerNames.vipDiscountConfig,
	components: {},
	mixins: [list],
	data() {
		return {
			dataList: []
		}
	},
	computed: {},
	mounted() {},
	methods: {
		loadData() {
			this.loading = true
			this.$api
				.memberInComQuery()
				.then((res) => {
					if (res.code === 200) {
						const response = res.data
						this.loading = false
						this.dataList = response
					} else {
						this.loading = false
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		checkTransferValue(val, val1, index, scope) {
			console.log('val', val)
			console.log('val1', val1)
			console.log('index', index)
			console.log('scope', scope)
		},
		saveData() {
			this.$api
				.memberInComSave(this.dataList)
				.then((res) => {
					if (res.code === 200) {
						this.$message({
							message: '保存成功',
							type: 'success'
						})
					} else {
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
				})
		},
		resetData() {
			this.$api
				.memberInComComback()
				.then((res) => {
					if (res.code === 200) {
						this.$message({
							message: '重置成功',
							type: 'success'
						})
					} else {
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
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
.btn_footer {
	text-align: center;
	margin-top: 50px;
}
</style>
