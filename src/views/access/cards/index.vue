<template>
	<div>
		<div class="header flex-h flex-bc">
			<h2 class="h2-line">访问统计报表</h2>
			<div class="head flex-h-end">
				<el-button
					type="primary"
					icon="el-icon-search"
					size="medium"
					@click="handleSearch"
				>
					查询
				</el-button>
			</div>
		</div>
		<div class="use-dynamic">
			<div class="params flex-h flex-bc">
				<el-form ref="form" :inline="true" :model="form">
					<el-form-item label="统计单位" prop="reportType">
						<el-select v-model="form.reportType" style="width:120px">
							<el-option label="分钟" :value="1"></el-option>
							<el-option label="小时" :value="2"></el-option>
							<el-option label="天" :value="3"></el-option>
							<el-option label="周" :value="4"></el-option>
							<el-option label="月" :value="5"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="统计区间">
						<el-date-picker
							v-show="showHour === 'datetimerange'"
							v-model="form.time"
							size="medium"
							:format="format"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							align="right"
							value-format="timestamp"
							clearable
							style="width:500px"
						></el-date-picker>
						<el-date-picker
							v-show="showHour === 'week'"
							v-model="form.time2"
							:format="format"
							align="left"
							type="week"
							placeholder="选择周"
							:clearable="false"
						></el-date-picker>
					</el-form-item>
					<SelectAgentTree v-model="form.agentId" />
					<el-form-item label="图例模式">
						<el-select v-model="formType" style="width:120px">
							<el-option label="正选" :value="1"></el-option>
							<el-option label="反选" :value="2"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<div v-if="showTable" class="content">
				<v-chart
					ref="myChart"
					class="my-chart"
					:options="line"
					@click="chartClick"
					@legendselectchanged="legendselectchanged"
				/>
			</div>
		</div>
		<!-- 详情 -->
		<el-dialog
			width="1000px"
			title="详情"
			center
			:close-on-click-modal="false"
			:destroy-on-close="true"
			:visible.sync="scrapStatus"
		>
			<div class="head flex-h-end" style="margin-bottom:10px;">
				<el-button
					type="primary"
					icon="el-icon-search"
					size="medium"
					@click="handleSearch2"
				>
					刷新
				</el-button>
			</div>
			<el-table
				class="small-size-table"
				border
				:data="list2"
				:header-cell-style="getRowClass"
			>
				<el-table-column
					type="index"
					label="序号"
					align="center"
					width="100"
				></el-table-column>
				<el-table-column
					prop="agentName"
					align="center"
					label="商户"
				></el-table-column>
				<el-table-column
					prop="countTime"
					align="center"
					label="统计时间"
				></el-table-column>
				<el-table-column
					prop="counter"
					align="center"
					label="访问次数"
				></el-table-column>
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
		</el-dialog>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import list from '@/mixins/list'
import {
	pageApiAccessCounterDetail,
	apiAccessCounterReport
} from '@/api/cardRepertory'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import dayjs from 'dayjs'
import SelectAgentTree from '@/components/SelectAgentTree'

export default {
	name: 'Api',
	components: { 'v-chart': ECharts, SelectAgentTree },
	mixins: [list],
	data() {
		const start = dayjs().startOf('day')
		const end = dayjs().endOf('day')

		return {
			scrapStatus: false,
			formType: 1,
			list2: [
				{
					agentCode: 'DNVPM',
					agentId: 2671,
					agentName: 'BOB',
					countDate: 20200702,
					countTime: 202007021753,
					counter: 1,
					id: 486609897669136400,
					methodName: '/withdraw/v1'
				}
			],
			line: {},
			dialogVisible: false,
			timestamp: +new Date(),
			isCreated: false,
			drawer: false,
			drawer2: false,
			dialog: false,
			dealerStatus: {},
			dialogForm: {},
			agentid: 0,
			form: {
				time: [start, end],
				time2: '',
				agentId: '',
				reportType: 2
			},
			dealData: {},
			list: [],
			showTable: false,
			format: 'yyyy-MM-dd HH时',
			showHour: 'datetimerange',
			currentParams: {},
			currentName: ''
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
	watch: {
		'form.reportType'(val) {
			if (val === 1) {
				this.format = 'yyyy-MM-dd HH:mm'
				this.showHour = 'datetimerange'
			}
			if (val === 2) {
				this.format = 'yyyy-MM-dd HH时'
				this.showHour = 'datetimerange'
			}
			if (val === 3) {
				this.format = 'yyyy-MM-dd'
				this.showHour = 'datetimerange'
			}
			if (val === 4) {
				this.format = 'yyyy-WW周'
				this.showHour = 'week'
			}
			if (val === 5) {
				this.format = 'yyyy-MM月'
				this.showHour = 'datetimerange'
			}
		}
	},
	created() {
		this.timer = setInterval(() => {
			this.loadList()
		}, 30 * 1000)
	},
	mounted() {
		const _this = this
		window.showTooltipDetail = _this.showTooltipDetail
	},
	destroyed() {
		window.clearInterval(this.timer)
	},
	methods: {
		loadData() {
			this.loadList()
		},
		legendselectchanged(params) {
			if (this.formType === 1) {
				const selected = params.selected
				const target = params.name
				if (selected !== undefined) {
					// 获取点击之前状态
					const prevSelected = params.selected
					prevSelected[target] = !prevSelected[target]

					let unSelectedCount = 0
					let selectedCount = 0
					for (const name in prevSelected) {
						if (!prevSelected.hasOwnProperty(name)) {
							continue
						}
						if (prevSelected[name] === false) {
							++unSelectedCount
						} else {
							++selectedCount
						}
					}
					// 1、若点击前所有都被选中
					// 2、（点击前）若有且仅有被点击的图例是选中状态
					// 则执行点击后的取反（legendToggleSelect）操作
					if (
						unSelectedCount === 0 ||
						(selectedCount === 1 && prevSelected[target] === true)
					) {
						const legend = []
						for (const name in selected) {
							if (selected.hasOwnProperty(name)) {
								legend.push({ name: name })
							}
						}
						this.$refs.myChart.dispatchAction({
							type: 'legendToggleSelect',
							batch: legend
						})
					}
				}
			}
		},
		loadList() {
			this.showTable = false

			const params = {
				agentId: this.form.agentId,
				reportType: this.form.reportType
			}

			if (this.form.reportType === 4) {
				params.startTime = this.form.time2
					? dayjs(this.form.time2)
							.subtract(1, 'days')
							.format('YYYY-MM-DD HH:mm:ss')
					: ''
				params.endTime = this.form.time2
					? dayjs(this.form.time2)
							.add(5, 'days')
							.endOf('days')
							.format('YYYY-MM-DD HH:mm:ss')
					: ''
			} else {
				params.startTime = this.form.time
					? dayjs(this.form.time[0]).format('YYYY-MM-DD HH:mm:ss')
					: ''
				params.endTime = this.form.time
					? dayjs(this.form.time[1]).format('YYYY-MM-DD HH:mm:ss')
					: ''
			}

			this.line = {}

			apiAccessCounterReport(params).then((res) => {
				console.log('res.data.series :>> ', res.data.series)

				this.line = {
					tooltip: {
						triggerOn: 'click',
						trigger: 'axis',
						confine: false,
						enterable: true,
						formatter: (tableparams) => {
							var html = ''
							if (tableparams.length > 0) {
								html += tableparams[0].name + '<br>'
								for (var int = 0; int < tableparams.length; int++) {
									html += `${tableparams[int].marker}${tableparams[int].seriesName} : ${
										tableparams[int].data
									} <button data-name="${
										tableparams[int].seriesName
									}" onclick="showTooltipDetail(this)">查 看</button><br>`
								}
							}

							return html
						}
					},
					legend: {
						data: res.data.legend
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: res.data.xaxis
					},
					yAxis: {
						type: 'value'
					},
					series:
						res.data.series &&
						res.data.series.map((i) => {
							return {
								name: i.name,
								type: 'line',
								stack: '总量',
								data: i.data
							}
						})
				}

				console.log('this.line :>> ', this.line)

				this.showTable = true
			})
		},
		addDealer() {
			this.$router.push('/cardsDetail')
		},
		change({ id, status, dealerAccount }) {
			this.dialogVisible = true
			this.dealerStatus = {
				...this.dealerStatus,
				id,
				status: status === '1' ? '0' : '1',
				dealerAccount
			}
		},
		handleCurrentChange() {
			this.loadDetail()
		},
		handleSizeChange(value) {
			this.pageSize = value
			this.loadDetail()
		},
		handleSearch() {
			this.loadList()
		},
		handleSearch2() {
			this.loadDetail()
		},
		chartClick(params) {
			console.log('params :>> ', params)
			this.currentParams = params
		},
		loadDetail() {
			// pageSize: 20
			// pageIndex: 1
			// reportTime: 2020070816时
			// methodName: betHistoryRecord/v1
			// reportType: 2
			pageApiAccessCounterDetail({
				pageSize: this.pageSize,
				pageIndex: this.pageIndex,
				reportTime: this.currentParams.name,
				methodName: this.currentName,
				reportType: this.form.reportType,
				agentId: this.form.agentId
			}).then((res) => {
				this.list2 = res.data.record
				this.total = res.data.totalRecord
			})
		},
		showTooltipDetail(e) {
			const name = e.getAttribute('data-name')
			this.currentName = name
			this.scrapStatus = true
			this.loadDetail()
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
