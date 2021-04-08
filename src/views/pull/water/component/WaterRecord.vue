<template>
	<div class="pack-record">
		<div class="params flex-h flex-bc">
			<el-form ref="form" :inline="true" :model="listQuery">
				<el-form-item :label="$t('water_sign_component_waterrecord_477')">
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
				<el-form-item :label="$t('water_sign_component_waterrecord_481')">
					<el-select
						v-model="listQuery.gameTypeName"
						size="medium"
						:placeholder="$t('water_sign_component_waterrecord_482')"
						clearable
						style="width:280px;"
					>
						<el-option :label="$t('water_sign_component_waterrecord_482')" :value="-1"></el-option>
						<el-option
							v-for="(item, index) in gametypes"
							:key="`${index}-${item.value}-${item.type}`"
							:label="item.type"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('water_sign_component_waterrecord_483')">
					<el-input
						v-model="listQuery.deviceNo"
						clearable
						size="medium"
						style="width:280px;"
						:placeholder="$t('water_sign_component_waterrecord_484')"
					></el-input>
				</el-form-item>
				<el-form-item :label="$t('water_sign_component_waterrecord_485')">
					<el-input
						v-model="listQuery.tableNo"
						clearable
						size="medium"
						style="width:280px;"
						:placeholder="$t('water_sign_component_waterrecord_486')"
					></el-input>
				</el-form-item>
				<el-form-item :label="$t('water_sign_component_waterrecord_487')">
					<el-input
						v-model="listQuery.tableName"
						clearable
						size="medium"
						style="width:280px;"
						:placeholder="$t('water_sign_component_waterrecord_488')"
					></el-input>
				</el-form-item>
			</el-form>
			<div class="handle flex m-b-22">
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-search"
					@click="handleSearch"
				>{{ $t('water_sign_component_waterrecord_489') }}</el-button>
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-edit"
					@click="handleReset"
				>{{ $t('water_sign_component_waterrecord_490') }}</el-button>
			</div>
		</div>
		<div class="content">
			<el-table :data="list" style="width: 100%" :header-cell-style="getRowClass">
				<el-table-column
					align="center"
					type="index"
					:label="$t('water_sign_component_waterrecord_491')"
					width="120"
				></el-table-column>
				<el-table-column
					align="center"
					prop="callBeginAt"
					:label="$t('water_sign_component_waterrecord_477')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="callOverAt"
					:label="$t('water_sign_component_waterrecord_492')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="callNo"
					:label="$t('water_sign_component_waterrecord_493')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="formatSec"
					:label="$t('water_sign_component_waterrecord_494')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="deviceNo"
					:label="$t('water_sign_component_waterrecord_483')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="gameTypeName"
					:label="$t('water_sign_component_watertable_index_504')"
				>
					<template slot-scope="scope">{{ filterGame(scope.row.gameTypeName) }}</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="tableNo"
					:label="$t('water_sign_component_waterrecord_485')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="tableName"
					:label="$t('water_sign_component_waterrecord_487')"
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
import { fetchWaterSignRecords } from '@/api/waterSign'
import { getGameTypes } from '@/utils/auth'
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'

export default {
	name: 'WaterRecord',
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
	computed: {
		...mapGetters(['gametype']),
		gametypes() {
			const result = this.gametype.filter((i) => i.value !== '2013')
			return result
		}
	},
	methods: {
		filterGame(val) {
			if (Cookies.get('language') === 'zh') {
				return val
			}
			if (Cookies.get('language') === 'en' && this.gametype) {
				const find = this.gametype.find((i) => i.text === val)
				return find ? find.englishText : val
			}
			return val
		},
		loadData(params = this.listQuery) {
			this.listLoading = true
			params = {
				...this.getParams(params),
				time: undefined
			}
			fetchWaterSignRecords(params)
				.then((response) => {
					this.list = response.data.record.map((item) => {
						const minutes = Math.floor(item.continueTime / 60)
						const seconds = item.continueTime - minutes * 60
						return {
							...item,
							formatSec: this.$t('water_sign_component_waterrecord_495', [
								minutes,
								seconds
							])
						}
					})
					this.total = response.data.totalRecord
					this.listLoading = false
				})
				.then((_) => {
					this.shuffleList = JSON.parse(getGameTypes())
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
