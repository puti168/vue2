<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="账变时间:">
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
					<el-form-item label="代理账号:">
						<el-input
							v-model="queryData.userName"
							clearable
							:maxlength="11"
							size="medium"
							style="width: 200px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="关联订单号:">
						<el-input
							v-model="queryData.eventId"
							clearable
							size="medium"
							style="width: 286px"
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
							style="width: 300px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="账号状态:" class="tagheight">
						<el-select
							v-model="queryData.accountStatus"
							style="width: 300px"
							multiple
							clearable
							collapse-tags
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in accountStatusType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="风控层级:" class="tagheight">
						<el-select
							v-model="queryData.windControlId"
							clearable
							style="width: 300px"
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in windControlLevelList"
								:key="item.windControlId"
								:label="item.windControlName"
								:value="item.windControlId"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="代理钱包:" class="tagheight">
						<el-select
							v-model="queryData.accountType"
							style="width: 300px"
							placeholder="默认选择全部"
							:popper-append-to-body="false"
							@change="getMerchantDict($event)"
						>
							<el-option
								v-for="item in proxyWalletType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="业务类型:" class="tagheight">
						<el-select
							v-model="queryData.bizType"
							clearable
							style="width: 300px"
							placeholder="默认选择全部"
							@change="changeSelect($event)"
						>
							<el-option
								v-for="item in accountBizDicList"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="账变类型:" class="tagheight">
						<el-select
							v-model="queryData.type"
							clearable
							style="width: 300px"
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in accountChangeDic"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="收支类型:" class="tagheight">
						<el-select
							v-model="queryData.transType"
							style="width: 300px"
							clearable
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in accountBizType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="账变金额 :" class="numberBox">
						<el-input-number
							v-model="queryData.amountMin"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
							:min="-9999999999.99"
							:max="9999999999.99"
							:precision="2"
							name="amountMin"
							@blur="checkValue($event)"
						></el-input-number>
						-
						<el-input-number
							v-model="queryData.amountMax"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
							:min="-9999999999.99"
							:max="9999999999.99"
							:precision="2"
							name="amountMax"
							@blur="checkValue($event)"
						></el-input-number>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							icon="el-icon-search"
							size="medium"
							:disabled="loading"
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
							v-if="hasPermission('268')"
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
						prop="eventId"
						fixed
						align="center"
						width="260"
						label="关联订单号"
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.eventId"
								:title="scope.row.eventId"
								:copy="copy"
							>
								{{ scope.row.eventId }}
							</Copy>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="userName"
						align="center"
						width="180"
						label="代理账号"
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
						width="180"
						label="代理姓名"
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
						prop="windControlName	"
						align="center"
						label="风控层级"
						width="130"
					>
						<template slot-scope="scope">
							{{ scope.row.windControlName || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="accountStatus"
						align="center"
						label="账号状态"
						width="100"
					>
						<template slot-scope="scope">
							<span
								v-if="
									!!scope.row.accountStatus && scope.row.accountStatus * 1 === 1
								"
								class="normalRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span
								v-else-if="
									!!scope.row.accountStatus && scope.row.accountStatus * 1 === 2
								"
								class="disableRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span
								v-else-if="
									!!scope.row.accountStatus && scope.row.accountStatus * 1 === 3
								"
								class="lockingRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span
								v-else-if="
									!!scope.row.accountStatus && scope.row.accountStatus * 1 === 4
								"
								class="deleteRgba"
							>
								{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="accountType"
						align="center"
						label="代理钱包"
						width="120"
					>
						<template slot-scope="scope">
							{{ typeFilter(scope.row.accountType, 'proxyWalletType') }}
						</template>
					</el-table-column>
					<el-table-column
						prop="bizType"
						align="center"
						label="业务类型"
						width="180"
					>
						<template slot-scope="scope">
							{{
								scope.row.bizType === 0
									? '-'
									: typeFilter(scope.row.bizType, 'proxyAccountBizType')
							}}
						</template>
					</el-table-column>
					<el-table-column
						prop="type"
						align="center"
						label="账变类型"
						width="150"
					>
						<template slot-scope="scope">
							{{ typeFilter(scope.row.type, 'proxyAccountChangeType') }}
						</template>
					</el-table-column>
					<el-table-column
						prop="transType"
						align="center"
						label="收支类型"
						width="150"
					>
						<template slot-scope="scope">
							{{
								scope.row.transType === 0
									? '-'
									: typeFilter(scope.row.transType, 'accountBizType')
							}}
						</template>
					</el-table-column>
					<el-table-column
						prop="changeBefore"
						align="center"
						label="账变前金额"
						width="120"
						sortable="custom"
					>
						<template slot-scope="scope">
							{{ scope.row.changeBefore || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="amount"
						align="center"
						width="130"
						sortable="custom"
						label="账变金额"
					>
						<template slot-scope="scope">
							{{ scope.row.amount || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="changeAfter"
						align="center"
						label="账变后金额"
						width="120"
						sortable="custom"
					>
						<template slot-scope="scope">
							{{ scope.row.changeAfter || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="occurDt"
						align="center"
						label="账变时间"
						width="170"
						sortable="custom"
					>
						<template slot-scope="scope">
							{{ scope.row.occurDt || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="remark"
						align="center"
						label="备注"
						width="150"
					>
						<template slot-scope="scope">
							{{ scope.row.remark || '-' }}
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
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		this._changeTableSort = this.throttle(this._changeTableSort, 1000)
		return {
			queryData: {
				accountType: '0',
				type: ''
			},
			searchTime: [startTime, endTime],
			tableData: [],
			dataList: {},
			accountBizDicList: 0,
			accountChangeDic: 0,
			windControlLevelList: [],
			summary: {},
			visible: false,
			tableVisible: false,
			walletCode: 0,
			bizCode: 0
		}
	},
	computed: {
		proxyAccountBizType() {
			return this.globalDics.proxyAccountBizType || []
		},
		accountType() {
			return this.globalDics.accountType || []
		},
		accountStatusType() {
			return this.globalDics.accountStatusType || []
		},
		proxyAccountChangeType() {
			return this.globalDics.proxyAccountChangeType || []
		},
		accountBizType() {
			return this.globalDics.accountBizType || []
		},
		proxyWalletType() {
			return this.globalDics.proxyWalletType || []
		}
	},
	created() {
		this.getWindControllerLevelDict()
	},
	mounted() {
		this.getMerchantDict(this.walletCode)
		this.changeSelect(this.bizCode)
	},

	methods: {
		getMerchantDict(val) {
			const walletCode = val
			this.$api
				.getProxyFundsRecordsAccountBizDic({ walletCode })
				.then((res) => {
					const { code } = res
					if (res && code === 200) {
						this.accountBizDicList = res.data || []
					} else {
						this.accountBizDicList = []
					}
				})
		},
		changeSelect(val) {
			this.queryData.type = ''
			const bizCode = val || 0
			this.$api
				.getProxyFundsRecordsAccountChangeDic({ bizCode })
				.then((res) => {
					const { code } = res
					if (res && code === 200) {
						this.accountChangeDic = res.data || []
					}
				})
		},
		loadData() {
			this.loading = true
			const create = this.searchTime || []
			const [startTime, endTime] = create
			let params = {
				...this.queryData,
				occurDtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				occurDtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
			}
			params = {
				...this.getParams(params)
			}
			this.$api
				.getProxyFundsRecordsAccountChange(params)
				.then((res) => {
					this.loading = false
					const { code } = res
					if (res && code === 200) {
						this.tableData = res.data.record || []
						this.total = res.data.totalRecord || 0
						this.summary = res.data.summary
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		// 获取风控层级
		getWindControllerLevelDict() {
			this.$api
				.getWindControllerLevelDict({ windControlType: 2 })
				.then((res) => {
					const { code } = res
					if (res && code === 200) {
						this.windControlLevelList = res.data || []
					} else {
						this.windControlLevelList = []
					}
				})
		},
		getDictgetAllDictList() {
			this.$api.getDictgetAllDictList().then((res) => {
				const { code } = res
				if (res && code === 200) {
					this.accountStatusType = res.data || []
				} else {
					this.accountStatusType = []
				}
			})
		},
		reset() {
			this.pageNum = 1
			this.queryData = {
				accountType: '0'
			}
			this.searchTime = [startTime, endTime]
			this.loadData()
		},

		exportExcel() {
			const create = this.searchTime || []
			const [startTime, endTime] = create
			let params = {
				...this.queryData,
				occurDtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				occurDtEnd: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
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
						.getProxyFundsRecordsAccountChangeDownload(params)
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
							<p>{this.summary.subChangeBefore}</p>
							<p>{this.summary.totalChangeBefore}</p>
						</div>
					)
					sums[index] = el
					return
				} else if (index === 9 && this.summary !== null) {
					const el = (
						<div class='count_row'>
							<p>{this.summary.subChange}</p>
							<p>{this.summary.totalChange}</p>
						</div>
					)
					sums[index] = el
					return
				} else if (index === 10 && this.summary !== null) {
					const el = (
						<div class='count_row'>
							<p>{this.summary.subChangeAfter}</p>
							<p>{this.summary.totalChangeAfter}</p>
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
		_changeTableSort({ column, prop, order }) {
			const obj = {
				changeBefore: 1,
				amount: 2,
				changeAfter: 3,
				occurDt: 4
			}
			this.queryData.orderKey = obj[prop]
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
		checkValue(e) {
			const { name, value } = e.target
			switch (name) {
				case 'amountMin':
					if (
						!!this.queryData.amountMax &&
						value &&
						value * 1 > this.queryData.amountMax * 1
					) {
						this.$message({
							type: 'warning',
							message: `账变金额输入最小值不能大于最大值`
						})
					} else if (value !== '') {
						this.queryData.amountMin = value
					} else {
						this.queryData.amountMin = undefined
					}
					break
				case 'amountMax':
					if (
						!!this.queryData.amountMin &&
						value &&
						value * 1 < this.queryData.amountMin * 1
					) {
						this.$message({
							type: 'warning',
							message: `账变金额输入最大值不能小于最小值`
						})
					} else if (value !== '') {
						this.queryData.amountMax = value
					} else {
						this.queryData.amountMax = undefined
					}
					break
			}
		},
		enterSearch() {
			this.loadData()
		}
	}
}
</script>

<style lang="scss" scoped>
.el-table--border::after,
.el-table--group::after {
	width: 0;
}
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
/deep/.el-table {
	overflow: auto;
}
/deep/.el-table__body-wrapper,
/deep/.el-table__header-wrapper,
/deep/.el-table__footer-wrapper {
	overflow: visible;
}
.params {
	padding-bottom: 15px;
}

.fenye {
	text-align: center;
}
.numberBox /deep/.el-input-number__decrease,
.numberBox /deep/.el-input-number__increase {
	display: none;
}
.numberBox /deep/.el-input__inner {
	padding: 0 15px;
	text-align: left;
}
</style>
