<template>
	<div class="game-container report-container">
		<template v-if="!showDetail">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="申请时间:">
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
					<el-form-item label="会员账号:">
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
								v-for="item in orderTypeArr"
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
									class="look"
									size="medium"
									@click="goDetail(scope.row)"
								>
									查看
								</el-button>
							</template>
						</el-table-column>
						<el-table-column
							prop="id"
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
							label="会员账号"
							width="130"
						>
							<template slot-scope="scope">
								{{ scope.row.userName || '-' }}
							</template>
						</el-table-column>
						<el-table-column
							prop="realName"
							align="center"
							label="会员姓名"
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
						<el-table-column
							prop="adjustType"
							align="center"
							label="调整类型"
							width="130"
						>
							<template slot-scope="scope">
								<span v-if="!!scope.row.adjustType">
									{{
										typeFilter(scope.row.adjustType, 'memberPatchAddAdjustType')
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
								<span v-if="!!scope.row.adjustAmount">
									{{ Number(scope.row.adjustAmount) }}
								</span>
								<span v-else>-</span>
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
							prop="details"
							align="center"
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
							prop="details"
							align="center"
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
							prop="details"
							align="center"
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
										{{ scope.row.details[0].remark }}
									</p>
									<p v-else>-</p>
									<p
										v-if="
											!!scope.row.details[1] && !!scope.row.details[1].remark
										"
									>
										{{ scope.row.details[1].remark }}
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
	name: 'MemberTopUpReviewRecord',
	components: { detail: () => import('./components/detail') },
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		return {
			queryData: {
				time: [start, end],
				orderNo: undefined,
				userName: undefined,
				orderStatus: ''
			},
			type: true,
			showDetail: false,
			rowData: {},
			name: '',
			dataList: []
		}
	},
	computed: {
		orderTypeArr() {
			return this.globalDics.patchAdjustStatusFinish || []
		}
	},
	mounted() {
		this.name = getUsername()
	},
	methods: {
		loadData() {
			this.loading = true
			const [operatorTimeStart, operatorTimeEnd] = this.queryData.time || []
			let params = {
				...this.queryData,
				operatorTimeStart: operatorTimeStart
					? dayjs(operatorTimeStart).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				operatorTimeEnd: operatorTimeEnd
					? dayjs(operatorTimeEnd).format('YYYY-MM-DD HH:mm:ss')
					: undefined
			}
			params = {
				...this.getParams(params)
			}
			delete params.time
			this.$api
				.memberIncreaseQuotaRecordAPI(params)
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
						this.loading = false
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
				time: [start, end],
				orderNo: undefined,
				userName: undefined,
				orderStatus: ''
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
.look {
	//background-color: #00BFBF;
	//border-color: #00BFBF;
	color: #00bfbf;
}
</style>
