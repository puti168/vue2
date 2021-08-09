<template>
	<div class="game-container report-container">
		<div class="params">
			<el-form ref="form" :inline="true" :model="queryData">
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

				<el-form-item label="操作页面:">
					<el-select
						v-model="queryData.pageName"
						style="width: 270px"
						multiple
						clearable
						collapse-tags
						placeholder="默认选择全部"
						:popper-append-to-body="false"
					>
						<el-option
							v-for="item in operatePage"
							:key="item.value"
							:label="item.value"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="显示终端:">
					<el-select
						v-model="queryData.clientType"
						style="width: 270px"
						multiple
						clearable
						placeholder="默认选择全部"
						:popper-append-to-body="false"
					>
						<el-option
							v-for="item in operateClient"
							:key="item.codes"
							:label="item.description"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="名称:">
					<el-input
						v-model="queryData.fieldName"
						clearable
						size="medium"
						:maxlength="20"
						style="width: 270px"
						placeholder="请输入"
						@keyup.enter.native="enterSearch"
					></el-input>
				</el-form-item>
				<el-form-item label="变更类型:">
					<el-select
						v-model="queryData.changeType"
						style="width: 270px"
						multiple
						clearable
						collapse-tags
						placeholder="默认选择全部"
						:popper-append-to-body="false"
					>
						<el-option
							v-for="item in changeType"
							:key="item.codein"
							:label="item.value"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="操作人:">
					<el-input
						v-model="queryData.createdBy"
						clearable
						size="medium"
						:maxlength="12"
						style="width: 197px"
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
						prop="pageName"
						align="center"
						label="操作页面"
						width="200"
					>
						<template slot-scope="scope">
							<span v-for="item in operatePage" :key="item.value">
								{{ scope.row.pageName === item.code ? item.value : '' }}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="client"
						align="center"
						label="显示终端"
						width="150"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.pageName === 1">
								--
							</span>
							<span
								v-else-if="
									!!scope.row.clientType || scope.row.clientType + '' === '0'
								"
							>
								{{ typeFilter(scope.row.clientType, 'operateClient') }}
							</span>
							<span v-else></span>
						</template>
					</el-table-column>
					<el-table-column
						prop="fieldName"
						align="center"
						label="名称"
						width="220"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.pageName === 1">
								--
							</span>
							<span v-else-if="!!scope.row.fieldName">
								{{ scope.row.fieldName }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="changeType"
						align="center"
						label="变更类型"
						width="180"
					>
						<template slot-scope="scope">
							<span v-for="item in changeType" :key="item.value">
								{{ scope.row.changeType === item.code ? item.value : '' }}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						align="center"
						prop="beforeValue"
						label="变更前"
						width="180"
					>
						<template slot-scope="scope">
							<p v-if="!!scope.row.beforeValue">
								<span v-if="[21].includes(scope.row.changeType)">
									{{ scope.row.beforeValue === '0' ? '已禁用' : '开启中' }}
								</span>
								<span v-else>{{ scope.row.beforeValue }}</span>
							</p>
							<p v-else>-</p>
						</template>
					</el-table-column>
					<el-table-column
						align="center"
						prop="afterValue"
						label="变更后"
						width="180"
					>
						<template slot-scope="scope">
							<p v-if="!!scope.row.afterValue">
								<span v-if="[21].includes(scope.row.changeType)">
									{{ scope.row.afterValue === '0' ? '已禁用' : '开启中' }}
								</span>
								<span v-else>{{ scope.row.afterValue }}</span>
							</p>
							<p v-else>-</p>
						</template>
					</el-table-column>
					<el-table-column
						prop="remark"
						align="center"
						label="备注"
						width="200"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.remark">
								{{ scope.row.remark }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="createdBy"
						align="center"
						width="120"
						label="操作人"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.createdBy">
								{{ scope.row.createdBy }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="createdAt"
						min-width="200"
						align="center"
						label="操作时间"
						sortable="custom"
					>
						<template slot-scope="scope">
							<span v-if="!!scope.row.createdAt">
								{{ scope.row.createdAt }}
							</span>
							<span v-else>-</span>
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
const end = dayjs()
	.endOf('day')
	.valueOf()
const start = dayjs()
	.startOf('day')
	.valueOf()
export default {
	name: 'MemberMsgChange',
	components: {},
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		return {
			queryData: {},
			formTime: {
				time: [start, end]
			},
			dataList: [],
			changeType: [],
			client: [],
			operatePage: [],
			title: ''
		}
	},
	computed: {
		accountType() {
			return this.globalDics.accountType
		},
		virtualType() {
			return this.globalDics.virtualType
		},
		virtualProtocolType() {
			return this.globalDics.virtualProtocolType
		},
		applyType() {
			return this.globalDics.applyType
		},
		operateClient() {
			return this.globalDics.operateClient
		}
	},
	created() {
		this.getEnums()
	},
	mounted() {},
	methods: {
		loadData() {
			const [startTime, endTime] = this.formTime.time || []
			let params = {
				...this.queryData,
				startAt: startTime
					? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')
					: '',
				endAt: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : ''
			}
			if (!params.startAt || !params.endAt) {
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
				.getOperateConfigClientRecordQueryRecordList(params)
				.then((res) => {
					if (res.code === 200) {
						this.loading = false
						this.dataList = res.data.records
						this.total = res.data.total
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
		getEnums() {
			this.$api.operateConfigClientRecordQueryEnumsAPI().then((res) => {
				if (res.code === 200) {
					this.changeType = res.data.changeType
					this.client = res.data.client
					console.log(this.client, '显示')
					this.operatePage = res.data.operatePage
				}
			})
		},
		changeTableSort({ column, prop, order }) {
			if (prop === 'createdAt') {
				prop = 0
			}
			this.pageNum = 1

			this.queryData.orderKey = prop
			console.log(this.queryData.orderKey, '排序')
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
		reset() {
			this.queryData = {
				userName: '',
				applyName: '',
				accountType: [],
				applyType: []
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
