<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form
					ref="form"
					:inline="true"
					:model="queryData"
					label-width="85px"
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
							:clearable="true"
							value-format="timestamp"
							style="width: 388px"
							:default-time="defaultTime"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="会员账号:" prop="userName">
						<el-input
							v-model="queryData.userName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
							maxlength="11"
						></el-input>
					</el-form-item>
					<el-form-item label="会员姓名:" prop="realName">
						<el-input
							v-model="queryData.realName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
							maxlength="6"
						></el-input>
					</el-form-item>
					<el-form-item label="账号状态:">
						<el-select
							v-model="queryData.accountStatus"
							size="medium"
							placeholder="默认选择全部"
							clearable
							multiple
							style="width: 300px"
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
							style="width: 180px"
						>
							<el-option
								v-for="item in vipDict"
								:key="item.windControlId"
								:label="item.windControlName"
								:value="item.windControlId"
							></el-option>
						</el-select>
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
					<el-form-item label="最后登录时间:" label-width="110px">
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
							style="width: 382px"
							:default-time="defaultTime"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="VIP等级:">
						<el-input
							v-model="queryData.vipSerialNumMin"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
							maxlength="3"
							name="vipSerialNumMin"
							oninput="value=value.replace(/[^\d]/g,'')"
							@blur="checkValue($event)"
						></el-input>
						-
						<el-input
							v-model="queryData.vipSerialNumMax"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
							maxlength="3"
							oninput="value=value.replace(/[^\d]/g,'')"
							name="vipSerialNumMax"
							@blur="checkValue($event)"
						></el-input>
					</el-form-item>
					<el-form-item label="账号类型:">
						<el-select
							v-model="queryData.accountType"
							size="medium"
							placeholder="默认选择全部"
							clearable
							multiple
							style="width: 300px"
						>
							<el-option
								v-for="item in accountTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="注册终端:">
						<el-select
							v-model="queryData.deviceType"
							size="medium"
							placeholder="默认选择全部"
							clearable
							multiple
							style="width: 300px"
						>
							<el-option
								v-for="item in deviceTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="首存金额:">
						<el-input
							v-model="queryData.firstDepositAmountMin"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
							maxlength="10"
							oninput="value=value.replace(/[^\d]/g,'')"
							name="firstDepositAmountMin"
							@blur="checkValue($event)"
						></el-input>
						-
						<el-input
							v-model="queryData.firstDepositAmountMax"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
							maxlength="10"
							oninput="value=value.replace(/[^\d]/g,'')"
							name="firstDepositAmountMax"
							@blur="checkValue($event)"
						></el-input>
					</el-form-item>
					<el-form-item label="转代次数:">
						<el-input
							v-model="queryData.transforNumMin"
							size="medium"
							placeholder="最小数值"
							style="width: 100px"
							maxlength="10"
							oninput="value=value.replace(/[^\d]/g,'')"
							name="transforNumMin"
							@blur="checkValue($event)"
						></el-input>
						-
						<el-input
							v-model="queryData.transforNumMax"
							size="medium"
							placeholder="最大数值"
							style="width: 100px"
							maxlength="10"
							oninput="value=value.replace(/[^\d]/g,'')"
							name="transforNumMax"
							@blur="checkValue($event)"
						></el-input>
					</el-form-item>
					<el-form-item label="首存时间:" label-width="100px">
						<el-date-picker
							v-model="queryData.firstSaveTime"
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
							style="width: 382px"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="会员标签:">
						<el-select
							v-model="queryData.labelId"
							size="medium"
							placeholder="全部"
							clearable
							style="width: 180px"
						>
							<el-option
								v-for="item in userLabel"
								:key="item.labelId"
								:label="item.labelName"
								:value="item.labelId"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="上级代理:">
						<el-input
							v-model="queryData.parentProxyName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
							maxlength="11"
						></el-input>
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
						label="会员账号"
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
					<el-table-column
						prop="realName"
						align="center"
						label="会员姓名"
						width="150px"
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
						prop="parentProxyName"
						align="center"
						label="代理上级"
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
					<el-table-column prop="accountType" align="center" label="账号类型">
						<template slot-scope="scope">
							<span v-if="!!scope.row.accountType">
								{{ typeFilter(scope.row.accountType, 'accountType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="labelName" align="center" label="会员标签">
						<template slot-scope="scope">
							<span v-if="!!scope.row.labelName">
								{{ scope.row.labelName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="windControlName"
						align="center"
						label="风控层级"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.windControlName">
								{{ scope.row.windControlName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="transforNum" align="center" label="转代次数" width="180">
                        <template slot="header" slot-scope="scope">
                            <el-popover placement="top-start" title="提示" width="280" trigger="hover">
                                <div v-if="!scope.row">
                                    <p>会员转代理的次数信息，每次转代成功数字+1，初始数字为0 </p>
                                </div>
                                <div slot="reference" class="el-icon-question">
                                    <span class="other-class">转代次数</span>
                                </div>
                            </el-popover>
                        </template>
						<template slot-scope="scope">
							<span
								v-if="
									!!scope.row.transforNum || scope.row.transforNum * 1 === 0
								"
							>
								{{ scope.row.transforNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="accountStatus"
						align="center"
						label="账号状态"
						width="100px"
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
						prop="vipSerialNum"
						align="center"
						label="VIP等级"
						width="100px"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.vipSerialNum || scope.row.vipSerialNum === 0"
							>
								{{ scope.row.vipSerialNum }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="createDt"
						align="center"
						label="注册时间"
						width="180px"
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
						prop="firstDepositTime"
						align="center"
						width="180px"
						label="首存时间"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.firstDepositTime">
								{{ scope.row.firstDepositTime }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="firstDepositAmount"
						align="center"
						label="首存金额"
						sortable="custom"
						width="100px"
					>
						<template slot-scope="scope">
							<span
								v-if="
									!!scope.row.firstDepositAmount ||
										scope.row.firstDepositAmount === 0
								"
							>
								{{ scope.row.firstDepositAmount }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="userBalance"
						align="center"
						label="中心钱包"
						width="100px"
					>
						<template slot-scope="scope">
							<span
								v-if="!!scope.row.userBalance || scope.row.userBalance === 0"
							>
								{{ scope.row.userBalance }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="lastLoginTime"
						align="center"
						label="最后登录时间"
						width="180px"
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
						width="150px"
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
					<el-table-column prop="deviceType" align="center" label="注册终端">
						<template slot-scope="scope">
							<span v-if="!!scope.row.deviceType">
								{{ typeFilter(scope.row.deviceType, 'deviceType') }}
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
// import { mapGetters } from 'vuex'
// import { UTable } from 'umy-ui'
import { routerNames } from '@/utils/consts'
const start = dayjs()
	.startOf('day')
	.valueOf()
const end = dayjs()
	.endOf('day')
	.valueOf()

export default {
	name: routerNames.memberList,
	mixins: [list],
	data() {
		return {
			queryData: {
				registerTime: [start, end],
				userName: undefined,
				realName: undefined,
				accountStatus: [],
				windControlId: undefined,
				offLineDaysStart: undefined,
				offLineDaysEnd: undefined,
				lastLoginTime: [],
				vipSerialNumMax: undefined,
				vipSerialNumMin: undefined,
				transforNumMin: undefined,
				transforNumMax: undefined,
				accountType: [],
				deviceType: [],
				firstDepositAmountMin: undefined,
				firstDepositAmountMax: undefined,
				firstSaveTime: [],
				labelId: undefined,
				parentProxyName: undefined,
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
		// ...mapGetters(['vipDict', 'userLabel']),
		accountStatusArr() {
			return this.globalDics.accountStatusType
		},
		accountTypeArr() {
			return this.globalDics.accountType
		},
		deviceTypeArr() {
			return this.globalDics.deviceType
		}
	},
	created() {
		this.getMemberLabelDict()
	},
	mounted() {
		this.getWindControllerLevelDict()
	},
	methods: {
		loadData() {
			const create = this.queryData.registerTime || []
			const lastLoginTime = this.queryData.lastLoginTime || []
			const firstSaveTime = this.queryData.firstSaveTime || []
			const [startTime, endTime] = create
			const [loginTimeStart, loginTimeEnd] = lastLoginTime
			const [firstDepositTimeStart, firstDepositTimeEnd] = firstSaveTime
			let params = {
				...this.queryData,
				createDtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				createDtEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				lastLoginTimeStart: loginTimeStart
					? dayjs(loginTimeStart).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				lastLoginTimeEnd: loginTimeEnd
					? dayjs(loginTimeEnd).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				firstDepositTimeStart: firstDepositTimeStart
					? dayjs(firstDepositTimeStart).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				firstDepositTimeEnd: firstDepositTimeEnd
					? dayjs(firstDepositTimeEnd).format('YYYY-MM-DD HH:mm:ss')
					: undefined
			}
			params = {
				...this.getParams(params)
			}
			if (
				!startTime &&
				!endTime &&
				!loginTimeStart &&
				!loginTimeEnd &&
				!firstDepositTimeStart &&
				!firstDepositTimeEnd
			) {
				this.$message({
					type: 'warning',
					message: `请选择注册时间, 最后登录时间,首存时间任意其中一个时间维度`
				})
				return false
			}
			this.dataList = []
			this.loading = true
			delete params.registerTime
			delete params.lastLoginTime
			delete params.firstSaveTime
			this.$api
				.memberListAPI(params)
				.then((res) => {
					const {
						code,
						data: { record, totalRecord },
						msg
					} = res
					if (code === 200) {
						this.loading = false
						this.dataList = record
						this.total = totalRecord
					} else {
						this.loading = false
						this.$message({
							message: msg,
							type: 'error'
						})
					}
				})
				.catch(() => (this.loading = false))

			setTimeout(() => {
				this.loading = false
			}, 1000)
		},
		// 获取会员标签
        getMemberLabelDict() {
			this.$api.getMemberLabelDict().then((res) => {
				const {
					code,
					data,
					msg
				} = res
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
		// 获取风控层级
		getWindControllerLevelDict() {
			this.$api
				.getWindControllerLevelDict({ windControlType: 1 })
				.then((res) => {
					if (res.code === 200) {
						this.vipDict = res.data
					}
				})
		},
		reset() {
			this.pageNum = 1
			this.queryData = {
				registerTime: [start, end],
				userName: undefined,
				realName: undefined,
				accountStatus: undefined,
				windControlId: undefined,
				offLineDaysStart: undefined,
				offLineDaysEnd: undefined,
				lastLoginTime: [],
				vipSerialNumMax: undefined,
				vipSerialNumMin: undefined,
				transforNumMin: undefined,
				transforNumMax: undefined,
				accountType: undefined,
				deviceType: undefined,
				firstDepositAmountMin: undefined,
				firstDepositAmountMax: undefined,
				firstSaveTime: [],
				labelId: undefined,
				parentProxyName: undefined,
				orderKey: undefined,
				orderType: undefined
			}
			this.$refs['form'].resetFields()
			this.loadData()
		},
		_changeTableSort({ column, prop, order }) {
			if (prop === 'vipSerialNum') {
				prop = 1
			}
			if (prop === 'createDt') {
				prop = 2
			}
			if (prop === 'firstDepositTime') {
				prop = 3
			}
			if (prop === 'firstDepositAmount') {
				prop = 4
			}
			if (prop === 'lastLoginTime') {
				prop = 5
			}
			if (prop === 'offLineDays') {
				prop = 6
			}
			this.queryData.orderKey = prop
			if (order === 'ascending') {
				// 升序
				this.queryData.orderType = 'asc'
			} else if (column.order === 'descending') {
				// 降序
				this.queryData.orderType = 'desc'
			}
			this.loadData()
		},

		checkValue(e) {
			const { name, value } = e.target
			switch (name) {
				case 'offLineDaysStart':
					if (
						!!this.queryData.offLineDaysEnd &&
						value &&
						value * 1 > this.queryData.offLineDaysEnd * 1
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
						value &&
						value * 1 < this.queryData.offLineDaysStart * 1
					) {
						this.$message({
							type: 'warning',
							message: `请输入大于${this.queryData.offLineDaysStart}天数`
						})
					} else {
						this.queryData.offLineDaysEnd = value
					}
					break
				case 'vipSerialNumMin':
					if (
						!!this.queryData.vipSerialNumMax &&
						value &&
						value * 1 > this.queryData.vipSerialNumMax * 1
					) {
						this.$message({
							type: 'warning',
							message: `请输入小于${this.queryData.vipSerialNumMax}等级`
						})
					} else {
						this.queryData.vipSerialNumMin = value
					}
					break
				case 'vipSerialNumMax':
					if (
						!!this.queryData.vipSerialNumMin &&
						value &&
						value * 1 < this.queryData.vipSerialNumMin * 1
					) {
						this.$message({
							type: 'warning',
							message: `请输入大于${this.queryData.vipSerialNumMin}等级`
						})
					} else {
						this.queryData.vipSerialNumMax = value
					}
					break
				case 'firstDepositAmountMin':
					if (
						!!this.queryData.firstDepositAmountMax &&
						value &&
						value * 1 > this.queryData.firstDepositAmountMax * 1
					) {
						this.$message({
							type: 'warning',
							message: `请输入小于${this.queryData.firstDepositAmountMax}金额`
						})
					} else {
						this.queryData.firstDepositAmountMin = value
					}
					break
				case 'firstDepositAmountMax':
					if (
						!!this.queryData.firstDepositAmountMin &&
						value &&
						value * 1 < this.queryData.firstDepositAmountMin * 1
					) {
						this.$message({
							type: 'warning',
							message: `请输入大于${this.queryData.firstDepositAmountMin}金额`
						})
					} else {
						this.queryData.firstDepositAmountMax = value
					}
					break
				case 'transforNumMin':
					if (
						!!this.queryData.transforNumMax &&
						value &&
						value * 1 > this.queryData.transforNumMax * 1
					) {
						this.$message({
							type: 'warning',
							message: `请输入小于${this.queryData.transforNumMax}次数`
						})
					} else {
						this.queryData.transforNumMin = value
					}
					break
				case 'transforNumMax':
					if (
						!!this.queryData.transforNumMin &&
						value &&
						value * 1 < this.queryData.transforNumMin * 1
					) {
						this.$message({
							type: 'warning',
							message: `请输入大于${this.queryData.transforNumMin}次数`
						})
					} else {
						this.queryData.transforNumMin = value
					}
					break
			}
		},
		exportExcel() {
			const create = this.queryData.registerTime || []
			const lastLoginTime = this.queryData.lastLoginTime || []
			const firstSaveTime = this.queryData.firstSaveTime || []
			const [startTime, endTime] = create
			const [loginTimeStart, loginTimeEnd] = lastLoginTime
			const [firstDepositTimeStart, firstDepositTimeEnd] = firstSaveTime
			this.loading = true
			let params = {
				...this.queryData,
				createDtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				createDtEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				lastLoginTimeStart: loginTimeStart
					? dayjs(loginTimeStart).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				lastLoginTimeEnd: loginTimeEnd
					? dayjs(loginTimeEnd).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				firstDepositTimeStart: firstDepositTimeStart
					? dayjs(firstDepositTimeStart).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				firstDepositTimeEnd: firstDepositTimeEnd
					? dayjs(firstDepositTimeEnd).format('YYYY-MM-DD HH:mm:ss')
					: undefined
			}
			params = {
				...this.getParams(params)
			}
			delete params.registerTime
			delete params.lastLoginTime
			delete params.firstSaveTime
			params.accountStatus =
				params.accountStatus && params.accountStatus.length
					? params.accountStatus
					: undefined
			params.deviceType =
				params.deviceType && params.deviceType.length
					? params.deviceType
					: undefined
			params.accountType =
				params.accountType && params.accountType.length
					? params.accountType
					: undefined
			this.$api
				.exportExcelAPI(params)
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
