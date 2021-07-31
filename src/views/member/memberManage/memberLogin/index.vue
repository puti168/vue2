<template>
	<div class="game-container report-container">
		<div class="params">
			<el-form ref="form" :inline="true" :model="queryData" label-width="80px">
				<el-form-item label="登录时间:">
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
						:clearable="false"
						:default-time="defaultTime"
						style="width: 452px"
					></el-date-picker>
				</el-form-item>

				<el-form-item label="账号类型:">
					<el-select
						v-model="accountType1"
						multiple
						collapse-tags
						placeholder="默认选择全部"
						:popper-append-to-body="false"
						style="width: 270px"
						clearable
					>
						<el-option
							v-for="item in accountType"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="会员账号:">
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

				<el-form-item label="登录状态:">
					<el-select
						v-model="queryData.loginStatus"
						style="width: 270px"
						:popper-append-to-body="false"
					>
						<el-option label="全部" value=""></el-option>
						<el-option
							v-for="item in loginStatusType"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="IP归属地:">
					<el-input
						v-model="queryData.ipAttribution"
						clearable
						size="medium"
						:maxlength="10"
						style="width: 187px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>

				<el-form-item label="登录 IP:" label-width="71px">
					<el-input
						v-model="queryData.loginIp"
						clearable
						size="medium"
						:maxlength="15"
						style="width: 180px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>

				<el-form-item label="登录终端:">
					<el-select
						v-model="deviceType1"
						style="width: 270px"
						:popper-append-to-body="false"
						placeholder="默认选择全部"
						multiple
						collapse-tags
						clearable
					>
						<el-option
							v-for="item in deviceType"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="终端设备号:" label-width="90px">
					<el-input
						v-model="queryData.deviceNo"
						clearable
						size="medium"
						:maxlength="50"
						style="width: 261px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>

				<el-form-item style="margin-left: 10px">
					<el-button
						type="primary"
						icon="el-icon-search"
						size="medium"
						@click="search"
					>
						查询
					</el-button>
					<el-button icon="el-icon-refresh-left" size="medium" @click="reset">
						重置
					</el-button>
				</el-form-item>

				<p class="login1">
					数据更新时间：{{ now }}
					<span>总登录次数：{{ summary.count }}次</span>
				</p>
				<p class="login2">
					登录成功：
					<span class="success">{{ summary.successCount }}次</span>
					<span class="fail">
						登录失败：
						<span class="danger">{{ summary.failCount }}次</span>
					</span>
				</p>
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
					<el-table-column
						prop="loginTime"
						align="center"
						label="登录时间"
						sortable="custom"
                        width="200"
					></el-table-column>
					<el-table-column
						prop="loginStatus"
						align="center"
						label="登录状态"
						width="80"
					>
						<template slot-scope="scope">
							<span
								:class="scope.row.loginStatus === '1' ? 'success' : 'danger'"
							>
								{{ typeFilter(scope.row.loginStatus, 'loginStatusType') }}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						v-slot="scope"
						prop="userName"
						align="center"
						label="会员账号"
                        width="120"
					>
						<Copy :title="scope.row.userName" :copy="copy" />
					</el-table-column>
					<el-table-column
						prop="accountType"
						align="center"
						label="账号类型"
						width="80"
					>
						<template slot-scope="scope">
							{{ typeFilter(scope.row.accountType, 'accountType') }}
						</template>
					</el-table-column>
					<el-table-column
						prop="loginIp"
						align="center"
						label="登录IP"
						width="130"
					>
						<template slot="header">
							登录IP
							<br />
							风控层级
						</template>
						<template slot-scope="scope">
							<span v-if="scope.row.loginIp !== null">
								{{ scope.row.loginIp }}
							</span>
							<span v-else>-</span>
							<br />
							<span class="redColor">
								风控层级：{{
									scope.row.ipControlName === null
										? '无'
										: scope.row.ipControlName
								}}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="ipAttribution"
						align="center"
						label="IP归属地"
                        width="120"
					></el-table-column>
					<el-table-column
						prop="deviceType"
						align="center"
						label="登录终端"
						width="80"
					>
						<template slot-scope="scope">
							{{ typeFilter(scope.row.deviceType, 'loginDeviceType') }}
						</template>
					</el-table-column>
					<el-table-column prop="deviceNo" align="center" label="终端设备号" width="200">
						<template slot="header">
							终端设备号
							<br />
							风控层级
						</template>
						<template slot-scope="scope">
							<span v-if="scope.row.deviceNo !== null">
								{{ scope.row.deviceNo }}
							</span>
							<span v-else>-</span>
							<br />
							<span class="redColor">
								风控层级：{{
									scope.row.deviceNoControlName === null
										? '无'
										: scope.row.deviceNoControlName
								}}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="loginReference"
						align="center"
						label="登录地址"
                        width="200"
					></el-table-column>
					<el-table-column
						prop="browseContent"
						align="center"
						label="设备版本"
						width="280"
					></el-table-column>
					<el-table-column prop="loginError" align="center" label="备注">
						<template slot-scope="scope">
							{{ scope.row.loginError ? scope.row.loginError : '-' }}
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
	</div>
</template>

<script>
import list from '@/mixins/list'
import dayjs from 'dayjs'
import { routerNames } from '@/utils/consts'
const end = dayjs()
	.endOf('day')
	.valueOf()
const start = dayjs()
	.startOf('day')
	.valueOf()
export default {
	name: routerNames.memberLogin,
	components: {},
	mixins: [list],
	data() {
		this.search = this.throttle(this.search, 1000)
		this.reset = this.throttle(this.reset, 1000)
		return {
			queryData: {
				userName: '',
				accountType: [],
				loginStatus: '',
				loginIp: '',
				ipAttribution: '',
				deviceType: [],
				deviceNo: ''
			},
			accountType1: [],
			deviceType1: [],
			now: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
			summary: {
				count: 0,
				failCount: 0,
				successCount: 0
			},
			formTime: {
				time: [start, end]
			},
			dataList: []
		}
	},
	computed: {
		accountType() {
			return this.globalDics.accountType
		},
		loginStatusType() {
			return this.globalDics.loginStatusType
		},
		deviceType() {
			return this.globalDics.loginDeviceType
		}
	},
	mounted() {},
	methods: {
		loadData() {
			const [startTime, endTime] = this.formTime.time || []
			let params = {
				...this.queryData,
				loginStartTime: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				loginEndTime: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: ''
			}
			if (!params.loginStartTime || !params.loginEndTime) {
				this.$message({
					message: '登录时间参数必传',
					type: 'error'
				})
				return
			}
			params = {
				...this.getParams(params)
			}
			params.accountType = this.accountType1.join(',')
			params.deviceType = this.deviceType1.join(',')
			this.loading = true
			this.$api
				.memberLoginLog(params)
				.then((res) => {
					if (res.code === 200) {
						this.now = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
						const response = res.data
						this.loading = false
						this.dataList = response !== null ? response.record : []
						this.total = response !== null ? response.totalRecord : 0
						this.summary =
							response !== null
								? response.summary
								: { count: 0, failCount: 0, successCount: 0 }
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
		reset() {
			this.queryData = {
				userName: '',
				accountType: [],
				loginStatus: '',
				loginIp: '',
				ipAttribution: '',
				deviceType: [],
				deviceNo: ''
			}
			this.pageNum = 1
			this.accountType1 = []
			this.deviceType1 = []
			this.formTime.time = [start, end]
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
.login1 {
	margin-top: 0;
	span {
		margin-left: 50px;
	}
}
.login2 {
	padding-bottom: 15px;
	.fail {
		margin-left: 50px;
	}
}
</style>
