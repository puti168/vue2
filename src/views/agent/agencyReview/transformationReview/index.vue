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
							style="width: 428px"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							:default-time="defaultTime"
						></el-date-picker>
					</el-form-item>

					<el-form-item label="审核状态:">
						<el-select
							v-model="queryData.auditStatus"
							style="width: 270px"
							multiple
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
					<el-form-item label="锁单状态:">
						<el-select
							v-model="queryData.lockOrder"
							style="width: 260px"
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
					<el-form-item label="审核操作:">
						<el-select
							v-model="queryData.auditStep"
							style="width: 260px"
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
					<el-form-item label="申请人:" label-width="66px">
						<el-input
							v-model="queryData.applyName"
							clearable
							size="medium"
							:maxlength="12"
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
							style="width: 274px"
							placeholder="请输入"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="转代会员账号:" label-width="108px">
						<el-input
							v-model="queryData.userName"
							clearable
							size="medium"
							:maxlength="11"
							style="width: 232px"
							placeholder="请输入"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="转入代理账号:" label-width="109px">
						<el-input
							v-model="queryData.transferProxyName"
							clearable
							size="medium"
							:maxlength="11"
							style="width: 200px"
							placeholder="请输入"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="审核单号:">
						<el-input
							v-model="queryData.auditNum"
							clearable
							size="medium"
							:maxlength="19"
							style="width: 272px"
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
							width="120"
						>
							<template slot-scope="scope">
								<el-button
									v-if="hasPermission('281')"
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
							width="250"
						>
							<template slot-scope="scope">
								<span>{{ scope.row.auditNum || '-' }}</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="userName"
							align="center"
							label="转代会员账号"
							width="150"
						>
							<template slot-scope="scope">
								<Copy
									v-if="!!scope.row.userName"
									:title="scope.row.userName"
									:copy="copy"
								/>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="transferProxyName"
							align="center"
							label="转入代理账号"
							width="150"
						>
							<template slot-scope="scope">
								<Copy
									v-if="!!scope.row.transferProxyName"
									:title="scope.row.transferProxyName"
									:copy="copy"
								/>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="applyName"
							align="center"
							label="申请人"
							width="150"
						>
							<template slot-scope="scope">
								<span>{{ scope.row.applyName || '-' }}</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="applyTime"
							align="center"
							sortable="custom"
							label="申请时间"
							width="200"
						>
							<template slot-scope="scope">
								<span>{{ scope.row.applyTime || '-' }}</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="applyInfo"
							align="center"
							label="申请信息"
							width="180"
						>
							<template slot-scope="scope">
								<span>{{ scope.row.applyInfo || '-' }}</span>
							</template>
						</el-table-column>
						<el-table-column align="center" label="审核状态" width="150">
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
						<el-table-column align="center" sortable="custom" min-width="220">
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
		<transformationDetail
			v-else
			:type="type"
			:rowData="rowData"
			@goBack="goBack"
		></transformationDetail>
	</div>
</template>

<script>
import list from '@/mixins/list'
import transformationDetail from './components/transformationDetail'
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
	components: { transformationDetail },
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		this.lockChange = this.throttle(this.lockChange, 1000)
		return {
			queryData: {
				userName: undefined,
				auditStatus: [],
				auditStep: undefined,
				transferProxyName: undefined,
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
				time2: []
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
				applyStartTime: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				applyEndTime: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				auditStartTime: startTime2
					? dayjs(startTime2).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				auditEndTime: endTime2
					? dayjs(endTime2).format('YYYY-MM-DD HH:mm:ss')
					: undefined
			}
			params = {
				...this.getParams(params)
			}
			this.$api
				.memberTransferSelectPage(params)
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
				transferProxyName: undefined,
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
				.memberTransferLockOrder({
					id: val.id,
					lockOrderStatus: Number(val.lockOrder) === 0 ? 0 : 1
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
