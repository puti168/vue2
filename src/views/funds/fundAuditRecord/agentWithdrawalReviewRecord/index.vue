<template>
	<div class="game-container report-container">
		<template v-if="!showDetail">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="提款时间:">
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
							v-model="queryData.thirdOrderNo"
							clearable
							size="medium"
							:maxlength="50"
							style="width: 180px"
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
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="代理姓名:">
						<el-input
							v-model="queryData.realName"
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
								v-for="item in orderTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
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
						<el-table-column prop="auditNum" align="center" label="订单号" width="180">
							<template slot-scope="scope">
								<span v-if="!!scope.row.thirdOrderNo">
									{{ scope.row.thirdOrderNo }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column prop="userName" align="center" label="代理账号" width="125">
							<template slot-scope="scope">
								<span v-if="!!scope.row.userName">
									{{ scope.row.userName }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column prop="realName" align="center" label="代理姓名" width="125">
							<template slot-scope="scope">
								<span v-if="!!scope.row.realName">
									{{ scope.row.realName }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column prop="orderStatus" align="center" label="订单状态" width="120">
                            <template slot-scope="scope">
								<span v-if="!!scope.row.orderStatus">
									{{ typeFilter(scope.row.orderStatus, 'withdrawStatus') }}
								</span>
                                <span v-else>-</span>
                            </template>
						</el-table-column>
						<el-table-column prop="isBig" align="center" label="是否为大额提款" width="150">
							<template slot-scope="scope">
								<span v-if="!!scope.row.isBig">
									{{ scope.row.isBig }}
								</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
                        <el-table-column
                            prop="orderAmount"
                            align="center"
                            label="提款金额"
                            width="120"
                        >
                            <template slot-scope="scope">
								<span v-if="!!scope.row.orderAmount">
									{{ scope.row.orderAmount }}
								</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="orderRateAmount"
                            align="center"
                            label="提款手续费"
                            width="120"
                        >
                            <template slot-scope="scope">
								<span
                                    v-if="
										!!scope.row.orderRateAmount ||
											scope.row.orderRateAmount + '' === '0'
									"
                                >
									{{ scope.row.orderRateAmount }}
								</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="createdAt"
                            align="center"
                            label="申请时间"
                            width="180"
                        >
                            <template slot-scope="scope">
								<span v-if="!!scope.row.createdAt">
									{{ scope.row.createdAt }}
								</span>
                                <span v-else>-</span>
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
                            width="210"
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
                            width="130"
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
                            width="120"
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
import { routerNames } from '@/utils/consts'
const end = dayjs()
	.endOf('day')
	.valueOf()
const start = dayjs()
	.startOf('day')
	.valueOf()

export default {
	name: routerNames.agentWithdrawalReviewRecord,
	components: { detail },
	mixins: [list],
	data() {
		return {
			queryData: {
				time: [start, end],
                thirdOrderNo: undefined,
				userName: undefined,
				realName: undefined,
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
			return this.globalDics.withdrawStatusFinish
		}
	},
	mounted() {
		this.name = getUsername()
	},
	methods: {
		loadData() {
			this.loading = true
			const [createdAtStart, createdAtEnd] = this.queryData.time || []
			let params = {
				...this.queryData,
				createdAtStart: createdAtStart
					? dayjs(createdAtStart).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				createdAtEnd: createdAtEnd
					? dayjs(createdAtEnd).format('YYYY-MM-DD HH:mm:ss')
					: undefined
			}
			params = {
				...this.getParams(params)
			}
            delete params.time
			this.$api
				.agentWithdrawRecordAPI(params)
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
                thirdOrderNo: undefined,
                userName: undefined,
                realName: undefined,
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
