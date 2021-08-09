<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="日期:">
						<el-date-picker
							v-model="searchTime"
							type="daterange"
							range-separator="-"
							:clearable="false"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
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
							v-if="hasPermission('343')"
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
				<div class="checkBox">
					<h5>场馆：</h5>
					<div class="all">
						<div style="margin-right: 30px">
							<el-checkbox
								v-model="checkAll"
								:indeterminate="isIndeterminate"
								@change="handleCheckAllChange"
							>
								全选
							</el-checkbox>
						</div>
						<el-checkbox-group
							v-model="gameCodeList"
							@change="handleCheckedCitiesChange"
						>
							<el-checkbox
								v-for="itme in gameTypeList"
								:key="itme.gameCode"
								:label="itme.gameCode"
							>
								{{ itme.gameName }}
							</el-checkbox>
						</el-checkbox-group>
					</div>
				</div>
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
						v-if="venueProfitAndLoss['场馆']"
						prop="venueName"
						align="center"
						label="场馆"
					>
						<template slot-scope="scope">
							<el-link
								class="lightBlueColor"
								type="primary"
								:disabled="scope.row.projectType === 2"
								@click="dialogData(scope.row)"
							>
								{{ scope.row.venueName }}
							</el-link>
						</template>
					</el-table-column>
					<el-table-column
						v-if="venueProfitAndLoss['项目']"
						prop="projectType"
						align="center"
						label="项目"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.projectType === 1">游戏</span>
							<span v-else>打赏</span>
						</template>
					</el-table-column>
					<el-table-column
						v-if="venueProfitAndLoss['投注人数']"
						prop="memberCount"
						align="center"
						sortable="custom"
						label="投注人数"
					></el-table-column>
					<el-table-column
						v-if="venueProfitAndLoss['注单量']"
						prop="betCount"
						align="center"
						sortable="custom"
						label="注单量"
					></el-table-column>
					<el-table-column
						v-if="venueProfitAndLoss['投注金额']"
						prop="betAmount"
						align="center"
						sortable="custom"
						label="投注金额"
					>
						<template slot-scope="scope">
							{{ scope.row.betAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="venueProfitAndLoss['有效投注']"
						prop="validBetAmount"
						align="center"
						sortable="custom"
						label="有效投注 "
					>
						<template slot-scope="scope">
							{{ scope.row.validBetAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						v-if="venueProfitAndLoss['投注盈亏']"
						prop="netAmount"
						align="center"
						sortable="custom"
						label="投注盈亏"
					>
						<template slot="header">
							<span>投注盈亏</span>
							<el-tooltip class="item" effect="dark">
								<i
									class="el-icon-question"
									style="position: absolute; right: 10px"
								></i>
								<div slot="content">
									盈亏金额指游戏输赢金额
									<br />
									负数表示会员输
								</div>
							</el-tooltip>
						</template>
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
			<el-dialog
				:visible.sync="tableVisible"
				:destroy-on-close="true"
				class="rempadding"
			>
				<div slot="title" class="dialog-title">
					<span class="title-text" style="margin-right: 15px">
						场馆名称:{{ venueName }}
					</span>
					<!-- <span class="title-text">项目名称:{{ title1 }}</span> -->
				</div>
				<el-table
					v-loading="loading"
					size="mini"
					border
					class="small-size-table"
					:data="gameList"
					style="margin-bottom: 15px"
					:header-cell-style="getRowClass"
				>
					<el-table-column
						prop="staticsDate"
						align="center"
						label="日期"
					></el-table-column>
					<el-table-column
						prop="memberCount"
						align="center"
						label="投注人数"
					></el-table-column>
					<el-table-column
						prop="betCount"
						align="center"
						label="注单量"
					></el-table-column>
					<el-table-column prop="betAmount" align="center" label="投注金额">
						<template slot-scope="scope">
							{{ scope.row.betAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column
						prop="validBetAmount"
						align="center"
						label="有效投注"
					>
						<template slot-scope="scope">
							{{ scope.row.validBetAmount | filterDecimals }}
						</template>
					</el-table-column>
					<el-table-column prop="netAmount" align="center" label="投注盈亏">
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
				width="500px"
				class="col-setting"
			>
				<div>
					<el-link type="primary" @click="clickDel">复原缺省</el-link>
				</div>
				<div
					v-for="(value, name) in venueProfitAndLoss"
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
	.startOf('day')
	.valueOf()
const endTime = dayjs()
	.endOf('day')
	.valueOf()

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
			day31: 30 * 24 * 3600 * 1000,
			// 日期使用
			timeControl: {
				onPick: ({ maxDate, minDate }) => {
					console.log(maxDate, minDate)
					if (maxDate - minDate > this.day31) {
						this.flag = true
						this.$message.warning('请缩小搜索范围至31天')
					}
					if (
						maxDate !== null &&
						minDate !== null &&
						maxDate - minDate <= this.day31 &&
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
			checkAll: true,
			gameCodeList: [],
			gameTypeList: [],
			isIndeterminate: false,
			gameList: [],
			pageR: 1,
			sizeR: 10,
			gameCode: '',
			dialogTotal: 0,
			summary: {},
			venueName: '',
			visible: false,
			tableVisible: false,
			venueProfitAndLoss: {
				场馆: true,
				项目: true,
				投注人数: true,
				注单量: true,
				投注金额: true,
				有效投注: true,
				投注盈亏: true
			},
			newList: [],
			timecount: null
		}
	},
	computed: {},
	created() {
		this.seleceInit()
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
			const request = indexedDB.open('venueProfitAndLoss')
			request.onupgradeneeded = (event) => {
				const db = event.target.result
				this.db = db
				// 建表 名为person,主键为id
				db.createObjectStore('venueProfitAndLoss', {
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
				.transaction(['venueProfitAndLoss'], 'readwrite')
				.objectStore('venueProfitAndLoss')
				.add({
					id: this.myName,
					obj: this.venueProfitAndLoss
				})
			request.onsuccess = (event) => {
				this.getList()
			}
		},
		getList() {
			this.newList = []
			var transaction = this.db.transaction(['venueProfitAndLoss'])
			const objectStore = transaction.objectStore('venueProfitAndLoss')
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
							this.venueProfitAndLoss = { ...ele.obj }
						}
					}
				}
			}
		},
		confirm() {
			const request = this.db
				.transaction(['venueProfitAndLoss'], 'readwrite')
				.objectStore('venueProfitAndLoss')
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
				场馆: true,
				项目: true,
				投注人数: true,
				注单量: true,
				投注金额: true,
				有效投注: true,
				投注盈亏: true
			})
		},
		seleceInit() {
			this.$api.getMerchantGameGamePlant().then((res) => {
				if (res.code === 200) {
					this.gameTypeList = res.data
					for (let i = 0; i < res.data.length; i++) {
						const ele = res.data[i]
						this.gameCodeList.push(ele.gameCode)
					}
					this.initData()
				}
			})
		},
		initData() {
			const create = this.searchTime || []
			const [startTime, endTime] = create
			let params = {
				...this.queryData,
				gameCodeList: this.gameCodeList,
				startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD') : '',
				endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD') : ''
			}
			params = {
				...this.getParams(params)
			}

			if (endTime - startTime > this.day31) {
				this.$message.warning('请缩小搜索范围至31天')
			} else {
				this.loading = true
				this.$api
					.getReportVenueNetAmountDayListPage(params)
					.then((res) => {
						if (res.code === 200) {
							this.tableData = res.data.record
							this.total = res.data.totalRecord
						}
						this.loading = false
					})
					.catch(() => {
						this.loading = false
					})
				this.$api
					.getReportVenueNetAmountDaySummary(params)
					.then((res) => {
						if (res.code === 200) {
							console.log(res)
							this.summary = res.data
						}
						this.loading = false
					})
					.catch(() => {
						this.loading = false
					})
			}
		},
		search() {
			const create = this.searchTime || []
			const [startTime, endTime] = create
			if (endTime - startTime <= this.day31) {
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
				this.initData()
			} else {
				this.flag = true
				this.initData()
			}
		},
		handleCheckAllChange(val) {
			console.log(val)
			const arr = []
			for (let i = 0; i < this.gameTypeList.length; i++) {
				const ele = this.gameTypeList[i].gameCode
				arr.push(ele)
			}
			this.gameCodeList = val ? arr : []
			this.checkAll = val
			this.isIndeterminate = false
		},
		handleCheckedCitiesChange(val) {
			console.log(val)
			const checkedCount = val.length
			this.checkAll = checkedCount === this.gameTypeList.length
			this.isIndeterminate =
				checkedCount > 0 && checkedCount < this.gameTypeList.length
		},
		reset() {
			this.queryData = {}
			this.searchTime = [startTime, endTime]
			this.pageNum = 1
			this.handleCheckAllChange(true)
			this.search()
		},
		dialogData(val) {
			this.pageR = 1
			this.sizeR = 10
			this.venueName = val.venueName
			this.gameCode = val.gameCode
			this.getReportVenueNetAmountDayDetailListPage(val.gameCode)
			this.tableVisible = true
		},
		getReportVenueNetAmountDayDetailListPage(val) {
			this.loading = true
			const create = this.searchTime || []
			const [startTime, endTime] = create
			const params = {
				pageNum: this.pageR,
				pageSize: this.sizeR,
				gameCode: val,
				startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD') : '',
				endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD') : ''
			}
			this.$api
				.getReportVenueNetAmountDayDetailListPage(params)
				.then((res) => {
					if (res.code === 200) {
						console.log(res)
						this.gameList = res.data.records
						this.dialogTotal = res.data.total
					}
					this.loading = false
				})
				.catch(() => {
					this.loading = false
				})
		},
		handleCurrentChangeDialog(val) {
			this.pageR = val
			this.getReportVenueNetAmountDayDetailListPage(this.gameCode)
		},
		handleSizeChangeDialog(val) {
			this.sizeR = val
			this.getReportVenueNetAmountDayDetailListPage(this.gameCode)
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
				} else if (index >= 2) {
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
							case 2:
								sums[index] = (
									<div class='count_row'>
										<p>{num}</p>
										<p>{this.summary.memberCountTotal}</p>
									</div>
								)
								break
							case 3:
								sums[index] = (
									<div class='count_row'>
										<p>{num}</p>
										<p>{this.summary.betCountTotal}</p>
									</div>
								)
								break
							case 4:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>{this.filterDecimals(this.summary.betAmountTotal)}</p>
									</div>
								)
								break
							case 5:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.validBetAmountTotal)}
										</p>
									</div>
								)
								break
							case 6:
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
				case 'memberCount':
					prop = 1
					break
				case 'betCount':
					prop = 2
					break
				case 'betAmount':
					prop = 3
					break
				case 'validBetAmount':
					prop = 4
					break
				case 'netAmount':
					prop = 5
					break
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
			this.initData()
		},
		exportExcel() {
			this.loading = true
			const create = this.searchTime || []
			const [startTime, endTime] = create
			let params = {
				...this.queryData,
				gameCodeList: this.gameCodeList,
				startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD') : '',
				endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD') : ''
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
		},
		handleSizeChange(value) {
			this.pageNum = 1
			this.pageSize = value
			this.initData()
		},
		handleCurrentChange(value) {
			this.pageNum = value
			this.initData()
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
	color: #5c5c5c;
	font-weight: 700;
}
.params {
	padding-bottom: 15px;
}

.checkBox {
	display: flex;
	h5 {
		width: 40px;
		color: #606266;
	}
	.all {
		display: flex;
		padding: 10px;
		width: 70%;
		border: 1px solid #cccccc;
	}
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
	height: 80px;
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
	min-width: 90px;
}
</style>
