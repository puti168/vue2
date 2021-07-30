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
					<el-form-item
						label="变更类型:"
						class="tagheight"
						prop="vipChangeType"
					>
						<el-select
							v-model="queryData.changeType"
							style="width: 200px"
							multiple
							placeholder="全部"
                            clearable
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in vipChangeType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="会员账号:">
						<el-input
							v-model="queryData.userName"
							clearable
							:maxlength="11"
							size="medium"
							style="width: 200px; margin-right: 20px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
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
						label="变更时间"
						sortable="custom"
					></el-table-column>
					<el-table-column prop="changeType" align="center" label="变更类型">
						<template slot-scope="scope">
							{{ typeFilter(scope.row.changeType, 'vipChangeType') }}
						</template>
					</el-table-column>
					<el-table-column
						prop="beforeGrade"
						align="center"
						label="变更前"
					></el-table-column>
					<el-table-column
						prop="afterGrade"
						align="center"
						label="变更后"
					></el-table-column>

					<el-table-column prop="userName" align="center" label="会员账号">
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.userName"
								:title="scope.row.userName"
								:copy="copy"
							>
								{{ scope.row.userName }}
							</Copy>
							<span v-else>-</span>
						</template>
					</el-table-column>

					<el-table-column
						prop="accountTypeZn"
						align="center"
						label="账号类型"
					></el-table-column>
					<el-table-column prop="labelName" align="center" label="会员标签">
						<template slot-scope="scope">
							<span v-if="!!scope.row.labelName">
								{{ scope.row.labelName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="windControlName"
						align="center"
						label="风控层级"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.windControlName !== null">
								{{ scope.row.windControlName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="accountStatus" align="center" label="账号状态">
						<template slot-scope="scope">
							<span v-if="scope.row.accountStatus === 1" class="normalRgba">
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span
								v-else-if="scope.row.accountStatus === 2"
								class="disableRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span
								v-else-if="scope.row.accountStatus === 3"
								class="lockingRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span
								v-else-if="scope.row.accountStatus === 4"
								class="deleteRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span v-else>-</span>
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
	name: routerNames.vipChangeRecord,
	components: {},
	mixins: [list],
	data() {
        this.search = this.throttle(this.search, 1000)
        this.reset = this.throttle(this.reset, 1000)
		return {
			queryData: {},
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
		vipChangeType() {
			return this.globalDics.vipChangeType
		},
		accountType() {
			return this.globalDics.accountType
		},
		porxyApplyType() {
			return this.globalDics.porxyApplyType
		}
	},
	mounted() {},
	methods: {
		loadData() {
			this.loading = true
			const create = this.searchTime || []
			const [startTime, endTime] = create
			let params = {
				...this.queryData,
				startCreatedAt: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				engCreatedAt: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: ''
			}
			params = {
				...this.getParams(params)
			}
			this.$api
				.getqueryMemberVipChangeRecordPage(params)
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
			this.queryData.orderKey = prop
			if (order === 'ascending') {
				// 升序
				this.queryData.orderType = 'asc'
			} else if (column.order === 'descending') {
				// 降序
				this.queryData.orderType = 'desc'
			} else {
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
