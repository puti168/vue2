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
					<el-form-item label="存款时间:">
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
					<el-form-item label="订单号:">
						<el-input
							v-model="queryData.thirdOrderNo"
							clearable
							size="medium"
							style="width: 300px"
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
							style="width: 280px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="会员姓名:">
						<el-input
							v-model="queryData.realName"
							clearable
							:maxlength="15"
							size="medium"
							style="width: 280px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="订单来源:" class="tagheight">
						<el-select
							v-model="queryData.deviceType"
							clearable
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in loginDeviceType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="订单状态:" class="tagheight">
						<el-select
							v-model="queryData.orderStatus"
							clearable
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in depositStatus"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="存款IP:">
						<el-input
							v-model="queryData.customerIp"
							clearable
							:maxlength="15"
							size="medium"
							style="width: 205px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="支付方式:" class="tagheight">
						<el-select
							v-model="queryData.payType"
							clearable
							placeholder="默认选择全部"
							style="width: 280px"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in enumPaymentDepositType"
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
						<el-button
							v-if="hasPermission('261')"
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
					v-loading="loading"
					border
					show-summary
					:summary-method="getSummaries"
					size="mini"
					class="small-size-table"
					:data="tableData"
					style="width: 100%"
					:header-cell-style="getRowClass"
					@sort-change="_changeTableSort"
				>
					<el-table-column
						prop="thirdOrderNo"
						align="center"
						width="260"
						label="订单号"
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.thirdOrderNo"
								:title="scope.row.thirdOrderNo"
								:copy="copy"
							>
								{{ scope.row.thirdOrderNo }}
							</Copy>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="userName"
						align="center"
						label="会员账号"
						width="130"
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
						prop="realName"
						align="center"
						label="会员姓名"
						width="120"
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.realName"
								:title="scope.row.realName"
								:copy="copy"
							>
								{{ scope.row.realName }}
							</Copy>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="deviceType"
						align="center"
						label="订单来源"
						width="120"
					>
						<template slot-scope="scope">
							{{ typeFilter(scope.row.deviceType, 'loginDeviceType') }}
						</template>
					</el-table-column>
					<el-table-column
						prop="orderStatus"
						align="center"
						label="订单状态"
						width="100"
					>
						<template slot-scope="scope">
							{{ typeFilter(scope.row.orderStatus, 'depositStatus') }}
						</template>
					</el-table-column>
					<el-table-column prop="customerIp" align="center" width="150">
						<template slot="header">
							存款IP
							<br />
							风控层级
						</template>
						<template slot-scope="scope">
							<span>{{ scope.row.customerIp }}</span>
							<br />
							<span class="redColor">
								风控层级：{{
									scope.row.ipControlName ? scope.row.ipControlName : '-'
								}}
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="deviceNo" align="center" width="150">
						<template slot="header">
							存款终端设备号
							<br />
							风控层级
						</template>
						<template slot-scope="scope">
							<span>{{ scope.row.deviceNo }}</span>
							<br />
							<span class="redColor">
								风控层级：{{
									scope.row.deviceNoControlName
										? scope.row.deviceNoControlName
										: '-'
								}}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="payType"
						align="center"
						label="支付方式"
						width="160"
					>
						<template slot-scope="scope">
							{{ typeFilter(scope.row.payType, 'enumPaymentDepositType') }}
						</template>
					</el-table-column>
					<el-table-column
						prop="orderAmount"
						align="center"
						sortable="custom"
						width="200"
						label="存款金额"
					>
						<template slot-scope="scope">
							{{ scope.row.orderAmount || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="createdAt"
						align="center"
						label="存款时间"
						sortable="custom"
						min-width="200"
					>
						<template slot-scope="scope">
							{{ scope.row.createdAt || '-' }}
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
			searchTime: [startTime, endTime],
			tableData: [],
			summary: {}
		}
	},
	computed: {
		loginDeviceType() {
			return this.globalDics.loginDeviceType || []
		},
		depositStatus() {
			return this.globalDics.depositStatus || []
		},
		enumPaymentDepositType() {
			return this.globalDics.enumPaymentDepositType || []
		}
	},
	created() {},
	methods: {
		loadData() {
			this.loading = true
			const create = this.searchTime || []
			const [startTime, endTime] = create
			let params = {
				...this.queryData,
				createdAtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				createdAtEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: ''
			}
			params = {
				...this.getParams(params)
			}
			this.$api
				.getMemberFundsRecordsDeposit(params)
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
		reset() {
			this.queryData = {}
			this.searchTime = [startTime, endTime]
			this.pageNum = 1
			this.loadData()
		},
		_changeTableSort({ column, prop, order }) {
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
		exportExcel() {
			this.loading = true
			const create = this.searchTime || []
			const [startTime, endTime] = create
			let params = {
				...this.queryData,
				createdAtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				createdAtEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: ''
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
						.getMemberFundsRecordsDepositDownload(params)
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
							//   type: "error",
							//   message: "导出失败",
							//   duration: 1500,
							// });
						})
				})
				.catch(() => {})
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
				} else if (index === 8 && this.summary !== null) {
					const el = (
						<div class='count_row'>
							<p>{this.summary.subtotal}</p>
							<p>{this.summary.total}</p>
						</div>
					)
					sums[index] = el
					return
				} else {
					sums[index] = (
						<div class='count_row'>
							<p />
							<p />
						</div>
					)
				}
			})

			return sums
		},
		enterSearch() {
			this.loadData()
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/ .el-table__footer-wrapper .cell::after {
	border: 1px solid #ebeef5;
	content: '';
	position: absolute;
	top: 41px;
	left: 0;
	width: 100%;
}

/deep/ .el-table__fixed-footer-wrapper tr::after {
	border: 1px solid #ebeef5;
	content: '';
	position: absolute;
	top: 41px;
	left: 0;
	width: 100%;
}
.count_row {
	height: 80px;
	p {
		height: 40px;
		line-height: 40px;
		color: #5c5c5c;
		font-weight: 700;
		span {
			display: inline-block;
			width: 20px;
			height: 20px;
		}
	}
}
/deep/.el-table {
	overflow: auto;
}
/deep/.el-table__body-wrapper,
/deep/.el-table__header-wrapper,
/deep/.el-table__footer-wrapper {
	overflow: visible;
}
/deep/.el-table::after {
	position: relative !important;
}
</style>
