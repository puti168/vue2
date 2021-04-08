<template>
	<!-- 已完成校对局 -->
	<div class="game-container report-container">
		<div class="header flex-h flex-bc">
			<h2 class="h2-line">已完成校对局</h2>
			<div class="flex-h handle">
				<el-button type="primary" icon="el-icon-search" size="medium" @click="handleSearch">查询</el-button>
			</div>
		</div>
		<div class="view-container dealer-container">
			<div class="params flex-h flex-bc">
				<el-form ref="form" :inline="true" :model="form">
					<el-form-item label="加入队列时间" prop="time">
						<el-date-picker
							v-model="form.time"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="left"
							value-format="timestamp"
							:clearable="false"
							:picker-options="pickerOptions"
							:default-time="defaultTime"
							@blur="onTimeBlur"
						></el-date-picker>
					</el-form-item>
					<!-- 校对次数 -->
					<el-form-item label="校对次数" prop="checkNum">
						<el-input v-model="form.checkNum" placeholder="校对次数"></el-input>
					</el-form-item>
					<!-- 局号 -->
					<el-form-item label="局号" prop="id">
						<el-input v-model="form.roundNo" placeholder="局号"></el-input>
					</el-form-item>
				</el-form>
				<div class="handle flex m-b-22"></div>
			</div>
			<div class="content">
				<el-table
					v-loading="loading"
					class="small-size-table"
					border
					:data="list3"
					:default-sort="defaultSort"
					:header-cell-style="getRowClass"
					:row-class-name="tableRowClassName"
					@sort-change="sortChange"
				>
					<el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
					<el-table-column prop="gameTypeName" align="center" label="游戏类型"></el-table-column>
					<el-table-column prop="roundNo" align="center" label="局号"></el-table-column>
					<el-table-column prop="createdAt" align="center" label="加入队列时间" sortable="custom"></el-table-column>
					<el-table-column prop="payoutAt" align="center" label="完成校对时间"></el-table-column>
					<el-table-column prop="consuming" align="center" label="校对耗时" sortable="custom">
						<template slot-scope="scope">
							{{
							`${scope.row.consuming}ms`
							}}
						</template>
					</el-table-column>
					<el-table-column prop="checkNum" align="center" label="校对次数" sortable="custom"></el-table-column>
					<el-table-column prop="status" align="center" label="校对状态">
						<template slot-scope="scope">
							{{
							scope.row.status === 0
							?'未校对'
							: '校对完成'
							}}
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-pagination
					:current-page.sync="pageIndex"
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
import { pageBettingRecordCountChecker } from '@/api/dealer'
import { routerNames } from '@/utils/consts'

export default {
	name: routerNames.dealerDetail,
	mixins: [list],
	data() {
		return {
			loading: false,
			form: {
				time: '',
				roundNo: '',
				checkNum: '',
				orderProp: 'createdAt',
				order: 'descending'
			},
			list3: [],
			defaultSort: { prop: 'createdAt', order: 'descending' }
		}
	},
	methods: {
		loadData() {
			this.loading = true
			this.loadPage()
		},
		loadPage() {
			pageBettingRecordCountChecker({
				pageSize: this.pageSize,
				pageIndex: this.pageIndex,
				startTime: this.form.time[0],
				endTime: this.form.time[1],
				roundNo: this.form.roundNo,
				checkNum: this.form.checkNum,
				orderProp: this.form.orderProp,
				order: this.form.order
			})
				.then((list3) => {
					this.loading = false
					this.list3 = list3.data.record
					this.total = list3.data.totalRecord
				})
				.catch(() => {
					this.loading = false
				})
		},
		handleSearch() {
			this.pageIndex = 1
			this.loadData()
		},
		handleCurrentChange() {
			this.loadData()
		},
		handleSizeChange(value) {
			this.pageSize = value
			this.pageIndex = 1
			this.loadData()
		},
		// 失去焦点的时候重置
		onTimeBlur() {
			this.minDate = null
		},
		sortChange(val) {
			const { prop, order } = val
			if (order === null) {
				this.form.orderProp === 'descending'
					? (val.order = 'descending')
					: (val.order = 'ascending')
				val.column.order = val.order
				this.form.orderProp = prop
				this.form.order = val.order
				this.loadData()
				return val
			}
			this.form.orderProp = prop
			this.form.order = order
			this.defaultSort = { prop, order: order || 'descending' }
			this.loadData()
			return val
		},
		tableRowClassName({ row, rowIndex }) {
			const num = row.checkNum
			if (num < 2) return 'color-0'
			if (num === 2) return 'color-1'
			if (num > 2) return 'color-2'
		}
	}
}
</script>

<style lang="scss" scoped>
.dealer-container {
	.el-icon-zoom-in {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(1.5);
		font-weight: 900;
		// transform: scale(1.5);
	}
	.handle {
		margin-bottom: 22px;
	}
	.profile {
		opacity: 0.3;
	}
}

.small-size-table {
	font-size: 13px !important;
}

.use-dynamic {
	.el-radio__input.is-checked + .el-radio__label {
		color: inherit;
	}
	.blue {
		color: blue;
	}

	.el-divider {
		margin: 0;
	}
	.add-del {
		padding-left: 24px;
	}

	.content {
		padding: 30px;
	}
}
</style>
