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
							style="width: 300px"
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
								v-for="item in patchAdjustStatusFinish"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
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
					>
						<el-table-column
							prop="auditStep"
							align="center"
							label="操作"
							width="120"
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
							width="200"
						>
							<template slot-scope="scope">
								<span v-if="!!scope.row.orderNo">
									{{ scope.row.orderNo }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="createdTime"
							align="center"
							label="日期"
							width="180"
						></el-table-column>
						<el-table-column
							prop="proxyAccount"
							align="center"
							label="代理账号"
							width="130"
						>
							<template slot-scope="scope">
								<span v-if="!!scope.row.proxyAccount">
									{{ scope.row.proxyAccount }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="proxyName"
							align="center"
							label="代理姓名"
							width="120"
						>
							<template slot-scope="scope">
								<span v-if="!!scope.row.proxyName">
									{{ scope.row.proxyName }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="orderStatus"
							align="center"
							label="订单状态"
							width="120"
						>
							<template slot-scope="scope">
								<span v-if="!!scope.row.orderStatus">
									{{
										typeFilter(scope.row.orderStatus, 'patchAdjustStatusFinish')
									}}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column align="center" label="调整类型" width="150">
							<template slot-scope="scope">
								<p v-if="scope.row">佣金</p>
							</template>
						</el-table-column>
						<el-table-column
							prop="commissionAmount"
							align="center"
							label="佣金金额"
							width="150"
						>
							<template slot-scope="scope">
								<span v-if="!!scope.row.commissionAmount">
									{{ scope.row.commissionAmount.toFixed(2) }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="createdTime"
							align="center"
							label="申请时间"
							width="180"
						>
							<template slot-scope="scope">
								<span v-if="!!scope.row.createdTime">
									{{ scope.row.createdTime }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column align="center" label="审核人" width="180">
							<template slot-scope="scope">
								<p>
									一审：{{
										scope.row.audit1Operator ? scope.row.audit1Operator : '-'
									}}
								</p>
								<p>
									二审：{{
										scope.row.audit2Operator ? scope.row.audit2Operator : '-'
									}}
								</p>
							</template>
						</el-table-column>
						<el-table-column align="center" label="审核时间" width="220">
							<template slot-scope="scope">
								<p>
									一审：{{ scope.row.audit1Time ? scope.row.audit1Time : '-' }}
								</p>
								<p>
									二审：{{ scope.row.audit2Time ? scope.row.audit2Time : '-' }}
								</p>
							</template>
						</el-table-column>
						<el-table-column align="center" label="审核用时" width="150">
							<template slot-scope="scope">
								<p>
									一审：{{ scope.row.audit1Time ? scope.row.audit1Time : '-' }}m
								</p>
								<p>
									二审：{{ scope.row.audit2Time ? scope.row.audit2Time : '-' }}m
								</p>
							</template>
						</el-table-column>
						<el-table-column
							prop="remark"
							align="center"
							label="备注"
							width="180"
						>
							<template slot-scope="scope">
								<span v-if="!!scope.row.remark">
									{{ scope.row.remark }}
								</span>
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
		this.loadData = this.throttle(this.loadData, 1000)
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
		patchAdjustStatusFinish() {
			return this.globalDics.patchAdjustStatusFinish
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
				endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
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
