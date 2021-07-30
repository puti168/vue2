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
					<el-form-item label="操作类型:" class="tagheight" prop="operateType">
						<el-select
							v-model="queryData.operateType"
							style="width: 300px"
							multiple
                            collapse-tags
							placeholder="全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in memberVipOperateType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="操作项:" class="tagheight">
						<el-select
							v-model="queryData.operateField"
							style="width: 300px"
							multiple
                            collapse-tags
							placeholder="全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in memberVipOperateFieldType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
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
					<!-- 操作时间 -->
					<el-table-column
						prop="createdAt"
						align="center"
						label="操作时间"
						sortable="custom"
					></el-table-column>
					<!-- 操作类型 -->
					<el-table-column prop="operateType" align="center" label="操作类型">
						<template slot-scope="scope">
							{{ typeFilter(scope.row.operateType, 'memberVipOperateType') }}
						</template>
					</el-table-column>
					<!-- 操作项 -->
					<el-table-column prop="operateField" align="center" label="操作项">
						<template slot-scope="scope">
							{{
								typeFilter(scope.row.operateField, 'memberVipOperateFieldType')
							}}
						</template>
					</el-table-column>
					<!-- 操作前 -->
					<el-table-column prop="beforeModify" align="center" label="操作前">
						<template slot-scope="scope">
							<span>{{ scope.row.beforeModify }}</span>
						</template>
					</el-table-column>
					<!-- 操作后-->
					<el-table-column prop="afterModify" align="center" label="操作后">
						<template slot-scope="scope">
							<span>{{ scope.row.afterModify }}</span>
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
const startTime = dayjs()
	.startOf('day')
	.valueOf()
const endTime = dayjs()
	.endOf('day')
	.valueOf()

export default {
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
		memberVipOperateFieldType() {
			return this.globalDics.memberVipOperateFieldType
		},
		memberVipOperateType() {
			return this.globalDics.memberVipOperateType
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
				beginTime: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
			}
			params = {
				...this.getParams(params)
			}
			this.$api
				.getlistSelectMemberVipOperate(params)
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
