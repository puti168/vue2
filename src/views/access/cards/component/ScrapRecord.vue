<template>
	<!-- 纸牌报废记录 -->
	<div class="scrap-record">
		<div class="params flex-h flex-bc">
			<el-form ref="form" :inline="true" :model="listQuery">
				<el-form-item :label="$t('cards_component_scraprecord_15')">
					<el-date-picker
						v-model="listQuery.time"
						size="medium"
						format="yyyy-MM-dd"
						:picker-options="pickerOptions"
						type="daterange"
						:range-separator="$t('dealer_index_212')"
						:start-placeholder="$t('开始日期')"
						:end-placeholder="$t('结束日期')"
						align="right"
						value-format="timestamp"
					></el-date-picker>
				</el-form-item>
				<el-form-item :label="$t('cards_component_scraprecord_19')">
					<el-select
						v-model="listQuery.cardColour"
						size="medium"
						clearable
						style="width:280px;"
						:placeholder="$t('cards_component_scraprecord_20')"
					>
						<el-option :label="$t('cards_component_scraprecord_20')" :value="-1"></el-option>
						<el-option :label="$t('cards_component_scraprecord_21')" :value="1"></el-option>
						<el-option :label="$t('cards_component_scraprecord_22')" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('cards_component_scraprecord_23')">
					<el-input
						v-model="listQuery.cardBoxNo"
						size="medium"
						style="width:280px;"
						clearable
						:placeholder="$t('cards_component_scraprecord_24')"
					></el-input>
				</el-form-item>
				<el-form-item :label="$t('cards_component_scraprecord_25')">
					<el-input
						v-model="listQuery.createdBy"
						size="medium"
						style="width:280px;"
						clearable
						:placeholder="$t('cards_component_scraprecord_26')"
					></el-input>
				</el-form-item>
			</el-form>
			<div class="handle flex m-b-22">
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-search"
					@click="handleSearch"
				>{{ $t('cards_component_scraprecord_27') }}</el-button>
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-edit"
					@click="handleReset"
				>{{ $t('cards_component_scraprecord_28') }}</el-button>
			</div>
		</div>
		<div class="content">
			<el-table :data="list" style="width: 100%" :header-cell-style="getRowClass">
				<el-table-column
					align="center"
					type="index"
					:label="$t('cards_component_scraprecord_29')"
					width="120"
				></el-table-column>
				<el-table-column
					align="center"
					prop="discardTime"
					:label="$t('cards_component_scraprecord_15')"
				></el-table-column>
				<el-table-column align="center" prop="cardColour" :label="$t('cards_component_scraprecord_19')">
					<template slot-scope="scope">
						{{
						scope.row.cardColour === 1
						? $t('cards_component_scraprecord_21')
						: $t('cards_component_scraprecord_22')
						}}
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="discardNumber"
					:label="$t('cards_component_scraprecord_30')"
				></el-table-column>
				<el-table-column align="center" prop="cardBoxNo" :label="$t('cards_component_scraprecord_23')"></el-table-column>
				<el-table-column align="center" prop="createdBy" :label="$t('cards_component_scraprecord_25')"></el-table-column>
				<el-table-column
					align="center"
					prop="createdAcct"
					:label="$t('cards_component_scraprecord_31')"
				></el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination
				v-if="total > 0"
				:current-page.sync="pageIndex"
				layout="total, sizes,prev, pager, next, jumper"
				:page-sizes="$store.getters.pageSizes"
				:total="total"
				:page-size="pageSize"
				@current-change="handleCurrentChange"
				@size-change="handleSizeChange"
			></el-pagination>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import { fetchDiscardList } from '@/api/cardRepertory'
export default {
	name: 'ScrapRecord',
	mixins: [list],
	data() {
		return {
			list: [],
			listQuery: {
				time: undefined,
				cardColourId: undefined, // 纸牌牌色:1、红牌，2、蓝牌
				createdBy: undefined
			}
		}
	},
	methods: {
		loadData(params = this.listQuery) {
			this.listLoading = true
			params = {
				...this.getParams(params),
				time: undefined
			}
			fetchDiscardList(params).then((response) => {
				this.list = response.data.record
				this.total = response.data.totalRecord
				this.listLoading = false
			})
		},
		getSearchParams(config = {}) {
			const create = this.listQuery.time || []
			const [startTime, endTime] = create
			const params = {
				...this.listQuery,

				startDate: startTime && startTime + '',
				endDate: endTime && endTime + ''
			}
			return { ...params, ...config }
		},
		handleSearch() {
			this.loadData(this.getSearchParams({ pageIndex: 1 }))
		},
		handleCurrentChange() {
			this.loadData(this.getSearchParams())
		},
		handleReset() {
			this.listQuery = {
				time: undefined,
				cardColourId: undefined, // 纸牌牌色:1、红牌，2、蓝牌
				createdBy: undefined
			}
			this.loadData({ pageIndex: 1 })
		}
	}
}
</script>
