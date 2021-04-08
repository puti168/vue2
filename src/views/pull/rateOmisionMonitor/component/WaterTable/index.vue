<template>
	<div class="stock-list">
		<div class="params flex-h flex-bc">
			<el-form ref="form" :inline="true" :model="listQuery">
				<el-form-item :label="$t('water_sign_component_watertable_index_496')">
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
				<el-form-item :label="$t('water_sign_component_watertable_index_500')">
					<el-select
						v-model="listQuery.unionStatus"
						size="medium"
						clearable
						style="width:300px;"
						:placeholder="$t('water_sign_component_watertable_index_501')"
					>
						<el-option :label="$t('water_sign_component_watertable_index_501')" :value="-1"></el-option>
						<el-option :label="$t('water_sign_component_watertable_index_502')" :value="1"></el-option>
						<el-option :label="$t('water_sign_component_watertable_index_503')" :value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					v-if="hasPermission('2212')"
					:label="$t('water_sign_component_watertable_index_504')"
				>
					<el-select
						v-model="listQuery.gameTypeName"
						size="medium"
						clearable
						style="width:300px;"
						:placeholder="$t('water_sign_component_watertable_index_501')"
					>
						<el-option :label="$t('water_sign_component_watertable_index_501')" :value="-1"></el-option>
						<el-option
							v-for="(item, index) in gametypes"
							:key="`${index}-${item.value}-${item.type}`"
							:label="item.type"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('water_sign_component_watertable_index_505')">
					<el-input
						v-model="listQuery.deviceNo"
						clearable
						size="medium"
						style="width:300px;"
						:placeholder="$t('water_sign_component_watertable_index_506')"
					></el-input>
				</el-form-item>
				<el-form-item :label="$t('water_sign_component_watertable_index_507')">
					<el-input
						v-model="listQuery.tableNo"
						clearable
						size="medium"
						style="width:300px;"
						:placeholder="$t('water_sign_component_watertable_index_508')"
					></el-input>
				</el-form-item>
				<el-form-item :label="$t('water_sign_component_watertable_index_509')">
					<el-input
						v-model="listQuery.tableName"
						clearable
						size="medium"
						style="width:300px;"
						:placeholder="$t('water_sign_component_watertable_index_510')"
					></el-input>
				</el-form-item>
				<el-form-item :label="$t('water_sign_component_watertable_index_511')">
					<el-input
						v-model="listQuery.createdBy"
						clearable
						size="medium"
						style="width:300px;"
						:placeholder="$t('water_sign_component_watertable_index_512')"
					></el-input>
				</el-form-item>
			</el-form>
			<div class="handle flex m-b-22">
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-search"
					@click="handleSearch"
				>{{ $t('water_sign_component_watertable_index_513') }}</el-button>
				<el-button
					type="primary"
					size="medium"
					icon="el-icon-edit"
					@click="handleReset"
				>{{ $t('water_sign_component_watertable_index_514') }}</el-button>
			</div>
		</div>
		<el-divider></el-divider>
		<div class="content">
			<el-table :data="list" style="width: 100%" :header-cell-style="getRowClass">
				<el-table-column
					align="center"
					type="index"
					:label="$t('water_sign_component_watertable_index_515')"
					width="120"
				></el-table-column>
				<el-table-column
					align="center"
					prop="createdAt"
					:label="$t('water_sign_component_watertable_index_496')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="deviceNo"
					:label="$t('water_sign_component_watertable_index_505')"
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
					min-width="110"
					:label="$t('water_sign_component_watertable_index_516')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="isUnionTable"
					:label="$t('water_sign_component_watertable_index_500')"
				>
					<template slot-scope="scope">
						{{
						scope.row.isUnionTable === 1
						? $t('water_sign_component_watertable_index_502')
						: $t('water_sign_component_watertable_index_503')
						}}
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="tableName"
					:label="$t('water_sign_component_watertable_index_509')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="welcomeDesc"
					:label="$t('water_sign_component_watertable_index_517')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="callDesc"
					:label="$t('water_sign_component_watertable_index_518')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="createdBy"
					:label="$t('water_sign_component_watertable_index_511')"
				></el-table-column>
				<el-table-column
					align="center"
					prop="updatedAt"
					:label="$t('water_sign_component_watertable_index_519')"
				></el-table-column>
				<el-table-column
					v-if="hasPermission('2211')"
					align="center"
					prop="updatedAt"
					:label="$t('water_sign_component_watertable_index_520')"
				>
					<template slot-scope="scope">
						<el-button
							v-if="
								hasPermission('2211') &&
									scope.row.gameTypeName !==
										$t('water_sign_component_watertable_index_521')
							"
							type="text"
							size="small"
							@click.native.prevent="popupDialog(scope.row)"
						>{{ $t('water_sign_component_watertable_index_522') }}</el-button>
						<span v-else>-</span>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination
				v-if="total > 0"
				:current-page.sync="pageIndex"
				layout="total,sizes,prev,pager,next,jumper"
				:page-sizes="$store.getters.pageSizes"
				:total="total"
				:page-size="pageSize"
				@current-change="handleCurrentChange"
				@size-change="handleSizeChange"
			></el-pagination>
			<!-- 关联桌台弹出框 -->
			<el-dialog
				width="500px"
				:title="$t('water_sign_component_watertable_index_523')"
				:close-on-click-modal="false"
				center
				:visible.sync="dialogVisible"
				:destroy-on-close="true"
			>
				<el-form
					v-if="hasPermission('2212')"
					ref="dialogForm"
					:model="dialogForm"
					:rules="dialogFormRules"
				>
					<el-form-item :label="$t('water_sign_component_watertable_index_504')" prop="gameTypeId">
						<el-select
							v-model="dialogForm.gameTypeId"
							:placeholder="$t('water_sign_component_watertable_index_524')"
							clearable
							size="medium"
							destroy-on-close
							style="width:330px"
							@change="change"
						>
							<el-option
								v-for="(item, index) in gametypes"
								:key="`${index}-${item.value}-${item.type}`"
								:label="item.type"
								:value="+item.value"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item :label="$t('water_sign_component_watertable_index_507')" prop="tableId">
						<el-select
							v-model="dialogForm.tableId"
							size="medium"
							clearable
							style="width:330px"
							:placeholder="$t('water_sign_component_watertable_index_524')"
							@change="change2"
						>
							<el-option
								v-for="item in desks"
								:key="item.tableId"
								:label="`${item.tableNo}`"
								:value="item.tableId"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item
						style="margin-left:9px;"
						:label="$t('water_sign_component_watertable_index_509')"
					>{{ tableName }}</el-form-item>
					<el-form-item :label="$t('water_sign_component_watertable_index_517')" prop="welcomeDesc">
						<el-input
							v-model="dialogForm.welcomeDesc"
							type="textarea"
							:placeholder="$t('water_sign_component_watertable_index_525')"
							maxlength="100"
						></el-input>
					</el-form-item>
					<el-form-item :label="$t('water_sign_component_watertable_index_518')" prop="callDesc">
						<el-input
							v-model="dialogForm.callDesc"
							type="textarea"
							:placeholder="$t('water_sign_component_watertable_index_526')"
							maxlength="100"
						></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">{{ $t('water_sign_component_watertable_index_527') }}</el-button>
					<el-button
						type="primary"
						@click="handleInOutCommit"
					>{{ $t('water_sign_component_watertable_index_528') }}</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import validate from '@/mixins/validate'
import { fetchWaterSign, postUniteTable, fetchGameTypes } from '@/api/waterSign'
import { setGameTypes } from '@/utils/auth'
import { message } from '@/utils/message'
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'

export default {
	name: 'WaterTable',
	mixins: [list, validate],
	data() {
		return {
			dialogVisible: false,
			tableName: '',
			typedData: [],
			types: [],
			desks: [],
			list: [],
			listQuery: {
				time: undefined,
				cardColourId: undefined, // 纸牌牌色:1、红牌，2、蓝牌
				createdBy: undefined,
				unionStatus: undefined
			},
			form: {
				// type: 1,
				supplierName: '',
				blueCardCount: '',
				redCardCount: ''
			},
			dialogForm: {},
			dialogFormRules: {
				gameTypeId: [
					{
						required: true,
						message: this.$t('water_sign_component_watertable_index_529'),
						trigger: 'blur'
					}
				],
				tableId: [
					{
						required: true,
						message: this.$t('water_sign_component_watertable_index_530'),
						trigger: 'blur'
					}
				],
				welcomeDesc: [
					{
						required: true,
						message: this.$t('water_sign_component_watertable_index_531'),
						trigger: 'blur'
					}
				],
				callDesc: [
					{
						required: true,
						message: this.$t('water_sign_component_watertable_index_532'),
						trigger: 'blur'
					}
				]
			},
			// 纸牌库管类型：1、出库，2、入库，3、废弃
			inOutTabs: [
				this.$t('water_sign_component_watertable_index_533'),
				this.$t('water_sign_component_watertable_index_534'),
				this.$t('water_sign_component_watertable_index_535')
			],
			pageIndex: 1,
			pageSize: 20
		}
	},
	computed: {
		...mapGetters(['gametype']),
		gametypes() {
			const result = this.gametype.filter((i) => i.value !== '2013')
			return result
		}
	},
	mounted() {
		if (this.hasPermission('2212')) {
			fetchGameTypes().then((response) => {
				this.typedData = response.data.filter((i) => i.gameTypeId !== 2013)
				const arr = this.typedData.map((item) => ({
					gameType: item.gameType,
					key: item.gameTypeId
				}))
				this.types = arr.filter((thing, index) => {
					return (
						index ===
						arr.findIndex((obj) => {
							return JSON.stringify(obj) === JSON.stringify(thing)
						})
					)
				})
				this.types = this.types.filter(
					(i) => i.gameType !== this.$t('water_sign_component_watertable_index_521')
				)
				this.desks = this.typedData
				console.log('this.desks :', this.desks)
				setGameTypes(this.types)
			})
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
			const newParams = this.getParams(params)
			const optionalUnion = [0, 1]
			params = {
				...newParams,
				unionStatus: optionalUnion.includes(newParams.unionStatus)
					? newParams.unionStatus
					: undefined,
				time: undefined
			}
			fetchWaterSign(params).then((response) => {
				this.list = response.data.record
				this.total = response.data.totalRecord
				this.listLoading = false
			})
		},
		// 游戏类型切换
		change(val) {
			if (typeof val === 'string') {
				// clearable
				this.desks = this.typedData
				this.dialogForm.tableId = undefined
				this.tableName = ''
			} else {
				this.tableName = ''
				this.desks = this.typedData.filter((item) => item.gameTypeId === val)
				this.dialogForm.tableId = undefined
			}
		},
		// 游戏桌台切换
		change2(val) {
			if (typeof val === 'string') {
				// clearable
				this.tableName = ''
				this.desks = this.typedData.filter(
					(item) => item.gameTypeId === this.dialogForm.gameTypeId
				)
			} else {
				const table = this.desks.find((item) => item.tableId === val)
				this.dialogForm.gameTypeId = table.gameTypeId
				this.tableName = table.tableName
			}
		},
		popupDialog(row) {
			this.dialogVisible = true
			this.dialogForm.deviceNo = row.deviceNo
			const findTable = this.typedData.find(
				(item) => item.tableName === row.tableName
			)
			if (findTable) {
				this.tableName = findTable.tableName
				this.desks = this.typedData.filter(
					(item) => item.gameTypeId === findTable.gameTypeId
				)
				this.dialogForm = {
					...row,
					gameTypeId: findTable.gameTypeId,
					tableId: findTable.tableId
				}
			} else {
				this.dialogForm = {
					deviceNo: row.deviceNo
				}
				this.tableName = ''
			}
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
				createdBy: undefined,
				unionStatus: undefined
			}
			this.loadData({ pageIndex: 1, unionStatus: undefined })
		},
		handleInOutCommit() {
			this.$refs['dialogForm'].validate((valid) => {
				if (valid) {
					postUniteTable(this.dialogForm)
						.then((res) => {
							if (res.code === 200) {
								this.inOutStockStatus = false
								message({
									message: this.$t('water_sign_component_watertable_index_536'),
									type: 'success'
								})
								this.dialogVisible = false
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
