<template>
	<!-- 纸牌库存列表 -->
	<div class="stock-list">
		<div class="params flex-h flex-bc">
			<el-form ref="form" :inline="true" :model="listQuery">
				<el-form-item :label="$t('cards_component_stocklist_index_36')">
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
				<el-form-item :label="$t('cards_component_stocklist_index_40')">
					<el-select
						v-model="listQuery.typeId"
						clearable
						size="medium"
						style="width:280px;"
						:placeholder="$t('cards_component_stocklist_index_41')"
					>
						<el-option :label="$t('cards_component_stocklist_index_41')" :value="-1"></el-option>
						<el-option :label="$t('cards_component_stocklist_index_42')" :value="1"></el-option>
						<el-option :label="$t('cards_component_stocklist_index_43')" :value="2"></el-option>
						<el-option :label="$t('cards_component_stocklist_index_44')" :value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('cards_component_stocklist_index_45')">
					<el-select
						v-model="listQuery.cardColourId"
						size="medium"
						clearable
						style="width:280px;"
						:placeholder="$t('cards_component_stocklist_index_41')"
					>
						<el-option :label="$t('cards_component_stocklist_index_41')" :value="-1"></el-option>
						<el-option :label="$t('cards_component_stocklist_index_46')" :value="1"></el-option>
						<el-option :label="$t('cards_component_stocklist_index_47')" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('cards_component_stocklist_index_48')">
					<el-input
						v-model="listQuery.createdBy"
						clearable
						size="medium"
						style="width:280px;"
						:placeholder="$t('cards_component_stocklist_index_49')"
					></el-input>
				</el-form-item>
			</el-form>
			<div class="handle flex m-b-22">
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-search"
					@click="handleSearch"
				>{{ $t('cards_component_stocklist_index_50') }}</el-button>
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-edit"
					@click="handleReset"
				>{{ $t('cards_component_stocklist_index_51') }}</el-button>
			</div>
		</div>
		<el-divider></el-divider>
		<div class="content">
			<div class="content-head flex">
				<template v-for="(item, index) in inOutTabs">
					<el-button :key="index" size="small" type="primary" @click="handleHeadTab(index)">{{ item }}</el-button>
				</template>
			</div>
			<el-table :data="list" style="width: 100%" :header-cell-style="getRowClass">
				<el-table-column
					align="center"
					type="index"
					:label="$t('cards_component_stocklist_index_53')"
					width="120"
				></el-table-column>
				<el-table-column
					align="center"
					prop="createdAt"
					:label="$t('cards_component_stocklist_index_36')"
				></el-table-column>
				<el-table-column align="center" prop="type" :label="$t('cards_component_stocklist_index_40')">
					<template slot-scope="scope">
						{{
						scope.row.type && scope.row.type !== ''
						? filterWarehouseTypes(scope.row.type)
						: '-'
						}}
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="cardColour"
					:label="$t('cards_component_stocklist_index_45')"
				>
					<template slot-scope="scope">
						{{
						scope.row.cardColour && scope.row.cardColour !== ''
						? filterCardColourTypes(scope.row.cardColour)
						: '-'
						}}
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="supplierName"
					:label="$t('cards_component_stocklist_index_54')"
				></el-table-column>
				<el-table-column align="center" prop="amount" :label="$t('cards_component_stocklist_index_55')"></el-table-column>
				<el-table-column
					align="center"
					prop="cardStock"
					:label="$t('cards_component_stocklist_index_56')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="createdBy"
					:label="$t('cards_component_stocklist_index_48')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="createdAccount"
					:label="$t('cards_component_stocklist_index_57')"
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
			<!-- 纸牌入库出库弹出框 -->
			<el-dialog
				width="600px"
				:title="inOutTitle"
				:close-on-click-modal="false"
				center
				:visible.sync="inOutStockStatus"
				:destroy-on-close="true"
				@close="handleClose"
			>
				<el-form
					ref="inOutStockForm"
					:model="inOutStockForm"
					:rules="inOutStockFormRules"
					label-width="auto"
				>
					<el-form-item :label="$t('cards_component_stocklist_index_54')" prop="supplierName">
						<el-input
							v-model="inOutStockForm.supplierName"
							size="medium"
							maxlength="20"
							:placeholder="$t('cards_component_stocklist_index_58')"
						></el-input>
					</el-form-item>
					<!-- 纸牌出入库提示 -->
					<el-form-item :label="inOutTitle" prop="none"></el-form-item>
					<el-form-item
						:style="{ paddingLeft: '15px' }"
						:label="$t('cards_component_stocklist_index_34')"
						prop="blueCardCount"
					>
						<el-input
							v-model="inOutStockForm.blueCardCount"
							size="medium"
							maxlength="6"
							:placeholder="$t('cards_component_stocklist_index_59')"
						></el-input>
					</el-form-item>
					<el-form-item
						:style="{ paddingLeft: '15px' }"
						:label="$t('cards_component_stocklist_index_35')"
						prop="redCardCount"
					>
						<el-input
							v-model="inOutStockForm.redCardCount"
							size="medium"
							maxlength="6"
							:placeholder="$t('cards_component_stocklist_index_59')"
						>
							<em class="suffix">{{ $t('cards_component_stocklist_index_60') }}</em>
						</el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="inOutStockStatus = false">{{ $t('cards_component_stocklist_index_61') }}</el-button>
					<el-button
						type="primary"
						@click="handleInOutCommit"
					>{{ $t('cards_component_stocklist_index_62') }}</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import validate from '@/mixins/validate'
import { fetchDiscard, postOutbound } from '@/api/cardRepertory'
import { message } from '@/utils/message'
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'

export default {
	name: 'StockList',
	mixins: [list, validate],
	data() {
		const isMoreThanZero = (rule, value, callback) => {
			if (
				+this.inOutStockForm.blueCardCount + +this.inOutStockForm.redCardCount >
					0 &&
				+value >= 0
			) {
				this.$refs['inOutStockForm'].clearValidate([
					'blueCardCount',
					'redCardCount'
				])
				callback()
			} else if (+value === 0 || value.trim() === '') {
				callback(new Error(this.$t('cards_component_stocklist_index_63')))
			} else {
				callback()
			}
		}
		const validName = (rule, value, callback) => {
			const regValue = value ? value.replace(/[\u4e00-\u9fa5]/g, 'xx') : ''
			if (regValue && /^[A-Za-z0-9]{0,20}$/.test(regValue)) {
				callback()
			} else {
				callback(this.$t('cards_component_stocklist_index_64'))
			}
		}
		return {
			dialogVisible: false,
			list: [],
			listQuery: {
				time: undefined,
				cardColourId: undefined, // 纸牌牌色:1、红牌，2、蓝牌
				createdBy: undefined
			},
			inOutStockStatus: false,
			inOutTitle: '',
			inOutStockForm: {
				supplierName: '',
				blueCardCount: '',
				redCardCount: '',
				none: '-1'
			},
			inOutStockFormRules: {
				supplierName: [
					{
						required: true,
						validator: validName
					}
				],
				none: [
					{
						required: true
					}
				],
				blueCardCount: [
					{ validator: this.notSupportSpecial, trigger: 'blur' },
					{ validator: this.isInt, trigger: 'blur' },
					{ validator: isMoreThanZero, trigger: 'blur' }
				],
				redCardCount: [
					{ validator: this.notSupportSpecial, trigger: 'blur' },
					{ validator: this.isInt, trigger: 'blur' },
					{ validator: isMoreThanZero, trigger: 'blur' }
				]
			},

			inOutTabsId: ['2112', '2111', '2113'],
			form: {
				originPwd: '',
				newPwd: '',
				rePwd: ''
			},
			pageIndex: 1,
			pageSize: 20
		}
	},
	computed: {
		inOutTabs() {
			// 纸牌库管类型：1、出库，2、入库，3、废弃
			const arr = []

			this.hasPermission('2111') && arr.push(this.$t('route.cardstorage'))
			this.hasPermission('2112') && arr.push(this.$t('route.outcards'))
			this.hasPermission('2113') && arr.push(this.$t('route.cardscrap'))

			return arr
		},
		...mapGetters(['cardColourType', 'warehouseType']),
		cardColourTypes() {
			const types = this.cardColourType || []
			return types.map((item) => {
				return {
					value: item.value,
					label: item.text,
					zh: item.text,
					en: item.englishText
				}
			})
		},
		warehouseTypes() {
			const types = this.warehouseType || []
			return types.map((item) => {
				return {
					value: item.value,
					label: item.text,
					zh: item.text,
					en: item.englishText
				}
			})
		}
	},
	watch: {
		'inOutStockForm.redCardCount': {
			handler(value) {
				if (value.includes('.')) {
					this.inOutStockForm.redCardCount = value.replace('.', '')
				}
			}
		},
		'inOutStockForm.blueCardCount': {
			handler(value) {
				if (value.includes('.')) {
					this.inOutStockForm.blueCardCount = value.replace('.', '')
				}
			}
		}
	},
	methods: {
		filterCardColourTypes(c) {
			const arr = this.cardColourTypes || []
			const find = arr.find((item) => item.label === c)
			if (Cookies.get('language') === 'zh') {
				return (find && find.zh) || '-'
			}
			if (Cookies.get('language') === 'en') {
				return (find && find.en) || '-'
			}
			return '-'
		},
		filterWarehouseTypes(c) {
			const arr = this.warehouseTypes || []
			const find = arr.find((item) => item.label === c)
			if (Cookies.get('language') === 'zh') {
				return (find && find.zh) || '-'
			}
			if (Cookies.get('language') === 'en') {
				return (find && find.en) || '-'
			}
			return '-'
		},
		loadData(params = this.listQuery) {
			this.listLoading = true
			params = {
				...this.getParams(params),

				time: undefined
			}
			fetchDiscard(params).then((response) => {
				this.list = response.data.record
				this.total = response.data.totalRecord
				this.listLoading = false
			})
		},
		handleClose() {
			this.inOutStockForm = {
				supplierName: '',
				blueCardCount: '',
				redCardCount: '',
				none: '-1'
			}
			this.$refs.inOutStockForm.resetFields()
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
			this.loadData({ ...this.getSearchParams(), pageIndex: 1 })
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
		},
		handleHeadTab(index) {
			this.inOutStockStatus = true
			this.inOutStockForm.type = index
			this.inOutTitle = this.inOutTabs[index]
		},
		handleInOutCommit() {
			// if (
			// 	this.inOutStockForm.blueCardCount === '' &&
			// 	this.inOutStockForm.redCardCount === ''
			// ) {
			// 	if (this.messageInstance) this.messageInstance.close()
			// 	this.messageInstance = this.$message({
			// 		message: '请输入红牌或蓝牌',
			// 		type: 'warning'
			// 	})
			// 	return this.messageInstance
			// }

			this.outbound()
		},
		outbound() {
			this.$refs['inOutStockForm'].validate((valid) => {
				this.$refs['inOutStockForm'].validateField('blueCardCount')
				this.$refs['inOutStockForm'].validateField('redCardCount')
				if (valid) {
					postOutbound(this.inOutStockForm)
						.then((res) => {
							if (res.code === 200) {
								this.inOutStockStatus = false
								message({
									message: this.$t('cards_component_stocklist_index_65'),
									type: 'success'
								})
							}
						})
						.then(this.loadData)
				} else {
					console.log('error submit!!')
					return false
				}
			})
		}
	}
}
</script>

<style lang="scss">
.stock-list {
	.content-head {
		margin-bottom: 10px;
	}
}
</style>
