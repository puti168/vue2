<template>
	<div class="game-container report-container">
		<div class="params">
			<el-form ref="form" :inline="true" :model="queryData">
				<el-form-item label="操作类型:">
					<el-select
						v-model="queryData.operateType"
						style="width: 140px"
						:popper-append-to-body="false"
					>
						<el-option label="全部" value></el-option>
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
					></el-date-picker>
				</el-form-item>
				<el-form-item label="会员账号:" label-width="116px">
					<el-input
						v-model="queryData.userName"
						clearable
						size="medium"
						:maxlength="11"
						style="width: 180px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item label="上级代理:">
					<el-input
						v-model="queryData.parentProxyName"
						clearable
						size="medium"
						:maxlength="11"
						style="width: 180px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item label="虚拟币种类:">
					<el-select
						v-model="queryData.virtualKind"
						multiple
						style="width: 224px"
						placeholder="默认选择全部"
					>
						<el-option
							v-for="item in virtualType"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="虚拟币协议:">
					<el-select
						v-model="queryData.virtualProtocol"
						multiple
						style="width: 265px"
						placeholder="默认选择全部"
						clearable
						collapse-tags
					>
						<el-option
							v-for="item in virtualProtocolType"
							:key="item.code"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="账号类型:">
					<el-select
						v-model="queryData.accountType"
						style="width: 262px"
						multiple
						collapse-tags
						placeholder="默认选择全部"
						:popper-append-to-body="false"
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
				<el-form-item label="虚拟币账户地址:">
					<el-input
						v-model="queryData.virtualAddress"
						clearable
						size="medium"
						:maxlength="100"
						style="width: 448px"
						placeholder="请输入"
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
					@sort-change="_changeTableSort"
				>
					<el-table-column
						v-slot="scope"
						prop="userName"
						align="center"
						label="会员账号"
						min-width="110"
					>
						<Copy
							v-if="!!scope.row.userName"
							:title="scope.row.userName"
							:copy="copy"
						/>
						<span v-else>-</span>
					</el-table-column>
					<el-table-column align="center" label="账号类型" width="100">
						<template slot-scope="scope">
							<span
								v-if="
									!!scope.row.accountType || scope.row.accountType + '' === '0'
								"
							>
								{{ typeFilter(scope.row.accountType, 'accountType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						v-slot="scope"
						prop="parentProxyName"
						align="center"
						label="上级代理"
						min-width="110"
					>
						<Copy
							v-if="!!scope.row.parentProxyName"
							:title="scope.row.parentProxyName"
							:copy="copy"
						/>
						<span v-else>-</span>
					</el-table-column>
					<el-table-column
						v-slot="scope"
						prop="virtualAddress"
						align="center"
						label="虚拟币账户地址"
						width="220"
					>
						<Copy
							v-if="!!scope.row.virtualAddress"
							:title="scope.row.virtualAddress"
							:copy="copy"
						/>
						<span v-else>-</span>
					</el-table-column>
					<el-table-column prop="virtualKind" align="center" label="虚拟币种类">
						<template slot-scope="scope">
							{{ scope.row.virtualKind || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="virtualProtocol"
						align="center"
						label="虚拟币协议"
					>
						<template slot-scope="scope">
							{{ scope.row.virtualProtocol || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="windControlLevelName"
						align="center"
						label="风控层级"
					>
						<template slot-scope="scope">
							{{ scope.row.windControlLevelName || '-' }}
						</template>
					</el-table-column>
					<el-table-column prop="operator" align="center" label="操作人">
						<template slot-scope="scope">
							{{ scope.row.operator || '-' }}
						</template>
					</el-table-column>
					<el-table-column
						prop="operateType"
						align="center"
						width="100"
						label="操作类型"
					>
						<template slot-scope="scope">
							<span
								v-if="
									!!scope.row.operateType || scope.row.operateType + '' === '0'
								"
							>
								{{ typeFilter(scope.row.operateType, 'bindType') }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="remark"
						align="center"
						label="备注信息"
						min-width="120"
					>
						<template slot-scope="scope">
							{{ scope.row.remark || '-' }}
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
	name: routerNames.virtualRecord,
	components: {},
	mixins: [list],
	data() {
		this.search = this.throttle(this.search, 1000)
		this.reset = this.throttle(this.reset, 1000)
		return {
			queryData: {
				accountType: '',
				bankName: undefined,
				dataType: 2,
				operateType: '',
				orderType: undefined,
				parentProxyName: undefined,
				userName: undefined,
				virtualAddress: undefined,
				virtualKind: [],
				virtualProtocol: []
			},
			formTime: {
				time: [start, end]
			},
			dataList: [],
			title: ''
		}
	},
	computed: {
		accountType() {
			return this.globalDics.accountType || []
		},
		virtualType() {
			return this.globalDics.virtualType || []
		},
		virtualProtocolType() {
			return this.globalDics.virtualProtocolType || []
		},
		bindType() {
			return this.globalDics.bindType
		}
	},
	mounted() {},
	methods: {
		loadData() {
			const [startTime, endTime] = this.formTime.time || []
			let params = {
				...this.queryData,
				createDtStart: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined,
				createDtEnd: endTime
					? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')
					: undefined
			}
			if (!params.createDtStart || !params.createDtEnd) {
				this.$message({
					message: '操作时间参数必传',
					type: 'info'
				})
				return
			}
			params = {
				...this.getParams(params)
			}
			this.loading = true

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
				.catch(() => {
					this.loading = false
				})
		},
		_changeTableSort({ column, prop, order }) {
			this.pageNum = 1
			const orderParams = this.checkOrderParams.get(prop)
			if (orderParams) {
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
		},
		reset() {
			this.queryData = {
				accountType: '',
				bankName: undefined,
				dataType: 2,
				operateType: '',
				orderType: undefined,
				parentProxyName: undefined,
				userName: undefined,
				virtualAddress: undefined,
				virtualKind: [],
				virtualProtocol: []
			}
			this.pageNum = 1
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
</style>
