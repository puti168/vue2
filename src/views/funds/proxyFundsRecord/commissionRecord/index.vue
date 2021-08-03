<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="日期:">
						<el-date-picker
							v-model="onlineTime"
							:clearable="false"
							size="medium"
							format="yyyy-MM"
							type="month"
							align="right"
                            style="width: 230px"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="订单号:">
						<el-input
							v-model="queryData.orderNo"
							clearable
							size="medium"
							style="width: 330px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="订单状态:" class="tagheight">
						<el-select
							v-model="queryData.orderStatus"
							style="width: 230px"
							clearable
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in patchAdjustStatus"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="代理账号:">
						<el-input
							v-model="queryData.proxyAccount"
							clearable
							:maxlength="11"
							size="medium"
							style="width: 230px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>

					<el-form-item>
						<el-button
							type="primary"
							icon="el-icon-search"
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
						<el-button
						    v-if="hasPermission('275')"
							icon="el-icon-download"
							type="warning"
							:disabled="loading"
							size="medium"
							@click="exportExcel"
						>
							导出
						</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="content">
				<el-table
					ref="tables"
					v-loading="loading"
					border
					size="mini"
					class="small-size-table"
					:data="tableData"
					show-summary
					:summary-method="getSummaries"
					style="width: 100%"
					:header-cell-style="getRowClass"
					@sort-change="_changeTableSort"
				>
					<el-table-column
						prop="orderNo"
						width="200px"
						align="center"
						label="订单号"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.orderNo" :title="scope.row.orderNo">
								{{ scope.row.orderNo }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="orderStatus"
						width="150px"
						align="center"
						label="订单状态"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.orderStatus === 1">
								{{ typeFilter(scope.row.orderStatus, 'patchAdjustStatus') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="createdTime"
						width="180px"
						align="center"
						label="日期"
					></el-table-column>
					<el-table-column
						prop="proxyAccount"
						align="center"
						label="代理账号"
						width="130px"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.proxyAccount"
								:title="scope.row.proxyAccount"
							>
								{{ scope.row.proxyAccount }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="accountType"
						align="center"
						label="代理类型"
						width="120px"
					>
						<template slot-scope="scope">
							{{ typeFilter(scope.row.accountType, 'accountType') }}
						</template>
					</el-table-column>
					<el-table-column
						prop="accountStatus"
						align="center"
						label="账号状态"
						width="130px"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.accountStatus === 1" class="normalRgba">
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span
								v-else-if="scope.row.accountStatus === 2"
								class="disableRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span
								v-else-if="scope.row.accountStatus === 3"
								class="lockingRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span
								v-else-if="scope.row.accountStatus === 4"
								class="deleteRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="windControlName"
						align="center"
						label="风控层级"
						width="130px"
					></el-table-column>
					<el-table-column
						prop="currentLevel"
						align="center"
						label="代理等级"
						width="130px"
					></el-table-column>
					<el-table-column
						prop="totalNetAmount"
						align="center"
						width="180px"
						label="总输赢"
					></el-table-column>
					<el-table-column
						prop="totalPlatformAmount	"
						align="center"
						label="场馆费"
						width="130px"
					></el-table-column>
					<el-table-column
						prop="totalActivityAmount	"
						align="center"
						width="130px"
						label="活动彩金"
					></el-table-column>
					<el-table-column
						prop="totalRebateAmount"
						align="center"
						width="150px"
						label="返水"
					></el-table-column>
					<el-table-column
						prop="totalAdjustAmount"
						width="130px"
						align="center"
						label="账号调整"
					></el-table-column>
					<el-table-column
						prop="gameRebateRate"
						width="130px"
						align="center"
						label="补单输赢"
					></el-table-column>
					<el-table-column
						prop="totalPureAmount"
						align="center"
						width="150px"
						label="净输赢"
					></el-table-column>
					<el-table-column
						prop="totalLastAmount"
						align="center"
						width="130px"
						label="上月结余"
					></el-table-column>
					<el-table-column
						prop="totalRushAmount"
						align="center"
						width="150px"
						label="冲正后净输赢"
					></el-table-column>
					<el-table-column
						prop="commissionRate"
						align="center"
						label="佣金比例"
						width="150px"
					></el-table-column>

					<el-table-column
						prop="rewardAmount"
						align="center"
						label="等级专享"
						width="130px"
					></el-table-column>

					<el-table-column
						prop="commissionAmount"
						align="center"
						sortable="custom"
						width="130px"
						label="返佣"
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

export default {
	components: {},
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		this._changeTableSort = this.throttle(this._changeTableSort, 1000)
		return {
			queryData: {},
			onlineTime: Date.now(),
			tableData: [],
			dataList: {},
			isIndeterminate: true,
			gameList: [],
			page: 1,
			size: 10,
			summary: {},
			visible: false,
			tableVisible: false
		}
	},
	computed: {
		patchAdjustStatus() {
			return this.globalDics.patchAdjustStatus
		}
	},

	methods: {
		loadData() {
			this.loading = true
			let params = {
				...this.queryData,
				createAtEnd: dayjs(this.onlineTime).format('YYYY-MM-DD')
			}
			params = {
				...this.getParams(params)
			}
			this.$api
				.getProxyCommissionRecordSelect(params)
				.then((res) => {
					if (res.code === 200) {
						this.tableData = res.data.record
						this.total = res.data.totalRecord
						this.summary = res.data.summary
					}
					this.loading = false
				})
				.catch(() => {
					this.loading = false
				})
		},
		search() {
			let t = 10
			const timecount = setInterval(() => {
				t--
				this.queryText = t + 's'
				if (t < 0) {
					clearInterval(timecount)
					this.queryText = '查询'
				}
			}, 1000)
			this.loadData()
		},

		reset() {
			this.queryData = {}
			this.pageNum = 1
			this.onlineTime = Date.now()
			this.loadData()
		},

		exportExcel() {
			let params = {
				...this.queryData,
				createAtEnd: dayjs(this.onlineTime).format('YYYY-MM-DD')
			}
			params = {
				...this.getParams(params)
			}
			this.$confirm(
				`<strong>是否导出?</strong></br><span style='font-size:12px;color:#c1c1c1'>数据过大时，请耐心等待</span>`,
				'确认提示',
				{
					dangerouslyUseHTMLString: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			)
				.then(() => {
					this.$api
						.getProxyCommissionRecordProxyCommissionExport(params)
						.then((res) => {
							this.loading = false
							const { data, status } = res
							if (res && status === 200) {
								const { type } = data
								if (type.includes('application/json')) {
									const reader = new FileReader()
									reader.onload = (evt) => {
										if (evt.target.readyState === 2) {
											const {
												target: { result }
											} = evt
											const ret = JSON.parse(result)
											if (ret.code !== 200) {
												this.$message({
													type: 'error',
													message: ret.msg,
													duration: 1500
												})
											}
										}
									}
									reader.readAsText(data)
								} else {
									const result = res.data
									const disposition = res.headers['content-disposition']
									const fileNames = disposition && disposition.split("''")
									let fileName = fileNames[1]
									fileName = decodeURIComponent(fileName)
									const blob = new Blob([result], {
										type: 'application/octet-stream'
									})
									if ('download' in document.createElement('a')) {
										const downloadLink = document.createElement('a')
										downloadLink.download = fileName || ''
										downloadLink.style.display = 'none'
										downloadLink.href = URL.createObjectURL(blob)
										document.body.appendChild(downloadLink)
										downloadLink.click()
										URL.revokeObjectURL(downloadLink.href)
										document.body.removeChild(downloadLink)
									} else {
										window.navigator.msSaveBlob(blob, fileName)
									}
									this.$message({
										type: 'success',
										message: '导出成功',
										duration: 1500
									})
								}
							}
						})
						.catch(() => {
							this.loading = false
							// this.$message({
							//   type: 'error',
							//   message: '导出失败',
							//   duration: 1500
							// })
						})
						.catch(() => {})
				})
				.catch(() => {})
		},
		_changeTableSort({ column, prop, order }) {
			if (prop === 'commissionAmount') {
				prop = 1
			}

			this.queryData.orderKey = prop
			if (order === 'ascending') {
				// 升序
				this.queryData.orderType = 'asc'
			} else if (column.order === 'descending') {
				// 降序
				this.queryData.orderType = 'desc'
			} else {
				delete this.queryData.orderKey
				delete this.queryData.orderType
			}
			this.loadData()
		},
		clear() {
			this.onlineTime = Date.now()
		},
		getSummaries(param) {
			const { columns } = param
			const sums = []
			columns.forEach((column, index) => {
				if (index === 0) {
					const el = (
						<div class='count_row'>
							<p>小计</p>
							<p>合计</p>
						</div>
					)
					sums[index] = el
					return
				} else if (index === 8 && this.tableData.length > 0) {
					const el = (
						<div class='count_row'>
							<p>
								{this.summary.proxyCommissionRecordPageTotal.totalNetAmount}
							</p>
							<p>{this.summary.proxyCommissionRecordSumTotal.totalNetAmount}</p>
						</div>
					)
					sums[index] = el
					return
				} else if (index === 11 && this.tableData.length > 0) {
					const el = (
						<div class='count_row'>
							<p>
								{this.summary.proxyCommissionRecordPageTotal.totalRebateAmount}
							</p>
							<p>
								{this.summary.proxyCommissionRecordSumTotal.totalRebateAmount}
							</p>
						</div>
					)
					sums[index] = el
					return
				} else if (index === 12 && this.tableData.length > 0) {
					const el = (
						<div class='count_row'>
							<p>
								{this.summary.proxyCommissionRecordPageTotal.totalAdjustAmount}
							</p>
							<p>
								{this.summary.proxyCommissionRecordSumTotal.totalAdjustAmount}
							</p>
						</div>
					)
					sums[index] = el
					return
				} else if (index === 14 && this.tableData.length > 0) {
					const el = (
						<div class='count_row'>
							<p>
								{this.summary.proxyCommissionRecordPageTotal.totalPureAmount}
							</p>
							<p>
								{this.summary.proxyCommissionRecordSumTotal.totalPureAmount}
							</p>
						</div>
					)
					sums[index] = el
					return
				} else if (index === 15 && this.tableData.length > 0) {
					const el = (
						<div class='count_row'>
							<p>
								{this.summary.proxyCommissionRecordPageTotal.totalLastAmount}
							</p>
							<p>
								{this.summary.proxyCommissionRecordSumTotal.totalLastAmount}
							</p>
						</div>
					)
					sums[index] = el
					return
				} else if (index === 16 && this.tableData.length > 0) {
					const el = (
						<div class='count_row'>
							<p>
								{this.summary.proxyCommissionRecordPageTotal.totalRushAmount}
							</p>
							<p>
								{this.summary.proxyCommissionRecordSumTotal.totalRushAmount}
							</p>
						</div>
					)
					sums[index] = el
					return
				} else if (index === 18 && this.tableData.length > 0) {
					const el = (
						<div class='count_row'>
							<p>{this.summary.proxyCommissionRecordPageTotal.rewardAmount}</p>
							<p>{this.summary.proxyCommissionRecordSumTotal.rewardAmount}</p>
						</div>
					)
					sums[index] = el
					return
				} else if (index === 19 && this.tableData.length > 0) {
					const el = (
						<div class='count_row'>
							<p>
								{this.summary.proxyCommissionRecordPageTotal.commissionAmount}
							</p>
							<p>
								{this.summary.proxyCommissionRecordSumTotal.commissionAmount}
							</p>
						</div>
					)
					sums[index] = el
					return
				} else {
					// sums[index] = (
					//   <div class='count_row'>
					//     <p>-</p>
					//     <p>-</p>
					//   </div>
					// )
				}
			})

			return sums
		}
	}
}
</script>

<style lang="scss" scoped>
.count_row {
	height: 80px;
	p {
		height: 40px;
		line-height: 40px;
		span {
			display: inline-block;
			width: 20px;
			height: 20px;
		}
	}
}

.sum_footer {
	display: flex;
	display: -webkit-flex;
	justify-content: space-around;
	line-height: 45px;
	background: #f5f7fa;
	text-align: center;
	width: 100%;
	font-size: 14px;
	// flex-direction: row;
	color: #5c5c5c;
	font-weight: 700;
	border-bottom: 1px solid #ebeef5;
	border-left: 1px solid #ebeef5;
}
.sum_footer_unit {
	flex-grow: 1;
	-webkit-flex-grow: 1;
	box-sizing: border-box;
	border-right: 1px solid #ebeef5;
}
/deep/.el-dialog__header {
	color: #5c5c5c;
	font-weight: 700;
}
.params {
	padding-bottom: 15px;
}

.fenye {
	text-align: center;
}
</style>
