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
						prop="vipLevel"
						width="120"
					></el-table-column>
					<el-table-column
						prop="minTransfer"
						align="center"
						label="最低转账额度"
					>
						<template slot-scope="scope">
							<span>
								<el-input-number
									v-model="scope.row.minTransfer"
									size="medium"
									maxlength="20"
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
								></el-input-number>
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="dividends" align="center" label="红利比例">
						<template slot-scope="scope">
							<span>
								<el-input-number
									v-model.number="scope.row.dividends"
									size="medium"
									maxlength="20"
									placeholder="请输入"
									clearable
									style="width: 180px"
								></el-input-number>
							</span>
							<span>%</span>
						</template>
					</el-table-column>
					<el-table-column prop="turnover" align="center" label="最高奖金">
						<template slot-scope="scope">
							<span>
								<el-input-number
									v-model="scope.row.bonus"
									size="medium"
									maxlength="20"
									placeholder="请输入"
									clearable
									style="width: 180px"
								></el-input-number>
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="turnover" align="center" label="流水倍数">
						<template slot-scope="scope">
							<span>
								<el-input-number
									v-model="scope.row.turnover"
									size="medium"
									maxlength="20"
									placeholder="请输入"
									clearable
									style="width: 180px"
								></el-input-number>
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="times" align="center" label="参与次数">
						<template slot-scope="scope">
							<span>
								<el-select v-model="scope.row.times" placeholder="请选择">
									<el-option
										v-for="item in []"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									></el-option>
								</el-select>
							</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="参与场馆" width="300">
						<template slot-scope="scope">
							<span>
								<el-select
									v-model="scope.row.venue"
									multiple
									placeholder="请选择"
								>
									<el-option
										v-for="item in []"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									></el-option>
								</el-select>
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
				.memberVipPromotionListAPI()
				.then((res) => {
					this.loading = false
					const { code, data, msg } = res
					if (code === 200) {
						this.dataList = data || []
						this.dataList.reverse()
					} else {
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
