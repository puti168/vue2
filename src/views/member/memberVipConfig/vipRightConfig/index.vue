<template>
	<div class="game-container report-container vipRightConfig">
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
					<el-table-column
						prop="dayWithdrawalNum"
						align="center"
						label="日提款次数"
					>
						<template slot-scope="scope">
							<span>
								<el-input-number
									v-model="scope.row.dayWithdrawalNum"
									size="medium"
									:max="999999999"
									:min="1"
									placeholder="请输入"
									clearable
									style="width: 150px"
									@blur="checkTransferValue(scope.row, 'dayWithdrawalNum')"
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
									:max="999999999"
									:min="1"
									placeholder="请输入"
									clearable
									style="width: 150px"
									@blur="checkTransferValue(scope.row, 'dayWithdrawalQuota')"
								></el-input-number>
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="upgradeBonus" align="center" label="升级礼金">
						<template slot-scope="scope">
							<span v-if="scope.row.vipSerialNum!=='VIP0'">
								<el-input-number
									v-model="scope.row.upgradeBonus"
									size="medium"
									:max="999999999"
									:min="0"
									placeholder="请输入"
									clearable
									:precision="0"
									style="width: 150px"
									@blur="checkTransferValue(scope.row, 'upgradeBonus')"
								></el-input-number>
							</span>
							<span v-else>0</span>
						</template>
					</el-table-column>
					<el-table-column prop="birthdayBonus" align="center" label="生日礼金">
						<template slot="header" slot-scope="scope">
							<el-popover
								placement="top-start"
								title="提示"
								width="280"
								trigger="hover"
							>
								<div v-if="!scope.row">
									<p>
										会员生日时，系统根据当前的vip等级在24点触发日那天发出生日礼金。
									</p>
									<p>
										账号注册时间和会员生日时间一定要相差3个月，小于时系统将不派发生日礼金
									</p>
								</div>
								<div slot="reference" class="el-icon-question">
									<span class="other-class">生日礼金</span>
								</div>
							</el-popover>
						</template>
						<template slot-scope="scope">
							<span v-if="scope.row.vipSerialNum!=='VIP0'">
								<el-input-number
									v-model="scope.row.birthdayBonus"
									size="medium"
									:max="999999999"
									:min="0"
									placeholder="请输入"
									clearable
									style="width: 150px"
									@blur="checkTransferValue(scope.row, 'birthdayBonus')"
								></el-input-number>
							</span>
							<span v-else>0</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="aboveMonthRedEnvelope"
						align="center"
						label="上半月红包"
					>
						<template slot="header" slot-scope="scope">
							<el-popover
								placement="top-start"
								title="提示"
								width="280"
								trigger="hover"
							>
								<div v-if="!scope.row">
									<p>每月1号，固定发放的奖励金额</p>
								</div>
								<div slot="reference" class="el-icon-question">
									<span class="other-class">上半月红包</span>
								</div>
							</el-popover>
						</template>
						<template slot-scope="scope">
							<span v-if="scope.row.vipSerialNum!=='VIP0'">
								<el-input-number
									v-model="scope.row.aboveMonthRedEnvelope"
									size="medium"
									:max="999999999"
									:min="0"
									placeholder="请输入"
									clearable
									style="width: 150px"
									@blur="checkTransferValue(scope.row, 'aboveMonthRedEnvelope')"
								></el-input-number>
							</span>
							<span v-else>0</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="下半月红包" width="300">
						<template slot="header" slot-scope="scope">
							<el-popover
								placement="top-start"
								title="提示"
								width="280"
								trigger="hover"
							>
								<div v-if="!scope.row">
									<p>每月15号，固定发放的奖励金额</p>
								</div>
								<div slot="reference" class="el-icon-question">
									<span class="other-class">下半月红包</span>
								</div>
							</el-popover>
						</template>
						<template slot-scope="scope">
							<span v-if="scope.row.vipSerialNum!=='VIP0'">
								<el-input-number
									v-model="scope.row.belowMonthRedEnvelope"
									size="medium"
									:max="999999999"
									:min="0"
									placeholder="请输入"
									clearable
									style="width: 150px"
									@blur="checkTransferValue(scope.row, 'belowMonthRedEnvelope')"
								></el-input-number>
							</span>
							<span v-else>0</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="btn_footer">
				<el-button
                    v-if="hasPermission('247')"
					type="primary"
					icon="el-icon-search"
					size="medium"
					style="padding: 0 8px"
					@click="saveData()"
				>
					保存
				</el-button>
				<!-- <el-button
					icon="el-icon-refresh-left"
					size="medium"
					style="padding: 0 8px"
					@click="resetData()"
				>
					恢复上次配置
				</el-button> -->
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
		checkTransferValue(row, type) {
			if (!row[type]) {
				row[type] = 0
			}
		},
		saveData() {
			this.$api
				.memberInComSave({
					incomeList: this.dataList
				})
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
				.catch(() => {})
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
				.catch(() => {})
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
