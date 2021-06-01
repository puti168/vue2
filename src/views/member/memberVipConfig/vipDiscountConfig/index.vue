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
								<el-input
									v-model="scope.row.minTransfer"
									size="medium"
									maxlength="20"
									placeholder="请输入"
									clearable
									style="width: 180px"
								></el-input>
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="dividends" align="center" label="红利比例">
						<template slot-scope="scope">
							<span>
								<el-input
									v-model="scope.row.dividends"
									size="medium"
									maxlength="20"
									placeholder="请输入"
									clearable
									style="width: 180px"
								></el-input>
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="turnover" align="center" label="最高奖金">
						<template slot-scope="scope">
							<span>
								<el-input
									v-model="scope.row.dividends"
									size="medium"
									maxlength="20"
									placeholder="请输入"
									clearable
									style="width: 180px"
								></el-input>
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="turnover" align="center" label="流水倍数">
						<template slot-scope="scope">
							<span>
								<el-input
									v-model="scope.row.turnover"
									size="medium"
									maxlength="20"
									placeholder="请输入"
									clearable
									style="width: 180px"
								></el-input>
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
	methods: {}
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
	text-align: center;
	color: #909399;
	font-weight: 700;
}
</style>
