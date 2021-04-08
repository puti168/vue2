
<template>
	<div class="game-container report-container">
		<div class="header flex-h flex-bc">
			<h2 class="h2-line">商户拉单日志</h2>
			<div class="head flex-h-end">
				<el-button type="primary" icon="el-icon-search" size="medium" @click="handleSearch">查询</el-button>
			</div>
		</div>
		<div class="view-container dealer-container">
			<div class="params flex-h flex-bc">
				<el-form ref="listQuery" :inline="true" :model="listQuery">
					<el-form-item label="拉取时间">
						<el-date-picker
							v-model="listQuery.time"
							size="medium"
							format="yyyy-MM-dd HH:mm"
							:picker-options="pickerOptions"
							:default-time="defaultTime"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							value-format="timestamp"
							clearable
						></el-date-picker>
					</el-form-item>
					<SelectAgentTree v-model="listQuery.agentId" />
				</el-form>
			</div>
			<div class="content">
				<el-table
					v-loading="loading"
					border
					class="small-size-table"
					:data="list"
					:default-sort="defaultSort"
					:header-cell-style="getRowClass"
					@sort-change="sortChange"
				>
					<el-table-column type="index" align="center" label="序号" width="80"></el-table-column>
					<el-table-column prop="agentName" align="center" label="商户名称" width="320">
						<template slot-scope="scope">{{ `${scope.row.agentName}(${scope.row.agentCode})` }}</template>
					</el-table-column>
					<el-table-column prop="createdAt" align="center" label="拉取时间" sortable="custom">
						<template slot-scope="scope">{{ scope.row.createdAt }}</template>
					</el-table-column>
					<el-table-column prop="recordTime" align="center" label="拉取开始时间-拉取结束时间/序号/参数" width="420">
						<template
							slot-scope="scope"
						>{{ `${scope.row.startTime} - ${scope.row.endTime} / ${scope.row.pageIndex} / ${scope.row.pageSize}` }}</template>
					</el-table-column>
					<el-table-column prop="responseCounter" align="center" label="拉取注单数" sortable="custom"></el-table-column>
					<el-table-column prop="responsePager" align="center" label="响应总页数" sortable="custom">
						<template slot-scope="scope">{{ `${scope.row.responsePager} / ${scope.row.responseCounter}` }}</template>
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
import { mapGetters } from 'vuex'
import list from '@/mixins/list'
import { pagePullRecordInfo } from '@/api/waterSign'
import dayjs from 'dayjs'
import SelectAgentTree from '@/components/SelectAgentTree'

export default {
	name: '',
	components: { SelectAgentTree },
	mixins: [list],
	data() {
		const start = dayjs().startOf('day').valueOf()
		const end = dayjs().endOf('day').valueOf()

		return {
			line: {
				tooltip: {
					trigger: 'axis'
				},
				legend: {},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: { type: 'category' },
				yAxis: { gridIndex: 0 },
				dataset: {
					source: []
				},
				series: [
					{
						type: 'line',
						smooth: true,
						seriesLayoutBy: 'row',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						}
					},
					{
						type: 'line',
						smooth: true,
						seriesLayoutBy: 'row',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						}
					}
				]
			},
			dialogVisible: false,
			timestamp: +new Date(),
			isCreated: false,
			dialog: false,
			dealerStatus: {},
			dialogForm: {},
			agentid: 0,
			listQuery: {
				time: [start, end],
				agentId: '',
				orderProp: 'createdAt',
				order: 'descending'
			},
			defaultSort: { prop: 'createdAt', order: 'descending' },
			dealData: {},
			list: [],
			showTable: false,
			summary: ''
		}
	},
	computed: {
		...mapGetters(['name', 'countryType']),
		countries() {
			const types = this.countryType || []
			return types.map((item) => {
				return {
					value: item.value,
					label: item.text,
					zh: item.text,
					en: item.englishText
				}
			})
		}
	},
	methods: {
		loadData() {
			this.loadPage()
		},
		loadPage() {
			this.loading = true
			const params = {
				startTime: this.listQuery.time ? this.listQuery.time[0] : '',
				endTime: this.listQuery.time ? this.listQuery.time[1] : '',
				agentId: this.listQuery.agentId,
				pageSize: this.pageSize,
				pageIndex: this.pageIndex,
				orderProp: this.listQuery.orderProp,
				order: this.listQuery.order
			}

			pagePullRecordInfo({
				...params
			})
				.then((res) => {
					this.loading = false
					this.list = res.data.record
					this.total = res.data.totalRecord
					this.summary = res.data.summary
				})
				.catch(() => {
					this.loading = false
				})
		},
		addDealer() {
			this.$router.push('/water')
		},
		handleCurrentChange() {
			this.loadPage()
		},
		handleSizeChange(value) {
			this.pageSize = value
			this.pageIndex = 1
			this.loadPage()
		},
		beforeDialogClose() {
			this.$refs.dialogForm.resetFields()
		},
		handleSearch() {
			this.pageIndex = 1
			this.loadPage()
		},
		formatTime(time) {
			time = time + ''
			return (
				time.slice(0, 4) +
				'-' +
				time.slice(4, 6) +
				'-' +
				time.slice(6, 8) +
				' ' +
				time.slice(8, 10)
			)
		},
		sortChange(val) {
			const { prop, order } = val
			if (order === null) {
				this.listQuery.orderProp === 'descending'
					? (val.order = 'descending')
					: (val.order = 'ascending')
				val.column.order = val.order
				this.listQuery.orderProp = prop
				this.listQuery.order = val.order
				this.loadData()
				return val
			}
			this.listQuery.orderProp = prop
			this.listQuery.order = order
			this.defaultSort = { prop, order: order || 'descending' }
			this.loadData()
			return val
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

$width: 160px;
$height: 160px;
$bg-list: (0 #ccffcc), (1 #ff6666), (2 rgba(215, 221, 32, 1)),
	(3 rgba(121, 121, 117, 1));

.list {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax($width, 0fr));
	grid-auto-rows: $height;
	grid-row-gap: 20px;
	grid-column-gap: 20px;
}

.list-one {
	width: $width;
	border: 1px solid #f1f1f1;
	text-align: left;
	display: flex;
	flex-direction: column;
	justify-content: center;
	box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
	background: #ccffcc;
	color: #666;

	.list-header {
		width: $width;
		line-height: 26px;
		padding: 0 5px;
	}
}

.list-two {
	width: $width;
	border: 1px solid #f1f1f1;
	text-align: left;
	display: flex;
	flex-direction: column;
	justify-content: center;
	box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
	background: #ff6666;
	color: #666;
	.list-header {
		width: $width;
		line-height: 26px;
		padding: 0 5px;
	}
}

.title {
	font-size: 18px;
	line-height: 60px;
	font-weight: bold;
}

.colors {
	display: flex;
	margin-top: 30px;

	> div {
		flex: 0 0 160px;
		display: flex;
	}

	.color {
		flex: 0 0 50px;
		height: 50px;
	}

	@each $label, $color1 in $bg-list {
		.color-#{$label} {
			background: $color1;
		}
	}

	.text {
		flex: 1;
		line-height: 50px;
		text-align: center;
	}
}

.detail-dialog {
	div {
		line-height: 30px;
	}
	.label {
		float: right;
		padding: 0 3px;
	}
}

.my-chart {
	width: 1300px;
	height: 600px;
}
</style>
