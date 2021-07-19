<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="操作时间:">
						<el-date-picker
							v-model="searchTime"
							size="medium"
							:picker-options="pickerOptions"
							format="yyyy-MM-dd HH:mm:ss"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							:clearable="false"
							:default-time="defaultTime"
							style="width: 375px"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="场馆名称:" class="tagheight" prop="venueId">
						<el-select
							v-model="queryData.venueId"
							style="width: 300px"
							multiple
							placeholder="全部"
							:popper-append-to-body="false"
							@change="changeSelect($event)"
						>
							<el-option
								v-for="item in gameTypeList"
								:key="item.id"
								:label="item.gameName"
								:value="item.gameCode"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="游戏名称:" class="tagheight">
						<el-select
							v-model="queryData.gameId"
							style="width: 300px"
							multiple
							placeholder="全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in gameIdList"
								:key="item.gameId"
								:label="item.gameName"
								:value="item.gameId"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="VIP等级:" class="tagheight">
						<el-select
							v-model="queryData.vipSerialNum"
							style="width: 300px"
							multiple
							placeholder="全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in VipGradeList"
								:key="item.gradeNum"
								:label="item.gradeName"
								:value="item.gradeNum"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="操作人:">
						<el-input
							v-model="queryData.createdBy"
							clearable
							:maxlength="12"
							size="medium"
							style="width: 180px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							icon="el-icon-search"
							:disabled="loading"
							size="medium"
							@click="search"
						>
							查询
						</el-button>
						<el-button
							icon="el-icon-refresh-left"
							:disabled="loading"
							size="medium"
							@click="reset"
						>
							重置
						</el-button>
					</el-form-item>
				</el-form>
			</div>

			<div class="content">
				<el-table
					v-loading="loading"
					border
					size="mini"
					class="small-size-table"
					:data="tableData"
					style="width: 100%"
					:header-cell-style="getRowClass"
					@sort-change="_changeTableSort"
				>
					<el-table-column
						prop="createdAt"
						align="center"
						label="操作时间"
						sortable="custom"
					></el-table-column>
					<el-table-column prop="venueId" align="center" label="场馆名称">
						<template slot-scope="scope">
							<span v-for="item in gameTypeList" :key="item.gameName">
								{{ scope.row.venueId === item.id ? item.gameName : '' }}
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="gameName" align="center" label="游戏名称">
						<template slot-scope="scope">
							<span>{{ scope.row.gameName }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="vipSerialNum" align="center" label="VIP等级">
						<template slot-scope="scope">
							<span v-for="item in VipGradeList" :key="item.gradeName">
								{{
									scope.row.vipSerialNum === item.gradeNum ? item.gradeName : ''
								}}
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="beforeModify" align="center" label="操作前">
						<template slot-scope="scope">
							<span>{{ scope.row.beforeModify }}%</span>
						</template>
					</el-table-column>
					<el-table-column prop="afterModify" align="center" label="操作后">
						<template slot-scope="scope">
							<span>{{ scope.row.afterModify }}%</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="createdBy"
						align="center"
						label="操作人"
					></el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					:current-page.sync="pageNum"
					class="pageValue"
					background
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageSize"
					:page-sizes="pageSizes"
					:total="total"
					@current-change="handleCurrentChange"
					@size-change="handleSizeChange"
				></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
import { routerNames } from '@/utils/consts'
const startTime = dayjs()
	.startOf('day')
	.valueOf()
const endTime = dayjs()
	.endOf('day')
	.valueOf()

export default {
	name: routerNames.vipRebateRecord,
	components: {},
	mixins: [list],
	data() {
		return {
			queryData: {
				typeOptions: [],
				venueId: [],
				vipSerialNum: [],
				gameId: []
			},
			gameIdList: [],
			VipGradeList: [],
			gameTypeList: [],
			gameId: [],

			searchTime: [startTime, endTime],
			now: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
			summary: {
				count: 0,
				failCount: 0,
				successCount: 0
			},
			tableData: []
		}
	},
	computed: {
		accountType() {
			return this.globalDics.accountType
		},
		memberVipOperateType() {
			return this.globalDics.memberVipOperateType
		}
	},
	created() {
		this.getGameTypeList()
		this.geiVipGrade()
		// this.geiVipBackwaterGrade()
	},
	mounted() {},
	methods: {
		changeSelect(val) {
			const arr = [...val]
			console.log('arr', arr)
			this.geiVipBackwaterGrade({
				gameCode: arr.join(',')
			})
		},

		geiVipBackwaterGrade(params) {
			this.$api.getBackwaterGameType(params).then((res) => {
				if (res.code === 200) {
					this.gameIdList = res.data
					console.log(this.gameIdList, 'this.gameIdList ')
				}
			})
		},
		geiVipGrade() {
			this.$api.getRebateRecordGetVipGrade().then((res) => {
				if (res.code === 200) {
					this.VipGradeList = res.data
					console.log(this.VipGradeList, 'this.VipGradeList ')
				}
			})
		},
		getGameTypeList() {
			this.$api.getMerchantGameGamePlant().then((res) => {
				if (res.code === 200) {
					this.gameTypeList = res.data
					console.log(this.gameTypeList, 'this.gameTypeList')
				}
			})
		},
		loadData() {
			this.loading = true
			const create = this.searchTime || []
			const [startTime, endTime] = create
			let params = {
				...this.queryData,
				startTime: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
			}
			params = {
				...this.getParams(params)
			}
			this.$api
				.getRebateRecordSelectRecords(params)
				.then((res) => {
					if (res.code === 200) {
						this.tableData = res.data.record
						this.total = res.data.totalRecord
						this.loading = false
					} else {
						this.loading = false
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		reset() {
			this.pageNum = 1
			this.queryData = {}
			this.searchTime = [startTime, endTime]
			this.loadData()
		},
		_changeTableSort({ column, prop, order }) {
			if (prop === 'applyTime') {
				prop = 1
			}
			this.queryData.orderKey = prop
			if (order === 'ascending') {
				// 升序
				this.queryData.orderType = 'asc'
			} else if (column.order === 'descending') {
				// 降序
				this.queryData.orderType = 'desc'
			}
			this.loadData()
		},
		enterSubmit() {
			this.loadData()
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
/deep/ .tagheight .el-tag {
	height: 24px;
	line-height: 24px;
	min-width: 60px;
}
.msgList {
	font-size: 14px;
	display: flex;
	p {
		margin-right: 20px;
		line-height: 24px;
	}
	&:last-child p {
		margin-bottom: 15px;
	}
}
</style>
