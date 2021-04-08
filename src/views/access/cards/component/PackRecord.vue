<template>
	<!-- 纸牌装盒记录 -->
	<div class="pack-record">
		<div class="params flex-h flex-bc">
			<el-form ref="form" :inline="true" :model="listQuery">
				<el-form-item :label="$t('cards_component_packrecord_1')">
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
				<el-form-item :label="$t('cards_component_packrecord_5')">
					<el-select
						v-model="listQuery.shuffleTypeId"
						size="medium"
						:placeholder="$t('cards_component_packrecord_6')"
						style="width:280px;"
						clearable
					>
						<el-option :label="$t('cards_component_packrecord_6')" :value="-1"></el-option>
						<el-option
							v-for="item in shuffleList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('cards_component_packrecord_7')">
					<el-input
						v-model="listQuery.cardBoxNo"
						clearable
						style="width:280px;"
						size="medium"
						:placeholder="$t('cards_component_packrecord_8')"
					></el-input>
				</el-form-item>
				<el-form-item :label="$t('cards_component_packrecord_9')">
					<el-input
						v-model="listQuery.createdBy"
						clearable
						size="medium"
						style="width:280px;"
						:placeholder="$t('cards_component_packrecord_10')"
					></el-input>
				</el-form-item>
			</el-form>
			<div class="handle flex m-b-22">
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-search"
					@click="handleSearch"
				>{{ $t('cards_component_packrecord_11') }}</el-button>
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-edit"
					@click="handleReset"
				>{{ $t('cards_component_packrecord_12') }}</el-button>
			</div>
		</div>
		<div class="content">
			<el-table :data="list" style="width: 100%" :header-cell-style="getRowClass">
				<el-table-column
					align="center"
					type="index"
					:label="$t('cards_component_packrecord_13')"
					width="120"
				></el-table-column>
				<el-table-column align="center" prop="createdAt" :label="$t('cards_component_packrecord_1')"></el-table-column>
				<el-table-column align="center" prop="cardBoxNo" :label="$t('cards_component_packrecord_7')"></el-table-column>
				<el-table-column align="center" prop="shuffleType" :label="$t('cards_component_packrecord_5')"></el-table-column>
				<el-table-column align="center" prop="createdBy" :label="$t('cards_component_packrecord_9')"></el-table-column>
				<el-table-column
					align="center"
					prop="createdAccount"
					:label="$t('cards_component_packrecord_14')"
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
import { fetchPackRecord, fetchShuffleType } from '@/api/cardRepertory'
export default {
	name: 'PackRecord',
	mixins: [list],
	data() {
		return {
			shuffleList: [],
			list: [],
			listQuery: {
				time: undefined,
				cardColourId: undefined, // 纸牌牌色:1、红牌，2、蓝牌
				createdBy: undefined
			}
		}
	},
	mounted() {
		this.hasPermission('2120') &&
			fetchShuffleType().then((data) => {
				for (const value in data.data) {
					this.shuffleList.push({
						value,
						label: data.data[value]
					})
				}
			})
	},
	methods: {
		loadData(params = this.listQuery) {
			this.listLoading = true
			params = {
				...this.getParams(params),
				time: undefined
			}
			fetchPackRecord(params).then((response) => {
				this.list = response.data.record
				this.total = response.data.totalRecord
				this.listLoading = false
			})
		},
		getSearchParams() {
			const create = this.listQuery.time || []
			const [startTime, endTime] = create
			const params = {
				...this.listQuery,
				startTime: startTime && startTime + '',
				endTime: endTime && endTime + ''
			}
			return params
		},
		handleSearch() {
			this.loadData({
				...this.getSearchParams(),
				pageIndex: 1
			})
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
