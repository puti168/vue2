<template>
	<div class="game-container report-container">
		<template v-if="!showDetail">
			<div class="params">
				<el-form
					ref="form"
					:inline="true"
					:model="queryData"
					label-width="80px"
				>
					<el-form-item label="申请时间:">
						<el-date-picker
							v-model="formTime.time"
							size="medium"
							:picker-options="pickerOptions"
							format="yyyy-MM-dd HH:mm:ss"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							style="width: 428px"
							:default-time="defaultTime"
						></el-date-picker>
					</el-form-item>

					<el-form-item label="代理账号:">
						<el-input
							v-model="queryData.userName"
							clearable
							:maxlength="11"
							size="medium"
							style="width: 270px"
							placeholder="请输入"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="账号类型:" class="tagheight">
						<el-select
							v-model="queryData.accountType"
							style="width: 270px"
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
					<el-form-item label="审核操作:">
						<el-select
							v-model="queryData.auditStep"
							style="width: 270px"
							:popper-append-to-body="false"
						>
							<el-option label="全部" value=""></el-option>
							<el-option
								v-for="item in auditStepType"
								:key="item.code"
								:label="item.description"
								:value="Number(item.code)"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="一审完成时间:" label-width="108px">
						<el-date-picker
							v-model="formTime.time2"
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
					<el-form-item label="审核状态:">
						<el-select
							v-model="queryData.auditStatus"
							style="width: 270px"
							multiple
							clearable
							collapse-tags
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option
								v-for="item in auditStatus"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="申请人:" label-width="66px">
						<el-input
							v-model="queryData.applyName"
							:maxlength="12"
							clearable
							size="medium"
							style="width: 284px"
							placeholder="请输入"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="一审人:" label-width="66px">
						<el-input
							v-model="queryData.auditName"
							clearable
							size="medium"
							:maxlength="12"
							style="width: 284px"
							placeholder="请输入"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="锁单状态:">
						<el-select
							v-model="queryData.lockOrder"
							style="width: 219px"
							:popper-append-to-body="false"
						>
							<el-option label="全部" value=""></el-option>
							<el-option
								v-for="item in lockOrderType"
								:key="item.code"
								:label="item.description"
								:value="Number(item.code)"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="审核单号:">
						<el-input
							v-model="queryData.auditNum"
							clearable
							size="medium"
							:maxlength="19"
							style="width: 282px"
							placeholder="请输入"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item style="margin-left: 8px">
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
					</el-form-item>
					<p class="danger data-refresh">数据更新时间： {{ now }}</p>
				</el-form>
			</div>
			<div class="view-container dealer-container">
				<div class="content">
					<el-table
						v-loading="loading"
						border
						size="mini"
						class="small-size-table"
						:data="dataList"
						style="width: 100%"
						:header-cell-style="getRowClass"
						@sort-change="changeTableSort2"
					>
						<el-table-column align="center" label="锁单" width="60">
							<template slot-scope="scope">
								<el-checkbox
									v-if="
										Number(scope.row.auditStep) === 1 &&
											(scope.row.auditName === name || !scope.row.auditName)
									"
									v-model="scope.row.lockStatus"
									@change="lockChange(scope.row)"
								></el-checkbox>
							</template>
						</el-table-column>
						<el-table-column
							prop="auditStep"
							align="center"
							label="操作"
							width="100"
						>
							<template slot-scope="scope">
								<el-button
									:class="
										Number(scope.row.auditStep) === 1 &&
										scope.row.auditName !== name
											? 'dis'
											: ''
									"
									:type="
										Number(scope.row.auditStep) === 0 ? 'success' : 'primary'
									"
									size="medium"
									@click="goDetail(scope.row)"
								>
									{{ typeFilter(scope.row.auditStep, 'auditStepType') }}
								</el-button>
							</template>
						</el-table-column>
						<el-table-column
							prop="auditNum"
							align="center"
							label="审核单号"
							width="220"
						>
							<template slot-scope="scope">
								<span>{{ scope.row.auditNum || '-' }}</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="applyType"
							align="center"
							label="审核申请类型"
							width="150px"
						>
							<template slot-scope="scope">
								{{ typeFilter(scope.row.applyType, 'porxyApplyType') }}
							</template>
						</el-table-column>
						<el-table-column align="center" label="修改前" width="150">
							<template slot-scope="scope">
								<template v-if="Number(scope.row.applyType === 2)">
									{{ typeFilter(scope.row.beforeModify, 'genderType') }}
								</template>
								<template v-else-if="Number(scope.row.applyType === 6)">
									{{ typeFilter(scope.row.beforeModify, 'accountStatusType') }}
								</template>
								<template v-else>
									{{ scope.row.beforeModify || '-' }}
								</template>
							</template>
						</el-table-column>
						<el-table-column align="center" label="修改后" width="150">
							<template slot-scope="scope">
								<template v-if="Number(scope.row.applyType === 2)">
									{{ typeFilter(scope.row.afterModify, 'genderType') }}
								</template>
								<template v-else-if="Number(scope.row.applyType === 6)">
									{{ typeFilter(scope.row.afterModify, 'accountStatusType') }}
								</template>
								<template v-else>
									{{ scope.row.afterModify || '-' }}
								</template>
							</template>
						</el-table-column>
						<el-table-column align="center" width="130">
							<template slot="header">
								<span>
									代理账号
									<br />
									账号类型
								</span>
							</template>
							<template slot-scope="scope">
								<Copy
									v-if="!!scope.row.userName"
									:title="scope.row.userName"
									:copy="copy"
								/>
								<span v-else>-</span>
								<p>{{ typeFilter(scope.row.accountType, 'accountType') }}</p>
							</template>
						</el-table-column>
						<el-table-column
							prop="applyName"
							align="center"
							label="申请人"
							width="130px"
						>
							<template slot-scope="scope">
								<span>{{ scope.row.applyName || '-' }}</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="applyTime"
							align="center"
							sortable="custom"
							width="180"
							label="申请时间"
						>
							<template slot-scope="scope">
								<span>{{ scope.row.applyTime || '-' }}</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="applyInfo"
							align="center"
							label="申请信息"
							width="180px"
						>
							<template slot-scope="scope">
								<span>{{ scope.row.applyInfo || '-' }}</span>
							</template>
						</el-table-column>
						<el-table-column align="center" label="审核状态" width="120">
							<template slot-scope="scope">
								<span
									v-if="Number(auditStatus) !== 0"
									:class="
										Number(scope.row.auditStatus) === 1
											? 'lockingRgba'
											: Number(scope.row.auditStatus) === 2
											? 'normalRgba'
											: 'disableRgba'
									"
								>
									{{ typeFilter(scope.row.auditStatus, 'auditStatusType') }}
								</span>
							</template>
						</el-table-column>
						<el-table-column align="center" sortable="custom" width="170px">
							<template slot="header">
								<span>
									一审审核人
									<br />
									一审完成时间
								</span>
							</template>
							<template slot-scope="scope">
								{{ scope.row.auditName || '-' }}
								<p>{{ scope.row.auditTime || '-' }}</p>
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
		</template>
		<agencyEditDetail
			v-else
			:type="type"
			:rowData="rowData"
			@goBack="goBack"
		></agencyEditDetail>
	</div>
</template>

<script>
import list from '@/mixins/list'
import agencyEditDetail from './components/agencyEditDetail'
import dayjs from 'dayjs'
import { getUsername } from '@/utils/auth'
import { routerNames } from '@/utils/consts'
const end = dayjs()
	.endOf('day')
	.valueOf()
const start = dayjs()
	.startOf('day')
	.valueOf()
export default {
	name: routerNames.agencyEdit,
	components: { agencyEditDetail },
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		this.lockChange = this.throttle(this.lockChange, 1000)
		return {
			queryData: {
				userName: undefined,
				accountType: [],
				applyType: undefined,
				auditStatus: [],
				auditStep: undefined,
				applyName: undefined,
				auditName: undefined,
				lockOrder: undefined,
				auditNum: undefined,
				orderType: undefined,
				orderKey: undefined
			},
			type: true,
			showDetail: false,
			formTime: {
				time: [start, end],
				time2: [start, end]
			},
			rowData: {},
			now: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
			name: '',
			dataList: []
		}
	},
	computed: {
		accountType() {
			return this.globalDics.accountType || []
		},
		auditStatus() {
			return this.globalDics.auditStatusType || []
		},
		auditStepType() {
			return this.globalDics.auditStepType || []
		},
		lockOrderType() {
			return this.globalDics.lockOrderType || []
		},
		applyType() {
			return this.globalDics.applyType || []
		}
	},
	mounted() {
		this.name = getUsername()
	},
	methods: {
		loadData() {
			this.loading = true
			const [startTime, endTime] = this.formTime.time || []
			const [startTime2, endTime2] = this.formTime.time2 || []
			let params = {
				...this.queryData,
				applyTimeStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				applyTimeEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				auditTimeStart: startTime2
					? dayjs(startTime2).format('YYYY-MM-DD HH:mm:ss')
					: '',
				auditTimeEnd: endTime2
					? dayjs(endTime2).format('YYYY-MM-DD HH:mm:ss')
					: ''
			}
			params = {
				...this.getParams(params)
			}
			this.$api
				.proxyDataPage(params)
				.then((res) => {
					if (res.code === 200) {
						this.now = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
						const response = res.data
						this.loading = false
						this.dataList = response.record
						if (this.dataList) {
							this.dataList.forEach((item) => {
								if (Number(item.lockOrder) === 1) {
									item.lockStatus = true
								} else {
									item.lockStatus = false
								}
							})
						}
						this.total = response.totalRecord
					} else {
						this.loading = false
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		changeTableSort2({ column, prop, order }) {
			this.pageNum = 1
			this.queryData.orderKey = prop === 'applyTime' ? 1 : 2
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
		goDetail(row) {
			this.type = Number(row.auditStep) === 1 && row.auditName === this.name
			this.rowData = row
			this.showDetail = true
		},
		goBack() {
			this.showDetail = false
			this.loadData()
		},
		reset() {
			this.queryData = {
				userName: undefined,
				accountType: [],
				applyType: undefined,
				auditStatus: [],
				auditStep: undefined,
				applyName: undefined,
				auditName: undefined,
				lockOrder: undefined,
				auditNum: undefined,
				orderType: undefined,
				orderKey: undefined
			}
			this.formTime = {
				time: [start, end],
				time2: []
			}
			this.loadData()
		},
		lockChange(val) {
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			this.$api
				.proxyDataLock({
					id: val.id,
					lockFlag: Number(val.lockOrder) === 0 ? 0 : 1
				})
				.then((res) => {
					if (res.code === 200) {
						loading.close()
						this.$message({
							type: 'success',
							message: '操作成功!'
						})
						this.loadData()
					} else {
						loading.close()
						this.$message({
							message: res.msg,
							type: 'error'
						})
					}
				})
				.catch(() => {
					loading.close()
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
/deep/ .caret-wrapper {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
}
.data-refresh {
	margin-top: 0;
	padding-bottom: 20px;
}
</style>
