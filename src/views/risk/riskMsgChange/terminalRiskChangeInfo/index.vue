<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="终端设备号:">
						<el-input
							v-model="queryData.objectInfo"
							clearable
							:maxlength="50"
							size="medium"
							style="width: 250px"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="变更前风控层级:" class="tagheight">
						<el-select
							v-model="queryData.beforeWindControlId"
							style="width: 200px"
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option label="全部" value=""></el-option>
							<el-option
								v-for="item in beforeWindControlLevel"
								:key="item.id"
								:label="item.windControlLevelName"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="变更后风控层级:" class="tagheight">
						<el-select
							v-model="queryData.afterWindControlId"
							style="width: 200px"
							clearable
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option label="全部" value=""></el-option>
							<el-option
								v-for="item in afterWindControlLevel"
								:key="item.id"
								:label="item.windControlLevelName"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="操作人:">
						<el-input
							v-model="queryData.createdBy"
							clearable
							:maxlength="15"
							size="medium"
							style="width: 200px"
							placeholder="请输入"
							:disabled="loading"
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
					:data="tableData"
					style="width: 100%"
					:header-cell-style="getRowClass"
					@sort-change="_changeTableSort"
				>
					<el-table-column prop="objectInfo" align="center" label="终端设备号">
						<template slot-scope="scope">
							<span v-if="!!scope.row.objectInfo">
								{{ scope.row.objectInfo }}
							</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="beforeWindControlName"
						align="center"
						label="变更前风控层级"
					>
						<template slot-scope="scope">
							<el-tooltip
								:content="scope.row.beforeWindControlDepict"
								placement="top"
							>
								<p>{{ scope.row.beforeWindControlName }}</p>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column
						prop="afterWindControlName"
						align="center"
						label="变更后风控层级"
					>
						<template slot-scope="scope">
							<el-tooltip
								:content="scope.row.afterWindControlDepict"
								placement="top"
							>
								<p>{{ scope.row.afterWindControlName }}</p>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column
						prop="windReason"
						align="center"
						label="风控原因"
					></el-table-column>
					<el-table-column
						prop="createdBy"
						align="center"
						label="操作人"
					></el-table-column>
					<el-table-column
						prop="createdAt"
						align="center"
						label="操作时间"
						sortable="custom"
					></el-table-column>
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
import { routerNames } from '@/utils/consts'

export default {
	name: routerNames.terminalRiskControlChange,
	components: {},
	mixins: [list],
	data() {
		this.loadData = this.throttle(this.loadData, 1000)
		this.reset = this.throttle(this.reset, 1000)
		this._changeTableSort = this.throttle(this._changeTableSort, 1000)
		return {
			queryData: {
				objectInfo: undefined,
				afterWindControlId: undefined,
				orderType: undefined,
				beforeWindControlId: undefined,
				createdBy: undefined,
				windType: 6
			},
			beforeWindControlLevel: [],
			afterWindControlLevel: [],
			tableData: []
		}
	},
	computed: {},
	created() {
		this.getSelectWindControlLevel(1)
	},
	mounted() {
		this.getSelectWindControlLevel(2)
	},
	methods: {
		getSelectWindControlLevel(type) {
			this.$api
				.getSelectWindControlLevelId({ windControlType: 6, type })
				.then((res) => {
					const { code } = res
					if (code === 200) {
						type === 1
							? (this.beforeWindControlLevel = res.data)
							: (this.afterWindControlLevel = res.data)
					}
				})
		},
		loadData() {
			this.loading = true
			let params = {
				...this.queryData
			}
			params = {
				...this.getParams(params)
			}
			this.$api
				.selectWindControlRecord(params)
				.then((res) => {
					this.loading = false
					if (res?.code === 200) {
						const { record, totalRecord } = res.data || {}
						this.tableData = Array.isArray(record) ? Object.freeze(record) : []
						this.total = totalRecord || 0
					} else {
						this.$message({
							message: res?.msg || '接口请求异常',
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
				objectInfo: undefined,
				afterWindControlId: '',
				orderType: '',
				beforeWindControlId: '',
				createdBy: undefined,
				windType: 6
			}
			this.pageNum = 1
			this.loadData()
		},
		_changeTableSort({ column, prop, order }) {
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
