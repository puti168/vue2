<template>
	<div class="game-container report-container">
		<div class="view-container dealer-container">
			<div class="params">
				<el-form ref="form" :inline="true" :model="queryData">
					<el-form-item label="IP地址:">
						<el-input
							v-model="queryData.registerIp"
							clearable
							:maxlength="15"
							size="medium"
							style="width: 180px;"
							placeholder="请输入"
							:disabled="loading"
							@keyup.enter.native="enterSearch"
						></el-input>
					</el-form-item>
					<el-form-item label="变更前风控层级:" class="tagheight">
						<el-select
							v-model="queryData.afterWindControlId"
							style="width: 180px"
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option label="全部" value=""></el-option>
							<el-option
								v-for="item in WindControlLevel"
								:key="item.id"
								:label="item.windControlLevelName"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="变更后风控层级:" class="tagheight">
						<el-select
							v-model="queryData.beforeWindControlId"
							style="width: 180px"
							clearable
							placeholder="默认选择全部"
							:popper-append-to-body="false"
						>
							<el-option label="全部" value=""></el-option>
							<el-option
								v-for="item in WindControlLevel"
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
							style="width: 180px"
							placeholder="请输入内容"
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
					<el-table-column prop="registerIp" align="center" label="IP地址">
						<template slot-scope="scope">
							{{ scope.row.registerIp }}
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
	name: routerNames.ipRiskControlChange,
	components: {},
	mixins: [list],
	data() {
		return {
			queryData: {
				registerIp: '',
				afterWindControlId: '',
				beforeWindControlId: '',
				createdBy: '',
				windType: 5
			},
			WindControlLevel: [],
			tableData: []
		}
	},
	computed: {},
	mounted() {
		this.getSelectWindControlLevel()
	},
	methods: {
		getSelectWindControlLevel() {
			this.$api
				.getSelectWindControlLevel({ windControlType: 5 })
				.then((res) => {
					if (res.code === 200) {
						this.WindControlLevel = res.data
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
					if (res.code === 200) {
						this.tableData = res.data.record
						this.total = res.data.totalRecord
					}
					this.loading = false
				})
				.catch(() => {
					this.loading = false
				})
		},
		reset() {
			this.queryData = {
				registerIp: '',
				afterWindControlId: '',
				beforeWindControlId: '',
				createdBy: '',
				windType: 5
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
