<template>
	<div class="game-container report-container">
		<div class="params">
			<el-form ref="form" :inline="true" :model="queryData">
				<el-form-item label="操作时间:">
					<el-date-picker
						v-model="queryData.time"
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
					></el-date-picker>
				</el-form-item>
				<el-form-item label="标题:">
					<el-input
						v-model="queryData.announcementTitel"
						clearable
						size="medium"
						:maxlength="20"
						style="width: 260px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item label="变更类型:">
					<el-select
						v-model="queryData.changeType"
						style="width: 260px"
						multiple
						clearable
						collapse-tags
						placeholder="默认选择全部"
						:popper-append-to-body="false"
					>
						<el-option
							v-for="item in changeType"
							:key="item.code"
							:label="item.value"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="操作人:">
					<el-input
						v-model="queryData.createdBy"
						clearable
						size="medium"
						:maxlength="12"
						style="width: 180px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item style="margin-left: 8px">
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
					@sort-change="_changeTableSort"
				>
					<el-table-column prop="announcementTitle" align="center" label="标题">
						<template slot-scope="scope">
							<span v-if="scope.row.announcementTitle">
								{{ scope.row.announcementTitle }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="changeType" align="center" label="变更类型">
						<template slot-scope="scope">
							<span
								v-if="scope.row.changeType || scope.row.changeType + '' === '0'"
							>
								{{ filterChangeType(scope.row.changeType) }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="变更前" prop="beforeValue">
						<template slot-scope="scope">
							<span v-if="scope.row.beforeValue">
								{{ scope.row.beforeValue }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="变更后" prop="afterValue">
						<template slot-scope="scope">
							<span v-if="scope.row.afterValue">
								{{ scope.row.afterValue }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="createdBy"
						align="center"
						width="120"
						label="操作人"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.createdBy">{{ scope.row.createdBy }}</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="createdAt"
						align="center"
						label="操作时间"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.createdAt">{{ scope.row.createdAt }}</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
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
const end = dayjs()
	.endOf('day')
	.valueOf()
const start = dayjs()
	.startOf('day')
	.valueOf()

export default {
	name: 'MemberMsgChange',
	components: {},
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		return {
			queryData: {
				time: [start, end],
				announcementTitel: undefined,
				createdBy: undefined,
				changeType: []
			},
			dataList: [],
			total: 0,
			changeType: []
		}
	},
	computed: {},
	mounted() {
		this.queryEnums()
	},
	methods: {
		loadData() {
			const [startTime, endTime] = this.queryData.time || []
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
			delete params.time
			this.loading = true

			this.$api
				.activityInfoLogListAPI(params)
				.then((res) => {
					this.loading = false
					const {
						code,
						data: { record, totalRecord },
						msg
					} = res
					if (code === 200) {
						this.dataList = record || []
						this.total = totalRecord || 0
					} else {
						this.$message({
							message: msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		filterChangeType(val) {
			const lis = this.changeType.find((item) => item.code + '' === val + '')
			return lis?.value || '-'
		},
		queryEnums() {
			this.$api.activityInfoLogAPI().then((res) => {
				const {
					code,
					data: { changeType }
				} = res
				if (code === 200) {
					this.changeType = changeType
				} else {
					this.changeType = []
				}
			})
		},
		_changeTableSort({ column, prop, order }) {
			this.pageNum = 1
			this.queryData.orderKey = 1
			if (order === 'ascending') {
				// 升序
				this.queryData.orderType = 'asc'
			} else if (column.order === 'descending') {
				// 降序
				this.queryData.orderType = 'desc'
			}
			this.loadData()
		},
		reset() {
			this.pageNum = 1
			this.queryData = {
				time: [start, end],
				announcementTitel: undefined,
				createdBy: undefined,
				changeType: []
			}
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
</style>
