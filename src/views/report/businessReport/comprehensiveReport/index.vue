<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="日期:" prop="statisticsTime">
						<el-date-picker
							v-model="statisticsTime"
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
							size="medium"
							:disabled="flag"
							@click="reset"
						>
							重置
						</el-button>
						<el-button
							v-if="hasPermission('352')"
							type="warning"
							icon="el-icon-folder-add"
							size="medium"
							:disabled="loading"
							@click="exportExcel"
						>
							导出
						</el-button>
						<el-button
							type="success"
							size="medium"
							:disabled="loading"
							@click="openSetting"
						>
							列设置
						</el-button>
					</el-form-item>
				</el-form>
			</div>

			<div class="content">
				<el-table
					v-loading="loading"
					border
					size="mini"
					class="small-size-table"
					:data="dataList"
					style="width: 100%"
					show-summary
					:summary-method="getSummaries"
					:header-cell-style="getRowClass"
				>
					<el-table-column
						v-if="comprehensiveReport['日期']"
						prop="staticsDate"
						align="center"
						label="日期"
						width="160px"
						fixed
					></el-table-column>
					<el-table-column
						v-if="comprehensiveReport['会员注册人数']"
						prop="registerDeviceInfo"
						align="center"
						width="160px"
						label="会员注册人数"
					>
						<template slot-scope="scope">
							{{ scope.row.registerDeviceInfo }}
							<!-- {{ scope.row.registerDeviceInfo[1] }} -->
						</template>
					</el-table-column>
					<el-table-column
						v-if="comprehensiveReport['会员登录人数']"
						prop="loginDeviceInfo"
						align="center"
						width="160px"
						label="会员登录人数"
					></el-table-column>
					<el-table-column
						v-if="comprehensiveReport['会员总存款']"
						prop="depositMoneyInfo"
						align="center"
						width="160px"
						label="会员总存款"
					></el-table-column>
					<el-table-column
						v-if="comprehensiveReport['会员总取款']"
						prop="withdrawMoneyInfo"
						align="center"
						width="160px"
						label="会员总取款"
					></el-table-column>
					<el-table-column
						v-if="comprehensiveReport['会员存取差']"
						prop="depositWithdrawMoney"
						align="center"
						width="160px"
						label="会员存取差"
					></el-table-column>
					<el-table-column
						v-if="comprehensiveReport['会员首存']"
						prop="firstDepositMoneyInfo"
						align="center"
						label="会员首存"
					></el-table-column>

					<el-table-column
						v-if="comprehensiveReport['会员有效投注']"
						prop="betInfo"
						align="center"
						width="160px"
						label="会员有效投注"
					></el-table-column>
					<el-table-column
						v-if="comprehensiveReport['会员投注盈亏']"
						prop="betNetAmount"
						align="center"
						width="160px"
						label="会员投注盈亏"
					></el-table-column>
					<el-table-column
						v-if="comprehensiveReport['会员总优惠']"
						prop="discountInfo"
						align="center"
						width="160px"
						label="会员总优惠"
					></el-table-column>
					<el-table-column
						v-if="comprehensiveReport['会员总返水']"
						prop="rebateInfo"
						align="center"
						width="160px"
						label="会员总返水"
					></el-table-column>
					<el-table-column
						v-if="comprehensiveReport['会员调整']"
						prop="changeInfo"
						align="center"
						label="会员调整"
					></el-table-column>
					<el-table-column
						v-if="comprehensiveReport['代理注册人数']"
						prop="proxyRegisterDeviceInfo"
						align="center"
						width="160px"
						label="代理注册人数"
					></el-table-column>
					<el-table-column
						v-if="comprehensiveReport['代理总存款']"
						prop="proxyDepositMoneyInfo"
						align="center"
						width="160px"
						label="代理总存款"
					></el-table-column>
					<el-table-column
						v-if="comprehensiveReport['代理总取款']"
						prop="proxyWithdrawMoneyInfo"
						align="center"
						width="160px"
						label="代理总取款"
					></el-table-column>
					<el-table-column
						v-if="comprehensiveReport['代理存取差']"
						prop="proxyDepositWithdrawMoney"
						align="center"
						width="160px"
						label="代理存取差"
					></el-table-column>
					<el-table-column
						v-if="comprehensiveReport['转给下级']"
						prop="passSubInfo"
						align="center"
						label="转给下级"
					></el-table-column>
					<el-table-column
						v-if="comprehensiveReport['代理总优惠']"
						prop="proxyDiscountInfo"
						align="center"
						width="160px"
						label="代理总优惠"
					></el-table-column>
					<el-table-column
						v-if="comprehensiveReport['代理调整']"
						prop="proxyChangeInfo"
						align="center"
						label="代理调整"
					></el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					v-show="!!total"
					class="pageValue"
					:current-page.sync="pageNum"
					background
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageSize"
					:page-sizes="$store.getters.pageSizes"
					:total="total"
					@current-change="handleCurrentChange"
					@size-change="handleSizeChange"
				></el-pagination>
			</div>
		</div>
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
				v-for="(value, name) in comprehensiveReport"
				:key="name"
				class="setting-div"
			>
				<el-checkbox v-if="newList.length > 0" v-model="newList[0][name]">
					{{ name }}
				</el-checkbox>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="visible = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
const startTime = new Date().getTime() - 3600 * 1000 * 24 * 6
const endTime = dayjs()
	.endOf('day')
	.valueOf()

export default {
	filters: {
		filterDecimals: function(val) {
			if (typeof val === 'number') {
				const newVal = (Math.floor(val * 1000) / 1000).toFixed(2)
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
			statisticsTime: [startTime, endTime],
			day31: 30 * 24 * 3600 * 1000,
			// 日期使用
			timeControl: {
				onPick: ({ maxDate, minDate }) => {
					console.log(maxDate, minDate)
					if (maxDate - minDate > this.day31) {
						this.$message.warning('请缩小搜索范围至31天')
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
			comprehensiveReport: {
				日期: true,
				会员注册人数: true,
				会员登录人数: true,
				会员总存款: true,
				会员总取款: true,
				会员存取差: true,
				会员首存: true,
				会员有效投注: true,
				会员投注盈亏: true,
				会员总优惠: true,
				会员总返水: true,
				会员调整: true,
				代理注册人数: true,
				代理总存款: true,
				代理总取款: true,
				代理存取差: true,
				转给下级: true,
				代理总优惠: true,
				代理调整: true
			},
			queryText: '查询',
			flag: false,
			visible: false,
			newList: [],
			dataList: [],
			summary: {},
			myName: '',
			timecount: null
		}
	},
	computed: {},
	created() {},
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
			const request = indexedDB.open('comprehensiveReport')
			request.onupgradeneeded = (event) => {
				const db = event.target.result
				this.db = db
				// 建表 名为person,主键为id
				db.createObjectStore('comprehensiveReport', {
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
				.transaction(['comprehensiveReport'], 'readwrite')
				.objectStore('comprehensiveReport')
				.add({
					id: this.myName,
					obj: this.comprehensiveReport
				})
			request.onsuccess = (event) => {
				this.getList()
			}
		},
		getList() {
			this.newList = []
			var transaction = this.db.transaction(['comprehensiveReport'])
			const objectStore = transaction.objectStore('comprehensiveReport')
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
							this.comprehensiveReport = { ...ele.obj }
						}
					}
				}
			}
		},
		confirm() {
			const request = this.db
				.transaction(['comprehensiveReport'], 'readwrite')
				.objectStore('comprehensiveReport')
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
				日期: true,
				会员注册人数: true,
				会员登录人数: true,
				会员总存款: true,
				会员总取款: true,
				会员存取差: true,
				会员首存: true,
				会员有效投注: true,
				会员投注盈亏: true,
				会员总优惠: true,
				会员总返水: true,
				会员调整: true,
				代理注册人数: true,
				代理总存款: true,
				代理总取款: true,
				代理存取差: true,
				转给下级: true,
				代理总优惠: true,
				代理调整: true
			})
		},
		loadData() {
			const statistics = this.statisticsTime || []
			const [startTime, endTime] = statistics
			let params = {
				...this.queryData,
				accountTypeList: this.queryData.accountTypeList
					? this.queryData.accountTypeList.join(',')
					: [],
				accountStatusList: this.queryData.accountStatusList
					? this.queryData.accountStatusList.join(',')
					: [],
				startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD') : '',
				endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD') : ''
			}
			params = {
				...this.getParams(params)
			}
			this.loading = true
			this.$api
				.getReportIntegratereportList(params)
				.then((res) => {
					if (res.code === 200 && res.data !== null) {
						this.loading = false
						this.dataList = res.data.record
						this.total = res.data.totalRecord
					} else {
						this.dataList = []
						this.total = 0
						this.loading = false
					}
				})
				.catch(() => (this.loading = false))
			this.$api
				.getReportIntegratereportAggregation(params)
				.then((res) => {
					if (res.code === 200) {
						this.loading = false
						this.summary = res.data
						console.log(res)
					}
				})
				.catch(() => (this.loading = false))
		},
		search() {
			const statistics = this.statisticsTime || []
			const [startTime, endTime] = statistics
			if (endTime - startTime > this.day31) {
				this.flag = true
				this.$message.warning('请缩小搜索范围至31天')
			} else {
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

		filterDecimals: function(val) {
			if (typeof val === 'number') {
				const newVal = (Math.floor(val * 1000) / 1000).toFixed(2)
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
				} else if (index >= 1 && this.summary !== null) {
					//   const values = data.map((item) => Number(item[column.property]));
					const values = data.map((item, index) => {
						// console.log(55555, item[column.property], column.label);
						if (typeof item[column.property] === 'number') {
							return Number(item[column.property])
							//   console.log(1111, Number(item[column.property]));
						} else {
							return Number(item[column.property].primary)
							//   console.log(2222, item[column.property].primary);
						}
					})
					console.log('values', values, column.label)
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
										<p>{this.summary.betCountTotal}</p>
									</div>
								)
								break
							case 2:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>{this.filterDecimals(this.summary.betAmountTotal)}</p>
									</div>
								)
								break
							case 3:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.validBetAmountTotal)}
										</p>
									</div>
								)
								break
							case 4:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.validBetAmountTotal)}
										</p>
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
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.validBetAmountTotal)}
										</p>
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
							case 9:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.validBetAmountTotal)}
										</p>
									</div>
								)
								break
							case 10:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.validBetAmountTotal)}
										</p>
									</div>
								)
								break
							case 11:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.validBetAmountTotal)}
										</p>
									</div>
								)
								break
							case 12:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.validBetAmountTotal)}
										</p>
									</div>
								)
								break
							case 13:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.validBetAmountTotal)}
										</p>
									</div>
								)
								break
							case 14:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.validBetAmountTotal)}
										</p>
									</div>
								)
								break
							case 15:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.validBetAmountTotal)}
										</p>
									</div>
								)
								break
							case 16:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.validBetAmountTotal)}
										</p>
									</div>
								)
								break
							case 17:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.validBetAmountTotal)}
										</p>
									</div>
								)
								break
							case 18:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterDecimals(num)}</p>
										<p>
											{this.filterDecimals(this.summary.validBetAmountTotal)}
										</p>
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
		reset() {
			this.pageNum = 1
			this.queryData = {}
			this.statisticsTime = [startTime, endTime]
			this.$refs['form'].resetFields()
			this.search()
		},

		exportExcel() {
			this.loading = true
			const statistics = this.statisticsTime || []
			const [startTime, endTime] = statistics
			let params = {
				...this.queryData,
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
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
	color: #909399;
	font-weight: 700;
}
.numberBox /deep/.el-input-number__decrease,
.numberBox /deep/.el-input-number__increase {
	display: none;
}
.numberBox /deep/.el-input__inner {
	padding: 0 15px;
	text-align: left;
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
	min-width: 110px;
}
</style>
