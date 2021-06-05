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
							<span>
								<el-input
									v-model="scope.row.vipGradeName"
									size="medium"
									placeholder="请输入"
									clearable
									maxlength="10"
									oninput="value=value.replace(/[\u4E00-\u9FA5]/g ,'')"
									style="width: 180px"
								></el-input>
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="totalDeposit" align="center">
						<template slot="header">
							升级条件1
							<br />
							累计存款(包含代充)≥
						</template>
						<template slot-scope="scope">
							<span>
								<el-input
									v-model.number="scope.row.totalDeposit"
									size="medium"
									onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
									maxlength="10"
									placeholder="请输入"
									clearable
									style="width: 180px"
									@blur="
										checkTransferValue(
											$event,
											scope.row.minTransfer,
											scope.$index,
											scope
										)
									"
								></el-input>
							</span>
							<span>%</span>
						</template>
					</el-table-column>
					<el-table-column prop="tatalValidWater" align="center">
						<template slot="header">
							升级条件2
							<br />
							累计有效流水≥
						</template>
						<template slot-scope="scope">
							<span>
								<el-input
									v-model="scope.row.tatalValidWater"
									size="medium"
									maxlength="10"
									onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
									placeholder="请输入"
									clearable
									:precision="0"
									style="width: 180px"
								></el-input>
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="relegationWater"
						align="center"
						label="保级流水≥"
					>
						<template slot-scope="scope">
							<span>
								<el-input
									v-model="scope.row.relegationWater"
									size="medium"
									maxlength="10"
									onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
									placeholder="请输入"
									clearable
									style="width: 180px"
								></el-input>
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="relegationValidPeriod" align="center" label="保级有效期（天）">
						<template slot-scope="scope">
							<span>
								<el-input
									v-model="scope.row.relegationValidPeriod"
									size="medium"
									maxlength="10"
									onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
									placeholder="请输入"
									clearable
									style="width: 180px"
								></el-input>
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
			dataList: [
				{
					vipLevel: 'VIP0',
					minTransfer: '500',
					dividends: '30%',
					bonus: '500',
					turnover: '500',
					times: 1,
					venue: []
				},
				{
					vipLevel: 'VIP1',
					minTransfer: '600',
					dividends: '35%',
					bonus: '600',
					turnover: '600',
					times: 2,
					venue: []
				},
				{
					vipLevel: 'VIP2',
					minTransfer: '700',
					dividends: '40%',
					bonus: '700',
					turnover: '700',
					times: 3,
					venue: []
				},
				{
					vipLevel: 'VIP3',
					minTransfer: '700',
					dividends: '40%',
					bonus: '700',
					turnover: '700',
					times: 3,
					venue: []
				},
				{
					vipLevel: 'VIP4',
					minTransfer: '700',
					dividends: '40%',
					bonus: '700',
					turnover: '700',
					times: 3,
					venue: []
				},
				{
					vipLevel: 'VIP5',
					minTransfer: '700',
					dividends: '40%',
					bonus: '700',
					turnover: '700',
					times: 3,
					venue: []
				},
				{
					vipLevel: 'VIP6',
					minTransfer: '700',
					dividends: '40%',
					bonus: '700',
					turnover: '700',
					times: 3,
					venue: []
				},
				{
					vipLevel: 'VIP7',
					minTransfer: '700',
					dividends: '40%',
					bonus: '700',
					turnover: '700',
					times: 3,
					venue: []
				},
				{
					vipLevel: 'VIP8',
					minTransfer: '700',
					dividends: '40%',
					bonus: '700',
					turnover: '700',
					times: 3,
					venue: []
				},
				{
					vipLevel: 'VIP9',
					minTransfer: '700',
					dividends: '40%',
					bonus: '700',
					turnover: '700',
					times: 3,
					venue: []
				},
				{
					vipLevel: 'VIP10',
					minTransfer: '700',
					dividends: '40%',
					bonus: '700',
					turnover: '700',
					times: 3,
					venue: []
				}
			]
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
		checkTransferValue(val, val1, index, scope) {
			console.log('val', val)
			console.log('val1', val1)
			console.log('index', index)
			console.log('scope', scope)
		},
		loadData() {
			this.loading = true
			this.$api
				.memberVipGradeSelectAPI()
				.then((res) => {
					const { code, data, msg } = res
					console.log('res', res)
					if (code === 200) {
						this.loading = false
						this.dataList = data || []
						this.dataList.reverse()
					} else {
						this.loading = false
						this.$message({
							message: msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		saveData() {},
		resetData() {}
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
