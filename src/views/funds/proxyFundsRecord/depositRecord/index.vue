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
							clearable
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
					<el-form-item label="代理账号:">
						<el-input
							v-model="queryData.userName"
							clearable
							:maxlength="11"
							size="medium"
							style="width: 260px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="代理姓名:">
						<el-input
							v-model="queryData.realName"
							clearable
							:maxlength="15"
							size="medium"
							style="width: 260px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="支付方式:" class="tagheight">
						<el-select
							v-model="queryData.payType"
							clearable
							style="width: 400px"
							placeholder="默认选择全部"
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
					<el-form-item label="订单来源:" class="tagheight">
						<el-select
							v-model="queryData.deviceType"
							clearable
							style="width: 300px"
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
							style="width: 260px"
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
					<el-form-item style="margin-left: 8px">
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
							v-if="hasPermission('269')"
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
					show-summary
					:summary-method="getSummaries"
					class="small-size-table"
					:data="tableData"
					style="width: 100%"
					:header-cell-style="getRowClass"
					@sort-change="_changeTableSort"
				>
					<el-table-column
						prop="thirdOrderNo"
						align="center"
						label="订单号"
						width="250"
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
						label="代理账号"
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
						label="代理姓名"
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
						width="130px"
					>
						<template slot-scope="scope">
							{{
								scope.row.deviceType === 0
									? '-'
									: typeFilter(scope.row.deviceType, 'deviceType')
							}}
						</template>
					</el-table-column>
					<el-table-column
						prop="orderStatus"
						align="center"
						label="订单状态"
						width="100px"
					>
						<template slot-scope="scope">
							{{ typeFilter(scope.row.orderStatus, 'depositStatus') }}
						</template>
					</el-table-column>
					<el-table-column
						prop="customerIp"
						align="center"
						label="存款IP"
						width="180px"
					>
						<template slot="header">
							登录IP
							<br />
							风控层级
						</template>
						<template slot-scope="scope">
							<span v-if="scope.row.customerIp !== null">
								{{ scope.row.customerIp }}
							</span>
							<span v-else>-</span>
							<br />
							<span class="redColor">
								风控层级：{{
									scope.row.ipControlName === null
										? '无'
										: scope.row.ipControlName
								}}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="deviceNo"
						align="center"
						label="存款设备终端"
						width="180px"
					>
						<template slot="header">
							存款设备终端
							<br />
							风控层级
						</template>
						<template slot-scope="scope">
							<span v-if="scope.row.deviceNo !== null">
								{{ scope.row.deviceNo }}
							</span>
							<span v-else>-</span>
							<br />
							<span class="redColor">
								风控层级：{{
									scope.row.deviceNoControlName === null
										? '无'
										: scope.row.deviceNoControlName
								}}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="payType"
						align="center"
						label="支付方式"
						width="150px"
					>
						<template slot-scope="scope">
							{{ typeFilter(scope.row.payType, 'enumPaymentDepositType') }}
						</template>
					</el-table-column>
					<el-table-column
						prop="orderAmount"
						align="center"
						label="存放金额"
						width="180px"
					></el-table-column>
					<el-table-column
						prop="createdAt"
						align="center"
						label="存款时间"
						min-width="200px"
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
			dataList: {},
			isIndeterminate: true,
			gameList: [],
			page: 1,
			size: 10,
			summary: {}
		}
	},
	computed: {
		depositStatus() {
			return this.globalDics.depositStatus
		},
		loginDeviceType() {
			return this.globalDics.loginDeviceType
		},
		enumPaymentDepositType() {
			return this.globalDics.enumPaymentDepositType
		}
	},
	mounted() {},

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
				.getProxyFundsRecordsDeposit(params)
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

		exportExcel() {
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
						.getProxyFundsRecordsDepositDownload(params)
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
							<p>总计</p>
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
					// sums[index] = (
					//   <div class='count_row'>
					//     <p>-</p>
					//     <p>-</p>
					//   </div>
					// )
				}
			})

			return sums
		},
		_changeTableSort({ column, prop, order }) {
			if (prop === 'createdAt') {
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
