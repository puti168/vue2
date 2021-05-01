<template>
	<div class="game-container report-container">
		<div class="params">
			<el-form ref="form" :inline="true" :model="queryData">
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
						clearable
						:default-time="defaultTime"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="一审完成时间:">
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
				<el-form-item label="会员账号:">
					<el-input
						v-model="queryData.userName"
						clearable
						size="medium"
						style="width: 180px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item label="账号类型:">
					<el-select
						v-model="queryData.accountType"
						style="width: 180px"
						multiple
						:popper-append-to-body="false"
						placeholder="默认选择全部"
					>
						<el-option
							v-for="item in accountType"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核申请类型:">
					<el-select
						v-model="queryData.applyType"
						style="width: 180px"
						:popper-append-to-body="false"
					>
						<el-option label="全部" value></el-option>
						<el-option
							v-for="item in applyType"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核操作:">
					<el-select
						v-model="queryData.status"
						style="width: 180px"
						:popper-append-to-body="false"
					>
						<el-option label="全部" value=""></el-option>
						<el-option label="启用" value="0"></el-option>
						<el-option label="停用" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核状态:">
					<el-select
						v-model="queryData.auditStatus"
						style="width: 180px"
						:popper-append-to-body="false"
					>
						<el-option label="全部" value=""></el-option>
						<el-option
							v-for="item in auditStatus"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="申请人:">
					<el-input
						v-model="queryData.applyName"
						clearable
						size="medium"
						style="width: 180px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item label="一审人:">
					<el-input
						v-model="queryData.auditName"
						clearable
						size="medium"
						style="width: 180px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item label="锁单状态:">
					<el-select
						v-model="queryData.lockOrder"
						style="width: 180px"
						:popper-append-to-body="false"
					>
						<el-option label="全部" value></el-option>
						<el-option
							v-for="item in lockOrderType"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核单号:">
					<el-input
						v-model="queryData.auditNum"
						clearable
						size="medium"
						style="width: 180px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>

				<el-form-item style="margin-left: 30px">
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
				<p class="danger data-refresh">数据更新时间： 2019-10-01 10:00:00</p>
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
					@sort-change="changeTableSort"
				>
					<el-table-column prop="cardNo" align="center" label="锁单">
						<template slot-scope="scope">
							<el-checkbox
								v-if="scope.row.auditStep === '1' && (scope.row.auditName === name || !scope.row.auditName)"
								v-model="scope.row.lockOrder"
								@change="lockChange()"
							></el-checkbox>
						</template>
					</el-table-column>
					<el-table-column prop="auditStep" align="center" label="操作">
						<template slot-scope="scope">
							<el-button v-if="scope.row.auditStep === '1' && (scope.row.auditName === name || !scope.row.auditName)" type="primary" size="medium">{{ typeFilter(scope.row.auditStep, 'auditStepType') }}</el-button>
							<el-button v-else-if="scope.row.auditStep === '1' && scope.row.auditName !== name" disabled type="primary" size="medium">{{ typeFilter(scope.row.auditStep, 'auditStepType') }}</el-button>
							<el-button v-else-if="scope.row.auditStep === '0'" type="success" size="medium">{{ typeFilter(scope.row.auditStep, 'auditStepType') }}</el-button>
						</template>
					</el-table-column>
					<el-table-column
						prop="auditNum"
						align="center"
						label="审核单号"
					></el-table-column>
					<el-table-column
						prop="applyType"
						align="center"
						label="审核申请类型"
					><template slot-scope="scope">
						{{ typeFilter(scope.row.applyType, 'applyType') }}</template></el-table-column>
					<el-table-column
						prop="beforeModify"
						align="center"
						label="修改前"
					></el-table-column>
					<el-table-column
						prop="afterModify"
						align="center"
						label="修改后"
					></el-table-column>
					<el-table-column align="center" label="操作类型">
						<template slot="header">
							<p>会员账号</p>
							<p>账号类型</p>
						</template>
						<template slot-scope="scope">
							{{ scope.row.userName ? scope.row.userName : '-' }}
							<Copy :title="scope.row.modifyBy" :copy="copy" />
							<p>{{ typeFilter(scope.row.accountType, 'applyType') }}</p>
						</template>
					</el-table-column>
					<el-table-column
						prop="applyName"
						align="center"
						label="申请人"
					></el-table-column>
					<el-table-column
						prop="applyTime"
						align="center"
						sortable="custom"
						label="申请时间"
					></el-table-column>
					<el-table-column
						prop="applyInfo"
						align="center"
						label="申请信息"
					></el-table-column>
					<el-table-column align="center" label="审核状态">
						<template slot-scope="scope">
							<span
								:class="scope.row.auditStatus === '1' ? 'infoState' : scope.row.auditStatus === '2' ? 'success' : 'danger'"
							>
								{{ typeFilter(scope.row.auditStatus, 'auditStatusType') }}
							</span>
						</template>
					</el-table-column>
					<el-table-column align="center" sortable="custom" width="200px">
						<template slot="header">
							一审审核人
							<br />
							一审完成时间
						</template>
						<template slot-scope="scope">
							{{ scope.row.auditName ? scope.row.auditName : '-' }}
							<p>{{ scope.row.auditTime }}</p>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					:current-page.sync="pageNum"
					class="pageValue"
					layout="total, sizes,prev, pager, next, jumper"
					:page-size="pageSize"
					:page-sizes="pageSizes"
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
import { getNickName } from '@/utils/auth'
const end = dayjs()
	.endOf('day')
	.valueOf()
const start = dayjs()
	.startOf('day')
	.valueOf()
export default {
	name: 'MemberChange',
	components: {},
	mixins: [list],
	data() {
		return {
			queryData: {
				userName: '',
				accountType: [],
				applyType: '',
				auditStatus: '',
				applyName: '',
				auditName: '',
				lockOrder: '',
				auditNum: '',
				orderType: '',
				orderKey: ''
			},
			formTime: {
				time: [start, end],
				time2: [start, end]
			},
			name: '',
			dataList: [],
			title: '',
			showForm: '',
			editVisible: false,
			editFormData: {}
		}
	},
	computed: {
		accountType() {
			return this.globalDics.accountType
		},
		auditStatus() {
			return this.globalDics.auditStatusType
		},
		lockOrderType() {
			return this.globalDics.lockOrderType
		},
		applyType() {
			return this.globalDics.applyType
		}
	},
	mounted() {
		this.name = getNickName()
		console.log(this.name)
	},
	methods: {
		loadData() {
			this.loading = true
			const [startTime, endTime] = this.formTime.time || []
			let params = {
				...this.queryData,
				applyTimeStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				applyTimeEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				auditTimeStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				auditTimeEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: ''
			}
			params = {
				...this.getParams(params)
			}
			this.$api.memberChange(params).then((res) => {
				if (res.code === 200) {
					const response = res.data
					this.loading = false
					this.dataList = response.record
					this.total = response.totalRecord
				} else {
					this.loading = false
					this.$message({
						message: res.msg,
						type: 'error'
					})
				}
			})
		},
		reset() {
			this.queryData = {
				userName: '',
				accountType: [],
				applyType: '',
				auditStatus: '',
				applyName: '',
				auditName: '',
				lockOrder: '',
				auditNum: '',
				orderType: '',
				orderKey: ''
			}
			this.formTime = {
				time: [start, end],
				time2: [start, end]
			}
			this.loadData()
		},
		lockChange(val, val2) {
			this.$api.lock(
				{id: '595743559097831424'}
			).then((res) => {
				if (res.code === 200) {
					const response = res.data
					this.loading = false
					this.dataList = response.record
					this.total = response.totalRecord
				} else {
					this.loading = false
					this.$message({
						message: res.msg,
						type: 'error'
					})
				}
			})
			JSON.stringify
			console.log(val)
			console.log(val2)
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
.data-refresh {
	margin-top: 0;
	padding-bottom: 20px;
}
</style>
