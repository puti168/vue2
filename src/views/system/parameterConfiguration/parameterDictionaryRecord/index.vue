<template>
	<div class="game-container report-container">
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
					></el-date-picker>
				</el-form-item>
				<el-form-item label="操作账号：">
					<el-input
						v-model="queryData.createdby"
						clearable
						size="medium"
						:maxlength="5"
						style="width: 200px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item label="操作IP：">
					<el-input
						v-model="queryData.operateIp"
						clearable
						size="medium"
						:maxlength="12"
						style="width: 200px"
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
				>
					<el-table-column
						type="index"
						align="center"
						label="序号"
						width="100"
					></el-table-column>
					<el-table-column prop="createdAt" align="center" label="操作时间">
						<template slot-scope="scope">
							{{ scope.row.createdAt || '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="createdBy" align="center" label="操作账号">
						<template slot-scope="scope">
							{{ scope.row.createdBy || '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="operateIp" align="center" label="操作IP">
						<template slot-scope="scope">
							{{ scope.row.operateIp || '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="changeType" align="center" label="操作类型">
						<template slot-scope="scope">
							{{ scope.row.changeType || '-' }}
						</template>
					</el-table-column>
					<el-table-column align="center" label="变更前" prop="beforeValue">
						<template slot-scope="scope">
							{{ scope.row.beforeValue || '-' }}
						</template>
					</el-table-column>
					<el-table-column align="center" label="变更后" prop="afterValue">
						<template slot-scope="scope">
							{{ scope.row.afterValue || '-' }}
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
	components: {},
	mixins: [list],
	data() {
		this.search = this.throttle(this.search, 1000)
		this.reset = this.throttle(this.reset, 1000)
		return {
			queryData: {
				createdby: undefined,
				operateIp: undefined
			},
			searchTime: [start, end],
			dataList: []
		}
	},
	methods: {
		loadData() {
			const [startTime, endTime] = this.searchTime || []
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
				.getQueryRecordList(params)
				.then((res) => {
					this.loading = false
					const {
						code,
						data: { records, total },
						msg
					} = res
					if (code && code === 200) {
						this.dataList = records || []
						this.total = total || 0
					} else {
						this.$message({
							message: res && msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		reset() {
			this.pageNum = 1
			this.queryData = {}
			this.searchTime = [start, end]
			this.loadData()
		}
	}
}
</script>

<style lang="scss" scoped></style>
