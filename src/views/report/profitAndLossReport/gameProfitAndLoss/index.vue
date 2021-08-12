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
					<el-form-item label="游戏名称:">
						<el-input
							v-model="queryData.gameName"
							clearable
							maxlength="20"
							size="medium"
							placeholder="请输入"
							@keyup.enter.native="enterSearch"
						></el-input>
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
							v-if="hasPermission('346')"
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
					<div class="all">
						<h5>游戏：</h5>
						<el-checkbox
							v-model="venueAndGameAll"
							:indeterminate="venueAndGameHalf"
							@change="handleCheckAllChange"
						>
							全选
						</el-checkbox>
					</div>
					<div class="game" @click="gameOfChoice">自选游戏</div>
				</div>
			</div>
			<div class="content">
				<el-table
					ref="tables"
					v-loading="loading"
					border
					size="mini"
					class="small-size-table"
					:data="tableData"
					style="width: 100%"
					show-summary
					:summary-method="getSummaries"
					:header-cell-style="getRowClass"
					@sort-change="_changeTableSort"
				>
					<el-table-column
						v-if="gameProfitAndLoss['游戏']"
						prop="gameTypeName"
						align="center"
						label="游戏"
					>
						<template slot-scope="scope">
							<el-link
								class="lightBlueColor"
								type="primary"
								@click="dialogData(scope.row)"
							>
								{{ scope.row.gameTypeName }}
							</el-link>
						</template>
					</el-table-column>
					<el-table-column
						v-if="gameProfitAndLoss['场馆']"
						prop="venueName"
						align="center"
						label="场馆"
					></el-table-column>
					<el-table-column
						v-if="gameProfitAndLoss['投注人数']"
						prop="memberCount"
						align="center"
						sortable="custom"
						label="投注人数"
					></el-table-column>
					<el-table-column
						v-if="gameProfitAndLoss['注单量']"
						prop="betCount"
						align="center"
						sortable="custom"
						label="注单量"
					></el-table-column>
					<el-table-column
						v-if="gameProfitAndLoss['投注金额']"
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
						v-if="gameProfitAndLoss['有效投注']"
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
						v-if="gameProfitAndLoss['投注盈亏']"
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

			<el-dialog :visible.sync="tableVisible" :destroy-on-close="true">
				<div slot="title" class="dialog-title">
					<span class="title-text" style="margin-right: 15px">
						游戏名称:{{ gameTypeName }}
					</span>
					<span class="title-text">所属场馆:{{ venueName }}</span>
				</div>
				<el-table
					v-loading="loadingDialog"
					size="mini"
					border
					class="small-size-table"
					:data="gameList"
					style="margin-bottom: 15px"
					:header-cell-style="getRowClass"
				>
					<el-table-column
						prop="staticDate"
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
					v-for="(value, name) in gameProfitAndLoss"
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
			<el-dialog
				title="选择游戏"
				class="gameBgm"
				:visible.sync="gameVisible"
				:destroy-on-close="true"
			>
				<div slot="title" class="dialog-title">
					<span class="title-text" style="margin-right: 15px">选择游戏</span>
					<el-checkbox
						v-model="venueAndGameAll"
						:indeterminate="venueAndGameHalf"
						@change="handleCheckAllChange"
					>
						全选
					</el-checkbox>
				</div>
				<div class="gameConten">
					<div v-for="obj in allVenueAndGameList" :key="obj.gamecode">
						<p style="margin-bottom: 10px">
							<span
								style="margin-right: 20px; color: #5c5c5c; font-weight: 700"
							>
								{{ obj.gameName }}
							</span>
							<el-checkbox
								v-model="obj.venueCheckAll"
								:indeterminate="obj.venueIsIndeterminate"
								@change="(checked) => handleCheckSingleVenue(checked, obj)"
							>
								{{ obj.allText }}
							</el-checkbox>
						</p>
						<el-checkbox-group v-model="gameTypeIdList" class="widthBox">
							<el-checkbox
								v-for="itme in obj.itselfGmae"
								:key="itme.gameId"
								v-model="itme.gameCheckAll"
								:label="
									itme.gameId === -1
										? itme.gameId + itme.gamePlatform
										: itme.gameId
								"
								@change="(checked) => handleCheckSingleGame(checked, itme)"
							>
								{{ itme.gameName }}
							</el-checkbox>
						</el-checkbox-group>
						<el-divider></el-divider>
					</div>
				</div>
				<div slot="footer" class="dialog-footer" style="text-align: center">
					<el-button @click="gameVisible = false">关闭</el-button>
					<el-button
						type="primary"
						icon="el-icon-search"
						:disabled="flag"
						size="medium"
						@click="gameCheckSub"
					>
						{{ queryText }}
					</el-button>
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
			dataList: {},
			allVenueAndGameList: [],
			venueAndGameAll: true,
			venueAndGameHalf: false,
			gameCodeList: [],
			gameTypeIdList: [],
			clickId: [],
			clickNew: [],
			gameVisible: false,
			gameList: [],
			pageR: 1,
			sizeR: 10,
			dialogTotal: 0,
			summary: {},
			gameTypeName: '',
			venueName: '',
			gameTypeId: '',
			dialogp: {},
			visible: false,
			tableVisible: false,
			loadingDialog: false,
			gameProfitAndLoss: {
				游戏: true,
				场馆: true,
				投注人数: true,
				注单量: true,
				投注金额: true,
				有效投注: true,
				投注盈亏: true
			},
			myName: '',
			newList: [],
			timecount: null
		}
	},
	computed: {},
	created() {},
	mounted() {
		this.seleceInit()
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
			const request = indexedDB.open('gameProfitAndLoss')
			request.onupgradeneeded = (event) => {
				const db = event.target.result
				this.db = db
				// 建表 名为person,主键为id
				db.createObjectStore('gameProfitAndLoss', {
					keyPath: 'id',
					autoIncrement: true
				})
			}

			request.onsuccess = (event) => {
				this.db = event.target.result
				this.clickAdd()
				this.getList()
			}
		},
		clickAdd() {
			const request = this.db
				.transaction(['gameProfitAndLoss'], 'readwrite')
				.objectStore('gameProfitAndLoss')
				.add({
					id: this.myName,
					obj: this.gameProfitAndLoss
				})
			request.onsuccess = (event) => {
				this.getList()
			}
		},
		getList() {
			this.newList = []
			var transaction = this.db.transaction(['gameProfitAndLoss'])
			const objectStore = transaction.objectStore('gameProfitAndLoss')
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
							this.gameProfitAndLoss = { ...ele.obj }
						}
					}
				}
			}
		},
		confirm() {
			const request = this.db
				.transaction(['gameProfitAndLoss'], 'readwrite')
				.objectStore('gameProfitAndLoss')
				.put({
					id: this.myName,
					obj: this.newList[0]
				})
			request.onsuccess = (event) => {
				this.visible = false
				this.getList()
			}

			request.onerror = (event) => {}
		},
		clickDel(id) {
			this.newList = []
			this.newList.push({
				游戏: true,
				场馆: true,
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
					this.allVenueAndGameList = res.data
					const venueCode = []
					for (let i = 0; i < res.data.length; i++) {
						const ele = res.data[i]
						this.allVenueAndGameList[i].allText = '全选'
						this.allVenueAndGameList[i].venueCheckAll = true
						this.allVenueAndGameList[i].venueIsIndeterminate = false
						venueCode.push(ele.gameCode)
						this.gameCodeList.push(ele.gameCode)
					}
					const params = venueCode.join(',')
					this.$api
						.getGameManagerSelectGameByPlatform({ platforms: params })
						.then((res) => {
							if (res.code === 200) {
								for (let i = 0; i < this.allVenueAndGameList.length; i++) {
									const v = this.allVenueAndGameList[i]
									this.allVenueAndGameList[i].itselfGmae = []
									for (let j = 0; j < res.data.length; j++) {
										const g = res.data[j]
										g.gameCheck = true
										// g.gameId === -1
										//   ? this.gameTypeIdList.push(g.gameId + g.gamePlatform)
										//   : this.gameTypeIdList.push(g.gameId);
										if (v.gameCode === g.gamePlatform) {
											this.allVenueAndGameList[i].itselfGmae.push(g)
										}
									}
								}
								this.allVenueAndGameList.map((ele, index) => {
									this.clickId.push(ele.itselfGmae.length)
									for (let i = 0; i < ele.itselfGmae.length; i++) {
										const id = ele.itselfGmae[i]
										if (id.gameId === -1) {
											id.gameId = id.gameId + id.gamePlatform
										}
										this.gameTypeIdList.push(id.gameId)
									}
								})
								this.init()
							}
						})
				}
			})
		},
		init() {
			const create = this.searchTime || []
			const [startTime, endTime] = create
			const arr = []
			for (let i = 0; i < this.gameTypeIdList.length; i++) {
				const id = this.gameTypeIdList[i]
				if (typeof id === 'string') {
					arr.push(-1)
				} else {
					arr.push(id)
				}
			}
			let params = {
				...this.queryData,
				gameCodeList: this.venueAndGameAll ? [] : this.gameCodeList,
				gameTypeIdList: this.venueAndGameAll ? [] : arr,
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
					.getReportGameProfitListPage(params)
					.then((res) => {
						if (res.code === 200) {
							this.tableData = res.data.record || []
							this.total = res.data.totalRecord
						}
						this.loading = false
					})
					.catch(() => {
						this.loading = false
					})
				this.$api
					.getReportGameProfitSummary(params)
					.then((res) => {
						if (res.code === 200) {
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
				this.init()
			} else {
				this.flag = true
				this.init()
			}
		},
		handleCheckAllChange(val) {
			this.gameCodeList = []
			this.gameTypeIdList = []
			this.allVenueAndGameList.map((ele, index) => {
				ele.venueCheckAll = val
				if (val) {
					ele.venueIsIndeterminate = !val
					this.gameCodeList.push(ele.gameCode)
					this.venueAndGameAll = val
					this.venueAndGameHalf = !val
				} else {
					this.venueAndGameAll = val
					this.venueAndGameHalf = val
					this.gameCodeList = []
					ele.venueIsIndeterminate = val
				}
				for (let i = 0; i < ele.itselfGmae.length; i++) {
					const obj = ele.itselfGmae[i]
					obj.gameCheck = val
					if (val) {
						this.gameTypeIdList.push(obj.gameId)
					} else {
						this.gameTypeIdList = []
					}
				}
			})
		},
		handleCheckSingleVenue(v, val) {
			this.gameCodeList = []
			this.gameTypeIdList = []
			this.allVenueAndGameList.map((ele, index) => {
				if (ele.gameCode === val.gameCode) {
					ele.venueCheckAll = v
					ele.venueIsIndeterminate = v ? !v : v
				}
				if (!ele.venueCheckAll) {
					this.gameCodeList = this.gameCodeList.filter(
						(item) => item !== ele.gameCode
					)
				} else {
					this.gameCodeList.push(ele.gameCode)
				}
				for (let i = 0; i < ele.itselfGmae.length; i++) {
					const obj = ele.itselfGmae[i]
					if (ele.gameCode === val.gameCode) {
						obj.gameCheck = v
					}
					if (!ele.venueCheckAll) {
						this.gameTypeIdList = this.gameTypeIdList.filter(
							(item) => item !== obj.gameId
						)
					} else {
						this.gameTypeIdList.push(obj.gameId)
					}
				}
			})
			this.venueAndGameAll =
				this.allVenueAndGameList.length === this.gameCodeList.length
			this.venueAndGameHalf = !!(
				this.allVenueAndGameList.length !== this.gameCodeList.length &&
				this.gameCodeList.length > 0
			)
		},
		handleCheckSingleGame(v, val) {
			const gameList = []
			this.allVenueAndGameList.map((ele, index) => {
				for (let i = 0; i < ele.itselfGmae.length; i++) {
					const g = ele.itselfGmae[i]
					if (g.gamePlatform === val.gamePlatform) {
						val.gameCheck = v
					} else {
						return
					}
					if (g.gameCheck) {
						gameList.push(g.gameId)
					}
					if (gameList.length === this.clickId[index]) {
						ele.venueCheckAll = true
						ele.venueIsIndeterminate = false
					} else if (gameList.length === 0) {
						ele.venueCheckAll = false
						ele.venueIsIndeterminate = false
					} else {
						ele.venueCheckAll = false
						ele.venueIsIndeterminate = true
					}
				}
				let len = 0
				for (let l = 0; l < this.clickId.length; l++) {
					const idLen = this.clickId[l]
					len = len + idLen
				}
				if (gameList.length === 0 && this.gameTypeIdList.length === 0) {
					this.venueAndGameAll = false
					this.venueAndGameHalf = false
				} else if (
					gameList.length > 0 &&
					this.gameTypeIdList.length > 0 &&
					this.gameTypeIdList.length < len
				) {
					this.venueAndGameAll = false
					this.venueAndGameHalf = true
				} else {
					this.venueAndGameAll = true
					this.venueAndGameHalf = false
				}
			})
		},
		gameOfChoice() {
			this.gameVisible = true
		},
		gameCheckSub() {
			this.search()
			this.gameVisible = false
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
			this.dialogp = { ...val }
			this.venueName = val.venueName
			this.gameTypeName = val.gameTypeName
			this.gameTypeId = val.gameTypeId
			this.getReportGameProfitDetailListPage(val)
			this.tableVisible = true
		},
		getReportGameProfitDetailListPage(val) {
			this.loadingDialog = true
			const create = this.searchTime || []
			const [startTime, endTime] = create
			const params = {
				pageNum: this.pageR,
				pageSize: this.sizeR,
				gameTypeId: val.gameTypeId,
				gameCode: val.gameCode,
				gameTypeName: val.gameTypeName,
				startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD') : '',
				endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD') : ''
			}
			this.$api
				.getReportGameProfitDetailListPage(params)
				.then((res) => {
					if (res.code === 200) {
						this.gameList = res.data.records
						this.dialogTotal = res.data.total
					}
					this.loadingDialog = false
				})
				.catch(() => {
					this.loadingDialog = false
				})
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
			this.init()
		},
		handleCurrentChangeDialog(val) {
			this.pageR = val
			this.getReportGameProfitDetailListPage(this.dialogp)
		},
		handleSizeChangeDialog(val) {
			this.sizeR = val
			this.getReportGameProfitDetailListPage(this.dialogp)
		},
		filterSummar: function(val) {
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
										<p>{this.summary.totalMemberCount}</p>
									</div>
								)
								break
							case 3:
								sums[index] = (
									<div class='count_row'>
										<p>{num}</p>
										<p>{this.summary.totalBetCount}</p>
									</div>
								)
								break
							case 4:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterSummar(num)}</p>
										<p>{this.filterSummar(this.summary.totalBetAmount)}</p>
									</div>
								)
								break
							case 5:
								sums[index] = (
									<div class='count_row'>
										<p>{this.filterSummar(num)}</p>
										<p>{this.filterSummar(this.summary.totalValidBetAmount)}</p>
									</div>
								)
								break
							case 6:
								sums[index] = (
									<div class='count_row'>
										{num > 0 ? (
											<p class='enableColor'>{this.filterSummar(num)}</p>
										) : (
											<p class='redColor'>{this.filterSummar(num)}</p>
										)}
										{this.summary.totalNetAmount > 0 ? (
											<p class='enableColor'>
												{this.filterSummar(this.summary.totalNetAmount)}
											</p>
										) : this.summary.totalNetAmount === 0 ? (
											<p>{this.filterSummar(this.summary.totalNetAmount)}</p>
										) : (
											<p class='redColor'>
												{this.filterSummar(this.summary.totalNetAmount)}
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
		handleSizeChange(value) {
			this.pageNum = 1
			this.pageSize = value
			this.init()
		},
		handleCurrentChange(value) {
			this.pageNum = value
			this.init()
		},
		exportExcel() {
			this.loading = true
			const create = this.searchTime || []
			const [startTime, endTime] = create
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
	color: #5c5c5c;
	font-weight: 700;
}
.params {
	padding-bottom: 15px;
}
.gameBgm /deep/.el-dialog {
	background: #f2f2f2;
}
.gameBgm /deep/.el-dialog__body {
	max-height: 500px;
	overflow: auto;
	padding: 0 20px;
}
.gameConten {
	background: #ffffff;
	padding: 15px;
}
.mar {
	margin-right: 15px;
}
.widthBox /deep/.el-checkbox {
	// min-width: 150px;
}
.checkBox {
	display: flex;
	.all {
		display: flex;
		height: 16px;
		margin-right: 30px;
		h5 {
			width: 40px;
			color: #606266;
			margin-top: 2px;
		}
	}
	.game {
		color: #0000ffd8;
		font-size: 14px;
		cursor: pointer;
		text-decoration: underline;
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
