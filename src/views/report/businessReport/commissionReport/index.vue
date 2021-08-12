<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="月份:">
						<el-date-picker
							v-model="searchTime"
							type="monthrange"
							range-separator="-"
							:clearable="false"
							start-placeholder="开始月份"
							end-placeholder="结束月份"
							:picker-options="timeControl"
						></el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							icon="el-icon-search"
							:disabled="flag"
							size="medium"
							@click="search"
						>
							{{ queryText }}
						</el-button>
						<el-button
							icon="el-icon-refresh-left"
							:disabled="flag"
							size="medium"
							@click="reset"
						>
							重置
						</el-button>
						<el-button
							v-if="hasPermission('353')"
							icon="el-icon-download"
							type="warning"
							:disabled="loading"
							size="medium"
							@click="exportExcel"
						>
							导出
						</el-button>
						<el-button
							type="success"
							icon="el-icon-setting"
							:disabled="loading"
							size="medium"
							@click="openSetting"
						>
							列设置
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
				>
					<el-table-column
						v-if="commissionReport['月份']"
						prop="month"
						align="center"
						label="月份"
					></el-table-column>
					<el-table-column
						v-if="commissionReport['返佣人数']"
						prop="commissionPersonCount"
						align="center"
						label="返佣人数"
					>
						<template slot-scope="scope">
							<el-link
								class="lightBlueColor"
								type="primary"
								@click="dialogData(scope.row)"
							>
								{{ scope.row.commissionPersonCount }}
							</el-link>
						</template>
					</el-table-column>
					<el-table-column
						v-if="commissionReport['总返佣']"
						prop="commission"
						align="center"
						label="总返佣"
					>
						<template slot-scope="scope">
							{{ scope.row.commission | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="commissionReport['等级福利']"
						prop="levelWelfare"
						align="center"
						label="等级福利"
					>
						<template slot-scope="scope">
							{{ scope.row.levelWelfare | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="commissionReport['总投注人数']"
						prop="betPersonCount"
						align="center"
						label="总投注人数"
					></el-table-column>
					<el-table-column
						v-if="commissionReport['总注单量']"
						prop="betCount"
						align="center"
						label="总注单量 "
					></el-table-column>
					<el-table-column
						v-if="commissionReport['总投注金额']"
						prop="betAmount"
						align="center"
						label="总投注金额 "
					>
						<template slot-scope="scope">
							{{ scope.row.betAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="commissionReport['总有效投注']"
						prop="validBetAmount"
						align="center"
						label="总有效投注 "
					>
						<template slot-scope="scope">
							{{ scope.row.validBetAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="commissionReport['总投注盈亏']"
						prop="netAmount"
						align="center"
						label="总投注盈亏"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.netAmount > 0" class="enableColor">
								{{ scope.row.netAmount | filterDecimals }}
							</span>
							<span v-else-if="scope.row.netAmount < 0" class="redColor">
								{{ scope.row.netAmount | filterDecimals }}
							</span>
							<span v-else-if="scope.row.netAmount === 0">
								{{ scope.row.netAmount | filterDecimals }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-dialog
				:visible.sync="tableVisible"
				:destroy-on-close="true"
				class="rempadding"
			>
				<div slot="title" class="dialog-title">
					<span class="title-text">月份:{{ title }}</span>
				</div>
				<el-table
					v-loading="loadingDialog"
					size="mini"
					border
					class="small-size-table"
					:data="dialogList"
					style="margin-bottom: 15px"
					:header-cell-style="getRowClass"
					@sort-change="_changeTableSort"
				>
					<el-table-column
						prop="proxyAccount"
						align="center"
						label="代理账号"
					></el-table-column>
					<el-table-column prop="accountType" align="center" label="代理类型">
						<template slot-scope="scope">
							{{ typeFilter(scope.row.accountType, 'accountType') }}
						</template>
					</el-table-column>
					<el-table-column prop="accountStatus" align="center" label="账号状态">
						<template slot-scope="scope">
							{{ typeFilter(scope.row.accountStatus, 'accountStatusType') }}
						</template>
					</el-table-column>
					<el-table-column
						prop="windControlName"
						align="center"
						label="风控层级"
					>
						<template slot-scope="scope">
							{{ scope.row.windControlName ? scope.row.windControlName : '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="currentLevel" align="center" label="代理等级">
						<template slot-scope="scope">
							{{ scope.row.currentLevel ? scope.row.currentLevel : '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="rewardAmount"
						align="center"
						label="等级福利"
						sortable="custom"
					>
						<template slot-scope="scope">
							{{ scope.row.rewardAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						prop="commissionAmount"
						align="center"
						label="返佣金额"
						sortable="custom"
					>
						<template slot-scope="scope">
							{{ scope.row.commissionAmount | filterDecimals }}
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
			<el-dialog
				title="列设置"
				center
				:visible.sync="visible"
				width="450px"
				class="col-setting"
			>
				<div>
					<el-link type="primary" @click="clickDel">复原缺省</el-link>
				</div>
				<div
					v-for="(value, name) in commissionReport"
					:key="name"
					class="setting-div"
				>
					<el-checkbox v-if="newList.length > 0" v-model="newList[0][name]">
						{{ name }}
					</el-checkbox>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click="visible = false">取 消</el-button>
					<el-button type="primary" @click="confirm">提交</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
import { Decimal } from 'decimal.js'
const startTime = dayjs()
	.startOf('month')
	.subtract(6, 'month')
const endTime = dayjs()
	.subtract(0, 'month')
	.endOf('month')
export default {
	components: {},
	filters: {
		filterDecimals: function(val) {
			if (typeof val === 'number') {
				const newVal = val.toFixed(2, Decimal.ROUND_DOWN)
				return newVal
			} else {
				return '-'
			}
		}
	},
	mixins: [list],
	data() {
		return {
			queryData: {},
			searchTime: [startTime, endTime],
			month12: 336,
			// 日期使用
			timeControl: {
				onPick: ({ minDate, maxDate }) => {
					const min = new Date(minDate).getTime() / (24 * 3600 * 1000)
					const max = new Date(maxDate).getTime() / (24 * 3600 * 1000)
					console.log(max - min)
					if (
						minDate !== null &&
						maxDate !== null &&
						max - min > this.month12
					) {
						this.flag = true
						this.$message.warning('请缩小搜索范围至12个月')
					} else if (
						minDate !== null &&
						maxDate !== null &&
						this.queryText === '查询'
					) {
						this.flag = false
					} else {
						this.flag = true
					}
				},
				disabledDate: (time) => {
					return time.getTime() > Date.now()
				}
			},
			flag: false,
			queryText: '查询',
			tableData: [],
			dialogList: [],
			pageR: 1,
			sizeR: 10,
			dialogTotal: 0,
			monthNum: '',
			summary: {},
			title: '',
			visible: false,
			tableVisible: false,
			loadingDialog: false,
			commissionReport: {
				月份: true,
				返佣人数: true,
				总返佣: true,
				等级福利: true,
				总投注人数: true,
				总注单量: true,
				总投注金额: true,
				总有效投注: true,
				总投注盈亏: true
			},
			myName: '',
			newList: [],
			timecount: null,
			dialogSort: {}
		}
	},
	computed: {
		loginDeviceType() {
			return this.globalDics.loginDeviceType
		}
	},
	mounted() {
		this.myName = localStorage.getItem('username')
		this.initDB()
	},

	methods: {
		// 列设置
		openSetting() {
			this.getList()
			this.visible = true
		},
		initDB() {
			const request = indexedDB.open('commissionReport')
			request.onupgradeneeded = (event) => {
				const db = event.target.result
				this.db = db
				// 建表 名为person,主键为id
				db.createObjectStore('commissionReport', {
					keyPath: 'id',
					autoIncrement: true
				})
			}

			request.onsuccess = (event) => {
				this.db = event.target.result
				console.log('数据库打开/创建成功', event)
				this.clickAdd()
				this.getList()
			}
		},
		clickAdd() {
			const request = this.db
				.transaction(['commissionReport'], 'readwrite')
				.objectStore('commissionReport')
				.add({
					id: this.myName,
					obj: this.commissionReport
				})
			request.onsuccess = (event) => {
				this.getList()
			}
		},
		getList() {
			this.newList = []
			var transaction = this.db.transaction(['commissionReport'])
			const objectStore = transaction.objectStore('commissionReport')
			const list = []
			objectStore.openCursor().onsuccess = (event) => {
				const cursor = event.target.result
				if (cursor) {
					list.push(cursor.value)
					cursor.continue()
				} else {
					for (let i = 0; i < list.length; i++) {
						const ele = list[i]
						if (ele.id === this.myName) {
							this.newList.push(ele.obj)
							this.commissionReport = { ...ele.obj }
						}
					}
				}
			}
		},
		confirm() {
			const request = this.db
				.transaction(['commissionReport'], 'readwrite')
				.objectStore('commissionReport')
				.put({
					id: this.myName,
					obj: this.newList[0]
				})
			request.onsuccess = (event) => {
				this.visible = false
				this.getList()
				console.log('数据更新成功')
			}

			request.onerror = (event) => {
				console.log('数据更新失败')
			}
		},
		clickDel(id) {
			this.newList = []
			this.newList.push({
				月份: true,
				返佣人数: true,
				总返佣: true,
				等级福利: true,
				总投注人数: true,
				总注单量: true,
				总投注金额: true,
				总有效投注: true,
				总投注盈亏: true
			})
		},
		loadData() {
			const create = this.searchTime || []
			const [startTime, endTime] = create
			let params = {
				...this.queryData,
				startMonth: dayjs(startTime).format('YYYYMM') * 1,
				endMonth: dayjs(endTime).format('YYYYMM') * 1
			}
			params = {
				...this.getParams(params)
			}
			this.loading = true
			this.$api
				.getReportCommissionList(params)
				.then((res) => {
					if (res.code === 200 && res.data !== null) {
						this.tableData = res.data.record
					} else {
						this.tableData = []
					}
					this.loading = false
				})
				.catch(() => {
					this.loading = false
				})
			this.$api
				.getReportCommissionAggregation(params)
				.then((res) => {
					if (res.code === 200) {
						this.summary = res.data
					}
					this.loading = false
				})
				.catch(() => {
					this.loading = false
				})
		},
		search() {
			const create = this.searchTime || []
			const [startTime, endTime] = create
			const min = new Date(startTime).getTime() / (24 * 3600 * 1000)
			const max = new Date(endTime).getTime() / (24 * 3600 * 1000)
			if (max - min > this.month12) {
				this.flag = true
				this.$message.warning('请缩小搜索范围至12个月')
			} else if (this.queryText === '查询') {
				this.flag = true
				let t = 10
				clearInterval(this.timecount)
				this.timecount = setInterval(() => {
					t--
					this.queryText = t + 's'
					if (t < 0) {
						clearInterval(this.timecount)
						this.queryText = '查询'
						this.flag = false
					}
				}, 1000)
				this.loadData()
			}
		},
		reset() {
			this.queryData = {}
			this.dialogSort = {}
			this.searchTime = [startTime, endTime]
			this.pageNum = 1
			this.search()
		},
		dialogData(val) {
			const num = val.month.split('-')
			this.pageR = 1
			this.sizeR = 10
			this.title = val.month
			this.monthNum = num[0] + num[1]
			this.getReportCommissionDetail(this.monthNum)
			this.tableVisible = true
		},
		getReportCommissionDetail(val) {
			console.log(val)
			this.loadingDialog = true
			const params = {
				...this.dialogSort,
				pageNum: this.pageR,
				pageSize: this.sizeR,
				startMonth: val * 1,
				endMonth: val * 1
			}
			this.$api
				.getReportCommissionDetail(params)
				.then((res) => {
					if (res.code === 200) {
						console.log(res)
						this.dialogList = res.data.record
						this.dialogTotal = res.data.totalRecord
					}
					this.loadingDialog = false
				})
				.catch(() => {
					this.loadingDialog = false
				})
		},
		handleCurrentChangeDialog(val) {
			this.pageR = val
			this.getReportCommissionDetail(this.monthNum)
		},
		handleSizeChangeDialog(val) {
			this.sizeR = val
			this.getReportCommissionDetail(this.monthNum)
		},
		filterDecimals: function(val) {
			if (typeof val === 'number') {
				const newVal = val.toFixed(2, Decimal.ROUND_DOWN)
				return newVal
			} else {
				return '-'
			}
		},
		getSummaries(param) {
			const { columns, data } = param
			const sums = []
			columns.forEach((column, index) => {
				if (index === 0) {
					const el = (
						<div class='count_row'>
							<p>本页合计</p>
							<p>全部合计</p>
						</div>
					)
					sums[index] = el
					return
				} else if (index >= 1) {
					const values = data.map((item) => Number(item[column.property]))
					if (!values.every((value) => isNaN(value))) {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr)
							if (!isNaN(value)) {
								return prev + curr
							} else {
								return prev
							}
						}, 0)
						const num = sums[index]
						switch (index) {
							case 1:
								sums[index] = (
									<div class='count_row'>
										<p>{num}</p>
										<p>{this.summary.commissionPersonCountTotal}</p>
									</div>
								)
								break
							case 2:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>{this.filterDecimals(this.summary.commissionTotal)}</p>
									</div>
								)
								break
							case 3:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>{this.filterDecimals(this.summary.levelWelfareTotal)}</p>
									</div>
								)
								break
							case 4:
								sums[index] = (
									<div class='count_row'>
										<p>{num}</p>
										<p>{this.summary.betPersonCountTotal}</p>
									</div>
								)
								break
							case 5:
								sums[index] = (
									<div class='count_row'>
										<p>{num}</p>
										<p>{this.summary.betCountTotal}</p>
									</div>
								)
								break
							case 6:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>{this.filterDecimals(this.summary.betAmountTotal)}</p>
									</div>
								)
								break
							case 7:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.validBetAmountTotal)}
										</p>
									</div>
								)
								break
							case 8:
								sums[index] = (
									<div class='count_row'>
										{num > 0 ? (
											<p class='enableColor'>{this.filterDecimals(num)}</p>
										) : (
											<p class='redColor'>{this.filterDecimals(num)}</p>
										)}
										{this.summary.netAmountTotal > 0 ? (
											<p class='enableColor'>
												{this.filterDecimals(this.summary.netAmountTotal)}
											</p>
										) : this.summary.netAmountTotal === 0 ? (
											<p>{this.filterDecimals(this.summary.netAmountTotal)}</p>
										) : (
											<p class='redColor'>
												{this.filterDecimals(this.summary.netAmountTotal)}
											</p>
										)}
									</div>
								)
								break
						}
					} else {
						sums[index] = ''
					}
				}
			})

			return sums
		},
		_changeTableSort({ column, prop, order }) {
			switch (prop) {
				case 'rewardAmount':
					prop = 1
					break
				case 'commissionAmount':
					prop = 2
					break
			}
			this.dialogSort.orderKey = prop
			if (order === 'ascending') {
				// 升序
				this.dialogSort.orderType = 'asc'
			} else if (column.order === 'descending') {
				// 降序
				this.dialogSort.orderType = 'desc'
			} else {
				delete this.dialogSort.orderKey
				delete this.dialogSort.orderType
			}
			this.getReportCommissionDetail(this.monthNum)
		},
		exportExcel() {
			this.loading = true
			const create = this.searchTime || []
			const [startTime, endTime] = create
			let params = {
				...this.queryData,
				startMonth: startTime ? dayjs(startTime).format('YYYY-MM') : '',
				endMonth: endTime ? dayjs(endTime).format('YYYY-MM') : ''
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
						.getGameRecordDownload(params)
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
							this.$message({
								type: 'error',
								message: '导出失败',
								duration: 1500
							})
						})
				})
				.catch(() => {})
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
	color: #5c5c5c;
	font-weight: 700;
}
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
	color: #5c5c5c;
	p {
		height: 40px;
		line-height: 40px;
		font-weight: 700;
		span {
			display: inline-block;
			width: 20px;
			height: 20px;
		}
	}
}
.fenye {
	text-align: center;
}
.setting-div {
	display: inline-block;
	min-width: 100px;
}
</style>
