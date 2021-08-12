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
							v-model="queryData.userName"
							clearable
							size="medium"
							:maxlength="11"
							style="width: 180px"
							placeholder="请输入"
							oninput="value=value.replace(/[\u4E00-\u9FA5]/g ,'')"
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
								:value="Number(item.code)"
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
							width="220"
						>
							<template slot-scope="scope">
								{{ scope.row.orderNo || '-' }}
							</template>
						</el-table-column>
						<el-table-column
							prop="userName"
							align="center"
							label="代理账号"
							width="130"
						>
							<template slot-scope="scope">
								{{ scope.row.userName || '-' }}
							</template>
						</el-table-column>
						<el-table-column
							prop="realName"
							align="center"
							label="代理姓名"
							width="120"
						>
							<template slot-scope="scope">
								{{ scope.row.realName || '-' }}
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
						<el-table-column align="center" label="申请类型" width="150">
							<template slot-scope="scope">
								<span v-if="!!scope.row.adjustType">
									{{
										typeFilter(scope.row.adjustType, 'proxyPatchAddAdjustType')
									}}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="adjustAmount"
							align="center"
							label="增加金额"
							width="150"
						>
							<template slot-scope="scope">
								{{ scope.row.adjustAmount || '-' }}
							</template>
						</el-table-column>
						<el-table-column
							prop="operatorTime"
							align="center"
							label="申请时间"
							width="180"
						>
							<template slot-scope="scope">
								{{ scope.row.operatorTime || '-' }}
							</template>
						</el-table-column>
						<el-table-column
							align="center"
							prop="details"
							label="审核人"
							width="180"
						>
							<template slot-scope="scope">
								<div v-if="!!scope.row.details && scope.row.details.length">
									<p v-if="scope.row.details[0]">
										{{ scope.row.details[0].authOperator }}
									</p>
									<p v-if="scope.row.details[1]">
										{{ scope.row.details[1].authOperator }}
									</p>
								</div>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							align="center"
							prop="details"
							label="审核时间"
							width="220"
						>
							<template slot-scope="scope">
								<div v-if="!!scope.row.details && scope.row.details.length">
									<p v-if="scope.row.details[0]">
										{{ scope.row.details[0].auditTime }}
									</p>
									<p v-if="scope.row.details[1]">
										{{ scope.row.details[1].auditTime }}
									</p>
								</div>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							align="center"
							prop="details"
							label="审核用时"
							width="150"
						>
							<template slot-scope="scope">
								<div v-if="!!scope.row.details && scope.row.details.length">
									<p v-if="scope.row.details[0]">
										{{ scope.row.details[0].costTime }}
									</p>
									<p v-if="scope.row.details[1]">
										{{ scope.row.details[1].costTime }}
									</p>
								</div>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="remark"
							align="center"
							label="备注"
							width="180"
						>
							<template slot-scope="scope">
								<div v-if="!!scope.row.details && scope.row.details.length">
									<p
										v-if="
											!!scope.row.details[0] && !!scope.row.details[0].remark
										"
									>
										一审：{{ scope.row.details[0].remark }}
									</p>
									<p v-else>-</p>
									<p
										v-if="
											!!scope.row.details[1] && !!scope.row.details[1].remark
										"
									>
										一审：{{ scope.row.details[1].remark }}
									</p>
									<p v-else>-</p>
								</div>
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
import dayjs from 'dayjs'
import { getUsername } from '@/utils/auth'
const end = dayjs()
	.endOf('day')
	.valueOf()
const start = dayjs()
	.startOf('day')
	.valueOf()

export default {
	name: 'AgentTopUpReviewRecord',
	components: {
		detail: () => import('./components/detail')
	},
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		return {
			queryData: {
				id: undefined,
				userName: undefined,
				orderStatus: undefined
			},
			type: true,
			showDetail: false,
			formTime: {
				time: [start, end]
			},
			rowData: {},
			name: '',
			activeName: '',
			dataList: []
		}
	},
	computed: {
		patchAdjustStatusFinish() {
			return this.globalDics.patchAdjustStatusFinish || []
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
				operatorTimeStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				operatorTimeEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined
			}
			params = {
				...this.getParams(params)
			}
			this.$api
				.fundsAuthRecordsProxyAddAudit(params)
				.then((res) => {
					if (res.code === 200) {
						const response = res.data
						this.loading = false
						this.dataList = response.record
						if (this.dataList) {
							this.dataList.forEach((item) => {
								item.lockStatus = Number(item.lockOrder) === 1
							})
						}
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
			this.rowData = row
			this.showDetail = true
		},
		goBack() {
			this.showDetail = false
			this.loadData()
		},
		reset() {
			this.queryData = {
				id: undefined,
				userName: undefined,
				orderStatus: undefined
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
