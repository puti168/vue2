<template>
	<div class="game-container report-container">
		<template v-if="!showDetail">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="申请时间:">
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
							:default-time="defaultTime"
						></el-date-picker>
					</el-form-item>
          <el-form-item label="订单号:">
						<el-input
							v-model="queryData.orderNo"
							clearable
							size="medium"
							:maxlength="19"
							style="width: 180px"
							placeholder="请输入"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
          <el-form-item label="代理账号:">
						<el-input
							v-model="queryData.proxyAccount"
							clearable
							size="medium"
							:maxlength="11"
							style="width: 180px"
							placeholder="请输入"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="订单状态:">
						<el-select
							v-model="queryData.orderStatus"
							style="width: 180px"
							:popper-append-to-body="false"
						>
							<el-option label="全部" value=""></el-option>
							<el-option
								v-for="item in patchAdjustStatus"
								:key="item.code"
								:label="item.description"
								:value="Number(item.code)"
							></el-option>
						</el-select>
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
							align="center"
							label="操作"
							width="100"
						>
							<template slot-scope="scope">
								<el-button
									type="primary"
									size="medium"
									@click="goDetail(scope.row)"
								>
									查看
								</el-button>
							</template>
						</el-table-column>
						<el-table-column
							prop="orderNo"
							align="center"
							label="订单号"
						></el-table-column>
						<el-table-column
							prop="createdTime"
							align="center"
							label="日期"
						></el-table-column>
						<el-table-column
							prop="proxyAccount"
							align="center"
							label="代理账号"
						></el-table-column>
						<el-table-column
							prop="proxyName"
							align="center"
							label="代理姓名"
						></el-table-column>
						<el-table-column
							prop="orderStatus"
							align="center"
							label="订单状态"
						>
						<template slot-scope="scope">
								{{ typeFilter(scope.row.orderStatus, 'patchAdjustStatus') }}
							</template></el-table-column>
						<el-table-column
							align="center"
							label="申请类型"
						><template slot-scope="scope">
								<p v-if="scope.row">佣金</p>
							</template></el-table-column>
						<el-table-column
							prop="commissionAmount"
							align="center"
							label="佣金金额"
						></el-table-column>
						<el-table-column
							prop="createdTime"
							align="center"
							label="申请时间"
						></el-table-column>
						<el-table-column
							align="center"
							label="审核人"
						>
						<template slot-scope="scope">
								<p>一审：{{ scope.row.audit1Operator ? scope.row.audit1Operator : '-' }}</p>
								<p>二审：{{ scope.row.audit2Operator ? scope.row.audit2Operator : '-' }}</p>
							</template>
						</el-table-column>
						<el-table-column
							align="center"
							label="审核时间"
						><template slot-scope="scope">
								<p>一审：{{ scope.row.audit1Time ? scope.row.audit1Time : '-' }}</p>
								<p>二审：{{ scope.row.audit2Time ? scope.row.audit2Time : '-' }}</p>
							</template></el-table-column>
						<el-table-column
							align="center"
							label="审核用时"
						><template slot-scope="scope">
								<p>一审：{{ scope.row.audit1Cost ? scope.row.audit1Cost : '-' }}min</p>
								<p>二审：{{ scope.row.audit2Cost ? scope.row.audit2Cost : '-' }}min</p>
							</template></el-table-column>
						<el-table-column
							prop="remark"
							align="center"
							label="备注"
						><template slot-scope="scope">
								<p>{{ scope.row.audit1Desc }}</p>
								<p>{{ scope.row.audit2Desc }}</p>
							</template></el-table-column>
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
		</template>
		<detail v-else :type="type" :rowData="rowData" @goBack="goBack"></detail>
	</div>
</template>

<script>
import list from '@/mixins/list'
import detail from './components/detail'
import dayjs from 'dayjs'
import { getUsername } from '@/utils/auth'
const end = dayjs()
	.endOf('day')
	.valueOf()
const start = dayjs()
	.startOf('day')
	.valueOf()
export default {
	name: 'CommissionReviewRecord',
	components: { detail },
	mixins: [list],
	data() {
		return {
			queryData: {
				orderNo: '',
				proxyAccount: '',
				orderStatus: ''
			},
			type: true,
			showDetail: false,
			formTime: {
				time: [start, end]
			},
			rowData: {},
			name: '',
			dataList: []
		}
	},
	computed: {
		patchAdjustStatus() {
			return this.globalDics.patchAdjustStatus
		}
	},
	mounted() {
		this.name = getUsername()
	},
	methods: {
		loadData() {
			this.loading = true
			const [startTime, endTime] = this.formTime.time || []
			let params = {
				...this.queryData,
				beginTime: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				endTime: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: ''
			}
			params = {
				...this.getParams(params)
			}
			this.$api
				.proxyCommissionRecordSelectCommission(params)
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
		goDetail(row) {
			this.type = Number(row.auditStep) === 1 && row.auditName === this.name
			this.rowData = row
			this.showDetail = true
		},
		goBack() {
			this.showDetail = false
			this.loadData()
		},
		reset() {
			this.queryData = {
				orderNo: '',
				proxyAccount: '',
				orderStatus: ''
			}
			this.formTime = {
				time: [start, end]
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
/deep/ .caret-wrapper {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
}
.data-refresh {
	margin-top: 0;
	padding-bottom: 20px;
}
</style>
