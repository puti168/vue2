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
							style="width: 400px"
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
							style="width: 251px"
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
							style="width: 251px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="领取状态:" class="tagheight">
						<el-select
							v-model="queryData.rebateStatus"
							clearable
							placeholder="默认选择全部"
							style="width: 237px"
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
					<el-form-item style="margin-left: 25px">
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
							v-if="hasPermission('266')"
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
					<el-table-column prop="id" align="center" width="300" label="订单号">
						<template slot-scope="scope">
							<Copy v-if="!!scope.row.id" :title="scope.row.id" :copy="copy">
								{{ scope.row.id }}
							</Copy>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="userName"
						align="center"
						label="会员账号"
						min-width="160"
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
						width="150"
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
						prop="rebateStatus"
						align="center"
						label="领取状态"
						width="150"
					>
						<template slot-scope="scope">
							{{ typeFilter(scope.row.rebateStatus, 'rebateType') }}
						</template>
					</el-table-column>
					<el-table-column
						prop="validBetAmount"
						align="center"
						label="有效投注金额 "
						width="200"
					>
						<template slot-scope="scope">
							{{ scope.row.validBetAmount || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="rebateAmount"
						align="center"
						label="返水金额"
						width="200"
					>
						<template slot-scope="scope">
							<el-link type="primary" @click="dialogData(scope.row)">
								{{ scope.row.rebateAmount }}
							</el-link>
						</template>
					</el-table-column>
					<el-table-column
						prop="rebateAt"
						align="center"
						sortable="custom"
						label="领取时间"
						width="250"
					>
						<template slot-scope="scope">
							{{ scope.row.rebateAt || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="createdAt"
						align="center"
						sortable="custom"
						label="订单生成时间"
						width="250"
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
		<el-dialog
			:visible.sync="tableVisible"
			:destroy-on-close="true"
			class="rempadding"
		>
			<div slot="title" class="dialog-title">
				<span class="title-text" style="margin-right: 15px">
					会员账号{{ userName }}的返水明细
				</span>
			</div>
			<el-table
				v-loading="loading"
				size="mini"
				border
				class="small-size-table"
				:data="orderDetails"
				style="margin-bottom: 15px"
				:header-cell-style="getRowClass"
				@sort-change="changeTableSort"
			>
				<el-table-column prop="venueName" align="center" label="游戏平台">
					<template slot-scope="scope">
						{{ scope.row.venueName || '-' }}
					</template>
				</el-table-column>
				<el-table-column prop="gameName" align="center" label="游戏类型">
					<template slot-scope="scope">
						{{ scope.row.gameName || '-' }}
					</template>
				</el-table-column>
				<el-table-column
					prop="validBetAmount"
					align="center"
					label="有效投注金额"
				>
					<template slot-scope="scope">
						{{ scope.row.validBetAmount || '-' }}
					</template>
				</el-table-column>
				<el-table-column prop="rebateRatio" align="center" label="返水比例">
					<template slot-scope="scope">
						{{ scope.row.rebateRatio || '-' }}
					</template>
				</el-table-column>
				<el-table-column
					prop="rebateAmount"
					align="center"
					label="返水金额"
					sortable="custom"
				>
					<template slot-scope="scope">
						{{ scope.row.rebateAmount || '-' }}
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination
				:current-page.sync="pageR"
				background
				class="fenye"
				layout="total, sizes,prev, pager, next, jumper"
				:page-size="sizeR"
				:page-sizes="[10, 20, 50]"
				:total="dialogTotal"
				@current-change="handleCurrentChangeDialog"
				@size-change="handleSizeChangeDialog"
			></el-pagination>
			<div slot="footer" class="dialog-footer" style="text-align: center">
				<el-button @click="tableVisible = false">关闭</el-button>
			</div>
		</el-dialog>
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
		this.changeTableSort = this.throttle(this.changeTableSort, 1000)
		return {
			queryData: {},
			receiveTime: [startTime, endTime],
			orderTime: [startTime, endTime],
			tableData: [],
			venueTypeList: [],
			summary: {},
			tableVisible: false,
			userName: '',
			orderDetails: [],
			detailsObj: {},
			pageR: 1,
			sizeR: 10,
			dialogTotal: 0
		}
	},
	computed: {
		rebateType() {
			return this.globalDics.rebateType || []
		}
	},
	created() {
		this.getVenueTypeList()
	},
	methods: {
		getVenueTypeList() {
			this.$api.getMerchantGameGamePlant().then((res) => {
				if (res.code === 200) {
					this.venueTypeList = res.data
				}
			})
		},
		loadData() {
			this.loading = true
			const receive = this.receiveTime || []
			const order = this.orderTime || []
			const [startTime, endTime] = receive
			const [start, end] = order
			let params = {
				...this.queryData,
				rebateAtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				rebateAtEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				createdAtStart: start ? dayjs(start).format('YYYY-MM-DD HH:mm:ss') : '',
				createdAtEnd: end ? dayjs(end).format('YYYY-MM-DD HH:mm:ss') : ''
			}
			params = {
				...this.getParams(params)
			}
			this.$api
				.getMemberFundsRecordsRebateReport(params)
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
			this.receiveTime = [startTime, endTime]
			this.orderTime = [startTime, endTime]
			this.pageNum = 1
			this.loadData()
		},
		dialogData(val) {
			this.userName = val.userName
			this.pageR = 1
			this.sizeR = 10
			this.detailsObj.userId = val.userId
			this.detailsObj.reportDate = val.reportDate
			this.getMemberFundsRecordsRebateRecord()
			this.tableVisible = true
		},
		getMemberFundsRecordsRebateRecord() {
			const params = {
				...this.detailsObj,
				pageNum: this.pageR,
				pageSize: this.sizeR
			}
			this.$api.getMemberFundsRecordsRebateRecord(params).then((res) => {
				if (res.code === 200) {
					this.orderDetails = res.data.record
					this.dialogTotal = res.data.totalRecord
				}
			})
		},

		handleCurrentChangeDialog(val) {
			console.log(111, val)
			this.pageR = val
			this.getMemberFundsRecordsRebateRecord()
		},
		handleSizeChangeDialog(val) {
			console.log(222, val)
			this.sizeR = val
			this.getMemberFundsRecordsRebateRecord()
		},
		_changeTableSort({ column, prop, order }) {
			switch (prop) {
				case 'rebateAt':
					prop = 1
					break
				case 'createdAt':
					prop = 2
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
		changeTableSort({ column, prop, order }) {
			this.pageR = 1
			this.detailsObj.orderKey = prop
			if (order === 'ascending') {
				// 升序
				this.detailsObj.orderType = 'asc'
			} else if (order === 'descending') {
				// 降序
				this.detailsObj.orderType = 'desc'
			} else {
				delete this.detailsObj.orderKey
				delete this.detailsObj.orderType
			}
			this.getMemberFundsRecordsRebateRecord()
		},
		exportExcel() {
			this.loading = true
			const receive = this.receiveTime || []
			const order = this.orderTime || []
			const [startTime, endTime] = receive
			const [start, end] = order
			let params = {
				...this.queryData,
				rebateAtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				rebateAtEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				createdAtStart: start ? dayjs(start).format('YYYY-MM-DD HH:mm:ss') : '',
				createdAtEnd: end ? dayjs(end).format('YYYY-MM-DD HH:mm:ss') : ''
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
						.getMemberFundsRecordsRebateRecordDownload(params)
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
				} else if (index === 4 && this.summary !== null) {
					const el = (
						<div class='count_row'>
							<p>{this.summary.validBetSubtotal}</p>
							<p>{this.summary.validBetTotal}</p>
						</div>
					)
					sums[index] = el
					return
				} else if (index === 5 && this.summary !== null) {
					const el = (
						<div class='count_row'>
							<p>{this.summary.rebateSubtotal}</p>
							<p>{this.summary.rebateTotal}</p>
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
/deep/.el-dialog__header {
	color: #909399;
	font-weight: 700;
}
.fenye {
	text-align: center;
}
</style>
