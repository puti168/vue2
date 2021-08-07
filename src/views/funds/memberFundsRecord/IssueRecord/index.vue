<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form
					ref="form"
					:inline="true"
					:model="queryData"
					label-width="80px"
				>
					<el-form-item label="领取时间:">
						<el-date-picker
							v-model="receiveTime"
							size="medium"
							:picker-options="pickerOptions"
							format="yyyy-MM-dd HH:mm:ss"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							:default-time="defaultTime"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="订单生成时间:" label-width="116px">
						<el-date-picker
							v-model="orderTime"
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
					<el-form-item label="订单号:">
						<el-input
							v-model="queryData.id"
							clearable
							size="medium"
							style="width: 360px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="会员账号:">
						<el-input
							v-model="queryData.userName"
							clearable
							:maxlength="11"
							size="medium"
							style="width: 247px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="奖励类型:" class="tagheight">
						<el-select
							v-model="queryData.provideType"
							clearable
							style="width: 247px"
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in vipRewardType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="领取状态:" class="tagheight">
						<el-select
							v-model="queryData.provideStatus"
							clearable
							style="width: 247px"
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in rebateType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>

					<el-form-item style="margin-left: 22px">
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
						prop="bizId"
						align="center"
						label="订单号"
						width="260px"
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.bizId"
								:title="scope.row.bizId"
								:copy="copy"
							>
								{{ scope.row.bizId }}
							</Copy>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="createdAt"
						align="center"
						label="订单生成时间"
						sortable="custom"
						min-width="200px"
					></el-table-column>
					<el-table-column
						prop="provideAt"
						align="center"
						label="领取时间"
						sortable="custom"
						min-width="200px"
					></el-table-column>

					<el-table-column
						prop="provideType"
						align="center"
						label="奖励类型"
						width="150px"
					>
						<template slot-scope="scope">
							{{ typeFilter(scope.row.provideType, 'vipRewardType') }}
						</template>
					</el-table-column>
					<el-table-column
						prop="provideAmount"
						align="center"
						label="奖励金额"
						width="200px"
					></el-table-column>
					<el-table-column
						prop="provideStatus"
						align="center"
						label="领取状态"
						width="200px"
					>
						<template slot-scope="scope">
							{{ typeFilter(scope.row.provideStatus, 'rebateType') }}
						</template>
					</el-table-column>
					<el-table-column
						prop="userName"
						align="center"
						label="会员账号"
						width="130px"
					>
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
						prop="vipSerialNum"
						align="center"
						label="VIP等级"
						sortable="custom"
						width="130px"
					>
						<template slot-scope="scope">
							VIP{{ scope.row.vipSerialNum }}
						</template>
					</el-table-column>
					<el-table-column
						prop="accountType"
						align="center"
						label="账号类型"
						width="130px"
					>
						<template slot-scope="scope">
							{{ typeFilter(scope.row.accountType, 'accountType') }}
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
		this.loadData = this.throttle(this.loadData, 1000)
		this._changeTableSort = this.throttle(this._changeTableSort, 1000)
		return {
			queryData: {},
			receiveTime: [startTime, endTime],
			orderTime: [startTime, endTime],
			tableData: []
		}
	},
	computed: {
		vipRewardType() {
			return this.globalDics.vipRewardType
		},
		rebateType() {
			return this.globalDics.rebateType
		}
	},
	created() {},
	methods: {
		loadData() {
			this.loading = true
			const receive = this.receiveTime || []
			const [startTime, endTime] = receive
			const order = this.orderTime || []
			const [start, end] = order
			let params = {
				...this.queryData,
				provideAtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				provideAtEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				createdAtStart: start ? dayjs(start).format('YYYY-MM-DD HH:mm:ss') : '',
				createdAtEnd: end ? dayjs(end).format('YYYY-MM-DD HH:mm:ss') : ''
			}
			params = {
				...this.getParams(params)
			}
			this.$api
				.getMemberFundsRecordsVipReward(params)
				.then((res) => {
					if (res.code === 200) {
						this.tableData = res.data.record
						this.total = res.data.totalRecord
					}
					this.loading = false
				})
				.catch(() => {
					this.loading = false
				})
		},
		reset() {
			this.queryData = {}
			this.receiveTime = [startTime, endTime]
			this.orderTime = [startTime, endTime]
			this.pageNum = 1
			this.loadData()
		},
		_changeTableSort({ column, prop, order }) {
			switch (prop) {
				case 'createdAt':
					prop = 1
					break
				case 'provideAt':
					prop = 2
					break
				case 'vipSerialNum':
					prop = 3
					break
			}
			this.pageNum = 1
			this.queryData.orderKey = prop
			if (order === 'ascending') {
				// 升序
				this.queryData.orderType = 'asc'
			} else if (order === 'descending') {
				// 降序
				this.queryData.orderType = 'desc'
			} else {
				delete this.queryData.orderKey
				delete this.queryData.orderType
			}
			this.loadData()
		},
		enterSearch() {
			this.loadData()
		}
	}
}
</script>

<style lang="scss" scoped></style>
