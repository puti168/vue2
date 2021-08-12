<template>
	<div class="game-container report-container">
		<div v-if="gameType === 'init'" class="view-container dealer-container">
			<div class="params">
				<el-form
					ref="form"
					:inline="true"
					:model="queryData"
					label-width="80px"
				>
					<el-form-item label="注单号:">
						<el-input
							v-model="queryData.id"
							clearable
							:maxlength="100"
							size="medium"
							style="width: 230px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="三方注单号:" label-width="90px">
						<el-input
							v-model="queryData.thirdOrderId"
							clearable
							:maxlength="100"
							size="medium"
							style="width: 220px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="下注时间:">
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
					<el-form-item label="结算时间:">
						<el-date-picker
							v-model="netTime"
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
					<el-form-item label="游戏平台:" class="tagheight">
						<el-select
							v-model="queryData.gameCode"
							style="width: 230px"
							multiple
							clearable
							collapse-tags
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in gameTypeList"
								:key="item.gameCode"
								:label="item.gameName"
								:value="item.gameCode"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="游戏名称:">
						<el-input
							v-model="queryData.gameTypeName"
							clearable
							:maxlength="100"
							size="medium"
							style="width: 230px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="会员账号:">
						<el-input
							v-model="queryData.memberName"
							clearable
							:maxlength="11"
							size="medium"
							style="width: 230px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="账号类型:" class="tagheight">
						<el-select
							v-model="queryData.accountType"
							style="width: 230px"
							multiple
							clearable
							collapse-tags
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in accountType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="上级代理:">
						<el-input
							v-model="queryData.parentProxyName"
							clearable
							:maxlength="11"
							size="medium"
							style="width: 245px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="游戏账号:">
						<el-input
							v-model="queryData.playerName"
							clearable
							:maxlength="25"
							size="medium"
							style="width: 230px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="状态归类:" class="tagheight">
						<el-select
							v-model="queryData.betStatus"
							style="width: 230px"
							clearable
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in betStatusType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="投注金额:">
						<el-input
							v-model="queryData.betAmountMin"
							size="medium"
							placeholder="最小数值"
							style="width: 109px"
							:maxlength="10"
							name="betAmountMin"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
						-
						<el-input
							v-model="queryData.betAmountMax"
							size="medium"
							placeholder="最大数值"
							style="width: 109px"
							:maxlength="10"
							name="betAmountMax"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
					</el-form-item>
					<el-form-item label="会员输赢:">
						<el-input
							v-model="queryData.netAmountMin"
							size="medium"
							placeholder="最小数值"
							style="width: 109px"
							:maxlength="10"
							name="netAmountMin"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
						-
						<el-input
							v-model="queryData.netAmountMax"
							size="medium"
							placeholder="最大数值"
							style="width: 109px"
							:maxlength="10"
							name="netAmountMax"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
					</el-form-item>
					<el-form-item label="投注IP:">
						<el-input
							v-model="queryData.loginIp"
							clearable
							:maxlength="15"
							size="medium"
							style="width: 245px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="投注终端:" class="tagheight">
						<el-select
							v-model="queryData.deviceType"
							style="width: 400px; margin-right: 20px"
							multiple
							clearable
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in betDeviceType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
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
							v-if="hasPermission('1020311')"
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
				<div class="msgList">
					<p>
						<span>数据更新时间：</span>
						<span>{{ now }}</span>
					</p>
					<p>总注单数：{{ summary.totalCount }}条</p>
				</div>
				<div class="msgList">
					<p>
						<span class="normalRgba">已结算</span>
						<span>{{ summary.settledCount }}</span>
						条
					</p>
					<p>
						<span class="deleteRgba">未结算</span>
						<span>{{ summary.unSettledCount }}</span>
						条
					</p>
					<p>投注金额：{{ summary.betAmount }}</p>
					<p>
						会员输赢：
						<span class="redColor">{{ summary.netAmount }}</span>
					</p>
				</div>
			</div>
			<div class="content">
				<el-table
					v-loading="loading"
					border
					size="mini"
					class="small-size-table"
					:data="tableData"
					style="width: 100%"
					:header-cell-style="getRowClass"
					@sort-change="_changeTableSort"
				>
					<el-table-column prop="id" align="center" width="240px">
						<template slot="header">
							注单号
							<br />
							三方订单号
						</template>
						<template slot-scope="scope">
							{{ scope.row.id }}
							<br />
							{{ scope.row.thirdOrderId }}
						</template>
					</el-table-column>
					<el-table-column prop="bankName" align="center" width="150px">
						<template slot="header">
							游戏平台
							<br />
							游戏名称
						</template>
						<template slot-scope="scope">
							<span v-for="item in gameTypeList" :key="item.gameCode">
								{{ item.gameCode === scope.row.gameCode ? item.gameName : '' }}
							</span>
							<br />
							{{ scope.row.gameTypeName }}
						</template>
					</el-table-column>
					<el-table-column
						prop="memberName"
						align="center"
						label="会员账号"
						width="130px"
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.memberName"
								:title="scope.row.memberName"
								:copy="copy"
							>
								{{ scope.row.memberName }}
							</Copy>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="accountType"
						align="center"
						label="账号类型"
						width="100px"
					>
						<template slot-scope="scope">
							{{ typeFilter(scope.row.accountType, 'accountType') }}
						</template>
					</el-table-column>
					<el-table-column
						prop="parentProxyName"
						align="center"
						label="上级代理"
						width="150px"
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.parentProxyName"
								:title="scope.row.parentProxyName"
								:copy="copy"
							>
								{{ scope.row.parentProxyName }}
							</Copy>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="playerName"
						align="center"
						label="游戏账号"
						width="180px"
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.playerName"
								:title="scope.row.playerName"
								:copy="copy"
							>
								{{ scope.row.playerName }}
							</Copy>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="obBetStatus"
						align="center"
						label="状态归类"
						width="100px"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.obBetStatus === 0" class="deleteRgba">
								未结算
							</span>
							<span v-else-if="scope.row.obBetStatus === 1" class="normalRgba">
								已结算
							</span>
							<span v-else-if="scope.row.obBetStatus === 2" class="disableRgba">
								不结算
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="betAmount"
						align="center"
						label="投注金额"
						width="120px"
						sortable="custom"
					></el-table-column>
					<el-table-column
						prop="netAmount"
						align="center"
						label="会员输赢"
						width="120px"
						sortable="custom"
					></el-table-column>
					<el-table-column
						prop="createAt"
						align="center"
						label="投注时间"
						sortable="custom"
						width="160px"
					></el-table-column>
					<el-table-column
						prop="netAt"
						align="center"
						label="结算时间"
						sortable="custom"
						width="160px"
					></el-table-column>
					<el-table-column
						prop="loginIp"
						align="center"
						label="投注IP"
						width="150px"
					>
						<template slot-scope="scope">
							{{ scope.row.loginIp || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="deviceType"
						align="center"
						label="投注终端"
						width="120px"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.deviceType === '其他'">
								{{ scope.row.deviceType }}
							</span>
							<span v-else>
								{{ typeFilter(scope.row.deviceType, 'betDeviceType') }}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="operation"
						align="center"
						label="操作"
						width="120px"
					>
						<template slot-scope="scope">
							<el-button
								v-if="hasPermission('1020312')"
								type="primary"
								icon="el-icon-view"
								size="medium"
								@click="lookMsg(scope.row)"
							>
								查看详情
							</el-button>
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
		<div v-else class="game-container report-container">
			<div class="view-container dealer-container">
				<div class="review-content">
					<div class="head paddingLR">
						<p class="title">注单详情</p>
						<p class="right-btn">
							<el-button plain @click="goBack">返回</el-button>
						</p>
					</div>
					<strong class="paddingLR strong">投注人信息</strong>
					<div class="paddingLR paddingB">
						<el-row class="paddingLR">
							<el-col :span="6">
								账号类型： {{ typeFilter(dataList.accountType, 'accountType') }}
							</el-col>
							<el-col :span="6">会员账号： {{ dataList.memberName }}</el-col>
							<el-col :span="6">
								上级代理：{{ dataList.parentProxyName }}
							</el-col>
							<el-col :span="6">VIP等级： {{ dataList.vipSerialNum }}</el-col>
							<el-col :span="6">游戏账号： {{ dataList.playerName }}</el-col>
							<el-col :span="6">
								账号状态：
								<span
									v-if="
										dataList.accountStatus && dataList.accountStatus === '1'
									"
									class="normalRgba"
								>
									{{ typeFilter(dataList.accountStatus, 'accountStatusType') }}
								</span>
								<span
									v-else-if="
										dataList.accountStatus && dataList.accountStatus === '2'
									"
									class="disableRgba"
								>
									{{ typeFilter(dataList.accountStatus, 'accountStatusType') }}
								</span>
								<span
									v-else-if="
										dataList.accountStatus && dataList.accountStatus === '3'
									"
									class="lockingRgba"
								>
									{{ typeFilter(dataList.accountStatus, 'accountStatusType') }}
								</span>
								<span
									v-else-if="
										dataList.accountStatus && dataList.accountStatus === '4'
									"
									class="deleteRgba"
								>
									{{ typeFilter(dataList.accountStatus, 'accountStatusType') }}
								</span>
							</el-col>
							<el-col :span="6">
								该类游戏总输赢： {{ dataList.totalNetAmount }}
							</el-col>
						</el-row>
					</div>
					<el-divider></el-divider>
				</div>
				<realDetails
					v-if="gameType === 'zr'"
					:dataList="dataList"
				></realDetails>
				<chessDetails
					v-else-if="gameType === 'qp'"
					:dataList="dataList"
				></chessDetails>
				<sportDetails
					v-else-if="gameType === 'ty'"
					:dataList="dataList"
				></sportDetails>
				<eSportDetails
					v-else-if="gameType === 'dj'"
					:dataList="dataList"
				></eSportDetails>
				<lotteryDetails
					v-else-if="gameType === 'cp'"
					:dataList="dataList"
				></lotteryDetails>
				<eGameDetails
					v-else-if="gameType === 'dy'"
					:dataList="dataList"
				></eGameDetails>
				<slotDetails v-else :dataList="dataList"></slotDetails>
			</div>
		</div>
	</div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
import { routerNames } from '@/utils/consts'
import realDetails from './components/realDetails'
import chessDetails from './components/chessDetails'
import sportDetails from './components/sportDetails'
import eSportDetails from './components/eSportDetails'
import lotteryDetails from './components/lotteryDetails'
import eGameDetails from './components/eGameDetails'
import slotDetails from './components/slotDetails'
const startTime = dayjs()
	.startOf('day')
	.valueOf()
const endTime = dayjs()
	.endOf('day')
	.valueOf()

export default {
	name: routerNames.gameBetslipTable,
	components: {
		realDetails,
		chessDetails,
		sportDetails,
		eSportDetails,
		lotteryDetails,
		eGameDetails,
		slotDetails
	},
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		this._changeTableSort = this.throttle(this._changeTableSort, 1000)
		return {
			queryData: {},
			gameTypeList: [],
			searchTime: [startTime, endTime],
			netTime: [startTime, endTime],
			now: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
			summary: {
				totalCount: 0,
				settledCount: 0,
				unSettledCount: 0,
				betAmount: 0,
				netAmount: 0
			},
			tableData: [],
			gameType: 'init',
			dataList: {}
		}
	},
	computed: {
		accountType() {
			return this.globalDics.accountType || []
		},
		betDeviceType() {
			return this.globalDics.betDeviceType || []
		},
		betStatusType() {
			return this.globalDics.betStatusType || []
		}
	},
	mounted() {
		this.getGameTypeList()
	},
	methods: {
		getGameTypeList() {
			this.$api.getMerchantGameGamePlant().then((res) => {
				if (res && res.code === 200) {
					this.gameTypeList = res.data || []
				}
			})
		},
		loadData() {
			this.loading = true
			const create = this.searchTime || []
			const net = this.netTime || []
			const [startTime, endTime] = create
			const [netAtStart, netAtEnd] = net
			let params = {
				...this.queryData,
				createAtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				createAtEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				netAtStart: netAtStart
					? dayjs(netAtStart).format('YYYY-MM-DD HH:mm:ss')
					: '',
				netAtEnd: netAtEnd ? dayjs(netAtEnd).format('YYYY-MM-DD HH:mm:ss') : ''
			}
			params = {
				...this.getParams(params)
			}
			console.log(startTime, endTime, netAtStart, netAtEnd)
			if (startTime || endTime || netAtStart || netAtEnd) {
				this.$api
					.getGameRecordNotes(params)
					.then((res) => {
						const {
							code,
							data: { record, totalRecord, summary }
						} = res || {}
						if (code && code === 200) {
							this.tableData =
								(record && record.length && Object.freeze(record)) || []
							this.total = totalRecord || 0
							this.now = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
							const initSummary = {
								totalCount: 0,
								settledCount: 0,
								unSettledCount: 0,
								betAmount: 0,
								netAmount: 0
							}
							this.summary = summary || initSummary
						}
						this.loading = false
					})
					.catch(() => {
						this.loading = false
					})
			} else {
				this.loading = false
				this.$message.warning('请选择一个下注时间或者结算时间')
			}
		},
		reset() {
			this.queryData = {}
			this.searchTime = [startTime, endTime]
			this.netTime = [startTime, endTime]
			this.pageNum = 1
			this.loadData()
		},
		lookMsg(val) {
			console.log(val)
			const data = {}
			data.createAt = val.createAt
			data.gameCode = val.gameCode
			data.thirdOrderId = val.thirdOrderId
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			this.$api
				.getGameRecordDetail(data)
				.then((res) => {
					const {
						code,
						data: { record }
					} = res || {}
					if (code && code === 200) {
						this.dataList = (record && record.length && record[0]) || {}
						this.gameType = (record && record.length && val.gameCode) || 'init'
						loading.close()
					}
					console.log(res)
				})
				.catch(() => {
					loading.close()
				})
		},
		_changeTableSort({ column, prop, order }) {
			if (prop === 'betAmount') {
				prop = 1
			}
			if (prop === 'netAmount') {
				prop = 2
			}
			if (prop === 'createAt') {
				prop = 3
			}
			if (prop === 'netAt') {
				prop = 4
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
		checkValue(e) {
			const { name, value } = e.target
			switch (name) {
				case 'betAmountMax':
					if (
						!!this.queryData.betAmountMin &&
						value &&
						value * 1 <= this.queryData.betAmountMin * 1
					) {
						this.$message({
							type: 'warning',
							message: `投注金额输入最大值不能小于最小值`
						})
					} else {
						this.queryData.betAmountMax = value
					}
					break
				case 'netAmountMax':
					if (
						!!this.queryData.netAmountMin &&
						value &&
						value * 1 < this.queryData.netAmountMin * 1
					) {
						this.$message({
							type: 'warning',
							message: `会员输赢输入最大值不能小于最小值`
						})
					} else {
						this.queryData.netAmountMax = value
					}
					break
			}
		},
		exportExcel() {
			const create = this.searchTime || []
			const net = this.netTime || []
			const [startTime, endTime] = create
			const [netAtStart, netAtEnd] = net
			let params = {
				...this.queryData,
				createAtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				createAtEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				netAtStart: netAtStart
					? dayjs(netAtStart).format('YYYY-MM-DD HH:mm:ss')
					: '',
				netAtEnd: netAtEnd ? dayjs(netAtEnd).format('YYYY-MM-DD HH:mm:ss') : ''
			}
			params = {
				...this.getParams(params)
			}
			delete params.registerTime
			delete params.lastLoginTime
			delete params.firstSaveTime
			delete params.accountStatus
			delete params.deviceType
			delete params.accountType
			if (startTime || endTime || netAtStart || netAtEnd) {
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
								const { data, status } = res || {}
								if (res && status && status === 200) {
									const { type = [] } = data || {}
									if (type.includes('application/json')) {
										const reader = new FileReader()
										reader.onload = (evt) => {
											if (evt && evt.target.readyState === 2) {
												const {
													target: { result }
												} = evt
												const ret = JSON.parse(result)
												if (ret && ret.code !== 200) {
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
			} else {
				this.$message.warning('请选择一个下注时间或者结算时间')
			}
		},
		goBack() {
			this.gameType = 'init'
		},
		enterSubmit() {
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
/deep/ .tagheight .el-tag {
	height: 24px;
	line-height: 24px;
	min-width: 60px;
}
.msgList {
	font-size: 14px;
	display: flex;
	line-height: 24px;
	text-align: center;
	p {
		margin-right: 20px;
	}
	&:last-child p {
		margin-bottom: 15px;
	}
}
// .view-container {
// 	border: 1px solid #dcdfe6;
// 	font-size: 14px;
// }
.review-content {
	line-height: 30px;
}
.paddingLR {
	padding: 0 30px;
}
.head {
	height: 70px;
	line-height: 70px;
	width: 100%;
	background: #000;
	border-radius: 2px;
	display: flex;
	justify-content: space-between;
	.title {
		font-weight: 600;
		font-size: 16px;
		color: rgb(192, 190, 190);
	}
	.right-btn {
		float: right;
	}
}
.strong {
	height: 70px;
	line-height: 80px;
}
.paddingB {
	padding-bottom: 30px;
}
</style>
