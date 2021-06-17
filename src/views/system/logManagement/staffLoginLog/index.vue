<template>
	<div class="game-container report-container">
		<div class="params">
			<el-form ref="form" :inline="true" :model="queryData">
				<el-form-item label="用户名称:">
					<el-input
						v-model="queryData.userName"
						clearable
						:maxlength="11"
						size="medium"
						style="width: 180px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item label="角色名称:">
					<el-input
						v-model="queryData.userName"
						clearable
						:maxlength="11"
						size="medium"
						style="width: 180px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item label="登录IP:">
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

				<el-form-item style="margin-left: 30px">
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
						prop="accountType"
						align="center"
						label="用户名"
						width="150px"
					>
						<template slot-scope="scope">
							{{ typeFilter(scope.row.accountType, 'accountType') }}
						</template>
					</el-table-column>
          <el-table-column
						prop="accountType"
						align="center"
						label="角色名称"
						width="200px"
					>
						<template slot-scope="scope">
							{{ typeFilter(scope.row.accountType, 'accountType') }}
						</template>
					</el-table-column>
					<el-table-column
						prop="loginTime"
						align="center"
						label="登录时间"
						sortable="custom"
					></el-table-column>
					<el-table-column
						prop="loginIp"
						align="center"
						label="登录IP"
						width="120"
					>
						<template slot="header">
							登录IP
						</template>
						<template slot-scope="scope">
							<span v-if="scope.row.loginIp !== null">
								{{ scope.row.loginIp }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="deviceNo" align="center" label="终端设备号">
						<template slot="header">
							终端设备号
						</template>
						<template slot-scope="scope">
							<span v-if="scope.row.deviceNo !== null">
								{{ scope.row.deviceNo }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="loginReference"
						align="center"
						label="登录地区"
					></el-table-column>
          <el-table-column prop="loginStatus" align="center" label="登录状态" width="80">
            <template slot-scope="scope">
              <span :class="scope.row.loginStatus === '1' ? 'success' : 'danger'">
                {{ typeFilter(scope.row.loginStatus, "loginStatusType") }}
              </span>
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
