<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="变更时间:">
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
					<el-form-item label="变更目录:" class="tagheight" prop="gameName">
						<el-select
							v-model="queryData.gameName"
							style="width: 280px"
							clearable
							collapse-tags
							placeholder="全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in gameTypeList"
								:key="item.id"
								:label="item.gameName"
								:value="item.gameName"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="变更类型:" class="tagheight" prop="gameName">
						<el-select
							v-model="queryData.gameName"
							style="width: 280px"
							clearable
							collapse-tags
							placeholder="全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in gameTypeList"
								:key="item.id"
								:label="item.gameName"
								:value="item.gameName"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="操作人:">
						<el-input
							v-model="queryData.updateBy"
							clearable
							:maxlength="12"
							size="medium"
							style="width: 280px"
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
						prop="updateAt"
						align="center"
						label="变更时间"
						sortable="custom"
					></el-table-column>
					<el-table-column prop="rateType" align="center" label="变更目录">
						<!-- <template slot-scope="scope">
              <span v-for="item in gameTypeList" :key="item.id">
                {{ scope.row.gameName === item.id ? item.gameName : "" }}
              </span>
            </template> -->
						费率
					</el-table-column>
					<el-table-column prop="rateType" align="center" label="变更类型">
						<!-- <template slot-scope="scope">
              <span v-for="item in gameTypeList" :key="item.id">
                {{ scope.row.gameName === item.id ? item.gameName : "" }}
              </span>
            </template> -->
						费率
					</el-table-column>
					<el-table-column
						prop="changeFront"
						align="center"
						label="变更前"
					></el-table-column>
					<el-table-column
						prop="changeAfter"
						align="center"
						label="变更后"
					></el-table-column>
					<el-table-column
						prop="updateBy"
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
		this.loadData = this.throttle(this.loadData, 1000)
		return {
			queryData: {
				gameName: ''
			},
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
	},
	mounted() {},
	methods: {
		getGameTypeList() {
			this.$api.getMerchantGameGamePlant().then((res) => {
				if (res.code === 200) {
					this.gameTypeList = res.data
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
				.getOperateObMerchantGameRecordSelect(params)
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
			if (prop === 'updateAt') {
				prop = 1
			}
			this.pageNum = 1
			this.queryData.orderKey = prop
			if (order === 'ascending') {
				// 升序
				this.queryData.orderType = 'asc'
			} else if (column.order === 'descending') {
				// 降序
				this.queryData.orderType = 'desc'
			} else {
				delete this.queryData.orderKey
				delete this.queryData.orderType
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
