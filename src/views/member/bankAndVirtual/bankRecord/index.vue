<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="操作类型:">
						<el-select
							v-model="queryData.operateType"
							size="medium"
							placeholder="默认选择全部"
							clearable
							style="width: 180px"
						>
							<el-option
								v-for="item in bindType"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="操作时间:">
						<el-date-picker
							v-model="queryData.createDt"
							size="medium"
							:picker-options="pickerOptions"
							format="yyyy-MM-dd HH:mm:ss"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							:clearable="false"
							value-format="timestamp"
							style="width: 400px"
							:default-time="defaultTime"
						></el-date-picker>
					</el-form-item>
					<el-form-item label="会员账号:" prop="userName">
						<el-input
							v-model="queryData.userName"
							size="medium"
							placeholder="请输入"
							clearable
							maxlength="11"
							style="width: 180px"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="持卡人姓名:">
						<el-input
							v-model="queryData.cnName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
							maxlength="15"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="账号类型:">
						<el-select
							v-model="queryData.accountType"
							size="medium"
							placeholder="默认选择全部"
							clearable
							multiple
							collapse-tags
							style="width: 220px"
						>
							<el-option
								v-for="item in accountTypeArr"
								:key="item.code"
								:label="item.description"
								:value="item.code"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="银行名称:">
						<el-input
							v-model="queryData.bankName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 250px"
							maxlength="10"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="银行卡号:">
						<el-input
							v-model="queryData.cardNumber"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 330px"
							maxlength="25"
							oninput="value=value.replace(/[^\d]/g,'')"
							@keyup.enter.native="enterSearch"
						></el-input>
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
					<el-form-item label="上级代理:" label-width="88px">
						<el-input
							v-model="queryData.parentProxyName"
							size="medium"
							placeholder="请输入"
							clearable
							style="width: 180px"
							maxlength="11"
							@keyup.enter.native="enterSearch"
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
						prop="accountType"
						align="center"
						label="账号类型"
						width="100"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.accountType">
								{{ typeFilter(scope.row.accountType, 'accountType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="parentProxyName"
						align="center"
						label="上级代理"
						width="100"
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.parentProxyName"
								:title="scope.row.parentProxyName"
								:copy="copy"
							/>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="cardNumber"
						align="center"
						label="银行卡号"
						min-width="170"
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.cardNumber"
								:title="scope.row.cardNumber"
								:copy="copy"
							/>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="bankName"
						align="center"
						label="银行名称"
						min-width="120"
					>
						<template slot="header">
							银行名称
							<br />
							银行支行
						</template>
						<template slot-scope="scope">
							<span v-if="!!scope.row.bankName">
								{{ scope.row.bankName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="windControlLevelName"
						align="center"
						label="风控层级"
						width="110"
					>
						<template slot-scope="scope">
							{{ scope.row.windControlLevelName || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="cnName"
						align="center"
						label="持卡人"
						width="120"
					>
						<template slot-scope="scope">
							<Copy
								v-if="!!scope.row.cnName"
								:title="scope.row.cnName"
								:copy="copy"
							/>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="operateType"
						align="center"
						label="操作类型"
						width="100"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.operateType">
								{{ typeFilter(scope.row.operateType, 'bindType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="operateType"
						align="center"
						label="备注信息"
						width="150"
					>
						<template slot-scope="scope">
							{{ scope.row.remark || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="updatedBy"
						align="center"
						label="操作人"
						width="120"
					>
						<template slot-scope="scope">
							{{ scope.row.updatedBy || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="createDt"
						align="center"
						label="操作时间"
						sortable="custom"
						min-width="170"
					>
						<template slot-scope="scope">
							{{ scope.row.createDt || '-' }}
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					v-show="!!total"
					:current-page.sync="pageNum"
					class="pageValue"
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
import { routerNames } from '@/utils/consts'
// import { notSpecial2, isHaveEmoji } from '@/utils/validate'
const start = dayjs()
	.startOf('day')
	.valueOf()
const end = dayjs()
	.endOf('day')
	.valueOf()

export default {
	name: routerNames.bankRecord,
	mixins: [list],
	data() {
		this.search = this.throttle(this.search, 1000)
		this.reset = this.throttle(this.reset, 1000)
		return {
			queryData: {
				operateType: undefined,
				createDt: [start, end],
				userName: undefined,
				cnName: undefined,
				bankName: undefined,
				accountType: [],
				cardNumber: undefined,
				windControlId: undefined,
				parentProxyName: undefined,
				orderType: undefined
			},
			dataList: [],
			total: 0,
			vipDict: []
		}
	},
	computed: {
		bindType() {
			return this.globalDics.bindType || []
		},
		accountTypeArr() {
			return this.globalDics.accountType || []
		}
	},
	mounted() {
		this.getWindControllerLevelDict()
	},
	methods: {
		loadData() {
			this.dataList = []
			this.loading = true
			const create = this.queryData.createDt || []
			const [startTime, endTime] = create
			let params = {
				...this.queryData,
				dataType: 1,
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
			delete params.createDt
			this.$api
				.bankRecordListAPI(params)
				.then((res) => {
					this.loading = false
					const {
						code,
						data: { record, totalRecord },
						msg
					} = res
					if (res && code && code === 200) {
						this.dataList =
							(res.data && record.length && Object.freeze(record)) || []
						this.total = (res.data && totalRecord) || 0
					} else {
						this.$message({
							message: res && msg,
							type: 'error'
						})
					}
				})
				.catch(() => (this.loading = false))
		},
		reset() {
			this.pageNum = 1
			this.$refs['form'].resetFields()
			this.queryData = {
				operateType: undefined,
				createDt: [start, end],
				userName: undefined,
				cnName: undefined,
				bankName: undefined,
				accountType: [],
				cardNumber: undefined,
				windControlId: undefined,
				parentProxyName: undefined,
				orderType: undefined
			}
			this.loadData()
		},
		getWindControllerLevelDict() {
			this.$api
				.getWindControllerLevelDict({ windControlType: 3 })
				.then((res) => {
					if (res && res.code === 200) {
						this.vipDict = res.data
					} else {
						this.vipDict = []
					}
				})
		},
		_changeTableSort({ column, order }) {
			if (order === 'ascending') {
				// 升序
				this.queryData.orderType = 'asc'
			} else if (column.order === 'descending') {
				// 降序
				this.queryData.orderType = 'desc'
			} else {
				delete this.queryData.orderType
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
