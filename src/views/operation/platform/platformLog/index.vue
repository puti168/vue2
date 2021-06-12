<template>
	<div class="game-container report-container">
		<div class="params">
			<el-form ref="form" :inline="true" :model="queryData">
				<el-form-item label="操作时间:">
					<el-date-picker
						v-model="formTime.time"
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

				<el-form-item label="场馆名称:">
					<el-select
						v-model="queryData.accountType"
						style="width: 300px"
						multiple
						placeholder="默认选择全部"
						:popper-append-to-body="false"
					>
						<el-option
							v-for="item in accountType"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="变更类型:">
					<el-select
						v-model="queryData.applyType"
						style="width: 300px"
						multiple
						placeholder="默认选择全部"
						:popper-append-to-body="false"
					>
						<el-option label="全部" value></el-option>
						<el-option
							v-for="item in applyType"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="操作人:">
					<el-input
						v-model="queryData.applyName"
						clearable
						size="medium"
						:maxlength="12"
						style="width: 180px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item style="margin-left: 30px">
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
					@sort-change="changeTableSort"
				>

				<el-table-column prop="applyType" align="center" label="场馆名称">
						<template slot-scope="scope">
							<p>{{ typeFilter(scope.row.applyType, 'applyType') }}</p>
						</template>
					</el-table-column>
					<el-table-column prop="applyType" align="center" label="变更类型">
						<template slot-scope="scope">
							<p>{{ typeFilter(scope.row.applyType, 'applyType') }}</p>
						</template>
					</el-table-column>
					<el-table-column align="center" label="变更前">
						<template slot-scope="scope">
							<template v-if="scope.row.applyType * 1 === 2">
								{{ typeFilter(scope.row.beforeModify, 'genderType') }}
							</template>
							<template v-else-if="Number(scope.row.applyType === 6)">
								{{ typeFilter(scope.row.beforeModify, 'accountStatusType') }}
							</template>
							<template v-else>
								{{ scope.row.beforeModify ? scope.row.beforeModify : '-' }}
							</template>
						</template>
					</el-table-column>
					<el-table-column align="center" label="变更后">
						<template slot-scope="scope">
							<template v-if="scope.row.applyType * 1 === 2">
								{{ typeFilter(scope.row.afterModify, 'genderType') }}
							</template>
							<template v-else-if="Number(scope.row.applyType === 6)">
								{{ typeFilter(scope.row.afterModify, 'accountStatusType') }}
							</template>
							<template v-else>
								{{ scope.row.afterModify ? scope.row.afterModify : '-' }}
							</template>
						</template>
					</el-table-column>
					<el-table-column prop="applyType" align="center" label="备注">
						<template slot-scope="scope">
							<p>{{ typeFilter(scope.row.applyType, 'applyType') }}</p>
						</template>
					</el-table-column>
					<el-table-column
						prop="applyName"
						align="center"
						width="100"
						label="操作人"
					>
						<template slot-scope="scope">
							<p>{{ scope.row.applyName }}</p>
						</template>
					</el-table-column>
					<el-table-column
						prop="applyTime"
						align="center"
						label="操作时间"
						sortable="custom"
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
		return {
			queryData: {
				userName: '',
				applyName: '',
				accountType: [],
				applyType: []
			},
			formTime: {
				time: [start, end]
			},
			dataList: [],
			title: ''
		}
	},
	computed: {
		accountType() {
			return this.globalDics.accountType
		},
		virtualType() {
			return this.globalDics.virtualType
		},
		virtualProtocolType() {
			return this.globalDics.virtualProtocolType
		},
		applyType() {
			return this.globalDics.applyType
		}
	},
	mounted() {},
	methods: {
		loadData() {
			const [startTime, endTime] = this.formTime.time || []
			let params = {
				...this.queryData,
				applyTimeStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				applyTimeEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: ''
			}
			if (!params.applyTimeStart || !params.applyTimeEnd) {
				this.$message({
					message: '操作时间参数必传',
					type: 'info'
				})
				return
			}
			params = {
				...this.getParams(params)
			}
			this.loading = true

			this.$api
				.memberDataInfoChangeRecord(params)
				.then((res) => {
					if (res.code === 200) {
						const response = res.data
						this.loading = false
						this.dataList = response.record
						this.total = response.totalRecord
					} else {
						this.loading = false
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		changeTableSort({ column, prop, order }) {
			this.pageNum = 1
			console.log(prop)
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
			this.queryData = {
				userName: '',
				applyName: '',
				accountType: [],
				applyType: []
			}
			this.pageNum = 1
			this.formTime.time = [start, end]
			this.loadData()
		},
		handleCurrentChange() {
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
