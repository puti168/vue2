<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form
					ref="form"
					:inline="true"
					:model="queryData"
					label-width="100px"
				>
					<el-form-item label="注册时间:">
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
							value-format="timestamp"
							style="width: 388px"
						></el-date-picker>
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
					<el-form-item label="会员账号:">
						<el-input
							v-model="queryData.userName"
							size="medium"
							placeholder="请输入"
							clearable
                            maxlength="11"
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item label="会员姓名:">
						<el-input
							v-model="queryData.realname"
							size="medium"
							placeholder="请输入"
							clearable
                            maxlength="6"
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item label="上级代理:">
						<el-input
							v-model="queryData.parentProxyName"
							size="medium"
							placeholder="请输入"
							clearable
                            maxlength="11"
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item label="注册手机号:">
						<el-input
							v-model="queryData.registerPhone"
							size="medium"
							placeholder="请输入"
							clearable
                            maxlength="11"
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item label="注册IP:">
						<el-input
							v-model="queryData.registerIp"
							size="medium"
							placeholder="请输入"
							clearable
                            maxlength="15"
							style="width: 180px"
						></el-input>
					</el-form-item>
					<el-form-item label="IP归属地:">
						<el-input
							v-model="queryData.ipAttribution"
							size="medium"
							placeholder="请输入"
							clearable
                            maxlength="10"
							style="width: 180px"
						></el-input>
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
					@sort-change="changeTableSort"
				>
					<el-table-column
						prop="createDt"
						align="center"
						label="注册时间"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.createDt">
								{{ scope.row.createDt }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="accountType" align="center" label="会员类型">
						<template slot-scope="scope">
							<span v-if="!!scope.row.accountType">
								{{ typeFilter(scope.row.accountType, 'accountType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="userName" align="center" label="会员账号">
						<template slot-scope="scope">
							<span v-if="!!scope.row.userName">
								{{ scope.row.userName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="parentProxyName"
						align="center"
						label="上级代理"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.parentProxyName">
								{{ scope.row.parentProxyName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="registerPhone"
						align="center"
						label="注册手机号"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.registerPhone">
								{{ scope.row.registerPhone }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="registerIp" align="center" label="注册IP">
						<template slot-scope="scope">
							<span v-if="!!scope.row.registerIp">
								{{ scope.row.registerIp }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column prop="ipAttribution" align="center" label="IP归属地">
						<template slot-scope="scope">
							<span v-if="!!scope.row.ipAttribution">
								{{ scope.row.ipAttribution }}
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
					<el-table-column prop="deviceNo" align="center" label="终端设备号">
						<template slot-scope="scope">
							<span v-if="!!scope.row.deviceNo">
								{{ scope.row.deviceNo }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					v-show="!!total"
					:current-page.sync="pageNum"
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
import { routerNames } from '@/utils/consts'
import dayjs from 'dayjs'
const start = dayjs()
	.startOf('day')
	.valueOf()
const end = dayjs()
	.endOf('day')
	.valueOf()
// import editForm from './components/editForm'
// import { UTable } from 'umy-ui'
export default {
	name: routerNames.registerInfo,
	mixins: [list],
	data() {
		return {
			queryData: {
				registerTime: [start, end],
				accountType: undefined,
				userName: '',
				parentProxyName: '',
				registerPhone: '',
                registerIp: '',
				ipAttribution: '',
				deviceType: undefined,
				realname: '',
                orderType: undefined
			},
			dataList: [],
			total: 0
		}
	},
	computed: {
		accountTypeArr() {
			return this.globalDics.accountType
		},
		deviceTypeArr() {
			return this.globalDics.deviceType
		}
	},
	mounted() {},
	methods: {
		loadData() {
			this.dataList = []
			const create = this.queryData.registerTime || []
			const [startTime, endTime] = create
			let params = {
				...this.queryData,
				createDtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				createDtEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined
			}
			params = {
				...this.getParams(params)
			}
			delete params.registerTime
			params.accountType = params.accountType ? params.accountType.join(',') : undefined
			params.deviceType = params.deviceType ? params.deviceType.join(',') : undefined
			this.$api.memberRegisterInfoListAPI(params).then((res) => {
				const {
					code,
					data: { record, totalRecord },
					msg
				} = res
				if (code === 200) {
					this.loading = false
					this.dataList = record || []
					this.total = totalRecord || 0
				} else {
					this.loading = false
					this.$message({
						message: msg,
						type: 'error'
					})
				}
			})
		},
		reset() {
			this.$refs['form'].resetFields()
			this.queryData = {
				registerTime: [start, end],
				accountType: undefined,
				userName: '',
				parentProxyName: '',
				registerPhone: '',
                registerIp: '',
				ipAttribution: '',
				deviceType: undefined,
				realname: ''
			}
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
</style>
