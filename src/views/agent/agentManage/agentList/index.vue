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
					<el-form-item label="注册时间:" prop="registerTime">
						<el-date-picker
							v-model="queryData.registerTime"
							size="medium"
							:picker-options="pickerOptions"
							format="yyyy-MM-dd HH:mm:ss"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							clearable
							style="width: 427px"
							value-format="timestamp"
							:default-time="defaultTime"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="代理账号:">
						<el-input
							v-model="queryData.userName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 275px"
							:maxlength="11"
						></el-input>
					</el-form-item>
					<el-form-item label="合营代码:">
						<el-input
							v-model="queryData.invitationCode"
							oninput="value=value.replace(/[^\d]/g,'')"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 275px"
							maxlength="7"
						></el-input>
					</el-form-item>
					<el-form-item label="代理类型:">
						<el-select
							v-model="queryData.accountType"
							size="medium"
							placeholder="默认选择全部"
							clearable
							multiple
							collapse-tags
							style="width: 275px"
						>
							<el-option
								v-for="item in accountTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="最后登录时间:" label-width="107px">
						<el-date-picker
							v-model="queryData.lastLoginTime"
							prop="lastLoginTime"
							size="medium"
							:picker-options="pickerOptions"
							format="yyyy-MM-dd HH:mm:ss"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							clearable
							value-format="timestamp"
							:default-time="defaultTime"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="账号状态:">
						<el-select
							v-model="queryData.accountStatus"
							size="medium"
							placeholder="默认选择全部"
							clearable
							multiple
							collapse-tags
							style="width: 275px"
						>
							<el-option
								v-for="item in accountStatusArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="风控层级:">
						<el-select
							v-model="queryData.windControlId"
							size="medium"
							placeholder="全部"
							clearable
							style="width: 275px"
						>
							<el-option
								v-for="item in vipDict"
								:key="item.windControlId"
								:label="item.windControlName"
								:value="item.windControlId"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="代理标签:">
						<el-select
							v-model="queryData.labelId"
							size="medium"
							placeholder="全部"
							clearable
							style="width: 275px"
						>
							<el-option
								v-for="item in userLabel"
								:key="item.labelId"
								:label="item.labelName"
								:value="item.labelId"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="入口权限:" label-width="78px">
						<el-select
							v-model="queryData.entryAuthority"
							size="medium"
							placeholder="全部"
							clearable
							style="width: 243px"
						>
							<el-option
								v-for="item in entrAuthorityTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="下级人数:">
						<el-input
							v-model="queryData.subNumMin"
							size="medium"
							placeholder="最小数值"
							style="width: 101px"
							maxlength="7"
							name="subNumMin"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
						-
						<el-input
							v-model="queryData.subNumMax"
							size="medium"
							placeholder="最大数值"
							style="width: 101px"
							maxlength="7"
							oninput="value=value.replace(/[^\d]/g,'')"
							name="subNumMax"
							@blur="checkValue($event)"
						></el-input>
					</el-form-item>
					<el-form-item label="有效下级:">
						<el-input
							v-model="queryData.validSubNumMin"
							size="medium"
							placeholder="最小数值"
							style="width: 101px"
							maxlength="7"
							oninput="value=value.replace(/[^\d]/g,'')"
							name="validSubNumMin"
							@blur="checkValue($event)"
						></el-input>
						-
						<el-input
							v-model="queryData.validSubNumMax"
							size="medium"
							placeholder="最大数值"
							style="width: 101px"
							maxlength="7"
							oninput="value=value.replace(/[^\d]/g,'')"
							name="validSubNumMax"
							@blur="checkValue($event)"
						></el-input>
					</el-form-item>
					<el-form-item label="离线天数:">
						<el-input
							v-model="queryData.offLineDaysStart"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
							maxlength="5"
							name="offLineDaysStart"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
						-
						<el-input
							v-model="queryData.offLineDaysEnd"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
							maxlength="5"
							name="offLineDaysEnd"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
					</el-form-item>
					<el-form-item label="返佣:">
						<el-input
							v-model="queryData.totalRebateMin"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
							maxlength="10"
							name="totalRebateMin"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
						-
						<el-input
							v-model="queryData.totalRebateMax"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
							maxlength="10"
							name="totalRebateMax"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
					</el-form-item>
					<el-form-item style="margin-left: 3px">
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
							v-if="hasPermission('278')"
							type="warning"
							icon="el-icon-folder-add"
							size="medium"
							:disabled="loading"
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
					size="mini"
					class="small-size-table"
					:data="dataList"
					style="width: 100%"
					:header-cell-style="getRowClass"
					@sort-change="_changeTableSort"
				>
					<el-table-column
						prop="userName"
						align="center"
						label="代理账号"
						width="150px"
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
					<el-table-column prop="accountType" align="center" label="代理类型" width="100">
						<template slot-scope="scope">
							<span v-if="!!scope.row.accountType">
								{{ typeFilter(scope.row.accountType, 'accountType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="subNum"
						align="center"
						label="下级人数"
						width="100px"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.subNum || scope.row.subNum === 0">
								{{ scope.row.subNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="validSubNum"
						align="center"
						label="有效下级"
						width="100"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.validSubNum">
								{{ scope.row.validSubNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="windControlName"
						align="center"
						label="风控层级"
                        width="100"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.windControlName">
								{{ scope.row.windControlName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="labelName" align="center" label="代理标签" width="180">
						<template slot-scope="scope">
							<span v-if="!!scope.row.labelName">
								{{ scope.row.labelName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="accountStatus" align="center" label="账号状态" width="120">
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
						prop="entryAuthority"
						align="center"
						label="入口权限"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.entryAuthority">
								{{ typeFilter(scope.row.entryAuthority, 'entrAuthorityType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="invitationCode"
						align="center"
						label="合营代码"
                        width="130"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.invitationCode">
								{{ scope.row.invitationCode }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="createDt"
						align="center"
						label="注册时间"
						width="180"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.createDt">
								{{ scope.row.createDt }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="totalRebate"
						align="center"
						label="返佣"
						width="120"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.totalRebate || scope.row.totalRebate === 0"
							>
								{{ scope.row.totalRebate }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="balance"
						align="center"
						label="余额"
						width="150"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.balance || scope.row.balance === 0">
								<el-tooltip placement="top" effect="light">
									<div slot="content">
										<p>代理余额：{{ scope.row.proxyBalance.toFixed(2) }}</p>
										<p>
											返佣余额：{{ scope.row.commissionBalance.toFixed(2) }}
										</p>
									</div>
									<i class="ti-help-alt data-icon"></i>
									<p>{{ scope.row.balance.toFixed(2) }}</p>
								</el-tooltip>
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="lastLoginTime"
						align="center"
						width="180px"
						label="最后登录时间"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.lastLoginTime">
								{{ scope.row.lastLoginTime }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="offLineDays"
						align="center"
						label="离线天数"
						width="100"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.offLineDays || scope.row.offLineDays === 0"
							>
								{{ scope.row.offLineDays }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
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
	</div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
// import { UTable } from 'umy-ui'
import { routerNames } from '@/utils/consts'
const start = dayjs()
	.startOf('day')
	.valueOf()
const end = dayjs()
	.endOf('day')
	.valueOf()

export default {
	name: routerNames.agentList,
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		this._changeTableSort = this.throttle(this._changeTableSort, 1000)
		return {
			queryData: {
				registerTime: [start, end],
				userName: undefined,
				invitationCode: undefined,
				accountType: [],
				accountStatus: [],
				windControlId: undefined,
				lastLoginTime: [],
				labelId: undefined,
				entryAuthority: undefined,
				subNumMin: undefined,
				subNumMax: undefined,
				validSubNumMin: undefined,
				validSubNumMax: undefined,
				totalRebateMin: undefined,
				totalRebateMax: undefined,
				offLineDaysStart: undefined,
				offLineDaysEnd: undefined,
				orderKey: undefined,
				orderType: undefined
			},
			dataList: [],
			total: 0,
			vipDict: [],
			userLabel: []
		}
	},
	computed: {
		accountStatusArr() {
			return this.globalDics.accountStatusType || []
		},
		accountTypeArr() {
			return this.globalDics.accountType || []
		},
		entrAuthorityTypeArr() {
			return this.globalDics.entrAuthorityType || []
		}
	},
	created() {
		this.getMerchantDict()
	},
	mounted() {
		this.getWindControllerLevelDict()
	},
	methods: {
		loadData() {
			const create = this.queryData.registerTime || []
			const lastLogin = this.queryData.lastLoginTime || []
			const [startTime, endTime] = create
			const [lastLoginTimeStart, lastLoginTimeEnd] = lastLogin
			let params = {
				...this.queryData,
				createDtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				createDtEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				lastLoginTimeStart: lastLoginTimeStart
					? dayjs(lastLoginTimeStart).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				lastLoginTimeEnd: lastLoginTimeEnd
					? dayjs(lastLoginTimeEnd).format('YYYY-MM-DD HH:mm:ss')
					: undefined
			}
			params = {
				...this.getParams(params)
			}
			if (!startTime && !endTime && !lastLoginTimeStart && !lastLoginTimeEnd) {
				this.$message({
					type: 'warning',
					message: `请选择注册时间, 最后登录时间,任意其中一个时间维度`
				})
				return false
			}
			this.dataList = []
			this.loading = true
			delete params.registerTime
			delete params.lastLoginTime
			this.$api
				.AgentListAPI(params)
				.then((res) => {
                    this.loading = false
					const {
						code,
						data: { record, totalRecord },
						msg
					} = res
					if (code === 200) {
						this.dataList = `Object.freeze`(record) || []
						this.total = totalRecord || 0
					} else {
						this.$message({
							message: res && msg,
							type: 'error'
						})
					}
				})
				.catch(() => (this.loading = false))

			// setTimeout(() => {
			// 	this.loading = false
			// }, 1500)
		},
		// 获取代理标签
		getMerchantDict() {
			this.$api.agentDictAPI().then((res) => {
				const { code, data, msg } = res
				if (code === 200) {
					this.userLabel = data || []
				} else {
					this.$message({
						message: msg,
						type: 'error'
					})
				}
			})
		},
		reset() {
			this.pageNum = 1
			this.queryData = {
				registerTime: [start, end],
				userName: undefined,
				invitationCode: undefined,
				accountType: [],
				accountStatus: [],
				windControlId: undefined,
				lastLoginTime: [],
				labelId: undefined,
				entryAuthority: undefined,
				subNumMin: undefined,
				subNumMax: undefined,
				validSubNumMin: undefined,
				validSubNumMax: undefined,
				offLineDaysStart: undefined,
				offLineDaysEnd: undefined,
				totalRebateMin: undefined,
				totalRebateMax: undefined,
				orderKey: undefined,
				orderType: undefined
			}
			this.$refs['form'].resetFields()
			this.loadData()
		},
		_changeTableSort({ column, prop, order }) {
			if (prop === 'subNum') {
				prop = 1
			}
			if (prop === 'validSubNum') {
				prop = 2
			}
			if (prop === 'createDt') {
				prop = 3
			}
			if (prop === 'lastLoginTime') {
				prop = 4
			}
			if (prop === 'offLineDays') {
				prop = 5
			}
			// if (prop === 'totalRebate') {
			//     prop = 6
			// }
			// if (prop === 'balance') {
			//     // prop = 7
			// }
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

		checkValue(e) {
			const { name, value } = e.target
			switch (name) {
				case 'offLineDaysStart':
					if (
						!!this.queryData.offLineDaysEnd &&
						(value && value * 1 > this.queryData.offLineDaysEnd * 1)
					) {
						this.$message({
							type: 'warning',
							message: `请输入小于${this.queryData.offLineDaysEnd}天数`
						})
					} else {
						this.queryData.offLineDaysStart = value
					}
					break
				case 'offLineDaysEnd':
					if (
						!!this.queryData.offLineDaysStart &&
						(value && value * 1 < this.queryData.offLineDaysStart * 1)
					) {
						this.$message({
							type: 'warning',
							message: `请输入大于${this.queryData.offLineDaysStart}天数`
						})
					} else {
						this.queryData.offLineDaysEnd = value
					}
					break
				case 'subNumMin':
					if (
						!!this.queryData.subNumMax &&
						(value && value * 1 > this.queryData.subNumMax * 1)
					) {
						this.$message({
							type: 'warning',
							message: `请输入小于${this.queryData.subNumMax}人数`
						})
					} else {
						this.queryData.subNumMin = value
					}
					break
				case 'subNumMax':
					if (
						!!this.queryData.subNumMin &&
						(value && value * 1 < this.queryData.subNumMin * 1)
					) {
						this.$message({
							type: 'warning',
							message: `请输入大于${this.queryData.subNumMin}人数`
						})
					} else {
						this.queryData.subNumMax = value
					}
					break
				case 'validSubNumMin':
					if (
						!!this.queryData.validSubNumMax &&
						(value && value * 1 > this.queryData.validSubNumMax * 1)
					) {
						this.$message({
							type: 'warning',
							message: `请输入小于${this.queryData.validSubNumMax}人数`
						})
					} else {
						this.queryData.validSubNumMin = value
					}
					break
				case 'validSubNumMax':
					if (
						!!this.queryData.validSubNumMin &&
						(value && value * 1 < this.queryData.validSubNumMin * 1)
					) {
						this.$message({
							type: 'warning',
							message: `请输入大于${this.queryData.validSubNumMin}人数`
						})
					} else {
						this.queryData.validSubNumMax = value
					}
					break
				case 'totalRebateMin':
					if (
						!!this.queryData.totalRebateMax &&
						(value && value * 1 > this.queryData.totalRebateMax * 1)
					) {
						this.$message({
							type: 'warning',
							message: `请输入小于${this.queryData.totalRebateMax}金额`
						})
					} else {
						this.queryData.totalRebateMin = value
					}
					break
				case 'totalRebateMax':
					if (
						!!this.queryData.totalRebateMin &&
						(value && value * 1 < this.queryData.totalRebateMin * 1)
					) {
						this.$message({
							type: 'warning',
							message: `请输入大于${this.queryData.totalRebateMin}金额`
						})
					} else {
						this.queryData.totalRebateMax = value
					}
					break
			}
		},
		// 获取风控层级
		getWindControllerLevelDict() {
			this.$api
				.getWindControllerLevelDict({ windControlType: 2 })
				.then((res) => {
					if (res.code === 200) {
						this.vipDict = res.data
					}
				})
		},
		exportExcel() {
			const create = this.queryData.registerTime || []
			const [startTime, endTime] = create
			const lastLogin = this.queryData.lastLoginTime || []
			const [lastLoginTimeStart, lastLoginTimeEnd] = lastLogin
			this.loading = true
			let params = {
				...this.queryData,
				createDtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				createDtEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				lastLoginTimeStart: lastLoginTimeStart
					? dayjs(lastLoginTimeStart).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				lastLoginTimeEnd: lastLoginTimeEnd
					? dayjs(lastLoginTimeEnd).format('YYYY-MM-DD HH:mm:ss')
					: undefined
			}
			params = {
				...this.getParams(params)
			}
			delete params.registerTime
			delete params.lastLoginTime
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
						.agentListExportAPI(params)
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

					setTimeout(() => {
						this.loading = false
					}, 1500)
				})
				.catch(() => {
					this.loading = false
				})
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
</style>
