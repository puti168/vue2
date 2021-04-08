
<template>
	<div>
		<div class="header flex-h flex-bc">
			<h2 class="h2-line">拉单数据量监控</h2>
			<div class="head flex-h-end">
				<el-button type="primary" icon="el-icon-search" size="medium" @click="handleSearch">查询</el-button>
			</div>
		</div>
		<div class="use-dynamic">
			<div class="params flex-h flex-bc">
				<el-form ref="form" :inline="true" :model="listQuery">
					<el-form-item label="统计时间">
						<el-date-picker
							v-model="listQuery.time"
							size="medium"
							format="yyyy-MM-dd HH"
							:picker-options="pickerOptions"
							type="daterange"
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
			<div v-if="showTable" class="content">
				<v-chart class="my-chart" :options="line" />
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import list from '@/mixins/list'
import { listApiPullCounter } from '@/api/waterSign'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'
import dayjs from 'dayjs'
import { merge } from 'lodash'
import SelectAgentTree from '@/components/SelectAgentTree'

export default {
	name: '',
	components: { 'v-chart': ECharts, SelectAgentTree },
	mixins: [list],
	data() {
		const end = dayjs()
		const start = dayjs().subtract(24, 'h')

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
					// {
					// 	type: 'line',
					// 	smooth: true,
					// 	seriesLayoutBy: 'row',
					// 	label: {
					// 		normal: {
					// 			show: true,
					// 			position: 'top'
					// 		}
					// 	}
					// },
					// {
					// 	type: 'line',
					// 	smooth: true,
					// 	seriesLayoutBy: 'row',
					// 	label: {
					// 		normal: {
					// 			show: true,
					// 			position: 'top'
					// 		}
					// 	}
					// }
				]
			},
			dialogVisible: false,
			timestamp: +new Date(),
			isCreated: false,
			drawer: false,
			drawer2: false,
			dialog: false,
			dealerStatus: {},
			dialogForm: {},
			form: {},
			agentid: 0,
			listQuery: {
				time: [start, end],
				agentId: ''
			},
			listQuery2: {
				time: [start, end],
				agentId: ''
			},
			dealData: {},
			list: [
				{
					a: 1,
					b: 2,
					c: 3,
					d: 4,
					e: 5
				}
			],
			showTable: false
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
	created() {
		this.timer = setInterval(() => {
			this.loadList()
		}, 30 * 1000)
	},
	destroyed() {
		window.clearInterval(this.timer)
	},
	methods: {
		loadData() {
			this.loadList()
		},
		loadList() {
			this.showTable = false
			const params = {
				startTime: this.listQuery.time
					? dayjs(this.listQuery.time[0]).format('YYYYMMDDHH')
					: '',
				endTime: this.listQuery.time
					? dayjs(this.listQuery.time[1]).format('YYYYMMDDHH')
					: '',
				agentId: this.listQuery.agentId
			}

			listApiPullCounter(params).then((res) => {
				this.line = merge(
					this.line,
					{ dataset: { source: res.data.source } },
					{ series: res.data.series }
				)

				this.showTable = true
			})
		},
		addDealer() {
			this.$router.push('/waterDetail')
		},
		handleCurrentChange() {
			this.loadList()
		},
		handleSizeChange(value) {
			this.pageSize = value
			this.loadList()
		},
		beforeDialogClose() {
			this.$refs.dialogForm.resetFields()
		},
		handleSearch() {
			this.loadList()
		}
	}
}
</script>

<style lang="scss" scoped>
.header {
	margin: 0 30px;
	border-bottom: 1px solid rgb(231, 223, 223);
}

.params {
	margin: 15px 30px;
}

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
